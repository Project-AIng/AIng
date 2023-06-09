import pandas
import numpy as np
import matplotlib.pyplot as plt
import tensorflow as tf
import tensorflow_hub as hub
import tensorflow_text as text
import pandas as pd
from wordcloud import WordCloud
import tokenization
from keras.utils import to_categorical
from sklearn import preprocessing
from sklearn.model_selection import train_test_split

from nltk.corpus import stopwords
import nltk
nltk.download('stopwords')
stop_words = stopwords.words('english')
prt = nltk.stem.PorterStemmer()

nltk.download('punkt')

def preprocess(document_path):
    document = document_path
    
    tokens = nltk.word_tokenize(document)

    tokens_pun_lower = [i.lower() for i in tokens if i.isalnum()]

    tokens_stop = [i for i in tokens_pun_lower if i not in stop_words]

    terms = [prt.stem(i) for i in tokens_stop]
    
    return " ".join(terms)

import numpy as np # linear algebra
import pandas as pd # data processing,

import os
Data = []
folder_path = "C:\\Users\\82108\\Desktop\\dataset"

for filename in os.listdir(folder_path):
    if filename.endswith(".txt"):
        with open(os.path.join(folder_path, filename), 'r', encoding = 'utf-8') as file:
            document = file.read()

        doc_class = filename.split('_')[0].lower()
        doc_titles = filename
        
        documents = preprocess(document)
        Data.append([doc_titles, documents, doc_class])

df = pd.DataFrame (Data, columns = ['Title', 'Document', 'Class'])
df['Class'] = pd.factorize(df['Class'])[0]

df_s = df.sample(frac = 1, ignore_index = True)
X = df_s['Document']
y = to_categorical(df_s['Class'])
rand_idx = np.random.randint(0,100)

from sklearn.model_selection import StratifiedShuffleSplit

class_balanced_X = []
class_balanced_y = []

num_samples_per_class = 700 # 각 클래스당 1000개의 샘플을 사용하려면

# 각 클래스별로 데이터를 추출하여 class_balanced_X와 class_balanced_y에 추가
for class_label in range(10):
    # 클래스 레이블에 해당하는 인덱스 가져오기
    indices = np.where(y == class_label)[0]
    # 데이터 추출
    class_samples = X[indices[:num_samples_per_class]]
    class_labels = y[indices[:num_samples_per_class]]
    # 결과에 추가
    class_balanced_X.extend(class_samples)
    class_balanced_y.extend(class_labels)


sss = StratifiedShuffleSplit(n_splits=1, test_size=0.25, random_state=42)
train_indices, test_indices = next(sss.split(class_balanced_X, class_balanced_y))

X_train = np.array(class_balanced_X)[train_indices]
y_train = np.array(class_balanced_y)[train_indices]
X_test = np.array(class_balanced_X)[test_indices]
y_test = np.array(class_balanced_y)[test_indices]

bert_preprocess = hub.KerasLayer("https://tfhub.dev/tensorflow/bert_en_uncased_preprocess/3")
bert_encoder = hub.KerasLayer("https://tfhub.dev/tensorflow/bert_en_uncased_L-12_H-768_A-12/4")

def get_sentence_embeding(sentences):
    preprocessed_text = bert_preprocess(sentences)
    return bert_encoder(preprocessed_text)['pooled_output']

text_input = tf.keras.layers.Input(shape=(), dtype=tf.string, name='text')
preprocessed_text = bert_preprocess(text_input)
outputs = bert_encoder(preprocessed_text)

# Neural network layers
l = tf.keras.layers.Dropout(0.1, name="dropout")(outputs['pooled_output'])
l = tf.keras.layers.Dense(120, activation='relu')(l)
l = tf.keras.layers.Dense(320, activation='relu')(l)
l = tf.keras.layers.Dense(10, activation='softmax', name="output")(l)

# Use inputs and outputs to construct a final model
model = tf.keras.Model(inputs=[text_input], outputs = [l])

METRICS = [
      tf.keras.metrics.BinaryAccuracy(name='accuracy'),
      tf.keras.metrics.Precision(name='precision'),
      tf.keras.metrics.Recall(name='recall')
]

model.compile(optimizer='adam',
              loss='categorical_crossentropy',
              metrics=METRICS)

model.fit(X_train, y_train, epochs=35)

import tensorflow as tf

# 모델 저장
model.save("model.h5")
