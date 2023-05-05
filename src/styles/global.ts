import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    font-family: 'Inter', sans-serif;
  }
  html, body, #root {
    /* min-height: 100%; */
  }
  body {
    background: ${(props) => props.theme.colors.gray900};
    color: ${(props) => props.theme.colors.white};
    font-family: ${(props) => props.theme.fontFamily.sans};
    overflow-y: hidden;
  }
`
