import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminHomepage from './page';

describe('AdminHomepage', () => {
  beforeEach(() => {
    render(<AdminHomepage />);
  });

  it('should render a section with the correct data-testid', () => {
    const sectionElement = screen.getByTestId('admin-homepage-content');
    expect(sectionElement).toBeInTheDocument();
  });

  it('should contain four paragraphs', () => {
    const paragraphs = screen.getAllByText(/Lorem ipsum/);
    expect(paragraphs.length).toBe(4);
  });
});
