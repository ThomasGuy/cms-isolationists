import styled from 'styled-components';
import { animated } from 'react-spring';

export const ModalWrapper = styled.div`
  position: fixed;
  display: grid;
  place-content: center center;
  gap: 0;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 200;
  opacity: 1;
  background-color: var(--modal-bg);
`;

export const Title = styled.h1`
  display: grid;
  place-content: center center;
  color: var(--offWhite);
  background-color: var(--modal-black);
  opacity: 0.9;
  padding: 1rem 3rem;
  margin-bottom: 0;
  height: 5rem;
  font-size: 2.7rem;
  line-height: 1.2;
  letter-spacing: 0.12rem;
`;

export const Box = styled(animated.div)`
  position: relative;
  height: calc(100vh - 5rem);
  width: auto;
  display: grid;
  place-content: center center;
  padding: 1rem 5rem;
  background-color: var(--modal-black);

  p {
    text-align: center;
    margin: 0;
    height: 3rem;
    padding-top: 1rem;
    font-size: 1.8rem;
    opacity: 0.8;
  }

  img {
    max-height: calc(100vh - 10rem);
    width: auto;
    object-fit: contain;
  }
`;
