/* eslint-disable no-unused-vars */
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useMovieContext } from '../MovieContext/MovieContext.jsx';
import './MovieDetails.css';

function MovieDetails() {
  const { movieId } = useParams();
  const { selectedGenre, selectedSort } = useMovieContext();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const apiKey = 'd88c3dce489bfe59e2bf99fbc55f8c24';
    const url = `https://api.themoviedb.org/3/movie/${movieId}?language=es-MX&api_key=${apiKey}&with_genres=${selectedGenre}&sort_by=${selectedSort}`;

    const config = {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODhjM2RjZTQ4OWJmZTU9ZTJiZjk5ZmJjNTVmOGMyNCIsInN1YiI6IjY1MWI5MTU7-17SW2vT-W8bzq-6ZR5URhoE5z4qYFZNC1`,
        accept: 'application/json',
      },
    };

    axios
      .get(url, config)
      .then((response) => {
        setMovie(response.data);
      })
      .catch((error) => {
        
      });
  }, [movieId, selectedGenre, selectedSort]); 

  if (!movie) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="movie-details-container">
      <Link to="/Movies" className="back-link">
        <i className="fa-solid fa-left-long" style={{ color: "#ba12a3" }}></i> Volver al listado de películas
      </Link>
      <div className="movie-image">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="movie-poster" />
      </div>
      <div className='movie-details'>
        <p>Título Original: {movie.original_title}</p>
        <p> <i className="fa-solid fa-calendar-days" style={{ color: "#ba12a3" }}></i> Año de Lanzamiento: {movie.release_date}</p>
        <p> <i className="fa-solid fa-film" style={{ color: "#ba12a3" }}></i> Géneros: {movie.genres.map((genre) => genre.name).join(', ')}</p>
        <p> <i className="fa-solid fa-square-poll-vertical" style={{ color: "#ba12a3" }}></i> Promedio de Votación: {movie.vote_average}</p>
        <p> <i className="fa-solid fa-star" style={{ color: "#ba12a3" }}></i> Total de Votos: {movie.vote_count}</p>
        <p>Sinopsis: {movie.overview}</p>
      </div>
    </div>
  );
}

export default MovieDetails;