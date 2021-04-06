import styled from 'styled-components';
// import { animated } from 'react-spring';

export const GalleryLayout = styled.div`
  display: grid;
  --columns: 1;
  grid-gap: 20px;
  grid-template-columns: repeat(var(--columns), 1fr);
  margin-top: 3rem;

  @media screen and (min-width: 576px) {
    --columns: 2;
  }

  @media screen and (min-width: 768px) {
    --columns: 3;
    grid-gap: 30px;
  }

  @media screen and (min-width: 992px) {
    --columns: 4;
  }
`;

export const GalleryTitle = styled.div`
  color: var(--title);
  text-align: center;
  margin-top: 1rem;
  padding-bottom: 0.5rem;
  font-weight: 900;
  font-size: 1.8rem;
  background-color: var(--background);
  border-bottom: 1px solid #000;
  width: 100%;

  @media screen and (min-width: 568px) {
    font-size: 2.2rem;
  }

  @media screen and (min-width: 768px) {
    font-size: 2.6rem;
  }

  @media screen and (min-width: 968px) {
    font-size: 3.2rem;
  }
`;
