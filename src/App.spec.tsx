import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { App } from './App';
import {BrowserRouter as Router, Route} from "react-router-dom";

afterEach(() => {
  jest.restoreAllMocks();
  cleanup();
});

const renderWithRouter = (child: any) => {
  return render(
    <Router>
      <Route path="/:id?">
        {child}
      </Route>
    </Router>
  );
}

describe('<App />', () => {
  test('render core component correctly and preloader', () => {
    const {getByTestId} = renderWithRouter(<App/>);
    const coreComponent = getByTestId('main');
    expect(coreComponent).toBeInTheDocument();
  });

  test('render preloader before getting data', () => {
    const {getByTestId} = renderWithRouter(<App/>);
    const preloader = getByTestId('preloader');
    expect(preloader).toBeInTheDocument();
  });
});