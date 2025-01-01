import { useCallback, useEffect, useState } from "react";
import { Grid, Loader, Pagination, SearchFilter } from "../components";
import { DB, Product } from "../data-providers/Server";
import "./Product.css";

const PRODUCTS_PER_PAGE = 10;

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchParams, setSearchParams] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    DB.getAllProducts()
      .then((products) => {
        setProducts(products);
        setFilteredProducts(products.slice(0, PRODUCTS_PER_PAGE)); // Initially display first PRODUCTS_PER_PAGE products
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []); 

  useEffect(() => {
    const lowercasedSearch = searchParams.toLowerCase();
    const newFilteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(lowercasedSearch)
    );
    setFilteredProducts(newFilteredProducts);
    if(searchParams !== "")
      setCurrentPage(1); // Reset to page 1 after a new search
  }, [searchParams, products]);

  const toggleStock = useCallback((productId: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, in_stock: !product.in_stock }
          : product
      )
    );
  }, []);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  const toShowProducts = (): Product[] => {
    return filteredProducts.slice(
      (currentPage - 1) * PRODUCTS_PER_PAGE,
      currentPage * PRODUCTS_PER_PAGE
    );
  };

  return (
    <div className="products-page">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <SearchFilter
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
          <Grid
            products={filteredProducts}
            selectedProducts={toShowProducts()}
            toggleStock={toggleStock}
          />
          <Pagination
            totalProducts={filteredProducts}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default Products;
