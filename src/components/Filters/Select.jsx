import React from "react";

export const Select = ({ labelText, name, value, onChange, id, array }) => {
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
        {array.map(elem => (
          <option key={elem.value} value={elem.value}>
            {elem.label}
          </option>
        ))}
      </select>
    </div>
  );
};
