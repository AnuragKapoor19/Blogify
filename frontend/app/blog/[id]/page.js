"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function BlogPage({ params }) {
    const [blog, setBlog] = useState();
    const [loading, setLoading] = useState(true);
    const [likes, setLikes] = useState(0);
    const [comments, setComments] = useState([]);
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

    const handleLike = () => {
        setLikes(likes + 1);
    };

    const handleAddComment = () => {
        if (newComment.trim()) {
            setComments([...comments, newComment]);
            setNewComment('');
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
                                <button className="btn btn-primary" onClick={handleLike}>
                                    Like ({likes})
                                </button>
                                
                                {/* Comment Section */}
                                <div className="mt-4">
                                    <h4>Comments</h4>
                                    <ul className="list-group mb-3">
                                        {comments.map((comment, index) => (
                                            <li key={index} className="list-group-item">
                                                {comment}
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
