import React from "react";

export const Genres = ({ arrGenres, onChangeGenres }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          {arrGenres.map(genre => {
            return (
              <div key={genre.id} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={genre.name}
                  id={genre.id}
                  name={genre.name}
                  onChange={onChangeGenres}
                />
                <label className="form-check-label" htmlFor={genre.id}>
                  {genre.name}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
