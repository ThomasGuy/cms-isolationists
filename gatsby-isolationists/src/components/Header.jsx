/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useRef } from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';

import CaretIcon from '../svg/caret.svg';
import ChevronIcon from '../svg/chevron.svg';
import { Navbar, NavbarNav, NavbarNavItem } from '../styles';
import useDetectOutsideClick from '../hooks/useDetectOutsideClick';
import MultiDropdownMenu from '../hooks/AniMutiDropdown';

function Nav({ children }) {
  return (
    <Navbar>
      <NavbarNav>{children}</NavbarNav>
    </Navbar>
  );
}

function NavItem({ open, setOpen, children, icon }) {
  return (
    <NavbarNavItem>
      <div className="icon-button" onClick={() => setOpen(state => !state)}>
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

export default function Header() {
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
    <Nav>
      <NavLink icon={<ChevronIcon />} key="Home" />
      <NavItem icon={<CaretIcon />} key="Caret" open={open} setOpen={setOpen}>
        <MultiDropdownMenu artists={artists} subjects={subjects} dropdownRef={dropdownRef} />
      </NavItem>
    </Nav>
  );
}
