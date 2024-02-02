import React from 'react';
import { render, cleanup } from '@testing-library/react';
import {InfoPanel, InfoPanelProps} from '../InfoPanel';

afterEach(() => {
  jest.restoreAllMocks();
  cleanup();
});

const propsMock: InfoPanelProps = {
  id: '2',
  description: 'Test description',
  dimensions: '1400 x 1400',
  createdAt: 'Aug 14, 2016'
};

describe('<InfoPanel />', () => {
  test('renders information correctly', async() => {
    const {getByTestId, getByText} = await render(<InfoPanel {...propsMock} />);
    const aside = getByTestId('info-panel');

    const id = getByTestId('info-panel-id');
    const description = getByTestId('info-panel-description');
    const dimension = getByTestId('info-panel-dimension');
    const createdDate = getByTestId('info-panel-created-date');
    expect(aside).toBeInTheDocument();
    expect(id).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(dimension).toBeInTheDocument();
    expect(createdDate).toBeInTheDocument();

    expect(id).toHaveTextContent(`${propsMock.id}`);
    expect(description).toHaveTextContent(`${propsMock.description}`);
    expect(dimension).toHaveTextContent(`${propsMock.dimensions}`);
    expect(createdDate).toHaveTextContent(`${propsMock.createdAt}`);
  });
});