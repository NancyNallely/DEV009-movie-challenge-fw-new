import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieCatalog from '../components/MovieCatalog/MovieCatalog';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MovieCatalog />} />
    
        </Routes>
      </Router>
    </div>
  );
}

export default App;
