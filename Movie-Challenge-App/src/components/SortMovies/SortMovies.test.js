import { render, screen, fireEvent } from '@testing-library/react';
import SortMovies from './SortMovies';

describe('SortMovies', () => {
  it('renderiza el componente SortMovies correctamente', () => {
    const selectedSort = 'popularity.desc';
    const onSortChange = jest.fn();

    render(<SortMovies selectedSort={selectedSort} onSortChange={onSortChange} />);

    // Verifica que se renderice la etiqueta "Ordenar por:"
    const labelElement = screen.getByText('Ordenar por:');
    expect(labelElement).toBeTruthy();

    // Verifica que se renderice el selector y tenga las opciones correctas
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeTruthy();

    const options = screen.getAllByRole('option');
    expect(options.length).toBe(6); // Deben haber 6 opciones
  });

  it('maneja correctamente el cambio de selección', () => {
    const selectedSort = 'popularity.desc';
    const onSortChange = jest.fn();

    render(<SortMovies selectedSort={selectedSort} onSortChange={onSortChange} />);

    // Simula el cambio de selección en el selector
    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: 'vote_average.desc' } });

    expect(onSortChange).toBeTruthy();
  });
});
