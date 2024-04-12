import "./App.css";
import CreatePost from "./components/Post/CreatePost";
import ShowPost from "./components/Post/ShowPost";
import { Route, Routes, Navigate } from "react-router-dom";
import EditPost from "./components/Post/EditPost";
import Post from "./components/Post/Post";
import Header from "./components/Common/Header";
import Home from "./components/Layout/Home";
import Login from "./components/Auth/Login";
import Registration from "./components/Auth/Registration";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <header className="container">
        <div className="">
          {!isLoggedIn ? (
            <Routes>
              <Route path="/" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
              <Route path="/registration" element={<Registration onRegistration={() => setIsLoggedIn(true)} />} />
            </Routes>
          ) : (
            <>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/api/posts/edit/:id" element={<EditPost />} />
                <Route path="/api/posts/show/:id" element={<Post />} />
                <Route path="/api/posts/create" element={<CreatePost />} />
                <Route path="/api/posts" element={<ShowPost />} />
              </Routes>
            </>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;