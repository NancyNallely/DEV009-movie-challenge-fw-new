import { render, screen, fireEvent } from '@testing-library/react';
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

  // Renders the pagination component with the correct props
  it('should render the pagination component with the correct props', () => {
    // Arrange
    const currentPage = 1;
    const totalPages = 5;
    const onPageChange = jest.fn();

    // Act
    render(<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />);

    // Assert
    expect(screen.getByText(`Página ${currentPage} de ${totalPages}`)).toBeTruthy();
    expect(screen.getByText('Anterior')).toBeTruthy();
    expect(screen.getByText('Siguiente')).toBeTruthy();
  });

  // Displays the current page and total number of pages
  it('should display the current page and total number of pages', () => {
    // Arrange
    const currentPage = 3;
    const totalPages = 10;
    const onPageChange = jest.fn();

    // Act
    render(<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />);

    // Assert
    expect(screen.getByText(`Página ${currentPage} de ${totalPages}`)).toBeTruthy();
  });

  // Disables the "Previous" button if current page is 1
  it('should disable the "Previous" button if current page is 1', () => {
    // Arrange
    const currentPage = 1;
    const totalPages = 5;
    const onPageChange = jest.fn();

    // Act
    render(<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />);

    // Assert
    expect(screen.getByText('Anterior')).toBeTruthy();
  });

  // Renders the pagination component with currentPage and totalPages as 0
  it('should render the pagination component with currentPage and totalPages as 0', () => {
    // Arrange
    const currentPage = 0;
    const totalPages = 0;
    const onPageChange = jest.fn();

    // Act
    render(<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />);

    // Assert
    expect(screen.getByText('Página 0 de 0')).toBeTruthy();
  });

  it('disables previous button when currentPage is 1', () => {
    const onPageChangeMock = jest.fn();
    const { getByText } = render(
      <Pagination currentPage={1} totalPages={10} onPageChange={onPageChangeMock} />
    );

    const previousButton = getByText('Anterior');
    expect(previousButton.disabled).toBe(true);
  });

  it('disables next button when currentPage is equal to totalPages', () => {
    const onPageChangeMock = jest.fn();
    const { getByText } = render(
      <Pagination currentPage={10} totalPages={10} onPageChange={onPageChangeMock} />
    );

    const nextButton = getByText('Siguiente');
    expect(nextButton.disabled).toBe(true);
  });

  it('calls onPageChange when previous/next buttons are clicked', () => {
    const onPageChangeMock = jest.fn();
    const { getByText } = render(
      <Pagination currentPage={5} totalPages={10} onPageChange={onPageChangeMock} />
    );

    const previousButton = getByText('Anterior');
    const nextButton = getByText('Siguiente');

    fireEvent.click(previousButton);
    fireEvent.click(nextButton);

    expect(onPageChangeMock).toHaveBeenCalledTimes(2);
    expect(onPageChangeMock).toHaveBeenCalledWith(4);
    expect(onPageChangeMock).toHaveBeenCalledWith(6);
  });
});