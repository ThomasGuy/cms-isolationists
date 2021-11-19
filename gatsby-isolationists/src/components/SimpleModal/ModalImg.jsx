/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { animated, useSpring, config } from 'react-spring';
import { GatsbyImage } from 'gatsby-plugin-image';
import { SoldTagModal } from '../../styles';

const Box = styled(animated.div)`
  height: calc(110vh - 5rem);
  width: auto;
  padding: 1rem 5rem;

  p {
    text-align: center;
    margin: 0;
    height: 3rem;
    padding-top: 1rem;
    font-size: 1.8rem;
    opacity: 0.8;
  }

  img {
    max-height: calc(100vh - 10rem);
    width: auto;
    object-fit: contain;
  }
`;

export const ModalImg = ({ imgProp }) => {
  const { image, sold, subject, artist, dimensions } = imgProp;
  const caption = dimensions
    ? `${subject} - ${dimensions.width}x${dimensions.height}cm`
    : `${subject}`;

  const api = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 100,
    config: config.molasses,
  });

  return (
    <Box style={api}>
      <GatsbyImage
        image={image.asset.gatsbyImageData}
        alt={subject}
        title={`${subject} - ${artist}`}
        loading="eager"
      />
      <p>{caption}</p>
      {sold && <SoldTagModal>SOLD</SoldTagModal>}
    </Box>
  );
};
