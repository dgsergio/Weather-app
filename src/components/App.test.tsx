import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { vi } from 'vitest';
import forecast from '../mocks/forecast.json';

describe('App component', () => {
  beforeEach(() => {
    window.fetch = vi.fn().mockResolvedValueOnce({
      json: async () => forecast,
      ok: true,
    });
    render(<App />);
  });

  it('should render a title', async () => {
    const heading = await screen.findByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it('should render 2 paragraph elements', async () => {
    window.fetch = vi.fn().mockResolvedValue({
      json: JSON.stringify(forecast),
      ok: true,
    });
    const tempP = await screen.findByText('current temperature', {
      exact: false,
    });
    const windP = await screen.findByText('wind speed', {
      exact: false,
    });
    expect(tempP).toBeInTheDocument();
    expect(windP).toBeInTheDocument();
  });

  it('should fetch', async () => {
    const spanTemp = await screen.findByText('25 °C');
    const spanWind = await screen.findByText('5 km/h');
    expect(spanTemp).toBeInTheDocument();
    expect(spanWind).toBeInTheDocument();
    screen.debug();
  });
});
