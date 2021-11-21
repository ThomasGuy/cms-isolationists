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
  background-color: #1a1a1a;
`;

export const ModalBox = styled.div`
  position: relative;
  width: auto;
  height: calc(100vh - 5rem);
  background-color: #131111;
`;

export const Title = styled.h1`
  text-align: center;
  color: var(--offWhite);
  background-color: #131111;
  opacity: 0.8;
  padding: 0.3rem 3rem;
  padding-bottom: 1rem;
  margin-bottom: 0;
  height: 5rem;
  font-size: 3rem;
  line-height: 1.6;
  letter-spacing: 0.12rem;
`;

export const Box = styled(animated.div)`
  height: calc(100vh - 5rem);
  width: auto;
  padding: 1rem 5rem;

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
