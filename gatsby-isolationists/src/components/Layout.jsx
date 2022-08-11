import React from 'react';
import styled from 'styled-components';

import { GlobalStyle } from '../styles';
import Footer from './Footer';
import Nav from './Nav';
import { BreakpointProvider } from '../hooks/useBreakpoint';
import { mediaQuery } from '../styles/mediaQuery';
import { TitleContextProvider } from '../hooks/TitleContext';

const ContentStyles = styled.div`
  max-width: var(--maxWidth);
  min-height: 100vh;
  margin: 0 auto;
  margin-top: 8rem;
  padding: 0;

  ${mediaQuery('sm')`
    margin-top: var(--navHeight);
 `};

  ${mediaQuery('md')`
    margin-top: 11rem;
 `};
`;

// these should maybe be synced up with mediaQueries
const queries = {
  // md: '(max-width: 668px)',
  galleryMd: '(min-width: 450px)',
  galleryLg: '(min-width: 968px)',
  portrait: '(min-width: 650px)',
  mobile: '(max-width: 400px)',
};

const Layout = ({ children }) => (
  <>
    <GlobalStyle />
    <ContentStyles>
      <BreakpointProvider queries={queries}>
        <TitleContextProvider>
          <Nav />
          {children}
        </TitleContextProvider>
      </BreakpointProvider>
      <Footer />
    </ContentStyles>
  </>
);

export default Layout;
