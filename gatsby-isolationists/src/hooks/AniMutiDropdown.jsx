import { AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { Link } from 'gatsby';
import { Dropdown, MenuItemStyled, Menu } from '../styles';
import Icon from '../components/icons';

function MutiDropdownMenu({ artists, subjects, dropdownRef }) {
  const [activeMenu, setActiveMenu] = useState('main');

  function DropdownItem({ goToMenu, leftIcon, rightIcon, children }) {
    const clickHandler = () => goToMenu && setActiveMenu(goToMenu);
    return (
      <MenuItemStyled onClick={clickHandler}>
        <span className="icon-button">{leftIcon}</span>
        {children}
        <span className="icon-right">{rightIcon}</span>
      </MenuItemStyled>
    );
  }

  function DropdownLink({ data, midSlug, children }) {
    const { name, slug } = data;
    return (
      <MenuItemStyled>
        <Link to={`/gallery/${midSlug}/${slug.current}`}>{children || name}</Link>
      </MenuItemStyled>
    );
  }

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
              leftIcon={<Icon symbol="cog" />}
              rightIcon={<Icon symbol="chevron" />}
              goToMenu="Artists"
              key="artist">
              Artists
            </DropdownItem>
            <DropdownItem
              leftIcon={<Icon symbol="cog" />}
              rightIcon={<Icon symbol="chevron" />}
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
            <DropdownItem leftIcon={<Icon symbol="arrow" />} goToMenu="main" key="title">
              Artists
            </DropdownItem>
            {artists.nodes.map(artist => (
              <DropdownLink data={artist} midSlug="artist" key={artist.id} />
            ))}
          </Menu>
        )}

        {activeMenu === 'Subjects' && (
          <Menu
            initial={{ height: 0, opacity: 0, x: '110%' }}
            animate={{ height: 'auto', opacity: 1, x: '0%' }}
            exit={{ height: 0, opacity: 0, x: '110%' }}
            key="subject">
            <DropdownItem leftIcon={<Icon symbol="arrow" />} goToMenu="main" key="title">
              Subjects
            </DropdownItem>
            {subjects.nodes.map((subject, idx) => (
              <DropdownLink data={subject} midSlug="subject" key={subject.id}>
                {`${idx + 1}. ${subject.name}`}
              </DropdownLink>
            ))}
          </Menu>
        )}
      </AnimatePresence>
    </Dropdown>
  );
}

export default MutiDropdownMenu;
