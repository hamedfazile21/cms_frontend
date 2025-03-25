
import { Button } from "./ui/button";
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 4;

    for (let i = 1; i <= Math.min(maxVisiblePages, totalPages); i++) {
      pageNumbers.push(i);
    }

    if (totalPages > maxVisiblePages && currentPage !== totalPages) {
      pageNumbers.push("...");
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };
  const lang = localStorage.getItem("lag");

  

  const pageNumbers = getPageNumbers();
  return (
    <div className="flex items-center gap-x-2">
      {/* <Button
        onClick={() => handlePageChange(currentPage - 1)}
        className="bg-main-500"
      >
        <FaAngleLeft />
      </Button> */}
      {lang == "en" ? (
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          className="bg-main-500"
        >
          <FaAngleLeft />
        </Button>
      ) : (
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          className="bg-main-500"
        >
          <FaAngleRight />
        </Button>
      )}
      <div className="flex items-center gap-x-1">
        {pageNumbers.map((page: any) => {
          return (
            <Button
              key={page}
              variant={"outline"}
              onClick={() => handlePageChange(page)}
              className={`${
                currentPage === page ? "bg-main-900 text-white border-none" : ""
              }`}
            >
              {page}
            </Button>
          );
        })}
      </div>
      {lang == "en" ? (
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          className="bg-main-500"
        >
          <FaAngleRight />
        </Button>
      ) : (
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          className="bg-main-500"
        >
          <FaAngleLeft />
        </Button>
      )}
    </div>
  );
};

export default Pagination;
