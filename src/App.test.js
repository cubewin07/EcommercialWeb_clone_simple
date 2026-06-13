import { render, screen } from '@testing-library/react';
import App from './App';

test('renders main header logo', () => {
  render(<App />);
  // The header logo contains the text "Shoppe" (case-insensitive)
  const logo = screen.getByText(/shoppe/i);
  expect(logo).toBeInTheDocument();
});