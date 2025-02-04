"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function BlogPage({ params }) {
    const [blog, setblog] = useState();
    const [loading, setloading] = useState(true)

    const getBlog = async () => {
        const { id } = await params
        setloading(true)
        const { data } = await axios.get(`http://localhost:5000/api/v1/blog/${id}`)

        if (!data.success) {
            return console.log(data.message);
        }

        setblog(data.blog)
        setloading(false)
    }

    useEffect(() => {
        getBlog();
    }, [])

    return (
        <>
            <Header />
            {loading
                ?
                <h3>Loading...</h3>
                :
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="card p-5 shadow-lg border-0">
                                <h1 className="mb-4 text-center">{blog.title}</h1>
                                <p className="text-muted text-center">By {blog.author.name} | {new Date(blog.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "2-digit",
                                    hour12: true,
                                })}</p>
                                <img src={blog.image.url} alt="Blog banner" className="img-fluid rounded mb-4" style={{ maxHeight: '600px' }} />
                                <p className="lead">{blog.content}</p>
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
            }
            <Footer />
        </>
    );
}
