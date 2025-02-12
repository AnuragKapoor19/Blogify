"use client";

import BlogCard from "@/components/BlogCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header"
import Pagination from "@/components/Pagination";
import axios from "axios"
import { useEffect, useState } from "react"

export default function Blogs({ params }) {
    const [blogs, setblogs] = useState([])
    const [totalPages, settotalPages] = useState();
    const [loading, setloading] = useState(true)
    const [cat, setcat] = useState('');

    const getBlogs = async () => {
        try {
            const { category } = await params
            const { data } = await axios.get(`http://localhost:5000/api/v1/blogs/?category=${category}`)

            if (!data.success) {
                return console.log(data.message);
            }

            setcat(category)
            setblogs(data.blogs)
            settotalPages(data.totalPages)
            setloading(false)
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getBlogs();
    }, [totalPages])

    return (
        <>
            <Header />
            <div className="blogs-container m-4">
                <h3 style={{ fontFamily: 'cursive' }}>Insights & Inspiration</h3>
                {loading
                    ? <h4>Loading...</h4>
                    :
                    <>
                        <span className="fs-5">Discover the best of {cat} with expert insights and trends.</span>
                        <div className="row card-container">
                            {
                                blogs.map((blog, index) => (
                                    <BlogCard blog={blog} key={index} />
                                ))
                            }
                        </div>
                    </>
                }
            </div>
            <Pagination pages={totalPages} />
            <Footer />
        </>
    )
}
