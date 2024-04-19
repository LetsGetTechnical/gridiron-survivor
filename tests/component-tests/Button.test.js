import React from "react";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom';
import { Button } from '@/components/ui/Button';

describe('Button', () => {
  test('Renders button and checks for className that mages the background of it, thus confirming the default button rendered.', () => {
    render(<Button/>);
    const defaultButtton = document.querySelector('.bg-orange-600')
    expect(defaultButtton).toBeInTheDocument();
  })
})