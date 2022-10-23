import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import "./home.css";
import "./pagination.css";

const Card = ({ marvelChars }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 10;
  const pageVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(marvelChars.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
          <div className="container">

          {marvelChars
            .slice(pageVisited, pageVisited + usersPerPage)
            .map((item) => {
              return (
                <div className="item" key={item.id}>
                  <img
                    src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                    alt=""
                  />
                  <div className="name">
                    <h3>{item.name} </h3>
                  <h4 className="para">
                    Series Available : {item.series.available}
                  </h4>
                  </div>
                </div>
              );
            })}
        </div>
        <footer className="page-footer">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"pageBtn"}
            previousLinkClassName={"prevBtn"}
            nextLinkClassName={"nextBtn"}
            disabledClassName={"disabledPage"}
            activeClassName={"activepage"}
          />
        </footer>
    </>
  );
};

export default Card;
