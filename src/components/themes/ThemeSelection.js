import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { ThemeContainer, ThemeButton } from "./styles/ThemeSwitching.styled"
import { themeA, themeB, themeC, themeD, GlobalStyles, darkTheme } from "./themes"
import "./background-video/bvideo.css";

const ThemeSelection = () => {
    //initializing theme state
    const [selectedTheme, setSelectedTheme] = useState(themeA);

    //setting the video to initialized theme
    let vidlink = selectedTheme.src;
    let reallink = "https://www.youtube.com/embed/" + vidlink + "?&autoplay=1&mute=1&playlist=" + vidlink + "&loop=1&iv_load_policy=3"

    //Checks for any existing theme saved in the local storage, and if so re-initializes the theme and video
    useEffect(() => {
        const currentTheme = JSON.parse(localStorage.getItem("current-theme"));
        if (currentTheme) {
            setSelectedTheme(currentTheme);
            vidlink = currentTheme.src;
            reallink = "https://www.youtube.com/embed/" + vidlink + "?&autoplay=1&mute=1&playlist=" + vidlink + "&loop=1&iv_load_policy=3"
        }
    }, []);

    //Sets theme and video upon button press, as well as changing the state to initiate reload.
    const themeSetter = (theme) => {
        setSelectedTheme(theme);
        vidlink = theme.src
        reallink = "https://www.youtube.com/embed/" + vidlink + "?&autoplay=1&mute=1&playlist=" + vidlink + "&loop=1&iv_load_policy=3"
        localStorage.setItem("current-theme", JSON.stringify(theme));
    }

    const darkthemeSetter = (darkTheme) => {
        const currentTheme = JSON.parse(localStorage.getItem("current-theme"));
        const currentVideo = currentTheme.src
        darkTheme.src = currentVideo
        themeSetter(darkTheme);
        }

    return (
        <ThemeProvider theme={selectedTheme}>
            <GlobalStyles />
            <ThemeContainer className="position-absolute top-50 end-0 translate-middle-y vstack gap-3 rounded mx-3" data-testid="theme-container">
                <ThemeButton
                    className={`themeA ${selectedTheme === themeA ? "active" : ""}`}
                    onClick={() => themeSetter(themeA)}
                    data-testid="theme-button"
                    ></ThemeButton>
                <ThemeButton
                    className={`themeB ${selectedTheme === themeB ? "active" : ""}`}
                    onClick={() => themeSetter(themeB)}></ThemeButton>
                <ThemeButton
                    className={`themeC ${selectedTheme === themeC ? "active" : ""}`}
                    onClick={() => themeSetter(themeC)}
                    data-testid="theme-button-2"></ThemeButton>
                <ThemeButton
                    className={`themeD ${selectedTheme === themeD ? "active" : ""}`}
                    onClick={() => themeSetter(themeD)}></ThemeButton>
                <ThemeButton
                    className={`darkTheme ${selectedTheme === darkTheme ? "active" : ""}`}
                    onClick={() => darkthemeSetter(darkTheme)}
                    data-testid="theme-darkmode"></ThemeButton>
            </ThemeContainer>
            <div className="video-container" data-testid="theme-video">
                <iframe className="bvideo" src={reallink}></iframe>
            </div>
        </ThemeProvider>

    );

}



export default ThemeSelection;