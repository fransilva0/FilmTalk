import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }
  
  body {
    font-family: sans-serif;
    background: #DFE2E7;
  }

  a {
    text-decoration: none;
  }

`;
export default GlobalStyle;
