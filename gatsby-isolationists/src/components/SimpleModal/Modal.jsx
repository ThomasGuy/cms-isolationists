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
  const modal = useRef();
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

  const handleKeypress = useCallback(evt => {
    if (evt.keyCode === 39) setIndex(idxRef.current + 1);
    if (evt.keyCode === 37) setIndex(idxRef.current - 1);
  }, []);

  const handleClick = useCallback(evt => {
    // console.log('target', evt.target.id);
    if (
      evt.target.id === 'i-next' ||
      evt.target.id === 'next' ||
      evt.target.parentElement.id === 'next'
    ) {
      setIndex(idxRef.current + 1);
    }
    if (
      evt.target.id === 'i-previous' ||
      evt.target.id === 'previous' ||
      evt.target.parentElement.id === 'previous'
    ) {
      setIndex(idxRef.current - 1);
    }
  }, []);

  useEffect(() => {
    const div = modal.current;
    if (div) {
      div.addEventListener('click', handleClick);
      document.addEventListener('keydown', handleKeypress);

      return () => {
        div.removeEventListener('click', handleClick);
        document.removeEventListener('keydown', handleKeypress);
      };
    }
    return [modal];
  }, [handleClick, handleKeypress]);

  return (
    <ModalWrapper ref={modal}>
      <Title>{imgProps[_index].artist}</Title>
      <CloseModal close={() => onCloseRequest()} />
      <Previous />
      <ModalBox>
        <ModalImg imgProp={imgProps[_index]}>{pictures[_index]}</ModalImg>
      </ModalBox>
      <Next />
    </ModalWrapper>
  );
}
