"use client";

import BlogCard from "@/components/BlogCard"
import Footer from "@/components/Footer";
import Header from "@/components/Header"
import { useContextState } from "@/contextApi";
import axios from "axios"
import { useEffect, useState } from "react"

function Home() {
  const [blogs, setblogs] = useState([]);
  const [loading, setloading] = useState(true);
  const { setUser, setAuthenticated, user, authenticated } = useContextState();

  const getBlogs = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/v1/blogs')

      if (!data.success) {
        console.log('Please try again later!')
      }

      setblogs(data.blogs)
      setloading(false)


    } catch (error) {
      console.log(error.message)
    }
  }

  const getUser = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/v1/me', { withCredentials: true })

      if (!data.success) {
        return console.log(data.message);
      }

      setUser(data.user)
      setAuthenticated(true)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getBlogs();
    getUser();
  }, [])

  useEffect(() => {
    getUser();
  }, [])

  return (
    <>
      <Header />
      <div className="blogs-container m-4">
        <h1 className="fw-bold">Blog</h1>
        <span className="fs-5">Here, we share travel tips, destination guides, and stories that inspire your next adventure.</span>
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

export default Home