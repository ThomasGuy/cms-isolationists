/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useRef } from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import styled from 'styled-components';

import Icon from './icons';
import useDetectOutsideClick from '../hooks/useDetectOutsideClick';
import MultiDropdownMenu from '../hooks/AniMutiDropdown';
import { mediaQuery } from '../styles/mediaQuery';

const NavbarItem = styled.div`
  position: relative;
  margin-bottom: 0;

  /* Icon Button */
  .icon-button {
    --button-size: calc(var(--navHeight) * 0.5);
    width: var(--button-size);
    height: var(--button-size);
    border-radius: 50%;
    padding: 5px;
    padding-left: 2px;
    margin: 2px;
    display: grid;
    align-items: center;
    justify-content: center;
    transition: filter 300ms;

    ${mediaQuery('sm')`
      background-color: var(--button);
    `};
  }

  .icon-button:hover {
    filter: brightness(1.3);
  }

  svg {
    fill: var(--text-color);
    width: 25px;
    height: 25px;
  }
`;

const Navbar = styled.nav`
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  max-width: var(--maxWidth);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr auto auto;
  place-items: center center;
  background: var(--bg);
  height: 6rem;
  gap: 0.5rem;
  padding-right: 1rem;

  ${mediaQuery('sm')`
    height: var(--navHeight);
    gap: 2rem;
    padding-right: 2rem;
  `};

  ${mediaQuery('xl')`
    padding: 0 25rem;
  `};

  .title {
    color: var(--offWhite);
    font-size: 1.6rem;
    font-weight: 600;
    margin: 0;
    padding: 0 1rem;

    ${mediaQuery('xs')`
      font-size: 2.4rem;
      `};

    ${mediaQuery('sm')`
      font-size: 2.8rem;
      font-weight: 700;
      letter-spacing: 1.3px;
      line-height: 1.2;
    `};

    ${mediaQuery('md')`
      font-size: 3.2rem;
    `};
  }
`;

function Header({ children }) {
  return <Navbar>{children}</Navbar>;
}

function NavButton({ open, setOpen, children, icon }) {
  const clicked = () => setOpen(state => !state);
  return (
    <NavbarItem>
      <div className="icon-button" onClick={clicked}>
        {icon}
      </div>
      {open && children}
    </NavbarItem>
  );
}

function NavLink({ icon }) {
  return (
    <NavbarItem>
      <Link className="icon-button" to="/">
        {icon}
      </Link>
    </NavbarItem>
  );
}

export default function Nav({ title }) {
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

  return (
    <Header style={{ maxWidth: 'var(pageWidth)' }}>
      <h2 className="title">{title}</h2>
      <NavLink icon={<Icon symbol="home" />} key="Home" />
      <NavButton icon={<Icon symbol="list" />} key="Caret" open={open} setOpen={setOpen}>
        <MultiDropdownMenu artists={artists} subjects={subjects} dropdownRef={dropdownRef} />
      </NavButton>
    </Header>
  );
}
