import { animated } from 'react-spring';
import styled from 'styled-components';
import { mediaQuery } from './mediaQuery';

// Dropdown styles
export const Dropdown = styled.div`
  position: absolute;
  top: calc(var(--navHeight) * 0.8);
  right: 0.4rem;
  width: 25rem;
  max-height: 60rem;
  background-color: var(--bg);
  border: var(--border);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  overflow-y: auto;
  z-index: 20;
  cursor: pointer;

  ${mediaQuery('xs')`
    width: 30rem;
  `};
`;

export const MenuItemStyled = styled.div`
  font-size: 1.8rem;
  height: 5rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: end;
  border-radius: var(--border-radius);

  &:hover {
    background-color: #525357;
  }

  .icon-button {
    margin-right: 0.5rem;
  }

  .icon-button:hover {
    filter: none;
  }

  .icon-right {
    margin-left: auto;
  }

  .pad {
    padding: 0 0.5rem;
  }
`;

export const Menu = styled(animated.div)`
  width: 100%;
`;
