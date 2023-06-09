import React, { useState, useEffect } from "react";
import { recordAudio } from "./recordAudio";
import SttRoom from "../components/SttRoom";
import { useLocation } from "react-router-dom";
import "./ChatSpeak.css";
import axios from "axios";
import Modal from "./Modal";
import RecommandedTopic from "../components/RecommandedTopic";

export default function Speak() {
  const {
    state: { topic, emoticon }, // topic 값 추출
  } = useLocation();

  const [recorder, setRecorder] = useState(null);
  const [wordcloudImageUrl, setWordcloudImageUrl]= useState(null);
  const [isLoading,setIsLoading]= useState(true);
  const [recommandedTopics, setRecommandedTopics] = useState([]);
  const startRecording = async () => {
  
  const newRecorder = await recordAudio();
    newRecorder.start();
    setRecorder(newRecorder);
  };

  const stopRecording = async () => {
    if (recorder) {
      const audio = await recorder.stop();
      return handleRecordingStopped(audio.audioBlob);
    }
    return "";
  };

  const handleRecordingStopped = async (audioBlob) => {
    const formData = new FormData();
    formData.append("audio_file", audioBlob);

    try {
      const response = await fetch("http://localhost:5000/transcribe", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        if (data.error) {
          console.error("Error: " + data.error);
        } else {
          const transcript = data.transcript;
          console.log("Transcript received:", transcript);
          return transcript;
        }
      } else {
        console.error("Failed to fetch the transcript");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    return "";
  };
  const [showModal, setShowModal] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const getImageUrl = (imageData) => {
    const blob = new Blob([imageData], { type: "image/png" });
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
  };

  const changeTopic = (newTopic) => {
    console.log("New Topic:", newTopic);
  };

  useEffect(() => {
    const fetchWordcloudImageUrl = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/get_wordcloud",
          { responseType: "blob" } // Receive image data as blob
        );
        const imageUrl = getImageUrl(response.data);
        setWordcloudImageUrl(imageUrl);
      } catch (error) {
        console.error(error);
      }
    };

    if (showModal) {
      fetchWordcloudImageUrl();
    }
  }, [showModal]);

  useEffect(() => {
    const fetchRecommandedTopics = async () => {
      try {
        const response = await axios.get("http://localhost:5000/topic_recommand");
        setRecommandedTopics(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    if (showModal) {
      fetchRecommandedTopics();
    }
  }, [showModal]);

  return (
    <div>
      <div className="ChatSpeakText">
        <div className="TextColor">SPEAK</div>Topic or Situation :{topic}{" "}
        {emoticon}
      </div>
      <br></br>
      <SttRoom
        startRecording={startRecording}
        stopRecording={stopRecording}
        openModal={openModal}
        setShowModal={setShowModal}
      />
      {showModal && (
        <Modal closeModal={closeModal}> 
          <div className="ImageContainer">
          {imageUrl ? (
            <img
            src={wordcloudImageUrl}
            alt="Wordcloud"
            className="WordcloudImage"
             />
          ) : (
            <p>Loading image...</p>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}