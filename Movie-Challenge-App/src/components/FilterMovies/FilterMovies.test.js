import { render, screen, fireEvent } from '@testing-library/react';
import FilterMovies from './FilterMovies';

describe('Componente FilterMovies', () => {
  const genres = [
    { id: 1, name: 'Acción' },
    { id: 2, name: 'Comedia' },
  ];

  // Define una función ficticia para simular el evento onChange
  const onGenreChange = jest.fn();

  it('se renderiza sin problemas', () => {
    render(<FilterMovies genres={genres} selectedGenre="" onGenreChange={onGenreChange} />);
    const filterMoviesElement = screen.getByTestId('genreSelect');
    expect(filterMoviesElement).toBeTruthy();
  });

  it('muestra la etiqueta y el elemento select', () => {
    render(<FilterMovies genres={genres} selectedGenre="" onGenreChange={onGenreChange} />);
    const labelElement = screen.getByText('Filtrar por Género:');
    const selectElement = screen.getByRole('combobox', { name: 'Género' });
    expect(labelElement).toBeTruthy();
    expect(selectElement).toBeTruthy();
  });

  it('renderiza opciones de género basadas en las props', () => {
    render(<FilterMovies genres={genres} selectedGenre="" onGenreChange={onGenreChange} />);
    const actionOption = screen.getByText('Acción');
    const comedyOption = screen.getByText('Comedia');
    expect(actionOption).toBeTruthy();
    expect(comedyOption).toBeTruthy();
  });

  it('maneja el evento onChange', () => {
    render(<FilterMovies genres={genres} selectedGenre="" onGenreChange={onGenreChange} />);

    const selectElement = screen.getByRole('combobox', { name: 'Género' });

    fireEvent.change(selectElement, { target: { value: '1' } });
    expect(onGenreChange).toHaveBeenCalled();

    fireEvent.change(selectElement, { target: { value: '2' } });
    expect(onGenreChange).toHaveBeenCalled();
  });
});

describe('Componente FilterMovies', () => {
    it('renderiza opciones de género correctamente cuando se proporcionan géneros', () => {
      const genres = [
        { id: 1, name: 'Acción' },
        { id: 2, name: 'Comedia' },
      ];
  
      const { getByText } = render(<FilterMovies genres={genres} selectedGenre="" onGenreChange={() => {}} />);
  
      // Asegurarse de que las opciones se rendericen correctamente
      const option1 = getByText('Acción');
      const option2 = getByText('Comedia');
      const defaultOption = getByText('Todos los géneros');
  
      expect(option1).toBeTruthy();
      expect(option2).toBeTruthy();
      expect(defaultOption).toBeTruthy();
    });
  
    it('no renderiza opciones de género cuando no se proporcionan géneros', () => {
      const { queryByText } = render(<FilterMovies genres={null} selectedGenre="" onGenreChange={() => {}} />);
  
      // Asegurarse de que las opciones no se rendericen
      const option1 = queryByText('Acción');
      const option2 = queryByText('Comedia');
  
      expect(option1).toBeNull();
      expect(option2).toBeNull();
    });
  });
