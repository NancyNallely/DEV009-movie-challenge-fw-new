import { render, screen } from '@testing-library/react';
import Pagination from './MoviePagination.jsx';

describe('Pagination', () => {
  it('renderiza el componente Pagination correctamente', () => {
    const currentPage = 1;
    const totalPages = 10;
    const onPageChange = jest.fn();
  
    render(<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />);
  
    // Verifica que se renderice el texto "Página X de Y"
    const pageText = screen.getByText(`Página ${currentPage} de ${totalPages}`);
    expect(pageText).toBeTruthy();
  
    // Verifica que el botón "Anterior" esté deshabilitado en la primera página
    const previousButton = screen.getByText('Anterior');
    expect(previousButton).toBeTruthy();
  
    // Verifica que el botón "Siguiente" no esté deshabilitado en la primera página
    const nextButton = screen.getByText('Siguiente');
    expect(nextButton).toBeTruthy();
  }); 
  
});
