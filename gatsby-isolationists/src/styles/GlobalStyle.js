import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --title: #b88f83;
    --background: #282c34;
    --button: #b22cb2cc;
    --bg: #242526;
    --bg-accent: #484a4d;
    --text-color: #dadce1;
    --border: 1px solid #474a4d;
    --border-radius: 8px;
  }

  html {
    box-sizing: border-box;
    font-size: 62.5%;
    margin: 0;
    padding: 0;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    --navHeight: 6rem;
    color: var(--text-color);
    background-color: var(--background);
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
