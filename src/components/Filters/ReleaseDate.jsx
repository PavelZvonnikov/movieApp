import React, { Component } from "react";

import { Select } from "./Select.jsx";

export class ReleaseDate extends Component {
  render() {
    const { onChangeFilters, yearsList, year } = this.props;

    return (
      <div className="release-date-wrapper">
        <Select
          id="sort_by_year"
          labelText="Сортировать по годам:"
          name="year"
          value={year}
          onChange={onChangeFilters}
          array={yearsList}
          defaultValue="Выберите год"
        />
      </div>
    );
  }
}
