import { AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { Link } from 'gatsby';
import { Dropdown, MenuItemStyled, Menu } from '../styles';

import CogIcon from '../components/icons/svg/cog.svg';
import ChevronIcon from '../components/icons/svg/chevron.svg';
import ArrowIcon from '../components/icons/svg/arrow.svg';

function MutiDropdownMenu({ artists, subjects, dropdownRef }) {
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

  // function DropdownLink({ children }) {
  //   return <MenuItemStyled>{children}</MenuItemStyled>;
  // }

  return (
    <Dropdown ref={dropdownRef}>
      <AnimatePresence>
        {activeMenu === 'main' && (
          <Menu
            initial={{ height: 0, opacity: 0, x: '-100%' }}
            animate={{ height: 'auto', opacity: 1, x: 0 }}
            exit={{ height: 0, opacity: 0, x: '-100%' }}
            key="main">
            <DropdownItem key="title">Gallery</DropdownItem>
            <DropdownItem
              leftIcon={<CogIcon />}
              rightIcon={<ChevronIcon />}
              goToMenu="Artists"
              key="artist">
              Artists
            </DropdownItem>
            <DropdownItem
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
              <span className="pad">Gallery</span>
              <span className="pad icon-right">Contact</span>
            </DropdownItem>
            {artists.nodes.map(artist => {
              const { slug, id, name } = artist;
              return (
                <MenuItemStyled>
                  <Link to={`/gallery/artist/${slug.current}`} key={id}>
                    {name}
                  </Link>
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
              Subjects
            </DropdownItem>
            {subjects.nodes.map(subject => {
              const { name, week, id, slug } = subject;
              return (
                <MenuItemStyled>
                  <Link to={`/gallery/subject/${slug.current}`} key={id}>
                    {`${week}. ${name}`}
                  </Link>
                </MenuItemStyled>
              );
            })}
          </Menu>
        )}
      </AnimatePresence>
    </Dropdown>
  );
}

export default MutiDropdownMenu;
