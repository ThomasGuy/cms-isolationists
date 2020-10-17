import React from 'react';
import { FaEnvelope, FaRegCopyright } from 'react-icons/fa';

const Footer = () => (
  <footer>
    <FaRegCopyright />
    {` `}
    {new Date().getFullYear()},{` `}
    <a href='mailto:twguy.webdev@gmail.com'>
      Built by TWGuy web development{'  '}
      <FaEnvelope />
    </a>
  </footer>
);

export default Footer;
