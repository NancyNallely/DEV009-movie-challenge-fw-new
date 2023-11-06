import PropTypes from 'prop-types';
import './FilterMovies.css';

const FilterMovies = ({ genres, selectedGenre, onGenreChange }) => {
  return (
    <div className="FilterMovies">
      <label htmlFor="genreSelect"><i className="fa-solid fa-filter" style={{ color: "#ba12a3" }}></i> Filtrar por Género:</label>
      <select data-testid="genreSelect" id="genreSelect" aria-label="Género" value={selectedGenre} onChange={onGenreChange}>
        <option value="">Todos los géneros</option>
        {genres
          ? genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))
          : null
        }
      </select>
    </div>
  );
};

FilterMovies.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.object),
  selectedGenre: PropTypes.string,
  onGenreChange: PropTypes.func,
};

export default FilterMovies;
