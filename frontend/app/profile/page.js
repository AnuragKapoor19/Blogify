"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useContextState } from "@/contextApi";
import "bootstrap/dist/css/bootstrap.min.css";

export default function UserProfile() {
    const { user } = useContextState()

    return (
        <>
            <Header />
            <div
                className="d-flex justify-content-center align-items-center vh-100"
                style={{
                    background: "linear-gradient(to bottom right, white 50%, black 50%)",
                    color: "#fff",
                }}
            >
                <div className="card p-5 rounded-0 shadow-lg text-center" style={{ maxWidth: "500px", width: "100%" }}>
                    <h1 className="mb-4 text-dark">User Profile</h1>
                    <div className="text-center">
                        <img
                            src={user.avatar.url}
                            alt="User Avatar"
                            className="rounded-circle border border-3"
                            style={{ width: "140px", height: "140px", objectFit: "cover" }}
                        />
                    </div>

                    <div className="mt-4">
                        <h4 className="text-dark">Name</h4>
                        <p className="text-muted">{user.name}</p>

                        <h4 className="text-dark">Role</h4>
                        <p className="text-muted">{user.role}</p>

                        <h4 className="text-dark">Email</h4>
                        <p className="text-muted">{user.email}</p>
                    </div>

                    <button className="btn btn-primary px-4 mt-3">Edit Profile</button>
                </div>
            </div>
            <Footer />
        </>
    );
}
