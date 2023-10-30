import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieCatalog from '../components/MovieCatalog/MovieCatalog.jsx';
import Home from '../components/Home/Home.jsx';
import MovieDetails from '../components/MovieDetails/MovieDetails.jsx';
import { MovieProvider } from '../components/MovieContext/MovieContext.jsx';
import '../App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <MovieProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/Movies' element={<MovieCatalog />} />
            <Route path='/movie/:movieId' element={<MovieDetails />} />
          </Routes>
        </MovieProvider>
      </Router>
    </div>
  );
}

export default App;