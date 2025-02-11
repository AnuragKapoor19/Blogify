export default function Pagination({ pages }) {
    return (
        <>
            <div className="d-flex">
                <h5>/</h5>
                {
                    Array.from({ length: pages }).map((_, index) => (
                        <h5 key={index}>{index + 1}</h5>
                    ))
                }
                <h5>/</h5>
            </div>
        </>
    )
}
