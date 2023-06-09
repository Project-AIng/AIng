import React, { useState } from "react";
import "./css/Topic.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Topic({ topic, emoticon }) {
  const navigate = useNavigate();
  const [showComponent, setShowComponent] = useState(false);

  const handleMouseEnter = () => {
    setShowComponent(true);
    }

    const handleMouseLeave = () => {
        setShowComponent(false);
    };

  const handleChatClick = () => {
    axios
      .post("http://localhost:5000/set_topic", { topic })
      .then(() => {
        navigate("/Chat", { state: { topic, emoticon } });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSpeakClick = () => {
    axios
      .post("http://localhost:5000/set_topic", { topic })
      .then(() => {
        navigate("/Speak", { state: { topic,emoticon } });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  return (
    <div className="parentContainer">
      <div
        className="TopicContainer"
        onClick={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {showComponent ? (
          <>
            <div>
            <div onClick={handleSpeakClick}>Speak Go👄</div>
            <br></br>
              <div onClick={handleChatClick}>Chat Go💬</div>
            </div>
          </>
        ) : (
          <>
            <p>{topic}</p>
            <div className="emoticon">{emoticon}</div>
          </>
        )}
      </div>
    </div>
  );
}