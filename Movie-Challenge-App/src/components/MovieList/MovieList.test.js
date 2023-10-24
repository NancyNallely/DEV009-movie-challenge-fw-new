import { render, screen } from '@testing-library/react';
import MovieList from './MovieList';

const mockMovies = [
  {
    id: 1,
    original_title: 'Película 1',
    release_date: '2022-01-01',
    genre_ids: [1, 2],
    vote_average: 7.5,
    vote_count: 100,
    poster_path: '/poster1.jpg',
  },
  {
    id: 2,
    original_title: 'Película 2',
    release_date: '2022-02-02',
    genre_ids: [3, 4],
    vote_average: 8.0,
    vote_count: 150,
    poster_path: '/poster2.jpg',
  },
];

const mockGenreData = [
  { id: 1, name: 'Género 1' },
  { id: 2, name: 'Género 2' },
  { id: 3, name: 'Género 3' },
  { id: 4, name: 'Género 4' },
];

describe('MovieList', () => {
  it('muestra un mensaje cuando no hay películas', () => {
    render(<MovieList movies={[]} genreData={mockGenreData} />);
    const noMoviesMessage = screen.getByText('No hay películas para mostrar.');
    expect(noMoviesMessage).toBeTruthy();
  });

  it('muestra un mensaje cuando no hay datos de género', () => {
    render(<MovieList movies={mockMovies} genreData={[]} />);
    const noGenreDataMessage = screen.getByText('No hay datos de género disponibles.');
    expect(noGenreDataMessage).toBeTruthy();
  });

});
