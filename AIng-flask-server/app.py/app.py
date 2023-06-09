import os
import openai
from flask import Flask, render_template, request,jsonify,send_file, make_response
import requests
import json
from flask_cors import CORS
from flask import Flask, request, jsonify
from google.cloud import speech_v1p1beta1 as speech
from google.cloud.speech_v1p1beta1 import types
from flask import render_template
import jwt
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import re
import matplotlib.pyplot as plt
import pandas as pd
import tensorflow as tf
import tensorflow_text
import tensorflow_hub as hub
import matplotlib.pyplot as plt
from wordcloud import WordCloud 
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from matplotlib.figure import Figure
import numpy as np
import io
import base64
import matplotlib
matplotlib.use('agg')


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# 환경 변수 설정 (다운로드한 JSON 키 파일의 경로를 지정)
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "C:\\Users\\82108\\Desktop\\civil-orb-383914-4db936f7a15d.json"

openai.api_key = "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"

# 주의 주의 root -> mysql id / csedbadmin -> mysql password
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:1234@localhost/test'
db = SQLAlchemy(app)


def init_machine():
    bert_preprocess = hub.KerasLayer("https://tfhub.dev/tensorflow/bert_en_uncased_preprocess/3")

    text_input = tf.keras.layers.Input(shape=(), dtype=tf.string, name='text')
    preprocessed_text = bert_preprocess(text_input)

    bert_encoder = hub.KerasLayer("https://tfhub.dev/tensorflow/bert_en_uncased_L-12_H-768_A-12/4")

    outputs = bert_encoder(preprocessed_text)

    l = tf.keras.layers.Dropout(0.1, name="dropout")(outputs['pooled_output'])
    l = tf.keras.layers.Dense(120, activation='relu')(l)
    l = tf.keras.layers.Dense(320, activation='relu')(l)
    l = tf.keras.layers.Dense(10, activation='softmax', name="output")(l)

    custom_objects = {'KerasLayer': hub.KerasLayer}

    model = tf.keras.models.load_model("C:\\Users\\82108\\Desktop\\machine\\model.h5", custom_objects=custom_objects)
    return model

model = init_machine()


@app.route('/get_wordcloud', methods = ['GET'])
def get_image():
    b = ' '.join([item['content'] for item in message if item['role'] == 'user'])
    text = b
    document_column = "select subject" #여기서 select subject는 사용자가 선택한 주제 사용자 분석시 모든 대화결과 들어가야함
    text = pd.Series(text.lower().split())
    word_lengths = text.apply(len)
    long_words = text[word_lengths >= 6]

    num_words_to_visualize = 100
    wordcloud = WordCloud(width=800, height=400, max_words=num_words_to_visualize, background_color='white').generate_from_frequencies(long_words.value_counts())
    word_counts = text.value_counts()
    word_counts = word_counts[word_counts.index.str.len()>=6].sort_values(ascending=False)

    num_words_to_visualize = 20
# display the wordcloud
    plt.figure(figsize=(5, 3))
    plt.imshow(wordcloud, interpolation='bilinear')
    plt.axis('off')
    plt.savefig('figure1.png')# 그림을 이미지 파일로 저장
    file_path1 = 'figure1.png'
    print("이미지전송완료")
    return send_file(file_path1, mimetype='image/png')




@app.route('/get_images_url', methods=['GET'])
def get_images_url():
    wordcloud_image_url = '/get_wordcloud'
    return jsonify({'wordcloudUrl': wordcloud_image_url})

@app.route('/grammar_correction', methods=['POST'])
def grammar_correction():
    data = request.get_json()
    message = data.get('message')

    # Call OpenAI API for grammar correction
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=f"Please correct the following sentence: '{message}'",
        max_tokens=50,
        n=1,
        stop=None,
        temperature=0.7
    )

    corrected_message = response.choices[0].text.strip()

    return jsonify(corrected_message)

message = []
@app.route('/set_topic',methods = ['POST'])
def set_topic():
    getTopic = request.get_json()
    topic = "You are a friendly friend of the user. you have to talk about "
    topic += getTopic['topic']
    message.append({"role":"system","content":f"{topic}"})
    return 'OK'

