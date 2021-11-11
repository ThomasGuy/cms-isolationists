import { AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { Link } from 'gatsby';
import { Dropdown, MenuItemStyled, Menu, Linkto } from '../styles';

import CogIcon from '../components/icons/svg/cog.svg';
import ChevronIcon from '../components/icons/svg/chevron.svg';
import ArrowIcon from '../components/icons/svg/arrow.svg';
import HomeIcon from '../components/icons/svg/house.svg';

function MutiDropdown({ artists, subjects, dropref }) {
  const [activeMenu, setActiveMenu] = useState('main');

  function DropdownItem({ goToMenu, leftIcon, rightIcon, children }) {
    const clickHandler = () => goToMenu && setActiveMenu(goToMenu);
    return (
      <MenuItemStyled onClick={clickHandler}>
        <span className="icon-button">{leftIcon}</span>
        {children}
        {rightIcon && <span className="icon-right">{rightIcon}</span>}
      </MenuItemStyled>
    );
  }

  return (
    <Dropdown ref={dropref}>
      <AnimatePresence>
        {activeMenu === 'main' && (
          <Menu
            initial={{ height: 0, opacity: 0, x: '-100%' }}
            animate={{ height: 'auto', opacity: 1, x: 0 }}
            exit={{ height: 0, opacity: 0, x: '-100%' }}
            key="main">
            <MenuItemStyled key="home" role="menuitem">
              <Link to="/" className="icon-button" role="link" aria-label="homepage">
                <HomeIcon aria-hidden="true" aria-label="home-icon" />
              </Link>
              <Link to="/">Home</Link>
            </MenuItemStyled>
            <DropdownItem
              role="menuitem"
              leftIcon={<CogIcon />}
              rightIcon={<ChevronIcon />}
              goToMenu="Artists"
              key="artist">
              Artists
            </DropdownItem>
            <DropdownItem
              role="menuitem"
              leftIcon={<CogIcon />}
              rightIcon={<ChevronIcon />}
              goToMenu="Subjects"
              key="subject">
              Subjects
            </DropdownItem>
          </Menu>
        )}

        {activeMenu === 'Artists' && (
          <Menu
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            key="artist">
            <DropdownItem leftIcon={<ArrowIcon />} goToMenu="main" key="title">
              Galleries
              <span className="icon-right">Contact</span>
            </DropdownItem>
            {artists.nodes.map(artist => {
              const { slug, id, name } = artist;
              return (
                <MenuItemStyled key={id} role="menuitem">
                  <Link to={`/gallery/artist/${slug.current}`}>{name}</Link>
                  <Link className="icon-right" to={`/biography/${slug.current}`}>
                    About
                  </Link>
                </MenuItemStyled>
              );
            })}
          </Menu>
        )}

        {activeMenu === 'Subjects' && (
          <Menu
            initial={{ height: 0, opacity: 0, x: '110%' }}
            animate={{ height: 'auto', opacity: 1, x: '0%' }}
            exit={{ height: 0, opacity: 0, x: '110%' }}
            key="subject">
            <DropdownItem leftIcon={<ArrowIcon />} goToMenu="main" key="title">
              Galleries
            </DropdownItem>
            {subjects.nodes.map(subject => {
              const { name, week, id, slug } = subject;
              return (
                <Linkto
                  key={id}
                  className="icon-left"
                  role="menuitem"
                  to={`/gallery/subject/${slug.current}`}>
                  {`${week}. ${name}`}
                </Linkto>
              );
            })}
          </Menu>
        )}
      </AnimatePresence>
    </Dropdown>
  );
}

export default MutiDropdown;
