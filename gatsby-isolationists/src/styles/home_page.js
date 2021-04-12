import styled from 'styled-components';

export const PageTitle = styled.div`
  color: var(--title);
  text-align: center;
  margin: 1.5rem 0;
  font-size: 1.2rem;
  font-weight: bold;

  @media screen and (min-width: 368px) {
    font-size: 1.4rem;
  }

  @media screen and (min-width: 568px) {
    font-size: 1.9rem;
  }

  @media screen and (min-width: 768px) {
    font-size: 2.4rem;
    font-weight: 900;
  }

  @media screen and (min-width: 968px) {
    font-size: 2.8rem;
  }
`;

export const FrontPage = styled.article`
  margin: 1rem;
  max-width: 100rem;
  font-size: 1.8rem;
  line-height: 1.6;

  .artistLink {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
  }

  /* .linkItem {
    font-size: 1.3rem;

    &:nth-child(2) {
      margin-left: 1rem;
    }
  } */

  ul > li {
    padding: 8px;
    margin-bottom: 7px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

    &:hover {
      background-color: #242424;
    }

    h3 {
      color: inherit;
      opacity: 0.85;
      font-weight: 400;
      font-size: 2.2.rem;
    }
  }

  span {
    font-size: 2.4rem;
    text-align: center;
    color: var(--title);
  }
`;
