import { createGlobalStyle } from 'styled-components'
import { reset } from 'styled-reset'

export default createGlobalStyle`
${reset}
* {

  box-sizing: border-box;
}
body {
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: 'yg-jalnan';
  letter-spacing: 1px;
  color: rgb(66, 63, 59);
}

#root {
  /* position: relative; */
  height: 100vh;
  overflow: scroll;

  display: flex;
  background-color: #f8fbff;
  padding: 1rem 1rem 0 1rem;
}


`
