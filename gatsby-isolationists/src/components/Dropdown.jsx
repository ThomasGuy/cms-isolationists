import React from 'react';
import { useSpring } from 'react-spring';
// eslint-disable-next-line import/no-cycle
import MenuItems from './MenuItems';
import { DropdownList } from '../styles';

const Dropdown = ({ submenus, dropdown, depthLevel, urlPrefix }) => {
  // eslint-disable-next-line no-param-reassign
  depthLevel += 1;
  const dropdownClass = depthLevel > 1 ? 'dropdown-submenu' : '';

  // abit of animation for thr non visually impared
  const config = { mass: 20, tension: 100, friction: 76 };
  const springProps = useSpring({
    xy: [0, 0],
    opacity: 1,
    from: { opacity: 0, xy: [-200, 0] },
    ...config,
  });

  return (
    <DropdownList
      className={`dropdown ${dropdownClass} ${dropdown ? 'show' : ''}`}
      style={{ ...springProps }}>
      {submenus.map(submenu => (
        <MenuItems
          items={submenu}
          key={submenu.id}
          depthLevel={depthLevel}
          prefix={urlPrefix}
        />
      ))}
    </DropdownList>
  );
};

export default Dropdown;
