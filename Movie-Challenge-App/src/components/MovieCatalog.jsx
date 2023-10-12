import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Logo from './MovieLogo';
import MovieList from './MovieList';
import Pagination from './MoviePagination';
import '../App.css';

const MovieCatalog = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [genreData, setGenreData] = useState([]); // Agrega un estado para los datos de géneros

  useEffect(() => {
    const apiKey = 'd88c3dce489bfe59e2bf99fbc55f8c24';
    const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`;

    const headers = {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODhjM2RjZTQ4OWJmZTU5ZTJiZjk5ZmJjNTVmOGMyNCIsInN1YiI6IjY1MWI5MTU3OWQ1OTJjMDEwMmMxMTQzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-HHfX_zSjMCUUdwuJtaivUGhDEYndIG-h9rg2LiNteg',
    };

    axios.get(apiUrl, { headers })
      .then((response) => {
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de películas', error);
      });

    // Obtener datos de géneros
    const genreApiUrl = 'https://api.themoviedb.org/3/genre/movie/list?language=es';
    axios.get(genreApiUrl, { headers })
      .then((response) => {
        setGenreData(response.data.genres);
      })
      .catch((error) => {
        console.error('Error al obtener datos de géneros', error);
      });
  }, [page]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div>
      <Logo />
      <h1>Catálogo de Películas</h1>
      <div>
        <MovieList movies={movies} genreData={genreData} />
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

MovieCatalog.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
};

export default MovieCatalog;
