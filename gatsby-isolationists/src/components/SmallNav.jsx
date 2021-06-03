import React, { useEffect, useRef } from 'react';

import styled from 'styled-components';
import { mediaQuery } from '../styles/mediaQuery';
import Icon from './icons';
import useDetectOutsideClick from '../hooks/useDetectOutsideClick';
import MultiDropdownMenu from '../hooks/AniMutiDropdown';
import { ariaExpanded } from '../utils/helpers';

const NavButton = styled.div`
  position: relative;

  .icon-button {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    padding: 5px;
    padding-left: 2px;
    margin: 2px;
    display: grid;
    align-items: center;
    justify-content: center;
    transition: filter 300ms;
    outline: none;
    border: none;
    cursor: pointer;
    background-color: var(--button);

    svg {
      color: var(--offWhite);
      width: 25px;
      height: 25px;
    }

    &:hover {
      filter: brightness(1.3);
    }
  }
`;

const Navbar = styled.nav`
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  max-width: var(--pageWidth);
  background: var(--bg);
  height: var(--navHeight);
  display: grid;
  grid-template-columns: 1fr auto;
  place-items: center center;
  gap: 1rem;
  padding-right: 1rem;

  ${mediaQuery('sm')`
    height: var(--navHeight);
  `};

  ${mediaQuery('md')`
    display: none;
  `};
`;

const TitleArea = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  place-items: center center;
  gap: 1rem;

  .heading {
    font-family: var(--playfair);
    font-size: 1.7rem;
    color: var(--offWhite);
    font-weight: 400;
    margin: 0;
    padding: 0 1rem;
    padding-top: 0.7rem;
    line-height: 2rem;
    text-align: center;

    ${mediaQuery('xs')`
      font-size: 2rem;
      `};

    ${mediaQuery('sm')`
      font-size: 2.4rem;
    `};
  }

  p {
    color: var(--title);
    font-size: 1.1rem;
    text-align: center;
    span {
      font-size: 0.9rem;
    }

    ${mediaQuery('xs')`
      font-size: 1.4rem;
      span {
        font-size: 1.2rem;
      }
    `};

    ${mediaQuery('sm')`
      font-size: 1.6rem;
      span {
        font-size: 1.4rem;
      }
    `};
  }
`;

export default function SmallNav({ title, subTitle, artists, subjects }) {
  const dropdownRef = useRef(null);
  const [open, setOpen] = useDetectOutsideClick(dropdownRef, false);

  function handleMenu(evt) {
    const eventTarget = evt.currentTarget;
    ariaExpanded(eventTarget);
    setOpen(true);
  }

  useEffect(() => {
    const navButton = document.querySelector('#burger-menu-button');
    navButton.addEventListener('click', handleMenu);

    return () => navButton.removeEventListener('click', handleMenu);
  }, []);

  return (
    <>
      <Navbar id="navigation" aria-labelledby="site-navigation">
        <TitleArea>
          <div className="heading">{title}</div>
          {subTitle && (
            <p>
              All pictures for sale from £50 <span>email artist</span>
            </p>
          )}
        </TitleArea>
        <NavButton>
          <button
            ref={dropdownRef}
            id="burger-menu-button"
            className="icon-button"
            type="button"
            onClick={() => handleMenu}
            aria-label="menu button"
            aria-haspopup="true"
            aria-expanded="false"
            aria-controls="menu-list">
            <Icon symbol="list" aria-hidden="true" />
            {open && (
              <MultiDropdownMenu
                id="menu-list"
                roll="menu"
                artists={artists}
                subjects={subjects}
              />
            )}
          </button>
        </NavButton>
      </Navbar>
    </>
  );
}
