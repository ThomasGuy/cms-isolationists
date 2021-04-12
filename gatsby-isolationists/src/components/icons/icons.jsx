import React from 'react';

const strokeStyle = { vectorEffect: 'non-scaling-stroke' };

export const HamburgerIcon = () => (
  <svg
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid"
    width="1em"
    height="1em">
    <path d="M5 7.5H20" stroke="currentColor" style={strokeStyle} />
    <path d="M5 12.5H20" stroke="currentColor" style={strokeStyle} />
    <path d="M5 17.5H20" stroke="currentColor" style={strokeStyle} />
  </svg>
);

export const ListIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-list"
    viewBox="0 0 16 16">
    <path
      fillRule="evenodd"
      d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
    />
  </svg>
);

export const CaretIcon = () => (
  <svg viewBox="0 0 320 512">
    <path
      d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
      className=""
    />
  </svg>
);
