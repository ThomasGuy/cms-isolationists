import React from 'react';
import { ListIcon, HamburgerIcon, CaretIcon } from './icons';

function Icon(props) {
  switch (props.symbol) {
    case 'hamburger':
      return <HamburgerIcon />;
    case 'list':
      return <ListIcon />;
    case 'caret':
      return <CaretIcon />;
    default:
      return <span>Unknown icon: {props.symbol}</span>;
  }
}

export default Icon;
