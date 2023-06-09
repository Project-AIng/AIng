import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Room from "../components/Room";
import "./ChatSpeak.css";
import axios from "axios";
import Modal from "./Modal";

export default function Interview() {
  const {
    state: { topic, emoticon }, // topic 값 추출
  } = useLocation();

  const [showModal, setShowModal] = useState(false);
  const [wordcloudImageUrl, setWordcloudImageUrl] = useState(null);
  const [recommandedTopics, setRecommandedTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
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

  const getImageUrl = (imageData) => {
    const blob = new Blob([imageData], { type: "image/png" });
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
  };

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
        <div className="TextColor">Chat</div>
        Topic or Situation: {topic} {emoticon} 
      </div>
      <br />
      <Room
        openModal={openModal}
        setShowModal={setShowModal}
        changeTopic={changeTopic}
      />
      {showModal && (
        <Modal closeModal={closeModal} recommandedTopics={recommandedTopics} isLoading={isLoading}>
          <div className="ImageContainer">
            {wordcloudImageUrl ? (
              <img
                src={wordcloudImageUrl}
                alt="Wordcloud"
                className="WordcloudImage"
              />
            ) : (
              <p>Loading wordcloud image...</p>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
