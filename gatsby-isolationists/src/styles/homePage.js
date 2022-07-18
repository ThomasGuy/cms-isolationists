import styled from 'styled-components';
import { mediaQuery } from './mediaQuery';

export const FrontPage = styled.article`
  max-width: var(--pageWidth);
  margin: 0 auto;
  font-size: 1.8rem;
  line-height: 1.6;
  padding: 2rem;

  .artistLink {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;

    ${mediaQuery('sm')`
      gap: 2rem;
      padding-left: 4rem;
    `};
  }

  li {
    padding: 8px;
    margin-bottom: 7px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

    &:hover {
      background-color: #242424;
    }

    h2 {
      color: inherit;
      opacity: 0.85;
      font-weight: 400;
      font-size: 1.8rem;
      letter-spacing: 1px;

      ${mediaQuery('sm')`
        font-size: 2.2rem;
        letter-spacing: 1.2px;
      `};
    }
  }

  h3 {
    color: inherit;
    opacity: 0.85;
    font-weight: 400;
    font-size: 2.8.rem;
  }
`;

export const MiniTitle = styled.div`
  font-size: 2.4rem;
  text-align: center;
  color: var(--title);
`;
