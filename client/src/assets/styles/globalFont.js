import { createGlobalStyle } from 'styled-components'

import jalnan from '../fonts/AnyConv.com__Jalnan.woff'

export default createGlobalStyle`
  @font-face {
    font-family: 'yg-jalnan';
    src: local('yg-jalnan'), url(${jalnan})
      format('woff');
    font-weight: normal;
    font-style: normal;
  }
  
`
