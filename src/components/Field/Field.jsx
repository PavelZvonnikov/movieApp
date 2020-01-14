import React from "react";

export const Field = props => {
  const {
    labelText,
    type,
    placeholder,
    name,
    value,
    onChange,
    id,
    error,
    onBlur
  } = props;
  return (
    <div className="form-group">
      <label htmlFor={id}>{labelText}</label>
      <input
        id={id}
        type={type}
        name={name}
        className={error ? "form-control error" : "form-control"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error ? <div className="invalid-feedback">{error}</div> : null}
    </div>
  );
};
