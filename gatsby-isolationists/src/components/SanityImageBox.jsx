import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components';

const Box = styled.div`
  margin: 0 auto;
  p {
    text-align: center;
    color: var(--white);
    opacity: 0.9;
    font-size: 1.8rem;
    margin: 0;
    margin-top: 0.3rem;
    padding-bottom: 1rem;
    line-height: 1.8;
  }
  .dim {
    color: var(--offWhite);
    opacity: 0.8;
    font-size: 1.5rem;
  }
  img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
`;

const SanityImageBox = ({ image, name, alt, idx, show = false, dimensions = null }) => {
  return (
    <Box>
      <GatsbyImage
        image={image.asset.gatsbyImageData}
        alt={alt}
        idx={idx}
        title={alt}
        loading="eager"
        imgStyle={show && { border: '25px solid rgb(237, 237, 237)' }}
      />
      {name && (
        <p>
          {name}
          {'  '}
          <span className="dim">
            {dimensions ? `  ${dimensions.height}x${dimensions.width}cm` : ``}
          </span>
        </p>
      )}
    </Box>
  );
};

export default SanityImageBox;
