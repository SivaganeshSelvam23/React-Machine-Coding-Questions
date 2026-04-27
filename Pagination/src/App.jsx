import React, { useEffect, useState } from "react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

const App = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [countPerPage, setCountPerPage] = useState(10);
  const page_size = 10;
  const no_of_pages = Math.ceil(products.length / countPerPage);

  const start = currentPage * countPerPage;
  const end = start + countPerPage;

  console.log("countPerPage:", countPerPage, typeof countPerPage);
  const fetchData = async () => {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    setProducts(data.products);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handelNextPage = () => {
    if (currentPage < no_of_pages - 1) setCurrentPage((prev) => prev + 1);
  };
  const handelPreviousPage = () => {
    if (currentPage > 0) setCurrentPage((prev) => prev - 1);
  };

  const ProductCard = ({ image, title }) => {
    return (
      <div className="w-75 h-55 flex flex-col justify-center items-center border-2 border-sky-500 rounded-2xl p-2 m-3 ">
        <img src={image} alt={title} className="w-45 h-35" />
        <span className="text-white">{title}</span>
      </div>
    );
  };
  return (
    <div className=" bg-black h-auto text-purple-300 flex flex-col items-center justify-center ">
      <p className="text-4xl mt-10">Pagination Machine Coding Question</p>
      <div className="m-10">
        <label>Products Per Page:</label>
        <select
          value={countPerPage}
          onChange={(e) => {
            setCountPerPage(Number(e.target.value));
            setCurrentPage(0);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </div>
      {!products.length ? (
        <p>No Products Found</p>
      ) : (
        <div className="mt-10 flex flex-wrap justify-center">
          {products.slice(start, end).map((p) => (
            <ProductCard key={p.id} image={p.thumbnail} title={p.title} />
          ))}
        </div>
      )}

      <div className="flex gap-8 mt-10 items-center text-green-400">
        <div
          className={`text-6xl cursor-pointer ${currentPage === 0 ? "hidden" : "block"}`}
        >
          <IoIosArrowDropleft onClick={() => handelPreviousPage()} />
        </div>
        {[...Array(no_of_pages)].map((_, n) => (
          <span
            key={n}
            className={`p-5 border-white border-2 rounded-2xl text-md font-bold cursor-pointer hover:bg-green-800 hover:text-white ${currentPage === n && "bg-green-600 text-white"}`}
            onClick={() => setCurrentPage(n)}
          >
            {n + 1}
          </span>
        ))}
        <div
          className={`text-6xl cursor-pointer ${currentPage < no_of_pages - 1 ? "block" : "hidden"}`}
        >
          <IoIosArrowDropright onClick={() => handelNextPage()} />
        </div>
      </div>
    </div>
  );
};

export default App;
