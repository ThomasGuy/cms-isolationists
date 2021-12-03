import React, { useState, createContext } from 'react';
import styled from 'styled-components';

import { GlobalStyle } from '../styles';
import Footer from './Footer';
import Nav from './Nav';
import useSiteMetadata from '../hooks/useSiteMetadata';
import SEO from './seo';
import { BreakpointProvider } from '../hooks/useBreakpoint';
import { mediaQuery } from '../styles/mediaQuery';

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
    margin-top: 13rem;
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

export const TitleContext = createContext({
  title: 'Sporty',
  subTitle: false,
  setTitle: () => {},
  setSubtitle: () => {},
});

const Layout = ({ children }) => {
  const [title, setTitle] = useState();
  const [subTitle, setSubtitle] = useState(false);
  const { siteTitle, siteDescription } = useSiteMetadata();
  return (
    <>
      <GlobalStyle />
      <SEO title={siteTitle} decription={siteDescription} />
      <ContentStyles>
        <BreakpointProvider queries={queries}>
          <Nav title={title} subTitle={subTitle} />
          <TitleContext.Provider value={{ title, setTitle, subTitle, setSubtitle }}>
            {children}
          </TitleContext.Provider>
        </BreakpointProvider>
        <Footer />
      </ContentStyles>
    </>
  );
};

export default Layout;
