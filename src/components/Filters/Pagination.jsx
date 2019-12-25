import React from "react";

export class Pagination extends React.Component {
  render() {
    const { onChangePage, page, amountFilms } = this.props;
    return (
      <div className="wrapper">
        <div className="d-flex">
          <button
            type="button"
            className="btn btn-secondary"
            disabled={page === 1}
            onClick={onChangePage.bind(null, page - 1)}
          >
            Назад
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onChangePage.bind(null, page + 1)}
          >
            Вперед
          </button>
        </div>
        <div>
          {page} из {amountFilms}
        </div>
      </div>
    );
  }
}
