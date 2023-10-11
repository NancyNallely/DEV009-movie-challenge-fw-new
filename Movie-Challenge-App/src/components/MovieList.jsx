import PropTypes from 'prop-types';
import '../App.css'; // Importa el archivo CSS global (App.css)

const MovieList = ({ movies }) => {
  if (!Array.isArray(movies)) {
    return <div>No hay películas para mostrar.</div>;
  }

  const colors = [
    '#f06292',  // Rosa claro
    '#a5d6a7',  // Verde claro
    '#fff9c4',  // Amarillo
    '#ffcdd2',  // Rojo
    '#f48fb1',  // Rosa
    '#ce93d8',  // Morado
    '#90caf9',  // Azul claro
    '#c8e6c9',  // Verde
    '#fff176',  // Amarillo claro
    '#ef9a9a',  // Rojo claro
    '#bbdefb',  // Azul
    '#9575cd',  // Morado claro
  ];
  

  return (
    <div className="movie-grid"> {/* Aplica la clase de la cuadrícula de 4 películas por fila */}
      {movies.map((movie, index) => (
        <div
          key={movie.id}
          className="movie-card"
          style={{ backgroundColor: colors[index % colors.length] }} // Establece un fondo basado en el índice
        >
          <img
            src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
            alt={movie.original_title}
            className="movie-poster"
          />
          <div className="movie-info">
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
