import { render, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MovieCatalog from './MovieCatalog';

// Simular Axios para las solicitudes API
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: { results: [], total_pages: 1, genres: [] } })),
}));

describe('MovieCatalog', () => {
  it('renderiza el componente sin errores', () => {
    act(() => {
      render(
        <MemoryRouter>
          <MovieCatalog />
        </MemoryRouter>
      );
    });
  });

});
