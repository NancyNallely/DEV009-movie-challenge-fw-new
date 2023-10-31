import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import Logo from '../MovieLogo/MovieLogo';
import MovieList from '../MovieList/MovieList';
import Pagination from '../MoviePagination/MoviePagination';
import FilterMovies from '../FilterMovies/FilterMovies';
import SortMovies from '../SortMovies/SortMovies';
import { useMovieContext } from '../MovieContext/MovieContext';
import './MovieCatalog.css';

const MovieCatalog = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [genreData, setGenreData] = useState([]);
  const { selectedGenre, setSelectedGenre, selectedSort, setSelectedSort } = useMovieContext();

  useEffect(() => {
    const apiKey = 'd88c3dce489bfe59e2bf99fbc55f8c24';
    const apiUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&api_key=${apiKey}&language=es-MX&page=${page}&with_genres=${selectedGenre}&sort_by=${selectedSort}`;

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

    // Solo ejecutar la llamada a la API de géneros la primera vez
    if (genreData !== undefined && genreData.length === 0) {
      const genreApiUrl = 'https://api.themoviedb.org/3/genre/movie/list?language=es';
      axios.get(genreApiUrl, { headers })
        .then((response) => {
          setGenreData(response.data.genres);
        })
        .catch((error) => {
          console.error('Error al obtener datos de géneros', error);
        });
    }
  }, [page, selectedGenre, selectedSort, genreData]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleSortChange = (event) => {
    setSelectedSort(event.target.value);
  };

  return (
    <div className='catalog-container'>
      <Logo />
      <h1>Catálogo de Películas</h1>
      <div className="home">
        <Link to="/" className="inicio">
          <i className="fa-solid fa-house" style={{ color: "#ba12a3" }}></i>  Volver al inicio
        </Link>
      </div>
      <div className="filters-container">
        <FilterMovies
          genres={genreData}
          selectedGenre={selectedGenre}
          onGenreChange={handleGenreChange}
        />
        <SortMovies
          selectedSort={selectedSort}
          onSortChange={handleSortChange}
        />
      </div>
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