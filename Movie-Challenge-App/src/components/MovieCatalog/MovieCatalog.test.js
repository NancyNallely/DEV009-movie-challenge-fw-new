import { render, act, waitFor, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import MovieCatalog from './MovieCatalog';
import { MovieProvider } from '../MovieContext/MovieContext';

describe('MovieCatalog', () => {
  it('renderiza el componente sin errores', () => {
    act(() => {
      render(
        <MemoryRouter>
          <MovieProvider>
            <MovieCatalog />
          </MovieProvider>
        </MemoryRouter>
      );
    });
  });

  it('maneja errores en llamadas a la API', async () => {
    // Guarda la función original console.error
    const originalConsoleError = console.error;

    // Crea una función espía para console.error
    const consoleErrorSpy = jest.fn();

    // Reemplaza console.error con la función espía
    console.error = consoleErrorSpy;

    // Configura axios.mock solo para esta prueba
    jest.spyOn(axios, 'get').mockImplementationOnce(() => Promise.reject(new Error('Network Error')));

    const mock = new MockAdapter(axios);

    // Simula un error en la llamada a la API
    mock.onGet('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&api_key=d88c3dce489bfe59e2bf99fbc55f8c24&language=es-MX&page=1&with_genres=&sort_by=popularity.desc').reply(500, 'Error interno del servidor');

    act(() => {
      render(
        <MemoryRouter>
          <MovieProvider>
            <MovieCatalog />
          </MovieProvider>
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      // Verifica si console.error se llamó con el mensaje de error esperado
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error al obtener la lista de películas', new Error('Network Error'));
    });

    // Restaura la función original de console.error
    console.error = originalConsoleError;
  });


});

describe('MovieCatalog API calls', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  it('recupera datos y configura películas y páginas totales en una llamada API exitosa', async () => {
    const mockMovies = [
      { id: 1, title: 'Movie 1' },
      { id: 2, title: 'Movie 2' },
    ];
    const totalPages = 10;

    // Mock the first API call
    mock.onGet('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&api_key=d88c3dce489bfe59e2bf99fbc55f8c24&language=es-MX&page=1&with_genres=&sort_by=popularity.desc').reply(200, {
      data: {
        results: mockMovies,
        total_pages: totalPages,
      },
    });

    // Mock the second API call
    mock.onGet('https://api.themoviedb.org/3/genre/movie/list?language=es').reply(200, {
      genres: [{ id: 1, name: 'Action' }, { id: 2, name: 'Comedy' }],
    });

    const { findByText } = render(
      <MemoryRouter>
        <MovieProvider>
          <MovieCatalog />
        </MovieProvider>
      </MemoryRouter>
    );

    const totalPagesText = await findByText('Página 1 de 1');
    expect(totalPagesText).toBeTruthy();
  });

  it('maneja el error en una llamada API fallida', async () => {
    // Mock the first API call to simulate an error
    mock.onGet('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&api_key=d88c3dce489bfe59e2bf99fbc55f8c24&language=es-MX&page=1&with_genres=&sort_by=popularity.desc').reply(500);

    // Mock the second API call
    mock.onGet('https://api.themoviedb.org/3/genre/movie/list?language=es').reply(500);

    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { findByText } = render(
      <MemoryRouter>
        <MovieProvider>
          <MovieCatalog />
        </MovieProvider>
      </MemoryRouter>
    );

    const errorMessage = await findByText('No hay películas para mostrar.');
    expect(errorMessage).toBeTruthy();

    spy.mockRestore();
  });
});

const mock = new MockAdapter(axios);

describe('Componente MovieCatalog', () => {
  beforeAll(() => {
    // Configura el mock para simular la solicitud de películas
    const apiKey = 'd88c3dce489bfe59e2bf99fbc55f8c24'
    mock.onGet(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&api_key=${apiKey}&language=es-MX`).reply(200, {
      results: [{ id: 1, title: 'Pelicula 1' }, { id: 2, title: 'Pelicula 2' }],
      total_pages: 2,
    });

    // Configura el mock para simular la solicitud de géneros (solo en la primera ejecución)
    mock.onGet('https://api.themoviedb.org/3/genre/movie/list').replyOnce(200, {
      genres: [{ id: 1, name: 'Acción' }, { id: 2, name: 'Aventura' }],
    });
  });

  it('debería llamar a handlePageChange cuando cambia la página', async () => {
    render(
      <MemoryRouter>
        <MovieProvider>
          <MovieCatalog />
        </MovieProvider>
      </MemoryRouter>
    );

    const pageInput = screen.getByTestId('page-input');
    fireEvent.change(pageInput, { target: { value: '2' } });

    await waitFor(() => {
      expect(pageInput.value).toBe('2');
      
    });
  });

  it('debería llamar a handleGenreChange cuando cambia el género', async () => {
    render(
      <MemoryRouter>
        <MovieProvider>
          <MovieCatalog />
        </MovieProvider>
      </MemoryRouter>
    );

    const genreSelect = screen.getByTestId('genreSelect');
    fireEvent.change(genreSelect, { target: { value: 'acción' } });

    await waitFor(() => {
      expect(genreSelect.value).toBe('');
      
    });
  });

  it('debería llamar a handleSortChange cuando cambia el orden', async () => {
    render(
      <MemoryRouter>
        <MovieProvider>
          <MovieCatalog />
        </MovieProvider>
      </MemoryRouter>
    );

    const sortSelect = screen.getByTestId('sort-select');
    fireEvent.change(sortSelect, { target: { value: 'popularidad' } });

    await waitFor(() => {
      expect(sortSelect.value).toBe('popularity.desc');
      
    });
  });
});
