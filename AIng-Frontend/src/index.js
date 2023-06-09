import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Speak from './pages/Speak';
import Chat from './pages/Chat';
import TopicChoice from './pages/TopicChoice';
import Signup from './pages/Signup';
import Login from './pages/Login';
import MyPage from './pages/Mypage'; 
import MypageMenu from './components/MypageMenu';
import AIngGuide from './pages/AIngGuide';
import Deep from './pages/Deep';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: '/Speak', element: <Speak /> },
      { path: '/TopicChoice', element: <TopicChoice /> },
      { path: '/AIngGuide', element: <AIngGuide /> },
      { path: '/Signup', element: <Signup /> },
      { path: '/Login', element: <Login /> },
      { path: '/Chat', element: <Chat /> },
      { path: '/MypageMenu', element: <MypageMenu />,
      children:[
        {
          path:'/MypageMenu/MyPage', element: <MyPage />,
        },
        {
          path:'/MypageMenu/Deep', element: <Deep />,
        },
      ] },
  
      ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
