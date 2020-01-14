import React from "react";

import Select from "./Select";

// import { Select } from "./Select.jsx";

// export const ReleaseDate = ({ onChangeFilters, yearsList, year }) => {
//   console.log("Release date");
//   return (
//     <div className="release-date-wrapper">
//       <Select
//         id="sort_by_year"
//         labelText="Сортировать по годам:"
//         name="year"
//         value={year}
//         onChange={onChangeFilters}
//         array={yearsList}
//         defaultValue="Выберите год"
//       />
//     </div>
//   );
// };

export class ReleaseDate extends React.PureComponent {
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
