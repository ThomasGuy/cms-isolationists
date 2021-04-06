import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { GlobalStyle } from '../styles';
import Footer from './Footer';
import Header from './Header';

export const ContentStyles = styled.div`
  display: flex;
  max-width: 1280px;
  min-height: 100vh;
  flex-direction: column;
  margin: 0 auto;
`;

export const Main = styled.div`
  padding: 0 1.2rem;
  max-width: 100%;
`;

const Layout = ({ children }) => (
  <>
    <GlobalStyle />
    <ContentStyles>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </ContentStyles>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
