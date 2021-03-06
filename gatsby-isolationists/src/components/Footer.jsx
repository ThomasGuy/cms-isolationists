import React from 'react';
import { FaEnvelope, FaRegCopyright } from 'react-icons/fa';
import styled from 'styled-components';

const Foot = styled.footer`
  margin-top: auto;
  margin-bottom: 0.4rem;
  font-size: 1.2rem;
  text-align: center;
  color: #27a0f1;
  opacity: 0.8;

  & > a {
    color: #27a0f1;
  }
`;

const Footer = () => (
  <Foot>
    <a href="mailto:twguy.webdev@gmail.com">
      <FaRegCopyright />
      {` `}
      {new Date().getFullYear()} {` `}
      Built by TWGuy web development
      {` `}
      <FaEnvelope />
    </a>
  </Foot>
);

export default Footer;
