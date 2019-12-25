import React from "react";

/**
 * Список жанров
 *
 * @param arrGenres - массив жанров
 * @param onChangeGenres - обработчик выбора жанра
 */
export const Genres = ({
  arrGenres,
  onChangeGenres,
}) => (
  <div className="container">
    <div className="row">
      <div className="col-6">
        {arrGenres.map(({ id, name, checked }, index) => (
          <div key={id} className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id={id}
              index={index}
              onChange={onChangeGenres}
              checked={checked}
            />
            <label className="form-check-label" htmlFor={id}>
              {name}
            </label>
          </div>
        ))}
      </div>
    </div>
  </div>
);
