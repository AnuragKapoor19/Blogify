"use client";

import BlogCard from "@/components/BlogCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header"
import axios from "axios"
import { useEffect, useState } from "react"

export default function Blogs({ params }) {
    const [blogs, setblogs] = useState([])
    const [loading, setloading] = useState(true)

    const getBlogs = async () => {
        try {
            const { category } = await params
            const { data } = await axios.get(`http://localhost:5000/api/v1/blogs/?category=${category}`)

            if (!data.success) {
                return console.log(data.message);
            }

            setblogs(data.blogs)
            setloading(false)
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getBlogs();
    }, [])

    return (
        <>
            <Header />
            <div className="blogs-container m-4">
                <h1 className="fw-bold">Blog</h1>
                {/* <span className="fs-5">Discover the best of {category} with expert insights and trends.</span> */}
                <div className="row card-container">
                    {loading
                        ? <h4>Loading...</h4>
                        :
                        blogs.map((blog, index) => (
                            <BlogCard blog={blog} key={index} />
                        ))
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}
