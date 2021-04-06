import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components';

const Box = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;

  p {
    text-align: center;
    color: var(--white);
    opacity: 0.9;
    font-size: 1.8rem;
    margin: 0;
    padding-bottom: 1rem;
    line-height: 1.8;
  }
  .dim {
    color: var(--offWhite);
    opacity: 0.8;
    font-size: 1.5rem;
  }
`;

const SanityImageBox = ({ image, title, alt, idx, show = false, dimensions = {} }) => (
  <Box>
    <GatsbyImage
      image={image}
      alt={alt}
      idx={idx}
      loading="eager"
      imgStyle={show && { border: '25px solid rgb(237, 237, 237)' }}
    />
    <p>
      {title}
      {'  '}
      <span className="dim">
        {dimensions ? `  ${dimensions.height}x${dimensions.width}cm` : ``}
      </span>
    </p>
  </Box>
);

export default SanityImageBox;
