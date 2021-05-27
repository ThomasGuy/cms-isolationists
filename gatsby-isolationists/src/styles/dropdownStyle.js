import { animated } from 'react-spring';
import styled from 'styled-components';

// Dropdown styles
export const Dropdown = styled.div`
  position: absolute;
  top: calc(var(--navHeight) * 0.95);
  right: 0.4rem;
  width: 30rem;
  max-height: 60rem;
  background-color: var(--bg);
  border: var(--border);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  /* overflow: auto; */
  overflow-y: scroll;
  z-index: 20;
`;

export const MenuItemStyled = styled.div`
  font-size: 1.8rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: end;
  border-radius: var(--border-radius);
  padding: 0.5rem;

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
