/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */

import React, { useRef, useCallback, useState, useEffect } from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { ModalImg } from './ModalImg';
import { Previous, Next } from './Buttons';
import { CloseModal } from './CloseModal';
import { ModalBox, ModalWrapper, Title } from './modalStyles';

export function Modal({ onCloseRequest, index, imgProps }) {
  const idxRef = useRef(index);
  const [_index, _setIndex] = useState(index);

  const pictures = imgProps.map(props => {
    const { image, sold, subject, artist, dimensions } = props;
    return (
      <GatsbyImage
        image={image.asset.gatsbyImageData}
        loading="eager"
        alt={subject}
        title={`${subject} - ${artist}`}
        sold={sold}
        dimensions={dimensions}
      />
    );
  });

  const setIndex = useCallback(
    idx => {
      idx += imgProps.length;
      idx %= imgProps.length;
      idxRef.current = idx;
      _setIndex(idx);
    },
    [imgProps.length],
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

  return (
    <ModalWrapper>
      <Title>{imgProps[_index].artist}</Title>
      <CloseModal close={() => onCloseRequest()} />
      <Previous slider={() => setIndex(idxRef.current - 1)} />
      <ModalBox>
        <ModalImg imgProp={imgProps[_index]}>{pictures[_index]}</ModalImg>
      </ModalBox>
      <Next slider={() => setIndex(idxRef.current + 1)} />
    </ModalWrapper>
  );
}
