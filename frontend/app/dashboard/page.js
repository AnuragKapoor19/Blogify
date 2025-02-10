"use client";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useContextState } from "@/contextApi";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AuthorDashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [blogs, setblogs] = useState([])
  const [totalLikes, settotalLikes] = useState(0)
  const [totalComments, settotalComments] = useState(0)
  const [loading, setloading] = useState(true)
  const [isDeleted, setisDeleted] = useState(false)
  const { authenticated, user } = useContextState();
  const [formData, setformData] = useState({ title: '', content: '', category: '' })
  const [image, setimage] = useState('https://t4.ftcdn.net/jpg/04/81/13/43/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk.jpg')
  const router = useRouter()

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    const reader = new FileReader()

    reader.onload = () => {
      if (reader.readyState === 2) {
        setimage(reader.result)
      }
    }

    reader.readAsDataURL(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/v1/new/blog', { title: formData.title, content: formData.content, category: formData.category, image }, { withCredentials: true, headers: { "Content-Type": "application/json" } })

      if (!data.success) {
        return console.log(data.message);
      }

      alert('Blog added successfully!')
    } catch (error) {
      console.log(error.message);
    }
  }

  const getAuthorBlogs = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/v1/author/blogs', { withCredentials: true })

      if (!data.success) {
        console.log(data.message);
      }

      await setblogs(data.blogs)

      await blogs.map(blog => {
        settotalLikes(Number(blog.likes + totalLikes))
        settotalComments(Number(blog.comments.length + totalComments))
      })

      setloading(false)
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleDelete = async (id) => {
    try {
      setisDeleted(false)
      const { data } = await axios.delete(`http://localhost:5000/api/v1/blog/${id}`, { withCredentials: true })

      if (!data.success) {
        console.log(data.message)
      }

      setisDeleted(true)
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getAuthorBlogs();
  }, [isDeleted])

  const author = {
    name: "John Doe",
    totalPosts: 42,
    totalLikes: 5_678,
    totalComments: 567,
  };

  const recentPosts = [
    { title: "Understanding Next.js", date: "Feb 2, 2025", likes: 230, comments: 12 },
    { title: "The Power of React Hooks", date: "Jan 29, 2025", likes: 185, comments: 8 },
    { title: "Why Bootstrap is Still Relevant", date: "Jan 25, 2025", likes: 210, comments: 15 },
  ];

  return (
    <>
      {authenticated &&
        <>
          <div className="d-flex vh-100">
            {/* Sidebar (Collapsible) */}
            <div
              className={`bg-dark text-white p-4 d-flex flex-column position-fixed vh-100 ${isSidebarOpen ? "d-block" : "d-none d-md-block"
                }`}
              style={{ width: "250px", transition: "0.3s" }}
            >
              <h2 className="mb-4">Dashboard</h2>
              <ul className="nav flex-column">
                <li className="nav-item" data-bs-toggle="modal" data-bs-target="#exampleModal1">
                  <a className="nav-link text-white" style={{ cursor: 'pointer' }}>📜 Blogs</a>
                </li>
                <li className="nav-item" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  <div className="nav-link text-white" style={{ cursor: 'pointer' }}>📝 New Blog</div>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="#">💬 Comments</a>
                </li>
              </ul>
            </div>

            <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModal1Label" aria-hidden="true">
              <div className="modal-dialog modal-fullscreen">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5 fw-bolder" id="exampleModal1Label">Blogs</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <div className="container mt-5">
                      <div className="card p-4 shadow-sm">
                        <h2 className="mb-4">Your Blogs</h2>
                        <div className="container mt-4">
                          <div className="row">
                            {loading
                              ? <h3>Loading...</h3>
                              :
                              blogs.map((blog) => (
                                <div className="col-md-4 mb-4" key={blog._id}>
                                  <div className="card">
                                    <img src={blog.image.url} className="card-img-top" alt='blog' style={{ minHeight: '250px', maxHeight: '250px' }} />
                                    <div className="card-body">
                                      <h5 className="card-title">{blog.title}</h5>
                                      <div className="d-flex justify-content-between">
                                        <button className="btn btn-warning" data-bs-dismiss="modal" onClick={() => router.push(`/dashboard/${blog._id}`)}>
                                          Edit
                                        </button>
                                        <button className="btn btn-danger" onClick={() => handleDelete(blog._id)}>
                                          Delete
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-fullscreen">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5 fw-bolder" id="exampleModalLabel">Add Blog</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <div className="container mt-5">
                      <div className="card p-4 shadow-sm">
                        <h2 className="mb-4">Add New Blog</h2>
                        <form onSubmit={handleSubmit}>
                          <div className="w-100 text-center">
                            <label htmlFor="file-input" className="form-label" style={{ cursor: 'pointer' }}>
                              <img className="rounded-3 relative border border-dark" src={image} alt="blog" height={300} width={460} />
                            </label>
                          </div>

                          <div className="mb-3">
                            <input type="file" id="file-input" className="form-control d-none" accept="image/*" onChange={handleFileChange} required />
                          </div>

                          <div className="mb-3">
                            <label className="form-label">Title</label>
                            <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required />
                          </div>

                          <div className="mb-3">
                            <label className="form-label">Content</label>
                            <textarea className="form-control" name="content" rows="5" value={formData.content} onChange={handleChange} required></textarea>
                          </div>

                          <div className="mb-3">
                            <label className="form-label">Category</label>
                            <select className="form-select" name="category" value={formData.category} onChange={handleChange} required>
                              <option value="">Select Category</option>
                              <option value="Technology">Technology</option>
                              <option value="Productivity">Productivity</option>
                              <option value="Finance">Finance</option>
                              <option value="Health">Health</option>
                              <option value="Travel">Travel</option>
                            </select>
                          </div>

                          <button type="submit" className="btn btn-primary w-100" data-bs-dismiss="modal">Submit</button>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow-1 p-4 bg-light" style={{ marginLeft: "250px", transition: "0.3s" }}>
              {/* Navbar (Mobile) */}
              <button
                className="btn btn-dark d-md-none mb-3"
                onClick={() => setSidebarOpen(!isSidebarOpen)}
              >
                ☰ Menu
              </button>

              {/* Welcome Section */}
              <h1 className="mb-4">Welcome, {user.name} 👋</h1>

              {/* Stats Section */}
              <div className="row g-3">
                {[
                  { title: "Total Posts", value: blogs.length },
                  { title: "Total Likes", value: totalLikes },
                  { title: "Total Comments", value: totalComments },
                ].map((stat, index) => (
                  <div className="col-6 col-md-4" key={index}>
                    <div className="card p-3 text-center shadow-sm">
                      <h5>{stat.title}</h5>
                      <h3>{stat.value}</h3>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Posts Section */}
              <h2 className="mt-5">Recent Posts</h2>
              <div className="card p-3 shadow-sm">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Likes</th>
                        <th>Comments</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentPosts.map((post, index) => (
                        <tr key={index}>
                          <td>{post.title}</td>
                          <td>{post.date}</td>
                          <td>{post.likes}</td>
                          <td>{post.comments}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>}
    </>
  );
}
