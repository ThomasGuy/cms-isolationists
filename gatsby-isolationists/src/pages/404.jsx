import React from 'react';
import styled from 'styled-components';

const Spaced = styled.div`
  min-height: 20rem;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NotFoundPage = () => (
  <Spaced>
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Spaced>
);

export default NotFoundPage;
