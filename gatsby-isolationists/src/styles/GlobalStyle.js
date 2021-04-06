import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --title: #b88f83;
    --background: #282c34;
    --buttonf: #b22cb2;
    --bg: #242526;
    --bg-accent: #484a4d;
    --text-color: #dadce1;
    --nav-size: 60px;
    --border: 1px solid #474a4d;
    --border-radius: 8px;
    --speed: 500ms;
  }

  body {
    color: var(--text-color);
    background-color: var(--background);
    font-size: 10px;
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
