import { animated } from 'react-spring';
import styled from 'styled-components';
import { mediaQuery } from './mediaQuery';

export const GalleryLayout = styled.div`
  display: grid;
  margin: 0 auto;
  grid-gap: 1rem;
  grid-template-columns: ${({ width }) => `repeat(auto-fit, minmax(${width}rem, 1fr))`};
  grid-auto-flow: dense;
  padding: 2rem 0.7rem;
  align-items: flex-start;
  /* overflow: hidden; */
  overflow: ${props => (props.modal ? 'hidden' : 'auto')};

  .tall2 {
    grid-row: ${({ span2 }) => `span ${span2}`};
  }

  .wide2 {
    grid-column: ${({ span2 }) => `span ${span2}`};
  }

  ${mediaQuery('xs')`
    gap: 1.4rem;
    padding: 2rem 1rem;
  `};

  ${mediaQuery('sm')`
    gap: 2rem;
    padding: 2rem;
 `};

  ${mediaQuery('md')`
    gap: 3rem;
    padding: 3rem;
 `};

  ${mediaQuery('xl')`
    gap: 6rem;
    padding: 4rem;
 `};
`;

export const PictureBox = styled(animated.div)`
  position: relative;
  p {
    margin-top: 0rem;
    text-align: center;
    font-size: 1.6rem;
    opacity: 0.8;
  }

  .picTitle {
    opacity: 0.9;
    margin-top: 0.7rem;
    font-size: 2rem;
  }
`;
