import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieCatalog from '../components/MovieCatalog/MovieCatalog.jsx';
import Home from '../components/Home/Home.jsx'; 

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path='/Movies' element={<MovieCatalog />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
