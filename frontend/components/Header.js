"use client";

import { useContextState } from '@/contextApi'
import axios from 'axios';
import Link from 'next/link'
import React from 'react'

export default function Header() {
  const { user, authenticated, setUser, setAuthenticated } = useContextState()

  const handleLogout = async () => {
    const { data } = await axios.get('http://localhost:5000/api/v1/logout/user', { withCredentials: true })

    if (!data.success) {
      return console.log(data.message)
    }

    setUser('')
    setAuthenticated(false)
  }

  return (
    <>
      <div className='header-container'>
        <nav className="navbar navbar-expand-lg navbar-dark fs-4 fw-bolder">
          <div className="container-fluid">
            <h1 className="navbar-brand fst-italic fw-bolder text-danger">Blogify</h1>
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
              {authenticated
                ?
                <>
                  <div className='d-flex align-items-center text-light'>
                    <img src={user.avatar.url} alt='avatar' height={50} width={50} style={{ border: '2px solid white', borderRadius: '50%' }} />
                    <div className='d-flex flex-column'>
                      <span className='fs-5 fst-italic'>Hi,</span>
                      <h4>{String(user.name).split(' ')[0].charAt(0).toUpperCase()+ String(user.name).split(' ')[0].slice(1)}</h4>
                    </div>
                  </div>

                  <div className='btn btn-danger ms-3 fw-bold' onClick={handleLogout}>Log out</div>
                </>
                :
                <div className='btns'>
                  <Link href={'/login'} className='btn text-light fw-bold fs-5'>Log In</Link>
                  <Link href={'/signup'} className='btn btn-light'>Sign Up</Link>
                </div>
              }
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}
