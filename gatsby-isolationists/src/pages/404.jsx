import React, { useEffect } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { useTitleContext } from '../hooks/TitleContext';
import SEO from '../components/Seo';

const Spaced = styled.div`
  min-height: 20rem;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    color: aliceblue;
  }

  p {
    font-size: large;
  }

  span {
    font-size: 2rem;
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
      </Link>
    </Spaced>
  );
};

export default NotFoundPage;

export const Head = () => <SEO />;
