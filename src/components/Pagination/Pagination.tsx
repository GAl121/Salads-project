import { Product } from "../../data-providers/Server";
import "./PaginationStyle.css";

const PRODUCTS_PER_PAGE = 10;

interface PaginationProps {
  totalProducts: Product[];
  currentPage: number;
  onPageChange: (newPage: number) => void;
}
const Pagination = ({
  totalProducts,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalProducts.length / PRODUCTS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };
 
  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Previous
      </button>
      <span>
        {currentPage} of {totalPages}
      </span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
