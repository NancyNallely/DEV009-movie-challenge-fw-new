import PropTypes from 'prop-types';
import './SortMovies.css';

const SortMovies = ({ selectedSort, onSortChange }) => {
  return (
    <div className="FilterMovies"> {/* Asigna la clase aquí */}
      <label>Ordenar por:</label>
      <select value={selectedSort} onChange={onSortChange}>
        <option value="popularity.desc">Popularidad Descendente</option>
        <option value="popularity.asc">Popularidad Ascendente</option>
        <option value="release_date.desc">Fecha de Lanzamiento Descendente</option>
        <option value="release_date.asc">Fecha de Lanzamiento Ascendente</option>
        <option value="vote_average.desc">Votación Descendente</option>
        <option value="vote_average.asc">Votación Ascendente</option>
      </select>
    </div>
  );
};

SortMovies.propTypes = {
  selectedSort: PropTypes.string,
  onSortChange: PropTypes.func,
};

export default SortMovies;
