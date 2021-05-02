/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useRef } from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import styled from 'styled-components';

import ChevronIcon from '../svg/chevron.svg';
import Icon from './icons';
import useDetectOutsideClick from '../hooks/useDetectOutsideClick';
import MultiDropdownMenu from '../hooks/AniMutiDropdown';

const NavbarNavItem = styled.div`
  position: relative;
  margin-bottom: 0;

  /* Icon Button */
  .icon-button {
    --button-size: calc(var(--navHeight) * 0.6);
    width: var(--button-size);
    height: var(--button-size);
    background-color: var(--button);
    border-radius: 50%;
    padding: 5px;
    margin: 2px;
    display: grid;
    place-items: center center;
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
  display: grid;
  grid-template-columns: 1fr auto auto;
  place-items: center center;
  background: var(--bg);
  gap: 2rem;
  height: var(--navHeight);
  padding-right: 2rem;

  .title {
    font-size: 3.2rem;
    color: var(--title);
    line-height: 3.2rem;
  }
`;

function Header({ children }) {
  return <Container>{children}</Container>;
}

function NavItem({ open, setOpen, children, icon }) {
  const clicked = () => setOpen(state => !state);
  return (
    <NavbarNavItem>
      <div className="icon-button" onClick={clicked}>
        {icon}
      </div>
      {open && children}
    </NavbarNavItem>
  );
}

function NavLink({ icon }) {
  return (
    <NavbarNavItem>
      <Link className="icon-button" to="/">
        {icon}
      </Link>
    </NavbarNavItem>
  );
}

export default function Nav({ title }) {
  const dropdownRef = useRef(null);
  const [open, setOpen] = useDetectOutsideClick(dropdownRef, false);
  const { artists, subjects } = useStaticQuery(graphql`
    query HeaderQuery2 {
      subjects: allSanitySubject(sort: { fields: week, order: ASC }) {
        nodes {
          id
          name
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
      <NavLink icon={<ChevronIcon />} key="Home" />
      <NavItem icon={<Icon symbol="hamburger" />} key="Caret" open={open} setOpen={setOpen}>
        <MultiDropdownMenu artists={artists} subjects={subjects} dropdownRef={dropdownRef} />
      </NavItem>
    </Header>
  );
}
