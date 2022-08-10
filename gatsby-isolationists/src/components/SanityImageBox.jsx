import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { SoldTag } from '../styles';

const Box = styled.div`
  position: relative;
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

const SanityImageBox = ({
  image,
  title,
  alt,
  idx,
  dimensions = null,
  sold = false,
  ...rest
}) => (
  <Box>
    <GatsbyImage
      image={image.asset.gatsbyImageData}
      alt={alt}
      idx={idx}
      title={alt}
      {...rest}
    />
    {title && (
      <p>
        {title}
        {'  '}
        <span className="dim">
          {dimensions ? `  ${dimensions.height}x${dimensions.width}cm` : ``}
        </span>
      </p>
    )}
    {sold && <SoldTag>SOLD</SoldTag>}
  </Box>
);

export default SanityImageBox;
