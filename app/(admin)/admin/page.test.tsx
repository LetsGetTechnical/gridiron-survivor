import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminHomepage from './page';

describe('AdminHomepage', () => {
  test('renders the Admin Homepage', () => {
    render(<AdminHomepage />);
  });

  it('should render a section with the correct data-testid', () => {
    render(<AdminHomepage />);
    const sectionElement = screen.getByTestId('admin-homepage-content');
    expect(sectionElement).toBeInTheDocument();
  });

  it('should contain four paragraphs', () => {
    render(<AdminHomepage />);
    const paragraphs = screen.getAllByText(/Lorem ipsum/);
    expect(paragraphs.length).toBe(4);
  });
});
