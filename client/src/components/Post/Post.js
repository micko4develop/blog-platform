import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Post.css";
const EditPost = () => {
  const [post, setPost] = useState([]);
  const { id } = useParams();
  const getPostApi = "http://127.0.0.1:3001/api/posts";

  useEffect(() => {
    getPost();
  }, []);

  const getPost = () => {
    axios
      .get(getPostApi.concat("/") + id)
      .then((item) => {
        setPost(item.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="user mt-5">
      <table className="table table-bordered">
    <thead>
      <tr>
        <th>Field</th>
        <th>Value</th>
        
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Title</td>
        <td>{post.title}</td>
      </tr>
      <tr>
        <td>Content</td>
        <td>{post.content}</td>
      </tr>
      <tr>
        <td>Author</td>
        <td>{post.author}</td>
      </tr>
    </tbody>
  </table>
    </div>
  );
};
export default EditPost;
