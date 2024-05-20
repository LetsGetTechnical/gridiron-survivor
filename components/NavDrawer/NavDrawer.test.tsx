import React from 'react';
import { screen, render } from '@testing-library/dom';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from './NavDrawer';

describe('Drawer', () => {
  it('renders correctly', () => {
    render(
      <Drawer>
        <DrawerTrigger />
        <DrawerContent data-state="open" />
      </Drawer>,
    );
    const element = screen.getByTestId('custom-element');

    console.log(element);
  });
});
