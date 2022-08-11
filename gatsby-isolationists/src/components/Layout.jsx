import React from 'react';
import styled from 'styled-components';

import { GlobalStyle } from '../styles';
import Footer from './Footer';
import Nav from './Nav';
import { BreakpointProvider } from '../hooks/useBreakpoint';
import { mediaQuery } from '../styles/mediaQuery';
import { TitleContextProvider } from '../hooks/TitleContext';

const ContentStyles = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: var(--maxWidth);
  margin-top: 8rem;
  padding: 0.8rem;

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
          <Footer />
        </TitleContextProvider>
      </BreakpointProvider>
    </ContentStyles>
  </>
);

export default Layout;
