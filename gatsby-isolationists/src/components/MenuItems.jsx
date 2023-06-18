/* eslint-disable import/no-cycle */
import React, { useState, useRef, useEffect } from 'react';
import Dropdown from './Dropdown';
import { Linkto, NavDropdown } from '../styles';

const MenuItems = ({ items, depthLevel, prefix }) => {
  const [dropdown, setDropdown] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const handler = evt => {
      if (dropdown && ref.current && !ref.current.contains(evt.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      // CLean up event listener
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [dropdown]);

  return (
    <li ref={ref}>
      {items.submenu ? (
        <NavDropdown>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? 'true' : 'false'}
            onClick={() => setDropdown(prev => !prev)}>
            {items.name}{' '}
          </button>
          <Dropdown
            submenus={items.submenu}
            dropdown={dropdown}
            depthLevel={depthLevel}
            urlPrefix={items.url}
          />
        </NavDropdown>
      ) : (
        <NavDropdown>
          {prefix ? (
            <Linkto to={`${prefix}${items.slug.current}`}>{items.name}</Linkto>
          ) : (
            <Linkto to={`${items.url}`}>{items.name}</Linkto>
          )}
        </NavDropdown>
      )}
    </li>
  );
};

export default MenuItems;
