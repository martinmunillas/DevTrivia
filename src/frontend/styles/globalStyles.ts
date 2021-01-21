import { createGlobalStyle } from 'styled-components';
import { font } from './styleVars';

interface GlobalStyleProps {}

const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  body {
    margin: 0;
    padding: 0;
    font-family: ${font};
    box-sizing: border-box;
    background-color: #dddfea;
  }
  a {
  }
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: #ffffff;
  }::-webkit-scrollbar {
    width: 12px;
    height: 12px;
   }
   ::-webkit-scrollbar-thumb {
    background: linear-gradient(0deg, #b56ff8 35%,#f75176 76%);
    border-radius: 15px;
   }
   ::-webkit-scrollbar-thumb:hover{
    background: linear-gradient(13deg, #B56FF8 14%,#f75176 64%);
   }
   ::-webkit-scrollbar-track{
    background: transparent;
    height: 300px;
   }
   ::-webkit-scrollbar {
    height: 0px; /* For Chrome, Safari, and Opera */
}
`;
export default GlobalStyle;
