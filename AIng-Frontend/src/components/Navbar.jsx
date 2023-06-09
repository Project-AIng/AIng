import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await axios.get("http://localhost:8080/mypage", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem("auth_token");
      alert("로그아웃 완료.");
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <header className="flex justify-between p-2 border-b border-zinc-300">
        <section className="flex gap-6">
          {user && (
            <div className="StudyGo">
              <Link to="/TopicChoice">Study Go</Link>
            </div>
          )}
          <div className="AIngIntro">
            <Link to="/AIngGuide">AIng 소개</Link>
          </div>
        </section>

        <div>
          <Link to="/">
            <h1 className="AIng-text">AIng</h1>
          </Link>
        </div>

        <div className="flex justify-end space-x-3 font-semibold p-5 px-3 ">
          {user ? (
            <>
              <div className="LogSign-container">
                <Link to="/MypageMenu/MyPage">
                  <button className="LogSign-text">{user.name}님</button>
                  <span className="line"></span>
                </Link>
                <button className="LogSign-text" onClick={handleLogout}>
                  로그아웃
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="LogSign-container">
                <Link to="/signup">
                  <button className="LogSign-text">회원가입</button>
                  <span className="line"></span>
                </Link>
                <Link to="/login">
                  <button className="LogSign-text">로그인</button>
                </Link>
              </div>
            </>
          )}
        </div>
      </header>
    </>
  );
}
