import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Supabase Examples', () => {
  render(<App />);
  const linkElement = screen.getByText(/Supabase Examples/i);
  expect(linkElement).toBeInTheDocument();
});
