import styled from 'styled-components';
import { mediaQuery } from './mediaQuery';

export const Grid = styled.div`
  display: flex;
  flex-direction: column;
  max-width: var(--pageWidth);
  margin: 0 auto;
  padding: 2rem;

  hr {
    background: var(--title);
    opacity: 0.8;
  }
`;

export const Title = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  #cert {
    font-size: 1rem;
    font-weight: 400;
  }

  ${mediaQuery('xs')`
    font-size: 1.8rem;
    font-weight: 600;
    #cert {
      font-size: 1.5rem;
    }
  `};

  ${mediaQuery('sm')`
    font-size: 2.5rem;
    font-weight: 600;
    #cert {
      font-size: 1.5rem;
    }
  `};

  ${mediaQuery('md')`
    font-size: 3.8rem;
    font-weight: 900;
    #cert {
      font-size: 1.9rem;
    }
  `};
`;

export const Row = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 2rem;

  & > * {
    flex: 0 1 100%;

    &:not(:first-child) {
      margin-left: 2rem;
    }
  }
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;

  .social {
    margin-left: 2rem;

    img {
      margin-bottom: 0;
    }

    ${mediaQuery('sm')`
      margin-left: 3rem;
  `};
  }

  .email {
    margin-top: auto;
    font-size: 1.6rem;

    ${mediaQuery('xs')`
      font-size: 2rem;
    `};
  }

  a {
    text-decoration: none;
    color: white;
  }

  ul {
    list-style-type: none;
    font-size: 2rem;
    li {
      padding: 8px;
      margin-bottom: 7px;
      color: #ffffff;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
      &:hover {
        background-color: #242424;
      }
    }
  }
`;

export const OutsideLink = styled.a`
  font-size: 1.6rem;
  padding: 8px;
  padding-left: 2rem;
  width: 100%;
  margin-bottom: 7px;
  color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  &:hover {
    background-color: #242424;
  }

  ${mediaQuery('sm')`
    font-size: 2rem;
    padding-left: 4rem;
  `};
`;

export const Image = styled.div`
  max-width: ${props => props.width};
  height: auto;
`;

export const Bio = styled.p`
  font-size: 1.4rem;
  line-height: 1.4;
  padding: 0 0.5rem;
  margin-top: 0.5rem;

  ${mediaQuery('xs')`
    font-size: 1.6rem;
    line-height: 1.5;
    `};

  ${mediaQuery('sm')`
    font-size: 1.8rem;
    line-height: 1.6;
    padding: 0 1rem;
    `};
`;

export const Comment = styled.p`
  font-size: 1.4rem;
  line-height: 1.4;
  padding: 0 0.5rem;
  margin-top: 0.5rem;

  ${mediaQuery('xs')`
    font-size: 1.6rem;
    line-height: 1.5;
  `};

  ${mediaQuery('sm')`
    font-size: 1.8rem;
    line-height: 1.6;
    padding: 0 1rem;
  `};
`;
