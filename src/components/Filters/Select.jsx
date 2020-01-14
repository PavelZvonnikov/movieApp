import React from "react";
import { AppContext } from "../App";
// import AppContextHOC from "../HOC/AppContextHOC";
/**
 * Компонент выбора элементов
 *
 * @param labelText - подпись текста
 * @param name - имя селекта
 * @param id - уникальный ID для привязки тайтла
 * @param value - выбранное значение
 * @param onChange - обработчик изменения значения
 * @param array - массив элементов для выбора
 */
const Select = ({
  labelText,
  name,
  value,
  onChange,
  id,
  array,
  defaultValue = ""
}) => {
  return (
    <div>
      <label htmlFor={id}>{labelText}</label>
      <select
        className="form-control my-form-control"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
      >
        {defaultValue ? <option value="0">{defaultValue}</option> : "0"}
        {array.map(elem => (
          <option key={elem.value} value={elem.value}>
            {elem.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default props => {
  return (
    <AppContext.Consumer>
      {({ sort_by, onChangeFilters }) => (
        <Select value={sort_by} onChangeFilters={onChangeFilters} {...props} />
      )}
    </AppContext.Consumer>
  );
};

// export default AppContextHOC(Select);
