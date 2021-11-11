import React from 'react';
// import Image from 'gatsby-plugin-sanity-image';
import styled from 'styled-components';
import { GatsbyImage } from 'gatsby-plugin-image';
import { SoldTagModal } from '../styles';

const Box = styled.div`
  position: relative;
  p {
    text-align: center;
    color: var(--offWhite);
    opacity: 0.8;
    margin: 0;
    margin-top: 0.3rem;
    padding-bottom: 1rem;
    font-size: 3rem;
    line-height: 1.6;
  }
  .dim {
    padding-top: 1rem;
    font-size: 1.4rem;
  }
  img {
    max-height: 700px;
    width: auto;
    object-fit: contain;
  }
`;

const ModalImg = props => {
  const { image, key, sold, title, caption } = props;
  return (
    <Box key={key}>
      <p>{title}</p>
      <GatsbyImage
        image={image.asset.gatsbyImageData}
        alt={title}
        title={title}
        loading="eager"
      />
      <p className="dim">{caption}</p>
      {sold && <SoldTagModal>SOLD</SoldTagModal>}
    </Box>
  );
};

export default ModalImg;
