import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

  html {
    ${'' /* font-size: 10px; */}
  }

  body {
    color: white;
    background-color: #282c34;
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  main {
    max-width: 1280px;







    margin: 0 auto;
    padding: 0 1.4rem;
  }

  footer {
    margin-top: auto;
    margin-bottom: 0.4rem;
    font-size: 0.7rem;
    text-align: center;

    & > a {
      color: #27a0f1;
      text-decoration: none;
    }
  }

  .sticky {
    position: stuckUpSticky;
    top: 0;
    ${'' /* z-index: 100; */}
  }

  .sticky-wrapper {
    position: relative;
    height: 3rem; /* We need to change this value */

    @media screen and (min-width: 768px) {
      height: 4rem;
    }
  }

  .sticky .sticky-inner {
    padding: 5px 0;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
`;
