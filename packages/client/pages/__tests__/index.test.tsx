import { render, screen } from '@testing-library/react';
import { create } from 'react-test-renderer';
import App from '../index';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText('Hi', { exact: false })).toBeInTheDocument();
  });
  it('matches the snapshot', () => {
    const tree = create(<App />);
    expect(tree).toMatchSnapshot();
  });
});