@app.route('/generate', methods = ['POST'])
def answer():
    data = request.get_json()
    
    # Get the token from request
    token = request.json.get('token')
    user_email = get_email_from_token(token)
    db.session.commit()
    
    user = User.query.filter_by(email=user_email).first()
    total_score = TotalScore.query.first()
    if not user:
        return jsonify({'error': 'User not found'}), 404

    # 유저 채팅할때마다 count+1(평균을 구하기 위함)
    if user:
        user.count += 1
        if total_score:
            total_score.count += 1
        else:
            total_score = TotalScore(gra_score=0, cla_score=0, coh_score=0, voc_score=0, str_score=0, count=1)
            db.session.add(total_score)
    else:
        user.count = user.count
    db.session.add(user)
    db.session.add(total_score)
    db.session.commit()
    ############################
    

    
    input_text = data['input_text']
    result = []
    result.append({"role":"system","content":"Divide the sentences I said into GRAMMAR, CLARITY, COHERENCE, VOCABULARY, STRUCTURE and give them a score. I can give you a score from 0 to 100 and I hope you give me a score like the example I'm talking about in the future. GRAMMAR: 100 CLARITY: 100 COHERENCE: 80 VOCABULARY: 100 STRUCTURE: 60 You have to give it like an example. You can't write anything more. Just give me a score. Give me an average of the cumulative values of continuously generated score"})
    result.append({"role":"assistant","content":"GRAMMAR: 100 CLARITY: 100 COHERENCE: 100 VOCABULARY: 80 STRUCTURE: 80"})
    result.append({"role":"user","content":f"{input_text}"})
    message.append({"role":"user","content":f"{input_text}"})
    
    completion = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    temperature=0.7,
    top_p=1,
    max_tokens=256,
    messages=message
    )
    
    completion2 = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    temperature=0.7,
    messages=result
    )

    #점수 추출
    result_text = json.dumps(completion2.choices[0].message["content"]).replace('"', '') 
    scores = re.findall(r'\d+', result_text)  

    #점수 db에 넣기(누적해서)
    if len(scores) == 5: 
        user.gra_score += float(scores[0])
        user.cla_score += float(scores[1])
        user.coh_score += float(scores[2])
        user.voc_score += float(scores[3])
        user.str_score += float(scores[4])
        
        total_score.gra_score += float(scores[0])
        total_score.cla_score += float(scores[1])
        total_score.coh_score += float(scores[2])
        total_score.voc_score += float(scores[3])
        total_score.str_score += float(scores[4])
        db.session.commit()  
    ########################################
    print(result)
    print(completion2)

    response_dict = {
        "text":  json.dumps(completion.choices[0].message["content"]).replace('"', ''), # 채팅 메세지
        "other_results": json.dumps(completion2.choices[0].message["content"]).replace('"', '') # 나머지 결과 값
        }
    print(completion["usage"])

    return jsonify(response_dict)   

def transcribe_speech(audio_data):
    client = speech.SpeechClient()
    audio = types.RecognitionAudio(content=audio_data)

    config = types.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.ENCODING_UNSPECIFIED,
        sample_rate_hertz=48000,
        language_code='en-US',
        enable_automatic_punctuation=True
    )

    response = client.recognize(config=config, audio=audio)

    if not response.results:
        return "", "No transcription found. Response: " + str(response)

    transcript = response.results[0].alternatives[0].transcript
    return transcript, ""

@app.route('/topic_recommand', methods = ['GET'])
def topic_recommand():
    topics = sub_recommend(model)
    
    print("토픽전송")
    
    return jsonify(topics)

def sub_recommend(model):
    b = ' '.join([item['content'] for item in message if item['role'] == 'user'])
    predictions = model.predict([b])[0]
    dict1 = {0:"Space", 1:"Politics", 2:"Sport", 3:"Technology", 4:"Historical", 5:"Medical", 6:"Graphics", 7:"Entertainment", 8:"Food", 9:"Business"}
    top3_indices = predictions.argsort()[-3:][::-1]
    topics = [dict1[i] for i in top3_indices]
    
    return topics



@app.route('/get_wordcloud', methods=['GET'])
def get_wordcloud():
    b = ' '.join([item['content'] for item in message if item['role'] == 'user'])
    text = b
    document_column = "select subject"  # 여기서 select subject는 사용자가 선택한 주제 사용자 분석시 모든 대화결과 들어가야함
    text = pd.Series(text.lower().split())
    word_lengths = text.apply(len)
    long_words = text[word_lengths >= 6]

    num_words_to_visualize = 100
    wordcloud = WordCloud(width=800, height=400, max_words=num_words_to_visualize, background_color='white').generate_from_frequencies(long_words.value_counts())
    word_counts = text.value_counts()
    word_counts = word_counts[word_counts.index.str.len() >= 6].sort_values(ascending=False)

    num_words_to_visualize = 20
    # Display the wordcloud
    fig = plt.figure(figsize=(5, 3))
    fig.imshow(wordcloud, interpolation='bilinear')
    fig.axis('off')

    # Convert plot to PNG image
    png_image = io.BytesIO()
    FigureCanvas(fig).print_png(png_image)

    # Encode PNG image to base64 string
    png_image_b64_string = "data:image/png;base64,"
    png_image_b64_string += base64.b64encode(png_image.getvalue()).decode('utf8')

    return jsonify({'image': png_image_b64_string})


