import { createGlobalStyle } from "styled-components";
import display from "./display";
import reset from "./reset";
import generateSpacings from "./spacing";

const GlobalStyle = createGlobalStyle`
  ${reset}
  
  ${display}
  
  ${generateSpacings()}
  
  .container {
    margin: 0 auto;
    padding-right: 20px;
    padding-left: 20px;
    max-width: 600px;
  }

`;

export default GlobalStyle