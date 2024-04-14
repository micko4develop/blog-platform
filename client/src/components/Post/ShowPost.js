import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'universal-cookie';
import { Link } from "react-router-dom";
import Loader from "../Common/Loader";


const ShowPost = () => {
  const showPostsApi = "http://127.0.0.1:3001/api/posts";

  const cookies = new Cookies();
  const cookieValue = cookies.get('token');

  //console.log(cookieValue)

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");

  const totalPosts = posts.length * 5;

  const handlePageChange = (page) => {
    setCurrentPage(page);
    getPosts(page);
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(showPostsApi.concat("/") + id, {
        method: "DELETE",
        headers: {
          'Cookie': cookieValue
        }
      });
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      setPosts(posts.filter((item) => item._id !== id));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

 /* const getPosts = (page) => {

    axios
      .get(showPostsApi + `?page=${page}&search=${searchTerm}` , {
        //withCredentials: true,
        mode: 'cors',
        headers: {
          'Cookie': cookieValue
        }
    })
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
*/

const getPosts = (page) => {
  axios
    .get(showPostsApi + `?page=${page}&search=${searchTerm}&token=${cookieValue}`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Cookie': 'token='+cookieValue, // Replace 'cookieName' and 'cookieValue' with your actual cookie data
      },
      body: JSON.stringify({'token': cookieValue})
    })
    .then((res) => {
      setPosts(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};


  useEffect(() => {
    getPosts(currentPage);
  }, [currentPage, searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  if (posts.length === 0) {
    return <h1>No posts found</h1>;
  } else {
    return (
      <div className="mt-5">
        {isLoading && <Loader />}
        {error && <p>Error: {error}</p>}
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={handleSearch}
        /><br /><br />
        <table className="table table-striped">
          <thead>
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Content</th>
              <th>Author</th>
              <th>Creation Date</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((item, i) => (
              <tr key={((currentPage - 1) * 5) + i + 1}>
                <td>{((currentPage - 1) * 5) + i + 1}</td>
                <td>{item.title}</td>
                <td>{item.content}</td>
                <td>{item.author}</td>
                <td>
                  {new Date(item.creationDate).toLocaleString("rs-RS", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  }).replace(",", ".").replace(/\//g, ".")}
                </td>
                <td>
                  <Link to={`/api/posts/edit/${item._id}`}>
                    <i className="fa fa-pencil" aria-hidden="true" />
                  </Link>
                  <Link to={`/api/posts/show/${item._id}`}>
                    <i className="fa fa-eye" aria-hidden="true" />
                  </Link>
                  <i
                    className="fa fa-trash-o"
                    aria-hidden="true"
                    onClick={() => handleDelete(item._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={totalPosts === 0 || ((currentPage * 5) >= totalPosts)}>
            Next
          </button>
        </div>
      </div>
    );
  }
};

export default ShowPost;