import { Dispatch, SetStateAction } from "react";
import "./SearchStyle.css";
 
interface SearchFilterProps {
  searchParams: string;
  setSearchParams: Dispatch<SetStateAction<string>>;
}

const SearchFilter = ({ searchParams, setSearchParams }: SearchFilterProps) => {
  return (
    <div className="search-bar-container">
      <input
        className="search-bar"
        type="text"
        placeholder="Search products by title here..."
        value={searchParams}
        onChange={(e) => setSearchParams(e.target.value)}
      />
      {!searchParams ? (
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyi_CVTmoL1ITHFxQkfLwvj93hcsgA1Olkhg&s" />
      ) : (
        <img
          style={{ cursor: "pointer" }}
          onClick={() => setSearchParams("")}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj7Cz1h7144iRL-rLwgFMgCFPDFrFpJSeIAQ&s"
        />
      )}
    </div>
  );
};

export default SearchFilter;
