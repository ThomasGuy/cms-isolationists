/* eslint-disable no-param-reassign */
/* eslint-disable radix */
/* eslint-disable no-unused-expressions */
import { useSpring } from 'react-spring';
import { graphql } from 'gatsby';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import Image from 'gatsby-plugin-sanity-image';

import { TitleContext } from '../components/Layout';
import { GalleryLayout, PictureBox, SoldTag } from '../styles';
import SEO from '../components/seo';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { addClass } from '../utils/helpers';
import { Modal } from '../components/SimpleModal';
import ModalImgBox from '../components/SimpleModal/ModalImgBox';

let span2 = 1;
let imgWidth = 18;

const SubjectPage = ({ data }) => {
  const [openModal, setOpen] = useState(false);
  const [index, _setIndex] = useState(-1);
  const indexRef = useRef(index);
  const { galleryLg, mobile } = useBreakpoint();
  const { setTitle, setSubtitle } = useContext(TitleContext);
  const { subject } = data.title;

  useEffect(() => {
    setTitle(subject);
    setSubtitle(true);
  }, [subject]);

  galleryLg ? (imgWidth = 23) : (imgWidth = 18);
  mobile ? (span2 = 1) : (span2 = 2);

  const propsArray = data.pics.edges.map(({ node }, idx) => {
    const { image, artist, dimensions, id, sold } = node;
    const imgTitle = dimensions
      ? `${subject} - ${dimensions.width}x${dimensions.height}cm`
      : `${subject}`;
    return {
      image,
      alt: artist.name,
      title: artist.name,
      imgTitle,
      key: id,
      idx,
      sold,
      dimensions,
      ratio: image.asset.metadata.dimensions.aspectRatio,
      loading: 'eager',
      imgStyle: { objectFit: 'contain', width: '100%', height: '100%' },
    };
  });

  const pictures = propsArray.map(props => {
    const { image, key, sold, title, imgTitle, ...rest } = props;
    return (
      <ModalImgBox
        image={image}
        key={key}
        title={title}
        sold={sold}
        caption={imgTitle}
        {...rest}
      />
    );
  });

  const setIndex = useCallback(
    idx => {
      idx += propsArray.length;
      idx %= propsArray.length;
      indexRef.current = idx;
      _setIndex(idx);
    },
    [propsArray.length],
  );

  const clickHandler = useCallback(
    evt => {
      if (evt.target.nodeName !== 'IMG') {
        return;
      }
      setIndex(parseInt(evt.target.attributes.idx.value));
      setOpen(true);
    },
    [setIndex, setOpen],
  );

  useEffect(() => {
    window.addEventListener('click', clickHandler, false);

    return () => {
      window.removeEventListener('click', clickHandler, false);
    };
  }, [clickHandler]);

  const { xy, ...rest } = useSpring({
    xy: [0, 0],
    opacity: 1,
    from: { xy: [0, -20], opacity: 0 },
    config: { mass: 1.5, tension: 50, friction: 20 },
  });

  return (
    <GalleryLayout width={imgWidth} span2={span2}>
      <SEO title={data.title.subject} />
      {propsArray.map(props => {
        const { image, title, imgStyle, ratio, sold, key, imgTitle, ...others } = props;

        return (
          <PictureBox
            key={key}
            className={addClass(ratio)}
            style={{
              transform: xy.to((x, y) => `translate(${x}rem, ${y}rem)`),
              ...rest,
            }}>
            <SEO title={data.title.subject} imageSrc={image.asset.url} />
            <Image
              {...image}
              width={imgWidth * span2 * 10} // no span3
              title={imgTitle}
              style={imgStyle}
              {...others}
            />
            {sold && <SoldTag>SOLD</SoldTag>}
            <p>{title}</p>
          </PictureBox>
        );
      })}
      {openModal && (
        <Modal onCloseRequest={() => setOpen(false)}>{pictures[index]}</Modal>
      )}
    </GalleryLayout>
  );
};

export default SubjectPage;

export const SUBJECT_QUERY = graphql`
  query SUBJECT_QUERY($slug: String!) {
    pics: allSanityPicture(filter: { subject: { slug: { current: { eq: $slug } } } }) {
      edges {
        node {
          id
          sold
          artist {
            name
          }
          dimensions {
            width
            height
          }
          image {
            ...ImageWithPreview
            asset {
              gatsbyImageData(placeholder: BLURRED)
              url
              metadata {
                dimensions {
                  aspectRatio
                }
              }
            }
          }
        }
      }
    }
    title: sanitySubject(slug: { current: { eq: $slug } }) {
      subject: name
    }
  }
`;
