import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header text', () => {
  render(<App />);
  const headerElement = screen.getByText(/Input Method Playground/i);
  expect(headerElement).toBeInTheDocument();
});
