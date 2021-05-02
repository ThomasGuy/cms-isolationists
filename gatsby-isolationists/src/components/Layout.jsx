import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { GlobalStyle } from '../styles';
import Footer from './Footer';
import Nav from './Nav';
import useSiteMetadata from '../hooks/useSiteMetadata';
import SEO from './seo';
import { BreakpointProvider } from '../hooks/useBreakpoint';

const ContentStyles = styled.div`
  display: grid;
  justify-content: center;
  gap: 2rem;
  max-width: 1280px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 0 1.2rem;
`;

// these should maybe be synced up with mediaQueries
const queries = {
  or: '(orientation: portrait)', // we can check orientation also
  navChange: '(max-width: 780px)',

  md: '(max-width: 668px)',
  galleryMd: '(min-width: 468px)',
  galleryLg: '(min-width: 910px)',
  span: '(min-width: 580px)',
};

export const TitleContext = createContext({
  title: 'Sporty',
  setTitle: () => {},
});

const Layout = ({ children }) => {
  const [title, setTitle] = useState();
  const { siteTitle, siteDescription } = useSiteMetadata();
  return (
    <>
      <GlobalStyle />
      <SEO title={siteTitle} decription={siteDescription} />
      <ContentStyles>
        <BreakpointProvider queries={queries}>
          <Nav title={title} />
          <TitleContext.Provider value={{ title, setTitle }}>{children}</TitleContext.Provider>
        </BreakpointProvider>
        <Footer />
      </ContentStyles>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
