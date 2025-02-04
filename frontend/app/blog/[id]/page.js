"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FcLike, FcLikePlaceholder } from "react-icons/fc";

export default function BlogPage({ params }) {
    const [blog, setBlog] = useState();
    const [loading, setLoading] = useState(true);
    const [liked, setliked] = useState(false)
    const [newComment, setNewComment] = useState('');

    const getBlog = async () => {
        const { id } = await params;
        setLoading(true);
        const { data } = await axios.get(`http://localhost:5000/api/v1/blog/${id}`);

        if (!data.success) {
            return console.log(data.message);
        }

        setBlog(data.blog);
        setLoading(false);
    };

    useEffect(() => {
        getBlog();
    }, []);

    const handleLike = async () => {
        if (liked === false) {
            await setliked(true);
            try {
                const { data } = await axios.put(`http://localhost:5000/api/v1/blog/like/${blog._id}`, {}, { withCredentials: true, headers: { "Content-Type": "application/json" } })

                if (!data.success) {
                    return console.log(data.message);
                }

                getBlog();
            } catch (error) {
                console.log(error.message);
            }
        }
        else {
            alert("You have already liked this blog!")
        }
    };

    const handleAddComment = async () => {
        try {
            const { data } = await axios.put(`http://localhost:5000/api/v1/blog/${blog._id}`, { comment: newComment }, { withCredentials: true, headers: { "Content-Type": "application/json" } })

            if (!data.success) {
                return console.log(data.message);
            }

            alert(data.message)
            getBlog();
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
            <Header />
            {loading ? (
                <h3>Loading...</h3>
            ) : (
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="card p-5 shadow-lg border-0">
                                <h1 className="mb-4 text-center">{blog.title}</h1>
                                <p className="text-muted text-center">
                                    By {blog.author.name} |{' '}
                                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                        hour: "numeric",
                                        minute: "2-digit",
                                        hour12: true,
                                    })}
                                </p>
                                <div className='p-0' style={{ position: 'relative' }}>
                                    <img src={blog.image.url} alt="Blog banner" className="img-fluid rounded mb-4 w-100" style={{ maxHeight: '600px' }} />
                                    <h5 className='bg-light p-2 fw-bold rounded' style={{ position: 'absolute', top: '1%', left: '1%' }}>{blog.category}</h5>
                                </div>
                                <p className="lead">{blog.content}</p>

                                {/* Like Button */}
                                <div onClick={handleLike} className='d-flex align-items-center'>
                                    {liked
                                        ? <FcLike size={35} style={{ cursor: 'pointer' }} />
                                        : <FcLikePlaceholder size={35} style={{ cursor: 'pointer' }} />
                                    }
                                    ({blog.likes})
                                </div>

                                {/* Comment Section */}
                                <div className="mt-4">
                                    <h4>Comments</h4>
                                    <ul className="list-group mb-3">
                                        {blog.comments.map((comment, index) => (
                                            <li key={index} className="list-group-item d-flex align-items-center">
                                                <img className='rounded-circle' src={comment.user.avatar.url} alt='avatar' height={45} width={45} />
                                                <span className='fw-bold ms-3 fs-5'>{comment.comment}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Write a comment..."
                                            value={newComment}
                                            onChange={(e) => setNewComment(e.target.value)}
                                        />
                                        <button className="btn btn-success" onClick={handleAddComment}>
                                            Add Comment
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer with Related Posts */}
                    <div className="mt-5 text-center">
                        <h3>Related Posts</h3>
                        <div className="row justify-content-center">
                            <div className="col-md-4">
                                <div className="card p-4 shadow-sm border-0">
                                    <h5>Understanding React Server Components</h5>
                                    <p className="text-muted">By Jane Smith</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card p-4 shadow-sm border-0">
                                    <h5>How Next.js Improves Performance</h5>
                                    <p className="text-muted">By Alex Brown</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </>
    );
}
