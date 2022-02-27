import React from "react";

const Pagination = ({ page, pages, onClick, prevHandler, nextHandler }) => {
  if (!pages) {
    return null;
  }
  return (
    <div>
      <ul className="pages-container">
        <li>
          <button
            type="button"
            className={page == 1 ? "page-item disable" : "page-item"}
            onClick={prevHandler}
            disabled={page == 1}
          >
            Prev
          </button>
        </li>
        <span>
          {[...Array(Math.ceil(pages)).keys()].map((x, i) => {
            return (
              <li key={i}>
                <button
                  type="button"
                  className={
                    page - 1 === i ? "active page-item disable" : "page-item"
                  }
                  onClick={(e) => onClick(e.target.innerText)}
                  disabled={page - 1 == i}
                >
                  {x + 1}
                </button>
              </li>
            );
          })}
        </span>

        <li>
          <button
            className={page === pages ? "page-item disable" : "page-item"}
            onClick={nextHandler}
            disabled={page == pages}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
