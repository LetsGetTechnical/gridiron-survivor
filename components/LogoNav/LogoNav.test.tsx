import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LogoNav from './LogoNav';

describe('LogoNav Component', () => {
  it('renders the logo and links to the /league/all page', () => {
    render(<LogoNav />);

    const logoImage = screen.getByTestId('logo-nav');
    expect(logoImage).toBeInTheDocument();

    const linkLogoNav = screen.getByTestId('link-logo-nav');
    expect(linkLogoNav).toHaveAttribute('href', '/league/all');
  });
});
