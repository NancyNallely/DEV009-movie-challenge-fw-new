import PropTypes from 'prop-types';
import './FilterMovies.css';

const FilterMovies = ({ genres, selectedGenre, onGenreChange }) => {
  return (
    <div className="FilterMovies">
      <label htmlFor="genreSelect">Filtrar por Género:</label>
      <select id="genreSelect" value={selectedGenre} onChange={onGenreChange}>
        <option value="">Todos los géneros</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
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
