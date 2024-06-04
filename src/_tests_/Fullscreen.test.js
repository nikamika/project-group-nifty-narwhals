import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Fullscreen from '../components/fullscreen-mode/Fullscreen'
import '@testing-library/jest-dom'


it('button renders correctly', () => {
    const { getByRole } = render(
        <Fullscreen />
    )
    expect( getByRole('button')).toBeVisible
});

it('correctly calls the fullscreen function on click', () => {
    const { getByRole } = render(
        <Fullscreen />
    )
    const button = getByRole('button');
    const change = jest.fn();

    button.addEventListener('fullscreenchange', change)
    fireEvent.click(button);
    expect(change).toBeCalled;
});



