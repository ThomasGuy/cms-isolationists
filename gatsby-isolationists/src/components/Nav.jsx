/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useRef } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';

import Icon from './icons';
import useDetectOutsideClick from '../hooks/useDetectOutsideClick';
import MultiDropdownMenu from '../hooks/AniMutiDropdown';
import { mediaQuery } from '../styles/mediaQuery';
import { useBreakpoint } from '../hooks/useBreakpoint';
import BigNav from './BigNav';
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
  display: grid;
  grid-template-columns: 1fr auto;
  place-items: center center;
  background: var(--bg);
  height: var(--navHeight);
  gap: 1rem;
  padding-right: 1rem;

  ${mediaQuery('sm')`
    height: var(--navHeight);
  `};
`;

const TitleArea = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  place-items: center center;
  gap: 1rem;

  .title {
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

function Header({ children }) {
  return (
    <Navbar id="navigation" aria-labelledby="site-navigation">
      {children}
    </Navbar>
  );
}

export default function Nav({ title, subTitle }) {
  const breakpoint = useBreakpoint();
  const dropdownRef = useRef(null);
  const [open, setOpen] = useDetectOutsideClick(dropdownRef, false);
  const { artists, subjects } = useStaticQuery(graphql`
    query {
      subjects: allSanitySubject(sort: { fields: week, order: DESC }) {
        nodes {
          id
          name
          week
          slug {
            current
          }
        }
      }
      artists: allSanityArtist(sort: { fields: name, order: ASC }) {
        nodes {
          id
          name
          slug {
            current
          }
        }
      }
    }
  `);

  function handleMenu(evt) {
    const eventTarget = evt.currentTarget;
    ariaExpanded(eventTarget);
    setOpen(true);
  }

  useEffect(() => {
    const navButton = document.querySelector('nav button');
    navButton.addEventListener('click', handleMenu);

    return () => navButton.removeEventListener('click', handleMenu);
  }, []);

  return (
    <>
      {breakpoint.navChange ? (
        <BigNav
          title={title}
          subTitle={subTitle}
          artists={artists}
          subjects={subjects}
        />
      ) : (
        <Header>
          <TitleArea>
            <div className="title">{title}</div>
            {subTitle && (
              <p>
                All pictures for sale from £50 <span>email artist</span>
              </p>
            )}
          </TitleArea>
          <NavButton>
            <button
              ref={dropdownRef}
              id="menu-button"
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
        </Header>
      )}
    </>
  );
}
