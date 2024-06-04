import { createGlobalStyle } from 'styled-components';

//Setting custom themes
export const themeA = {
    name: "themeA",
    body: "#f2f2f2",
    display: "#d9d9d9",
    FontColor: "#262626",
    src: "TGan48YE9Us"
}

export const themeB = {
    name: "themeB",
    body: "#64564a",
    display: "#d6d0c9",
    FontColor: "#262626",
    src: "YQc4WT0yDH4"
}

export const themeC = {
    name: "themeC",
    body: "#79a9a8",
    display: "#a8bac1",
    FontColor: "#0f3d3d",
    src: "oFm6rbA5BD8"
}


export const themeD = {
    name: "themeD",
    body: "#ab98bc",
    display: "#d6cedb",
    FontColor: "#262626",
    src: "5wRWniH7rt8"
}

export const darkTheme = {
    name: "darkTheme",
    body: "#333333",
    display: "#8c8c8c",
    FontColor: "#f2f2f2",
    src:""
}

//Setting global styles based on current theme. More can be added in future
export const GlobalStyles = createGlobalStyle`
    body {
        background-color: ${props => props.theme.body};
        color: ${props => props.theme.FontColor};
    }
      
    .themeA {
         background-color: hsl(0, 0%, 93%);
            }
    .themeB {
        background-color: hsl(0, 0%, 20%);
        }
    .themeC {
        background-color: hsl(195, 53%, 79%);
        }
    .themeD {
        background-color: #d6cedb;
        }

    .darkTheme {
        background-color: #333333;
        }

    // active theme
    .active{
            border: 3px solid hsl(0, 0%, 87%);
            }

    .toolbar {
        background-color:  ${props => props.theme.body};
            }

    .countdown-container {
        background-color:  ${props => props.theme.display};
    }
    
    .toolTheme {
        background-color: ${props => props.theme.body};
        color: ${props => props.theme.FontColor};
    }

    .toolThemeContent {
        background-color: ${props => props.theme.display};
        color: ${props => props.theme.FontColor};
    }

    .fixed-top {
        background: ${props => props.theme.body} !important;
    }

    .text-white {
        color: ${props => props.theme.FontColor} !important;
    }

`




