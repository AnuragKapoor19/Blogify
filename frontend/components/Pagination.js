import { useContextState } from "@/contextApi";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function Pagination({ pages }) {
    const { currentPage, setcurrentPage } = useContextState();

    const handleClick = (page) => {
        setcurrentPage(page);
    }

    const handleLeftClick = () => {
        setcurrentPage(currentPage - 1)
    }

    const handleRightClick = () => {
        setcurrentPage(currentPage + 1)
    }

    return (
        <>
            <div className="mt-4 mb-3 d-flex justify-content-center align-items-center">
                <div className="page-container d-flex justify-content-center align-items-center">
                    <button disabled={currentPage <= 1 ? true : false} className="arrow p-2" onClick={handleLeftClick}><FaArrowLeft size={30} /></button>
                    {
                        Array.from({ length: pages }).map((_, index) => (
                            <div id={`${currentPage === index + 1 ? 'color' : ''}`} className="page py-2 px-3 fs-5" key={index} onClick={() => handleClick(index + 1)}>{index + 1}</div>
                        ))
                    }
                    <button disabled={currentPage >= pages ? true : false} className="arrow p-2" onClick={handleRightClick}><FaArrowRight size={30} /></button>
                </div>
            </div>
        </>
    )
}
