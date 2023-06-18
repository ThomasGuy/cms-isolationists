import styled from 'styled-components';
import { animated } from 'react-spring';
import { Link } from 'gatsby';
import { mediaQuery } from './mediaQuery';

export const DropdownList = styled(animated.ul)`
  position: absolute;
  top: 13rem;
  left: 2rem;
  width: 28rem;
  max-height: 55rem;
  display: grid;
  gap: 0.4rem;
  place-items: center center;
  justify-content: start;
  list-style: none;
  background: var(--bg);
  padding: 1rem;
  z-index: 15;
  overflow-y: auto;
`;

export const Linkto = styled(Link)`
  display: grid;
  place-items: center center;
  justify-content: start;
  text-align: center;
  font-size: 1.6rem;
  font-weight: normal;
  padding: 0.5rem 0.8rem;
  min-width: 26rem;
  min-height: 3rem;
  background: #821888;
  border-radius: 1rem;
  border: 1px solid black;
  box-shadow: 0 2px 4px 0 rgba(202, 173, 173, 0.288);
  a {
    text-decoration: none;
    color: var(--offWhite);
    font-weight: normal;
  }
  &:focus,
  &:hover {
    background: var(--grey);
  }
`;

export const Navbar = styled.nav`
  display: none;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  background: var(--bg);
  height: 11.5rem;
  max-width: ${({ subTitle }) => (subTitle ? 'var(--maxWidth)' : 'var(--pageWidth)')};
  margin: 0 auto;
  padding: 1rem;
  padding-bottom: 2rem;
  grid-template-columns: repeat(4, auto);
  grid-template-rows: repeat(2, auto);
  place-items: center center;
  column-gap: 2rem;
  row-gap: 2rem;
  line-height: 2.2rem;
  text-align: center;
  font-size: 2.6rem;
  letter-spacing: 1px;
  color: var(--offWhite);
  font-weight: 400;

  ${mediaQuery('md')`
    display: grid;
  `};

  ${mediaQuery('lg')`
    font-size: 3rem;
    letter-spacing: 1.1px;
  `};

  ${mediaQuery('xl')`
    font-size: 3.6rem;
  `};

  .heading {
    font-family: var(--playfair);
    margin: 0.7rem;
    padding: 0 1rem;
    padding-top: 0.7rem;
    grid-column: ${({ subTitle }) => (subTitle ? '1 / 3' : '1 / -1')};
    justify-self: ${({ subTitle }) => (subTitle ? 'end' : 'center')};
    letter-spacing: 1.4px;
  }

  .top-menu {

  }

  p {
    justify-self: start;
    grid-column: 3 / 5;
    font-size: 1.5rem;
    color: var(--title);
    margin: 0;
    margin-top: 1rem;
    padding-right: 1rem;

    span {
      font-size: 1.2rem;
    }

    ${mediaQuery('lg')`
      font-size: 1.8rem;
      span {
        font-size: 1.5rem;
      }
    `};
  }
`;

export const NavDropdown = styled.div`
  font-size: 1.8rem;
  background: var(--button);
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 1.5rem;
  box-shadow: var(--bs);
  min-width: 15rem;
  margin: 0;
  margin-bottom: 1rem;

  padding: 0.7rem;
  color: var(--offWhite);
  letter-spacing: 1.2px;
  line-height: 2rem;

  &:focus,
  &:hover {
    color: var(--bg);
    background: purple;
  }
`;

export const NavButtons = styled.ul`
  grid-column: 1 / -1;
  display: grid;
  place-items: center center;
  grid-template-columns: repeat(4, auto);
  gap: 2rem;
`;
