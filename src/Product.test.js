import { render, screen } from '@testing-library/react';
import App from './Product';

test('renders learn react link', () => {
  render(<Product />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