@app.route('/transcribe', methods=['POST'])
def transcribe():
    audio_file = request.files['audio_file']
    audio_data = audio_file.read()
    transcript, error_message = transcribe_speech(audio_data)

    if error_message:
        print("Error:", error_message)
        return jsonify({'error': error_message})

    print("Transcript:", transcript)
    return jsonify({'transcript': transcript, 'input_text': transcript})

    

# 토큰을 이용해서 사용자 email 얻기
@app.route('/get_email', methods=['POST'])
def get_email():
    token = request.json.get('token')
    if not token:
        return jsonify({'error': 'Token not provided'}), 400

    user_email = get_email_from_token(token)

    if 'expired' in user_email or 'Invalid' in user_email:
        return jsonify({'error': user_email}), 401

    print("Email extracted from token: ", user_email)

    return jsonify({'email': user_email})
def get_email_from_token(token):
    try:
        # Verify JWT token
        decoded = jwt.decode(token, '78s97df4g75fg68hfsd987fhsdf879hsd786fh4s', algorithms=['HS256'])
        # Extract user email and return
        return decoded.get('sub')  # 'sub' is where we stored the user email in the token
    except jwt.ExpiredSignatureError:
        return 'Signature expired. Please log in again.'
    except jwt.InvalidTokenError:
        return 'Invalid token. Please log in again.'


class User(db.Model):
    
    __tablename__ = 'user'

    id = db.Column(db.BigInteger, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    gra_score = db.Column(db.Float)
    cla_score = db.Column(db.Float)
    coh_score = db.Column(db.Float)
    voc_score = db.Column(db.Float)
    str_score = db.Column(db.Float)
    count = db.Column(db.Integer, default=0)
    #chat_text = db.Column(db.String(5000))``
    reco_sub1 = db.Column(db.String(255))
    reco_sub2 = db.Column(db.String(255))
    reco_sub3 = db.Column(db.String(255))
    role = db.Column(db.String(255), nullable=False, default="ROLE_USER")


    
class TotalScore(db.Model):
    __tablename__ = 'total_score'

    id = db.Column(db.BigInteger, primary_key=True)
    gra_score = db.Column(db.Float)
    cla_score = db.Column(db.Float)
    coh_score = db.Column(db.Float)
    voc_score = db.Column(db.Float)
    str_score = db.Column(db.Float)
    count = db.Column(db.Integer, default=0)


#score 비교 분석
@app.route('/analyze', methods=['POST'])
def plot_scores():
    token = request.json.get('token')
    user_email = get_email_from_token(token)
    user = User.query.filter_by(email=user_email).first()
    total_score = TotalScore.query.first()
    if not user or not total_score:
        return jsonify({'error': 'User or total score not found'}), 404

    # 로그인 한 유저 점수 계산
    user_scores = np.array([
        user.gra_score / user.count,
        user.cla_score / user.count,
        user.coh_score / user.count,
        user.voc_score / user.count,
        user.str_score / user.count
    ])
    

    # 사용자 평균 점수 계산
    total_scores = np.array([
        total_score.gra_score / total_score.count,
        total_score.cla_score / total_score.count,
        total_score.coh_score / total_score.count,
        total_score.voc_score / total_score.count,
        total_score.str_score / total_score.count
    ])

    labels = np.array(['Grammar', 'Clarity', 'Coherence', 'Vocabulary', 'Structure'])

    # Compute angle for each axis
    angles = np.linspace(0, 2 * np.pi, len(labels), endpoint=False).tolist()

    # Create plot
    fig, ax = plt.subplots(figsize=(6, 6), subplot_kw=dict(polar=True))
    ax.fill(angles, user_scores, color='red', alpha=0.25, label='You')
    ax.fill(angles, total_scores, color='blue', alpha=0.25, label='Average')
    ax.set_yticklabels([])
    ax.set_thetagrids(np.degrees(angles), labels)
    ax.set_ylim(0, 100)  # Set the limit to 100
    ax.legend(loc='lower right')

    # Add scores to the plot
    for i, label in enumerate(labels):
        ax.text(angles[i], user_scores[i], f'{user_scores[i]:.2f}', ha='center', va='bottom')
        ax.text(angles[i], total_scores[i], f'{total_scores[i]:.2f}', ha='center', va='bottom')
       
    # Convert plot to PNG image
    png_image = io.BytesIO()
    FigureCanvas(fig).print_png(png_image)

    # Encode PNG image to base64 string
    png_image_b64_string = "data:image/png;base64,"
    png_image_b64_string += base64.b64encode(png_image.getvalue()).decode('utf8')

    return jsonify({'image': png_image_b64_string})



if __name__ == '__main__':
    app.run(debug = False)