import Link from "next/link";
import { FaFacebook, FaGithub, FaGoogle, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
    return (
        <>
            <footer className="bg-body-tertiary text-center">
                <div className="container bg-dark pt-3" style={{minWidth: '100%'}}>
                    <section >
                        <Link
                            data-mdb-ripple-init
                            className="btn text-white btn-floating m-1"
                            style={{ backgroundColor: "#3b5998" }}
                            href="#!"
                            role="button"
                        ><i><FaFacebook size={25}/></i
                        ></Link>

                        <Link
                            data-mdb-ripple-init
                            className="btn text-white btn-floating m-1"
                            style={{ backgroundColor: "#55acee" }}
                            href="#!"
                            role="button"
                        ><i><FaTwitter size={25}/></i
                        ></Link>

                        <Link
                            data-mdb-ripple-init
                            className="btn text-white btn-floating m-1"
                            style={{ backgroundColor: '#dd4b39' }}
                            href="#!"
                            role="button"
                        ><i><FaGoogle size={25}/></i
                        ></Link>

                        <Link
                            data-mdb-ripple-init
                            className="btn text-white btn-floating m-1"
                            style={{ backgroundColor: '#ac2bac' }}
                            href="#!"
                            role="button"
                        ><i><FaInstagram size={25}/></i
                        ></Link>

                        <Link
                            data-mdb-ripple-init
                            className="btn text-white btn-floating m-1"
                            style={{ backgroundColor: '#0082ca' }}
                            href="#!"
                            role="button"
                        ><i><FaLinkedin size={25}/></i
                        ></Link>
                        <Link
                            data-mdb-ripple-init
                            className="btn text-white btn-floating m-1"
                            style={{ backgroundColor: '#333333' }}
                            href="#!"
                            role="button"
                        ><i><FaGithub size={25}/></i
                        ></Link>
                    </section>
                </div>

                <div className="text-center bg-dark text-light fs-4 fw-bolder pb-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                    © 2025 Copyright:
                    <Link className="text-info ms-2 text-decoration-none" href="/">Blogify.com</Link>
                </div>
            </footer>
        </>
    )
}
