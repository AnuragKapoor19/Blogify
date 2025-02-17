"use client";

import BlogCard from "@/components/BlogCard"
import Footer from "@/components/Footer";
import Header from "@/components/Header"
import Pagination from "@/components/Pagination";
import { useContextState } from "@/contextApi";
import axios from "axios"
import { useEffect, useState } from "react"

function Home() {
  const [blogs, setblogs] = useState([]);
  const [loading, setloading] = useState(true);
  const [totalPages, settotalPages] = useState();
  const { setUser, setAuthenticated, search, currentPage } = useContextState();

  const getBlogs = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/v1/blogs`, {
        params: { search, page: currentPage }
      })

      if (!data.success) {
        console.log('Please try again later!')
      }

      setblogs(data.blogs)
      settotalPages(data.totalPages)
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
  }, [search, currentPage])

  useEffect(() => {
    getUser();
  }, [])

  return (
    <>
      <Header />
      <div className="blogs-container m-4">
        <h3 style={{fontFamily: 'cursive'}}>Insights & Inspiration</h3>
        <span className="fs-5 fst-italic">Here, we share travel tips, destination guides, and stories that inspire your next adventure.</span>
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
      <Pagination pages={totalPages} />
      <Footer />
    </>
  )
}

export default Home