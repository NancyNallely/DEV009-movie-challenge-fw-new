import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieCatalog from './components/MovieCatalog';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MovieCatalog />} />
          {/* Add more routes here if necessary */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
