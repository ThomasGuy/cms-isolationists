import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --red: #ff0000;
    --black: #393939;
    --modal-black: #131111;
    --modal-bg: #1a1a1a;
    --grey: #3A3A3A;
    --gray: var(--grey);
    --lightGrey: #e1e1e1;
    --lightGray: var(---lightGrey);
    --offWhite: #ededed;
    --bs: 0 8px 6px 0 rgba(fa,fa,fa,0.09);
    --title: #b88f83;
    --background: #282c34;
    --button: #b22cb2cc;
    --bg: #242526;
    --bg-accent: #484a4d;
    --text-color: #dadce1;
    --border: 1px solid #474a4d;
    --border-radius: 8px;
    --speed: 500ms;
    --maxWidth: 1750px;
    --pageWidth: 1280px;
    --navHeight: 8rem;
    --playfair: 'Playfair Display', serif;
  }

  html {
    box-sizing: border-box;
    font-size: 62.5%;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    color: var(--text-color);
    background-color: var(--background);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  a {
    color: var(--text-color);
    text-decoration: none;
  }
`;
