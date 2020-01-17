import React from "react";

export const Pagination = ({ onChangePage, page, amountFilms }) => (
  <div className="pagination-wrapper">
    <div className="pagination d-flex">
      <button
        type="button"
        className="btn btn-secondary mr-3"
        disabled={page === 1}
        onClick={onChangePage.bind(null, page - 1)}
      >
        Назад
      </button>
      <button
        type="button"
        className="btn btn-secondary"
        disabled={page === amountFilms}
        onClick={onChangePage.bind(null, page + 1)}
      >
        Вперед
      </button>
    </div>
    <div className="page-counter">
      {page} из {amountFilms}
    </div>
  </div>
);
