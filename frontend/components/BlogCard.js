import Link from "next/link";

export default function BlogCard({ blog }) {
    return (
        <>
            <div className="c-container p-2 col-lg-2 col-md-3 col-sm-4">
                <div className="card text-center p-0 border-0">
                    <div className="card-body p-0 mb-3">
                        <img src="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg" alt="avatar" width='100%' height='200px' />
                        <h4 className="card-title my-2">{blog.title}</h4>
                        <p className="card-text">{String(blog.content).slice(0,60)}...</p>
                    </div>
                    <div className="card-footer text-muted">
                        {String(blog.createdAt).split('T')[0]}
                    </div>
                </div>
            </div>
        </>
    )
}
