import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import {ImageGrid, ImageGridProps} from '../ImageGrid';
import { BrowserRouter as Router, Route } from 'react-router-dom';

afterEach(() => {
  jest.restoreAllMocks();
  cleanup();
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '3'
  })
}));

const imageDataMock = [
  {
    id: '2',
    options: {
      url: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=800',
      align: 'center',
      width: '100%',
    },
    data: {
      description: 'Cute cat',
      width: 1000,
      height: 1500,
      createdAt: '2021-10-06T07:16:37.000Z',
    },
  },
  {
    id: '3',
    options: {
      url: 'https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      align: 'center',
      width: '100%',
    },
    data: {
      description: 'Cute kitten picture',
      width: 1000,
      height: 1333,
      createdAt: '2021-11-11T07:16:37.000Z',
    },
  },
];

const propsMock: ImageGridProps = {
  data: imageDataMock,
};

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
    const {getAllByTestId} = await renderWithRouter(<ImageGrid {...propsMock} />);
    const gridItems = getAllByTestId('image-grid');
    gridItems.forEach((gridItem, index) => {
      expect(gridItem).toBeInTheDocument();
      const img = gridItem.querySelector('div');
      expect(img).toHaveStyle(`background-image: url(${imageDataMock[index].options.url})`);
    });
  });

  test('highlight image on selection and check url changing', async() => {
    const {getAllByTestId} = await renderWithRouter(<ImageGrid {...propsMock} />);
    const gridItems = getAllByTestId('image-grid');
    const item = gridItems[0]; // first item
    fireEvent.click(item as Element);
    expect(window.location.pathname).toBe('/2');
  });
});