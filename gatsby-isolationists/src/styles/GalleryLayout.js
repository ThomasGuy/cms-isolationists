import styled from 'styled-components';
// import { animated } from 'react-spring';

export const GalleryLayout = styled.div`
  display: grid;
  --columns: 1;
  grid-gap: 20px;
  grid-template-columns: repeat(var(--columns), 1fr);
  margin-top: var(--navHeight);
  padding-top: 3rem;

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
