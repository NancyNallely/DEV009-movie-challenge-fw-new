import PropTypes from 'prop-types';
import '../App.css'; // Agregar importación del archivo CSS

const FilterMovies = ({ genres, selectedGenre, onGenreChange }) => {
  return (
    <div className="FilterMovies">
      <label>Filtrar por Género:</label>
      <select value={selectedGenre} onChange={onGenreChange}>
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
