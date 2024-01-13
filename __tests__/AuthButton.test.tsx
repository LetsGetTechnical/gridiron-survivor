import { render, screen } from '@testing-library/react';
import Home from '@/components/Home';

it('should have Login text', () => {
    render(<Home />)

    const findElem = screen.getByText('Login')

    expect(findElem).toBeInTheDocument();
})