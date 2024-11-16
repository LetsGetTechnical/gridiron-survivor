import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './NavDrawer';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

beforeAll(() => {
  window.scrollTo = jest.fn();
});

describe('DrawerHeader Component', () => {
  it('renders with default classes', () => {
    render(<DrawerHeader data-testid="drawer-header" />);

    const header = screen.getByTestId('drawer-header');
    expect(header).toHaveClass(
      'grid h-16 items-center gap-1.5 px-0 text-center sm:text-left',
    );
  });
});

describe('DrawerFooter Component', () => {
  it('renders with default classes', () => {
    render(<DrawerFooter data-testid="drawer-footer" />);

    const footer = screen.getByTestId('drawer-footer');
    expect(footer).toHaveClass('mt-auto flex flex-col gap-2 p-4');
  });
});

describe('DrawerTitle Component', () => {
  it('renders with default classes', () => {
    render(
      <Drawer>
        <DrawerTitle data-testid="drawer-title" />
      </Drawer>,
    );

    const title = screen.getByTestId('drawer-title');
    expect(title).toHaveClass(
      'mr-auto text-lg font-semibold leading-none tracking-tight',
    );
  });

  it('renders the correct title', () => {
    render(
      <Drawer>
        <DrawerTitle data-testid="drawer-title">Drawer Title</DrawerTitle>
      </Drawer>,
    );

    const title = screen.getByTestId('drawer-title');
    expect(title).toHaveTextContent('Drawer Title');
  });

  it('renders the close button with X icon', () => {
    render(
      <Drawer>
        <DrawerTitle data-testid="drawer-title" />
      </Drawer>,
    );

    const closeButton = screen.getByTestId('drawer-close');
    expect(closeButton).toBeInTheDocument();

    const closeButtonIcon = screen.getByTestId('drawer-close-icon');
    expect(closeButtonIcon).toBeInTheDocument();
  });
});

describe('DrawerDescription Component', () => {
  it('renders with default classes', () => {
    render(
      <Drawer>
        <DrawerDescription data-testid="drawer-description" />
      </Drawer>,
    );

    const description = screen.getByTestId('drawer-description');
    expect(description).toHaveClass('text-sm text-muted-foreground');
  });

  it('renders the correct description', () => {
    render(
      <Drawer>
        <DrawerDescription data-testid="drawer-description">
          Drawer Description
        </DrawerDescription>
      </Drawer>,
    );

    const description = screen.getByTestId('drawer-description');
    expect(description).toHaveTextContent('Drawer Description');
  });
});

describe('DrawerContent Component', () => {
  it('renders with default classes', () => {
    render(
      <Drawer>
        <DrawerTrigger data-testid="drawer-trigger" />
        <DrawerContent data-testid="drawer-content" />
      </Drawer>,
    );
    const trigger = screen.getByTestId('drawer-trigger');
    fireEvent.click(trigger);

    const content = screen.getByTestId('drawer-content');
    expect(content).toHaveClass(
      'fixed inset-x-0 bottom-0 left-auto right-0 top-0 z-50 mt-0 flex h-auto w-4/5 flex-col gap-4 rounded-none border-l border-border bg-background px-4 md:w-2/5 lg:w-1/5',
    );
  });
});

describe('Drawer Component', () => {
  it('Drawer opens and closes properly', async () => {
    render(
      <Drawer>
        <DrawerTrigger data-testid="drawer-trigger">Open</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle data-testid="drawer-title">Title</DrawerTitle>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>,
    );
    const trigger = screen.getByTestId('drawer-trigger');
    expect(trigger.getAttribute('data-state')).toBe('closed');

    fireEvent.click(trigger);
    expect(trigger.getAttribute('data-state')).toBe('open');

    const closeButton = screen.getByTestId('drawer-close');
    fireEvent.click(closeButton);

    await waitFor(() =>
      expect(trigger.getAttribute('data-state')).toBe('closed'),
    );
  });

  it('Drawer sub-components render properly', () => {
    render(
      <Drawer>
        <DrawerTrigger data-testid="drawer-trigger">Open</DrawerTrigger>
        <DrawerContent data-testid="drawer-content">
          <DrawerHeader data-testid="drawer-header">
            <DrawerTitle data-testid="drawer-title">Title</DrawerTitle>
            <DrawerDescription data-testid="drawer-description">
              Description
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter data-testid="drawer-footer">Footer</DrawerFooter>
        </DrawerContent>
      </Drawer>,
    );
    const trigger = screen.getByTestId('drawer-trigger');
    fireEvent.click(trigger);

    expect(screen.getByTestId('drawer-content')).toBeInTheDocument();
    expect(screen.getByTestId('drawer-header')).toBeInTheDocument();
    expect(screen.getByTestId('drawer-title')).toBeInTheDocument();
    expect(screen.getByTestId('drawer-description')).toBeInTheDocument();
    expect(screen.getByTestId('drawer-footer')).toBeInTheDocument();
  });
});
