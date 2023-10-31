import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import MovieDetails from './MovieDetails';
import { MovieProvider } from '../MovieContext/MovieContext';

// Simula una respuesta exitosa de axios usando jest.mock
jest.mock('axios');

describe('MovieDetails Component', () => {
  it('debe mostrar los detalles de la película una vez cargada', async () => {
    const mockMovie = {
      original_title: 'Título Original de Prueba',
      release_date: '2023-10-31',
      genres: [{ name: 'Aventura' }, { name: 'Acción' }],
      vote_average: 8.5,
      vote_count: 1000,
      overview: 'Sinopsis de prueba',
      poster_path: '/ruta/de/poster.jpg',
    };

    axios.get.mockResolvedValue({ data: mockMovie });

    render(
      <MemoryRouter initialEntries={['/movie/123']}>
        <MovieProvider>
          <Routes>
            <Route path="/movie/:movieId" element={<MovieDetails />} />
          </Routes>
        </MovieProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      const elementsWithText = screen.getAllByText((text, element) => {
        return element.textContent.includes('Título Original de Prueba');
      });
      
      // Ahora puedes realizar una comprobación en cada uno de los elementos encontrados
      elementsWithText.forEach((element) => {
        expect(element).toBeTruthy();
      });
      expect(screen.getByText('Año de Lanzamiento: 2023-10-31')).toBeTruthy();
      expect(screen.getByText('Géneros: Aventura, Acción')).toBeTruthy();
      expect(screen.getByText('Promedio de Votación: 8.5')).toBeTruthy();
      expect(screen.getByText('Total de Votos: 1000')).toBeTruthy();
      expect(screen.getByText('Sinopsis: Sinopsis de prueba')).toBeTruthy();
    });
  });
});
