/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import React, { useRef, useCallback, useState, useEffect } from 'react';
import { config, useSpring } from 'react-spring';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Previous, Next } from './Buttons';
import { CloseModal } from './CloseModal';
import { Box, ModalWrapper, Title } from './modalStyles';
import { SoldTagModal } from '../../styles';

export function Modal({ onCloseRequest, uiIndex, imgProps }) {
  const idxRef = useRef(uiIndex);
  const [index, _setIndex] = useState(uiIndex);

  const pictures = imgProps.map(props => {
    const { image, subject, artist } = props;
    return (
      <GatsbyImage
        image={image}
        loading="eager"
        alt={subject}
        title={`${subject} - ${artist}`}
      />
    );
  });

  const setIndex = useCallback(
    idx => {
      idx += pictures.length;
      idx %= pictures.length;
      idxRef.current = idx;
      _setIndex(idx);
    },
    [pictures.length],
  );

  const handleKeypress = useCallback(
    evt => {
      if (evt.keyCode === 39) setIndex(idxRef.current + 1);
      if (evt.keyCode === 37) setIndex(idxRef.current - 1);
    },
    [setIndex],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeypress);

    return () => {
      document.removeEventListener('keydown', handleKeypress);
    };
  }, [handleKeypress]);

  const { sold, dimensions, subject, artist } = imgProps[index];
  const caption = dimensions
    ? `${subject} - ${dimensions.width}x${dimensions.height}cm`
    : `${subject}`;

  const animate = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 200,
    config: config.molasses,
  });

  return (
    <ModalWrapper>
      <Title>{artist}</Title>
      <CloseModal close={() => onCloseRequest()} />
      <Previous slider={() => setIndex(idxRef.current - 1)} />
      <Box style={animate}>
        {pictures[index]}
        <p>{caption}</p>
        {sold && <SoldTagModal>SOLD</SoldTagModal>}
      </Box>
      <Next slider={() => setIndex(idxRef.current + 1)} />
    </ModalWrapper>
  );
}
