import { useRouter } from "next/navigation"

export default function BlogCard({ blog }) {
    const router = useRouter()

    const handleCardClick = (id) => {
        router.push(`/blog/${id}`)
    }

    return (
        <>
            <div className="c-container p-2 col-lg-2 col-md-3 col-sm-4">
                <div className="card text-center p-0 border-0" onClick={() => handleCardClick(blog._id)}>
                    <div className="card-body p-0 mb-3">
                        <img src={blog.image.url === 'url' || '' ? "https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg" : blog.image.url} alt="avatar" width='100%' height='200px' />
                        <h4 className="card-title my-2">{blog.title}</h4>
                        <p className="card-text" style={{ textAlign: 'justify', overflowWrap: 'anywhere', wordBreak: 'break-word', hyphens: 'auto' }}>{String(blog.content).slice(0, 80)}...</p>
                    </div>
                    <div className="card-footer text-muted">
                        {String(new Date(blog.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                        })).split('T')[0]}
                    </div>
                </div>
            </div>
        </>
    )
}
