/* eslint-disable react/prop-types */
import React from 'react';
import { useSpring, config } from 'react-spring';
import { SoldTagModal } from '../../styles';
import { Box } from './modalStyles';

export const ModalImg = ({ imgProp, children }) => {
  const { sold, subject, dimensions } = imgProp;
  const caption = dimensions
    ? `${subject} - ${dimensions.width}x${dimensions.height}cm`
    : `${subject}`;

  const api = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 200,
    config: config.molasses,
  });

  return (
    <Box style={api}>
      {children}
      <p>{caption}</p>
      {sold && <SoldTagModal>SOLD</SoldTagModal>}
    </Box>
  );
};
