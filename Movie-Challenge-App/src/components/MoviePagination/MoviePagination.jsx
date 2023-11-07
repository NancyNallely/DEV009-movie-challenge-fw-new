import PropTypes from 'prop-types';
import './MoviePagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Deshabilitar el botón "Anterior" si currentPage es 1
  const isPreviousDisabled = currentPage === 1;

  // Deshabilitar el botón "Siguiente" si currentPage es igual a totalPages
  const isNextDisabled = currentPage === totalPages;

  return (
    <div className="pagination">
      <button
      data-testid="page-input"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isPreviousDisabled}
      >
        Anterior
      </button>
      <span>Página {currentPage} de {totalPages}</span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isNextDisabled}
      >
        Siguiente
      </button>
    </div>
  );
};

// Validación de propiedades (PropTypes)
Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,   // currentPage debe ser un número y es requerido
  totalPages: PropTypes.number.isRequired,    // totalPages debe ser un número y es requerido
  onPageChange: PropTypes.func.isRequired,    // onPageChange debe ser una función y es requerida
};

export default Pagination;
