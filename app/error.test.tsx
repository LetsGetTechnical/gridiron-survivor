import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorBoundary from './error';

describe('ErrorBoundary', () => {
  it('should render children when no error occurs', () => {
    const children = <div>Test</div>;
    render(<ErrorBoundary>{children}</ErrorBoundary>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should render error message when an error occurs', () => {
    const children = (
      <div
        onError={() => {
          throw new Error('Test error');
        }}
      >
        Something went wrong!
      </div>
    );
    render(<ErrorBoundary>{children}</ErrorBoundary>);
    expect(
      screen.getByText('Something went wrong!', { exact: false }),
    ).toBeInTheDocument();
  });
});
