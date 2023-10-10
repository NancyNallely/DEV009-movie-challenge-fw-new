import PropTypes from 'prop-types';

const MovieList = ({ movies }) => {
  if (!Array.isArray(movies)) {
    return <div>No hay películas para mostrar.</div>;
  }

  return (
    <div className="movie-grid"> {/* Aplica la clase de la cuadrícula de 4 columnas */}
      {movies.map((movie) => (
        <div key={movie.id} className="movie-card"> {/* Aplica la clase de la tarjeta (card) */}
          <img
            src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
            alt={movie.original_title}
            className="movie-poster" // Aplica la clase del póster de película
          />
          <div className="movie-info"> {/* Aplica la clase para el título y año de lanzamiento */}
            {movie.original_title}
            <br />
            {movie.release_date.slice(0, 4)}
          </div>
        </div>
      ))}
    </div>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
};

export default MovieList;
