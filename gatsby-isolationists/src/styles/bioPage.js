import styled from 'styled-components';

export const Grid = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 2rem;
`;

export const Title = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  #cert {
    font-size: 1rem;
    font-weight: 400;
  }

  @media screen and (min-width: 368px) {
    font-size: 1.8rem;
    font-weight: 600;
    #cert {
      font-size: 1.5rem;
    }
  }

  @media screen and (min-width: 480px) {
    font-size: 2.5rem;
    font-weight: 600;
    #cert {
      font-size: 1.5rem;
    }
  }

  @media screen and (min-width: 668px) {
    font-size: 3.8rem;
    font-weight: 900;
    #cert {
      font-size: 1.9rem;
    }
  }
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

  .comment {
    font-size: 1.8rem;
  }

  .social {
    margin-right: 2rem;
  }

  .email {
    margin-top: auto;
    font-size: 1.6rem;

    @media screen and (min-width: 368px) {
      font-size: 2rem;
    }
  }

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

export const Image = styled.div`
  max-width: ${props => props.width};
  height: auto;
`;

export const Bio = styled.p`
  font-size: 1.5rem;
  line-height: 1.4;
  padding: 0 0.5rem;
  margin-top: 0.5rem;

  @media screen and (min-width: 480px) {
    font-size: 2rem;
    line-height: 1.5;
    padding: 0 1rem;
  }
`;
