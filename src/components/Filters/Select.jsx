import React from "react";

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
export const Select = ({
  labelText,
  name,
  value,
  onChange,
  id,
  array,
  defaultValue = ''
}) => (
  <div>
    <label htmlFor={id}>{labelText}</label>
    <select
      className="form-control my-form-control"
      name={name}
      id={id}
      onChange={onChange}
    >
      {defaultValue ? (
        <option value={null}>{defaultValue}</option>
      ) : null}
      {array.map(elem => (
        <option
          key={elem.value}
          value={elem.value}
          selected={elem.value === value}
        >
          {elem.label}
        </option>
      ))}
    </select>
  </div>
);
