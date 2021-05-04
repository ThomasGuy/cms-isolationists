/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useRef } from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import styled from 'styled-components';

import Icon from './icons';
import useDetectOutsideClick from '../hooks/useDetectOutsideClick';
import MultiDropdownMenu from '../hooks/AniMutiDropdown';

const NavbarItem = styled.div`
  position: relative;
  margin-bottom: 0;
  /* display: grid;
  place-items: center center; */

  /* Icon Button */
  .icon-button {
    --button-size: calc(var(--navHeight) * 0.6);
    width: var(--button-size);
    height: var(--button-size);
    background-color: var(--button);
    border-radius: 50%;
    padding: 5px;
    padding-left: 3px;
    margin: 2px;
    display: grid;
    place-items: center center;
    justify-content: center;
    transition: filter 300ms;
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

const Container = styled.nav`
  position: fixed;
  z-index: 10;
  display: grid;
  top: 0;
  left: 0;
  right: 0;
  max-width: var(--maxWidth);
  margin: 0 auto;
  grid-template-columns: 1fr auto auto;
  place-items: center center;
  background: var(--bg);
  gap: 2rem;
  height: var(--navHeight);
  padding-right: 2rem;

  .title {
    font-size: 3.2rem;
    color: var(--offWhite);
    line-height: 3.2rem;
  }
`;

function Header({ children }) {
  return <Container>{children}</Container>;
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
    <Header>
      <h2 className="title">{title}</h2>
      <NavLink icon={<Icon symbol="home" />} key="Home" />
      <NavButton icon={<Icon symbol="list" />} key="Caret" open={open} setOpen={setOpen}>
        <MultiDropdownMenu artists={artists} subjects={subjects} dropdownRef={dropdownRef} />
      </NavButton>
    </Header>
  );
}
