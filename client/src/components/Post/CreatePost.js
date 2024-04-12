import React, { useState } from 'react'
import {useNavigate } from "react-router-dom";
import Loader from '../Common/Loader';
import './Post.css';
const CreatePost = () => {
    const navigate = useNavigate();
    const createPostApi = "http://127.0.0.1:3001/api/posts"
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [post, setPost] = useState({
        name: "",
        quantity: "",
        price: ""
    })

    const handelInput = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        console.log(name, value)
        setPost({ ...post, [name]: value });
    }

    const handelSubmit = async (event) => {
        event.preventDefault();
        console.log(post)
        try {
            setIsLoading(true);
            const response = await fetch(createPostApi, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(post),
            });

            if (response.ok) {
                console.log('Form submitted successfully!');
                setPost({name: "",quantity: "",price: ""});
                navigate("/api/posts");
            } else {
                console.error('Form submission failed!');
            }

        } catch (error) {
            setError(error.message);
        } finally{
            setIsLoading(false);
        }
    }

    return (
        <div className='user-form'>
            <div className='heading'>
            {isLoading && <Loader />}
            {error && <p>Error: {error}</p>}
                <p>Post Form</p>
            </div>
            <form onSubmit={handelSubmit}>
                <div className="mb-3">
                    <label for="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={post.title} onChange={handelInput} />
                </div>
                <div className="mb-3 mt-3">
                    <label for="content" className="form-label">Content</label>
                    <textarea type="content" className="form-control" id="content" name="content" value={post.content} onChange={handelInput} />
                </div>
                <div className="mb-3">
                    <label for="author" className="form-label">Author</label>
                    <input type="text" className="form-control" id="author" name="author" value={post.author} onChange={handelInput} />
                </div>
                <button type="submit" className="btn btn-primary submit-btn">Submit</button>
            </form>
        </div>
    )
}

export default CreatePost