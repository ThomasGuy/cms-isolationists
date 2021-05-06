import styled from 'styled-components';
import { animated } from 'react-spring';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  grid-auto-flow: dense;
  gap: 2rem;
  .tall2 {
    grid-row: span 2;
  }
  .wide2 {
    grid-column: span 2;
  }
  .wide3 {
    grid-column: span 3;
  }
`;

export const PictureBox = styled(animated.div)`
  position: relative;
`;

export function addClass(ratio) {
  switch (true) {
    case ratio < 0.65:
      return 'tall2';
    case ratio > 1.5 && ratio < 2.4:
      return 'wide2';
    case ratio >= 2.4:
      return 'wide3';
    default:
      return '';
  }
}
