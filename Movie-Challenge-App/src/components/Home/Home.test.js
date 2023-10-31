import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './Home';

import '@testing-library/jest-dom';

describe('Home Component', () => {
  it('debe renderizar correctamente', () => {
    const { getByText } = render(
      <Router>
        <Home />
      </Router>
    );

    expect(getByText('Bienvenidos a Adicción Visual')).toBeInTheDocument();
    expect(getByText('Catálogo de Películas')).toBeInTheDocument();
  });
});
