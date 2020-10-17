/* eslint-disable react/button-has-type */
import React from 'react';
import { Link } from 'gatsby';
import { Head } from '../styles';

const Header = () => (
  <Head>
    <button type='button' className='items'>
      <Link to='/'>Home</Link>
    </button>
    <button type='button' className='items'>
      <Link to='/'>Artists</Link>
    </button>
    <button type='button' className='items'>
      <Link to='/'>Subjects</Link>
    </button>
  </Head>
);

export default Header;
