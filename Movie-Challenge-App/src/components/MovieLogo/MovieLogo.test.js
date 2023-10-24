import { render } from '@testing-library/react';
import MovieLogo from './MovieLogo.jsx';

test('renderiza el componente MovieLogo', () => {
  render(<MovieLogo />);
  const logoElement = document.querySelector('.logo');

  expect(logoElement).not.toBeNull();
});
