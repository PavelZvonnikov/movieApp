import React from "react";

import { SortBy } from "./SortBy";
import { ReleaseDate } from "./ReleaseDate.jsx";
import { Pagination } from "./Pagination.jsx";
import { Genres } from "./Genres.jsx";

export const Filters = ({
  filters: { sort_by, year },
  onChangeFilters,
  onChangePage,
  page,
  yearsList,
  amountFilms,
  clearFilters,
  genres,
  onChangeGenres
}) => (
  <form className="mb-3">
    <SortBy onChangeFilters={onChangeFilters} sort_by={sort_by} />
    <ReleaseDate
      onChangeFilters={onChangeFilters}
      year={year}
      yearsList={yearsList}
    />
    <button type="button" className="btn btn-secondary" onClick={clearFilters}>
      Сбросить фильтры
    </button>
    <Pagination
      page={page}
      onChangePage={onChangePage}
      amountFilms={amountFilms}
    />
    <Genres arrGenres={genres} onChangeGenres={onChangeGenres} />
  </form>
);
