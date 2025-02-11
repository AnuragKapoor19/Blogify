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
            <div className="m-3 d-flex justify-content-center align-items-center">
                <div className="page-container d-flex justify-content-center align-items-center">
                    <i id={`${currentPage <= 1 ? 'hide' : ''}`} className="arrow p-2" onClick={handleLeftClick}><FaArrowLeft size={30} /></i>
                    {
                        Array.from({ length: pages }).map((_, index) => (
                            <div id={`${currentPage === index + 1 ? 'color' : ''}`} className="page border py-2 px-3 fw-bold fs-5" key={index} onClick={() => handleClick(index + 1)}>{index + 1}</div>
                        ))
                    }
                    <i id={`${currentPage >= pages ? 'hide' : ''}`} className="arrow p-2" onClick={handleRightClick}><FaArrowRight size={30} /></i>
                </div>
            </div>
        </>
    )
}
