"use client";

import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FaFacebook, FaGoogle, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Login() {
    const [credentials, setcredentials] = useState({ email: '', password: '' })
    const router = useRouter()

    const handleChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:5000/api/v1/user', { email: credentials.email, password: credentials.password }, { withCredentials: true, headers: { 'Content-Type': 'application/json' } })

            if (!data.success) {
                return console.log(data.message)
            }

            console.log(data.message)
            router.push('/')
        } catch (error) {
            if (error.response) {
                console.error('Response Error:', error.response.status, error.response.data.message);
            } else if (error.request) {
                console.error('No Response:', error.request);
            } else {
                console.error('Error:', error.message);
            }
        }
    }

    return (
        <>
            <div className='login-container'>
                <section className="vh-100 pt-5">
                    <div className="container-fluid h-custom">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-md-9 col-lg-6 col-xl-5">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                    className="img-fluid" alt="Sample image" />
                            </div>
                            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                                <form onSubmit={handleSubmit}>
                                    <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                        <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                                        <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-floating mx-1">
                                            <i><FaFacebook /></i>
                                        </button>

                                        <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-floating mx-1">
                                            <i><FaTwitter /></i>
                                        </button>

                                        <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-floating mx-1">
                                            <i><FaGoogle /></i>
                                        </button>
                                    </div>

                                    <div className="divider d-flex align-items-center my-4">
                                        <p className="text-center fw-bold mx-3 mb-0">Or</p>
                                    </div>

                                    <div data-mdb-input-init className="form-outline mb-4">
                                        <input type="email" id="form3Example3" value={credentials.email} name='email' className="form-control form-control-lg"
                                            placeholder="Enter a valid email address" onChange={handleChange} />
                                        <label className="form-label" htmlFor="form3Example3">Email address</label>
                                    </div>

                                    <div data-mdb-input-init className="form-outline mb-3">
                                        <input type="password" id="form3Example4" value={credentials.password} name='password' className="form-control form-control-lg"
                                            placeholder="Enter password" onChange={handleChange} />
                                        <label className="form-label" htmlFor="form3Example4">Password</label>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="form-check mb-0">
                                            <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                            <label className="form-check-label" htmlFor="form2Example3">
                                                Remember me
                                            </label>
                                        </div>
                                        <Link href="/" className="text-body">Forgot password?</Link>
                                    </div>

                                    <div className="text-center text-lg-start mt-4 pt-2">
                                        <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg"
                                            style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>Login</button>
                                        <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link href="/"
                                            className="link-danger">Register</Link></p>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                    <div
                        className="d-flex flex-column flex-md-row text-center text-md-start justify-content-around py-4 px-4 px-xl-5 bg-primary">
                        <div className="text-white mb-3 mb-md-0">
                            Copyright © 2020. All rights reserved.
                        </div>

                        <div>
                            <Link href="/" className="text-white me-4">
                                <i><FaFacebook /></i>
                            </Link>
                            <Link href="/" className="text-white me-4">
                                <i><FaTwitter /></i>
                            </Link>
                            <Link href="/" className="text-white me-4">
                                <i><FaGoogle /></i>
                            </Link>
                            <Link href="/" className="text-white">
                                <i><FaLinkedin /></i>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
