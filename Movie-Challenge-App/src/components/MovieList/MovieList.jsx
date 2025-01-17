import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './MovieList.css';

const MovieList = ({ movies, genreData }) => {
  if (!Array.isArray(movies) || movies.length === 0) {
    return <div>No hay películas para mostrar.</div>;
  }

  if (!Array.isArray(genreData) || genreData.length === 0) {
    return <div>No hay datos de género disponibles.</div>;
  }

  const genreMap = {};
  genreData.forEach((genre) => {
    genreMap[genre.id] = genre.name;
  });

  const colors = [
    '#f06292',
    '#a5d6a7',
    '#fff9c4',
    '#ffcdd2',
    '#f48fb1',
    '#ce93d8',
    '#90caf9',
    '#c8e6c9',
    '#fff176',
    '#ef9a9a',
    '#bbdefb',
    '#9575cd',
  ];

  // Filtra las películas que tienen póster
  const moviesWithPoster = movies.filter((movie) => movie.poster_path);

  return (
    <div className="movie-grid">
      {moviesWithPoster.map((movie, index) => (
        <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
          <div
            className="movie-card"
            style={{ backgroundColor: colors[index % colors.length] }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
              alt={movie.original_title}
              className="movie-poster"
            />
            <div className="movie-info">
              <p className="movie-title" aria-label='Título de una película'>{movie.original_title}</p>
              <p className="movie-year">{movie.release_date.slice(0, 4)}</p>
              <p className="movie-genres">
                <i className="fa-solid fa-film" style={{ color: "#ba12a3" }}></i> Géneros: {movie.genre_ids.map((genreId) => genreMap[genreId]).join(', ')}
              </p>
              <p className="movie-vote-average"><i className="fa-solid fa-square-poll-vertical" style={{ color: "#ba12a3" }}></i> Promedio de votación: {movie.vote_average}</p>
              <p className="movie-vote-count"><i className="fa-solid fa-star" style={{ color: "#ba12a3" }}></i> Total de votos: {movie.vote_count}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
  genreData: PropTypes.arrayOf(PropTypes.object),
};

export default MovieList;
