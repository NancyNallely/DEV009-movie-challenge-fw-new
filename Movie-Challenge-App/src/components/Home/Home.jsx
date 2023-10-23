import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="main-content">
      <div className="overlay"></div>
      <h1 className="title-3d">Bienvenido a Adicción Visual</h1>
      <div className="content-center">
        <p className="manuscrito typing-animation">
          La pasión por ver es una adicción, descubre tus próximas películas favoritas con nosotros
        </p>
        <div className="button-container">
          <Link to="/movies" className="catalog-button">
            Catálogo de Películas
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
