"use client";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AuthorDashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

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
    <div className="d-flex vh-100">
      {/* Sidebar (Collapsible) */}
      <div
        className={`bg-dark text-white p-4 d-flex flex-column position-fixed vh-100 ${
          isSidebarOpen ? "d-block" : "d-none d-md-block"
        }`}
        style={{ width: "250px", transition: "0.3s" }}
      >
        <h2 className="mb-4">Dashboard</h2>
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link text-white" href="#">📜 Posts</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#">📝 New Post</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#">💬 Comments</a>
          </li>
        </ul>
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
        <h1 className="mb-4">Welcome, {author.name} 👋</h1>

        {/* Stats Section */}
        <div className="row g-3">
          {[
            { title: "Total Posts", value: author.totalPosts },
            { title: "Total Likes", value: author.totalLikes },
            { title: "Total Comments", value: author.totalComments },
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
  );
}
