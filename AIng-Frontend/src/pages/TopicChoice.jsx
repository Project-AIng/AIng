import React, { useEffect } from "react";
import Topic from "../components/Topic";
import "./TopicChoice.css";
import { useNavigate } from "react-router-dom";

export default function TopicChoice() {
  const navigate = useNavigate();

  useEffect(() => {
    // 사용자가 로그인되어 있는지 확인하는 함수
    const checkLoggedIn = () => {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        alert("로그인이 필요합니다. 로그인해주세요.");
        navigate("/login"); // 로그인 페이지로 이동
      }
    };

    checkLoggedIn();
  }, [navigate]);

  return (
    <>
      <h1>어떤 주제로 대화할까요?</h1>
      <div className="TopicChoiceContainer">
        <Topic id="1" topic="Business" emoticon="🧑🏻‍💼" />
        <Topic id="2" topic="Entertainment" emoticon="🎤" />
        <Topic id="3" topic="Food" emoticon="🍚" />
        <Topic id="4" topic="Graphics" emoticon="🖼️" />
        <Topic id="5" topic="Medical" emoticon="💊" />
        <Topic id="6" topic="Politics" emoticon="👨🏻‍⚖" />
        <Topic id="7" topic="Space" emoticon="🚀" />
        <Topic id="8" topic="Sport" emoticon="🏊🏻" />
        <Topic id="9" topic="Technologie" emoticon="⚡" />
        <Topic id="10" topic="Free Topic" emoticon="🧐" />
      </div>
    </>
  );
}
