/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useRef } from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import styled from 'styled-components';

import Icon from './icons';
import useDetectOutsideClick from '../hooks/useDetectOutsideClick';
import MultiDropdownMenu from '../hooks/AniMutiDropdown';
import { mediaQuery } from '../styles/mediaQuery';
import { useBreakpoint } from '../hooks/useBreakpoint';
import BigNav from './BigNav';

const NavbarItem = styled.div`
  position: relative;
  margin-bottom: 0;

  /* Icon Button */
  .icon-button {
    --button-size: calc(var(--navHeight) * 0.45);
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

    svg {
      fill: var(--text-color);
      width: 20px;
      height: 20px;
    }

    ${mediaQuery('sm')`
      background-color: var(--button);
      svg {
        fill: var(--text-color);
        width: 25px;
        height: 25px;
      }
    `};
  }

  .icon-button:hover {
    filter: brightness(1.3);
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
  height: var(--navHeight);
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
`;

const TitleArea = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  place-items: center center;
  gap: 1rem;
  font-size: 1.6rem;

  .title {
    color: var(--offWhite);
    font-weight: 600;
    margin: 0;
    padding: 0 1rem;
    padding-top: 0.7rem;
    letter-spacing: 1.1px;
    line-height: 1.5rem;

    ${mediaQuery('xs')`
      padding-top: 1rem;
      font-size: 2.4rem;
      `};

    ${mediaQuery('sm')`
      font-size: 2.8rem;
      font-weight: 700;
      letter-spacing: 1.3px;
    `};

    ${mediaQuery('md')`
      font-size: 3.2rem;
    `};
  }

  p {
    color: var(--title);
    font-size: 1.1rem;
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

  return (
    <>
      {breakpoint.navChange ? (
        <BigNav
          title={title}
          dropdownRef={dropdownRef}
          artists={artists}
          subjects={subjects}
          open={open}
          setOpen={setOpen}
        />
      ) : (
        <Header style={{ maxWidth: 'var(pageWidth)' }}>
          <TitleArea>
            <h2 className="title">{title}</h2>
            <p>
              All pictures for sale from £50 <span>email artist</span>
            </p>
          </TitleArea>
          <NavLink icon={<Icon symbol="home" />} key="Home" />
          <NavButton
            icon={<Icon symbol="list" />}
            key="Caret"
            open={open}
            setOpen={setOpen}>
            <MultiDropdownMenu
              artists={artists}
              subjects={subjects}
              dropdownRef={dropdownRef}
            />
          </NavButton>
        </Header>
      )}
    </>
  );
}
