import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <>
      <div className='header-container'>
        <nav className="navbar navbar-expand-lg navbar-dark fs-4 fw-bolder">
          <div className="container-fluid">
            <a className="navbar-brand">Navbar</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link href='/' className="nav-link active" aria-current="page">Home</Link>
                </li>
                <li className="nav-item">
                  <Link href='/technology' className="nav-link">Technology</Link>
                </li>
                <li className="nav-item">
                  <Link href='/productivity' className="nav-link">Productivity</Link>
                </li>
                <li className="nav-item">
                  <Link href='/finance' className="nav-link">Finance</Link>
                </li>
                <li className="nav-item">
                  <Link href='/health' className="nav-link">Health</Link>
                </li>
                <li className="nav-item">
                  <Link href='/travel' className="nav-link">Travel</Link>
                </li>
              </ul>
              <form className="d-flex me-auto">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
              <div className='btns'>
                <Link href={'/login'} className='btn text-light fw-bold fs-5'>Log In</Link>
                <Link href={'/signup'} className='btn btn-light'>Sign Up</Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}
