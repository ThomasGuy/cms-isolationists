const breakpoints = {
  xs: 360,
  sm: 450,
  md: 640,
  lg: 968,
  xl: 1150,
};

export const mediaQuery = key => style =>
  `@media only screen and (min-width: ${breakpoints[key]}px) { ${style} }`;

export const mediaQueryMax = key => style =>
  `@media only screen and (max-width: ${breakpoints[key]}px) { ${style} }`;

//   ${mediaQuery('sm')`
//     gap: 2rem;
//     padding: 2rem;
//  `};
