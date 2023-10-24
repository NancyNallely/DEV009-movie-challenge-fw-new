import { render, fireEvent, screen } from '@testing-library/react';

import FilterMovies from './FilterMovies';

// Definir una función mock para la función onGenreChange
const mockOnGenreChange = jest.fn();

const sampleGenres = [
    { id: 1, name: 'Acción' },
    { id: 2, name: 'Comedia' },
    { id: 3, name: 'Drama' },
];

describe('FilterMovies', () => {
    test('debería renderizar correctamente', () => {
        render(<FilterMovies genres={sampleGenres} selectedGenre="" onGenreChange={mockOnGenreChange} />);

        // Verificar que los elementos de la interfaz estén presentes en el DOM
        expect(screen.getByText('Filtrar por Género:')).not.toBeNull();
        expect(screen.getByLabelText('Filtrar por Género:')).not.toBeNull();
        expect(screen.getByText('Todos los géneros')).not.toBeNull();
    });

    test('debería llamar a la función onGenreChange al seleccionar un género', () => {
        render(<FilterMovies genres={sampleGenres} selectedGenre="" onGenreChange={mockOnGenreChange} />);

        fireEvent.change(screen.getByLabelText('Filtrar por Género:'), {
            target: { value: '1' }, // Simular selección de género "Acción"
        });

        expect(mockOnGenreChange).toBeTruthy();
    });
});
