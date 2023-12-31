import { createGlobalStyle } from 'styled-components';
import esamanruMedium from './fonts/esamanru-Medium.otf';
import esamanruBold from './fonts/esamanru-Bold.otf';
import esamanruLight from './fonts/esamanru-Light.otf';

import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`

  ${reset}
  @font-face {
    font-family: 'NEXON Lv1 Gothic OTF';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/NEXON Lv1 Gothic OTF.woff')
      format('woff');
  }

    @font-face {
    font-family: 'GongGothicMedium';
    src: url(${esamanruMedium});
  }
  
    @font-face {
    font-family: 'GongGothicLight';
    src: url(${esamanruLight});
  }
  
    @font-face {
    font-family: 'GongGothicBold';
    src: url(${esamanruBold});
  }

  * {
    box-sizing: border-box;
    font-family: 'NEXON Lv1 Gothic OTF', sans-serif;
  }

  body {
    background-color: white;
    transition: background-color 1s ease;
    font-family: "NEXON Lv1 Gothic OTF";
  }

  a {
    text-decoration: none;
    color: black;
  }

  .apexcharts-menu-icon {
    opacity: 0;
  }
`;

export default GlobalStyle;
