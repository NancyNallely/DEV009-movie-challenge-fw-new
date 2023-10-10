import { useState, useEffect } from 'react';
import axios from 'axios';
import Logo from './MovieLogo';
import MovieList from './MovieList';
import Pagination from './MoviePagination';
import '../App.css';

const MovieCatalog = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const apiKey = 'd88c3dce489bfe59e2bf99fbc55f8c24'; 
    const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`;
    
    axios.get(apiUrl)
      .then((response) => {
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de películas', error);
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
        <MovieList movies={movies} />
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default MovieCatalog;
