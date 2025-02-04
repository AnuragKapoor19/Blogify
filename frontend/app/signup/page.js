"use client";

import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FaPencilAlt } from 'react-icons/fa';

export default function SignUp() {
    const [credentials, setcredentials] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'Reader' })
    const [avatar, setavatar] = useState('https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png')
    const router = useRouter()

    const handleChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleImageChange = (e) => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {              //States of reader 0=created, 1=processing, 2=success to read data
                    setavatar(reader.result)
                }
            }

            reader.readAsDataURL(e.target.files[0])
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (credentials.password !== credentials.confirmPassword) {
                return console.log("Password does not match");
            }

            const { data } = await axios.post('http://localhost:5000/api/v1/new/user', { name: credentials.name, email: credentials.email, password: credentials.password, role: String(credentials.role).toLowerCase(), avatar: avatar }, { withCredentials: true, headers: { "Content-Type": "application/json" } })

            if (!data.success) {
                return console.log(data.message);
            }

            router.push('/')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <section className="signup-container bg-image" style={{ backgroundImage: 'url("https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp")' }}>
                <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                    <div className="container">
                        <div className="row d-flex justify-content-center align-items-center">
                            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                <div className="card my-4" style={{ borderRadius: '15px' }}>
                                    <div className="card-body py-2 px-5">
                                        <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                                        <form onSubmit={handleSubmit}>
                                            <div className='text-center mb-4' style={{ position: 'relative' }}>
                                                <img src={avatar} alt='avatar' height={150} width={150} style={{ border: '1px solid black', borderRadius: '50%', padding: '3px' }} />

                                                {/* Hidden File Input */}
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    id="fileInput"
                                                    name='avatar'
                                                    style={{ display: 'none' }}
                                                />

                                                {/* Pencil Icon */}
                                                <label
                                                    htmlFor="fileInput"
                                                    className='border bg-white'
                                                    style={{ position: 'absolute', right: '35%', top: '70%', borderRadius: '50%', padding: '5px 7px', cursor: 'pointer' }}
                                                >
                                                    <FaPencilAlt size={20} />
                                                </label>
                                            </div>

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
                                                <input type="password" id="form3Example4cdg" value={credentials.confirmPassword} name='confirmPassword' className="form-control form-control-lg" onChange={handleChange} required />
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
                                                <button type="submit" data-mdb-button-init
                                                    data-mdb-ripple-init className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                                            </div>

                                            <p className="text-center text-muted mt-5 mb-0">Have already an account? <Link href="/login"
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
