import React from 'react';
import { ListIcon, HamburgerIcon, CaretIcon, XIcon, HomeIcon } from './icons';

function Icon(props) {
  switch (props.symbol) {
    case 'hamburger':
      return <HamburgerIcon />;
    case 'list':
      return <ListIcon />;
    case 'caret':
      return <CaretIcon />;
    case 'x':
      return <XIcon />;
    case 'home':
      return <HomeIcon />;
    default:
      return <span>Unknown icon: {props.symbol}</span>;
  }
}

export default Icon;
