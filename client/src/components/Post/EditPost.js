import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import Loader from "../Common/Loader";
import "./Post.css";
const EditPost = () => {
  const [post, setPost] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const getPostApi = "http://127.0.0.1:3001/api/posts";

  const cookies = new Cookies();
  const cookieValue = cookies.get('token');

  useEffect(() => {
    getPost();
  }, []);

  const getPost = () => {
    axios
      .get(getPostApi.concat("/") + id , {
        //withCredentials: true,
        mode: 'cors',
        headers: {
          'Cookie': cookieValue
        }
    })
      .then((item) => {
        setPost(item.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handelInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(name, value);
    setPost({ ...post, [name]: value });
  };

  const handelSubmit = (e) => {
    e.preventDefault();

    fetch(getPostApi.concat("/") + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setIsLoading(true);
        navigate("/api/posts");
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      })
  };

  return (
    <div className="user-form">
      <div className="heading">
      {isLoading && <Loader />}
      {error && <p>Error: {error}</p>}
        <p>Edit Form</p>
      </div>
      <form onSubmit={handelSubmit}>
        <div className="mb-3">
          <label for="name" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={post.title}
            onChange={handelInput}
          />
        </div>
        <div className="mb-3 mt-3">
          <label for="quantity" className="form-label">
            Content
          </label>
          <textarea
            type="emquantityail"
            className="form-control"
            id="emquantityail"
            name="content"
            value={post.content}
            onChange={handelInput}
          />
        </div>
        <div className="mb-3">
          <label for="pwd" className="form-label">
            Author
          </label>
          <input
            type="text"
            className="form-control"
            id="price"
            name="author"
            value={post.author}
            onChange={handelInput}
          />
        </div>
        <div className="mb-3">
          <label for="pwd" className="form-label">
          Creation Date
          </label>
          <input disabled
            type="text"
            className="form-control"
            id="price"
            name="creationDate"
            value= {new Date(post.creationDate).toLocaleString("rs-RS", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            }).replace(",", ".").replace(/\//g, ".")}
            onChange={handelInput}
          />
        </div>
        <button type="submit" className="btn btn-primary submit-btn">
          EDIT
        </button>
      </form>
    </div>
  );
};
export default EditPost;
