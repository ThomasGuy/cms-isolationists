import React from 'react';
import {
  ListIcon,
  HamburgerIcon,
  CaretIcon,
  XIcon,
  HomeIcon,
  CogIcon,
  ChevronIcon,
  ArrowIcon,
  CloseIcon,
  LeftArrow,
  RightArrow,
} from './icons';

function Icon({ symbol }) {
  switch (symbol) {
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
    case 'cog':
      return <CogIcon />;
    case 'chevron':
      return <ChevronIcon />;
    case 'arrow':
      return <ArrowIcon />;
    case 'close':
      return <CloseIcon />;
    case 'Larrow':
      return <LeftArrow />;
    case 'Rarrow':
      return <RightArrow />;
    default:
      return <span>Unknown icon: {symbol}</span>;
  }
}

export default Icon;
