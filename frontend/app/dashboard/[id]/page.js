"use client";

import axios from "axios"
import { useEffect, useState } from "react"

export default function page({ params }) {
    const [image, setimage] = useState()
    const [credentials, setcredentials] = useState({ title: '', content: '', category: '' })
    const [loading, setloading] = useState(true)

    const getBlog = async () => {
        const { id } = await params
        const { data } = await axios.get(`http://localhost:5000/api/v1/blog/${id}`)

        if (!data.success) {
            return console.log(data.message);
        }

        setcredentials({ title: data.blog.title, content: data.blog.content, category: data.blog.category })
        setimage(data.blog.image.url)
        setloading(false)
    }

    const handleChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleImageChange = (e) => {
        const reader = new FileReader()

        reader.onload = () => {
            if (reader.readyState === 2) {
                setimage(reader.result)
            }
        }

        reader.readAsDataURL(e.target.files[0])
    }

    useEffect(() => {
        getBlog();
    }, [])

    return (
        <>
            {loading
                ? <h1>Loading...</h1>
                :
                <div className="container my-3">
                    <h3 className="text-center fw-bolder">Edit Blog</h3>
                    <form className="shadow p-4 rounded bg-light">
                        <div className="mb-3">
                            <label className="form-label">Blog Image</label>
                            <input type="file" className="form-control" accept="image/*" onChange={handleImageChange} />
                            <img src={image} alt="Preview" className="img-fluid mt-2 w-100" style={{ maxHeight: "400px" }} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Title</label>
                            <input type="text" className="form-control" name="title" value={credentials.title} onChange={handleChange} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Content</label>
                            <textarea className="form-control" rows="5" name="content" value={credentials.content} onChange={handleChange}></textarea>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Category</label>
                            <select className="form-select" name="category" value={credentials.category} onChange={handleChange}>
                                <option value="Technology">Technology</option>
                                <option value="Productivity">Productivity</option>
                                <option value="Finance">Finance</option>
                                <option value="Health">Health</option>
                                <option value="Travel">Travel</option>
                            </select>
                        </div>

                        <button type="submit" className="btn btn-primary w-100">Update</button>
                    </form>
                </div>
            }
        </>
    )
}
