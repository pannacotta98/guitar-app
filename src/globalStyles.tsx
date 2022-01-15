import { createGlobalStyle } from 'styled-components';
import { styleResetsString } from './styleResets';
import backgroundImg from './img/background.jpg';

export const GlobalStyle = createGlobalStyle`

${styleResetsString}

:root {
  /* Colors */
  --main-accent: #48C98F;
  --dark-background: #0F232C;
  --lighter-background: #363636;
  --button-color: #464646;
  --contrasting-text-color: #F5F5F5;
  --dimmer-text-color: #DFDFDF;
  --fretboard-color: #FFE291;
  --string-color: #464646;
  --nut-color: #F5F5F5;
  --fret-color: #B4B4B4;
  --fret-marker-color: #B4B4B4;

  --glass-color: rgba(255, 255, 255, 0.3);

  /* Shadows */
  --main-shadow: 5px 5px 13px 0px rgba(0, 0, 0, 0.2);
  --svg-shadow: 5px 5px 13px rgba(0, 0, 0, 0.2);

  --left-right-page-padding: 2rem;

  /* Breakpoints */
  /* TODO Turns out css variables dont work
     in media queries... */
  --large-phone: 600px;
}

html {
  box-sizing: border-box;
}

body {
  color: var(--dimmer-text-color);
  font-family: 'Be Vietnam Pro', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--dark-background);
  /* background: url(${backgroundImg}) no-repeat center center fixed;
  background-size: cover; */
}

*, *:before, *:after {
  box-sizing: inherit;
}

sup { 
  vertical-align: top;
  font-size: 0.7em;
}

b {
  font-weight: bold;
}


h1, h2, h3, h4, h5, h6 {
  color: var(--contrasting-text-color);
  font-weight: bold;
}

h1 {
  font-size: 3rem;
}

h2 {
  font-size: 2rem;
}

h3 {
  font-size: 1.2rem;
}
`;
