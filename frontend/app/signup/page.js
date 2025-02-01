"use client";

import { Passero_One } from 'next/font/google';
import Link from 'next/link'
import React, { useState } from 'react'

export default function SignUp() {
    const [credentials, setcredentials] = useState({ name: '', email: '', password: '', role: 'Reader' })

    const handleChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <>
            <section className="signup-container bg-image" style={{backgroundImage: 'url("https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp")'}}>
                <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                    <div className="container">
                        <div className="row d-flex justify-content-center align-items-center">
                            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                <div className="card my-4" style={{ borderRadius: '15px' }}>
                                    <div className="card-body py-2 px-5">
                                        <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                                        <form>

                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <input type="text" id="form3Example1cg" value={credentials.name} name='name' className="form-control form-control-lg" required onChange={handleChange} />
                                                <label className="form-label" htmlFor="form3Example1cg">Your Name</label>
                                            </div>

                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <input type="email" id="form3Example3cg" value={credentials.email} name='email' className="form-control form-control-lg" required onChange={handleChange} />
                                                <label className="form-label" htmlFor="form3Example3cg">Your Email</label>
                                            </div>

                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <input type="password" id="form3Example4cg" value={credentials.password} name='password' className="form-control form-control-lg" required onChange={handleChange} />
                                                <label className="form-label" htmlFor="form3Example4cg">Password</label>
                                            </div>

                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <input type="password" id="form3Example4cdg" className="form-control form-control-lg" required />
                                                <label className="form-label" htmlFor="form3Example4cdg">Repeat your password</label>
                                            </div>

                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <select id='select' className="form-control form-control-lg" value={credentials.role} name='role' required onChange={handleChange}>
                                                    <option>Reader</option>
                                                    <option>Author</option>
                                                </select>
                                                <label className="form-label" htmlFor="select">Role</label>
                                            </div>

                                            <div className="form-check d-flex justify-content-center mb-5">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" required />
                                                <label className="form-check-label" htmlFor="form2Example3g">
                                                    I agree all statements in <u>Terms of service</u>
                                                </label>
                                            </div>

                                            <div className="d-flex justify-content-center">
                                                <button type="button" data-mdb-button-init
                                                    data-mdb-ripple-init className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                                            </div>

                                            <p className="text-center text-muted mt-5 mb-0">Have already an account? <Link href="/"
                                                className="fw-bold text-body"><u>Login here</u></Link></p>

                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
