import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LogoNav from './LogoNav';

describe('LogoNav Component', () => {
  it('renders the logo and links to the /league/all page', () => {
    render(<LogoNav />);

    const logoImage = screen.getByAltText('Gridiron Survivor logo');
    expect(logoImage).toBeInTheDocument();

    const linkElement = screen.getByRole('link', {
      name: /Gridiron Survivor logo/i,
    });
    expect(linkElement).toHaveAttribute('href', '/league/all');
  });
});
