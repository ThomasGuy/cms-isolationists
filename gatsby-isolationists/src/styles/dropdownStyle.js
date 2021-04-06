import { motion } from 'framer-motion';
import styled from 'styled-components';

// Dropdown styles
export const Dropdown = styled.div`
  position: absolute;
  top: calc(var(--nav-size) * 0.95);
  right: 0.4rem;
  width: 300px;
  background-color: var(--bg);
  border: var(--border);
  border-radius: var(--border-radius);
  padding: 15px;
  overflow: hidden;
  z-index: 20;
`;

export const MenuItemStyled = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  border-radius: var(--border-radius);
  transition: background var(--speed);
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
`;

export const Menu = styled(motion.div)`
  width: 100%;
`;
