import { render, screen, fireEvent } from '@testing-library/react';
import NavLink from './NavLink';

describe('NavLink componenet', () => {
  it('renders link with href and testId', () => {
    render(
      <NavLink href="test/url" testId="test-link">
        Test Link
      </NavLink>,
    );

    const link = screen.getByTestId('test-link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'test/url');
    expect(link).toHaveTextContent('Test Link');
  });

  it('calls onClose when link is clicked', () => {
    const handleClose = jest.fn();
    render(
      <NavLink href="/test-url" testId="test-link" onClose={handleClose}>
        Test Link
      </NavLink>,
    );

    const linkNav = screen.getByTestId('test-link');
    fireEvent.click(linkNav);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
