import { createGlobalStyle } from 'styled-components'
import { reset } from 'styled-reset'

export default createGlobalStyle`
${reset}
* {
  box-sizing: border-box;
}

body {
  background-color: rgb(248, 249, 250);
  min-width: 25rem;
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: 'yg-jalnan';
  letter-spacing: .1rem;
  line-height: 1.5rem;
}

`
