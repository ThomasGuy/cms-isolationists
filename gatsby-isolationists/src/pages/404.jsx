import React, { useEffect } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Icon from '../components/icons';
import { useTitleContext } from '../hooks/TitleContext';
import SEO from '../components/Seo';

const Spaced = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    color: #8ba0f2;
  }

  p {
    font-size: large;
  }

  span {
    font-size: 2rem;
    color: #f7b532;
    margin-right: 1rem;
  }
`;

const NotFoundPage = () => {
  const { setPageTitle } = useTitleContext();

  useEffect(() => {
    setPageTitle('404 - page not found');
  }, [setPageTitle]);

  return (
    <Spaced>
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      <br />
      <Link to="/">
        <span role="link">Go Home</span>
        <Icon symbol="home" aria-label="home" />
      </Link>
    </Spaced>
  );
};

export default NotFoundPage;

export const Head = () => <SEO />;
