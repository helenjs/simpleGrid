import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Header } from '../Header';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const renderWithRouter = (child: any) => {
  return render(
    <Router>
      <Route path="/:id?">
        {child}
      </Route>
    </Router>
  );
}

describe('<ImageGrid />', () => {
  test('renders grid items and images correctly', async() => {
    const {getByTestId} = await renderWithRouter(<Header />);
    const logo = getByTestId('logo');
    expect(logo).toBeInTheDocument();
    fireEvent.click(logo as Element);
    expect(window.location.pathname).toBe('/');
  });
});