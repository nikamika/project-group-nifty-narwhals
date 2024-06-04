import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import ThemeSelection from "../components/themes/ThemeSelection"


it('Theme selection tool renders correctly', () => {
    const { getByTestId } = render(
        <ThemeSelection />
    )
    expect( getByTestId('theme-container')).toBeVisible
    expect( getByTestId('theme-button')).toBeVisible
    expect( getByTestId('theme-button-2')).toBeVisible
    expect( getByTestId('theme-darkmode')).toBeVisible
    expect( getByTestId('theme-video')).toBeVisible
});

it('Theme becomes active on click and correct video renders', () => {
    const { getByTestId } = render(
        <ThemeSelection />
    )

    const button = getByTestId('theme-button-2');
    const themecheck = getByTestId('theme-video');
    fireEvent.click(button);
    expect(button).toContainHTML('active');
    expect(themecheck).toContainHTML('src="https://www.youtube.com/embed/oFm6rbA5BD8?&autoplay=1&mute=1&playlist=oFm6rbA5BD8&loop=1&iv_load_policy=3');    
});

it('Video does not change upon clicking darkmode button and active theme changes', () => {
    const { getByTestId } = render(
        <ThemeSelection />
    )
    const button = getByTestId('theme-button-2');
    const darkmodebutton = getByTestId('theme-darkmode');
    const themecheck = getByTestId('theme-video');

    fireEvent.click(button);
    fireEvent.click(darkmodebutton);
    expect(button).not.toContainHTML('active');
    expect(darkmodebutton).toContainHTML('active');
    expect(themecheck).toContainHTML('src="https://www.youtube.com/embed/oFm6rbA5BD8?&autoplay=1&mute=1&playlist=oFm6rbA5BD8&loop=1&iv_load_policy=3'); 
    expect( getByTestId('theme-video')).toBeVisible
});