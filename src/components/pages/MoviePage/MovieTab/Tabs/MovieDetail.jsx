import React from "react";
import { Table } from "reactstrap";
import styles from "./MovieDetail.module.css";

export const MovieDetail = ({ movie }) => {
  return (
    <Table>
      <tbody>
        <tr>
          <th className="border-top-0" scope="row">
            Статус
          </th>
          <td className="border-top-0">{movie.status}</td>
        </tr>
        <tr>
          <th scope="row">Дата выхода</th>
          <td>{movie.release_date}</td>
        </tr>
        <tr>
          <th scope="row">Продолжительность</th>
          <td>{movie.runtime} минут</td>
        </tr>
        <tr>
          <th scope="row">Язык оригинала</th>
          <td>{movie.original_language}</td>
        </tr>
        <tr>
          <th scope="row">Страна</th>
          <td>
            {movie.production_countries &&
              movie.production_countries.map(country => (
                <div key={country.name}>{country.name}</div>
              ))}
          </td>
        </tr>
        <tr>
          <th scope="row">Бюджет</th>
          <td>$ {movie.budget}</td>
        </tr>
        <tr>
          <th scope="row">Сборы</th>
          <td>$ {movie.revenue}</td>
        </tr>
        <tr>
          <th scope="row">Компания</th>
          <td>
            <div className={styles.wrapper}>
              {movie.production_companies &&
                movie.production_companies.map(company => (
                  <div key={company.id}>
                    <span className="badge badge-info">{company.name}</span>
                  </div>
                ))}
            </div>
          </td>
        </tr>
        <tr>
          <th scope="row">Жанры</th>
          <td>
            {movie.genres &&
              movie.genres.map(genre => (
                <div key={genre.id}>
                  <span className="badge badge-info">{genre.name}</span>
                </div>
              ))}
          </td>
        </tr>
      </tbody>
    </Table>
  );
};
