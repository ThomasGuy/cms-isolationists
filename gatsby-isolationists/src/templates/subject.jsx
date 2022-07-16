/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
import { useSpring } from 'react-spring';
import { graphql } from 'gatsby';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';

import { TitleContext } from '../components/Layout';
import { GalleryLayout, PictureBox, SoldTag } from '../styles';
import SEO from '../components/seo';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { addClass } from '../utils/helpers';
import { Modal } from '../components/SimpleModal/Modal';

let span2 = 1;
let imgWidth = 18;

const SubjectPage = ({ data }) => {
  const [openModal, setOpen] = useState(false);
  const { galleryLg, portrait, mobile } = useBreakpoint();
  const [index, setIndex] = useState(0);
  const { setTitle, setSubtitle } = useContext(TitleContext);

  useEffect(() => {
    setTitle(data.title.subject);
    setSubtitle(true);
  }, [data.title.subject]);

  galleryLg ? (imgWidth = 23) : (imgWidth = 18);
  mobile ? (span2 = 1) : (span2 = 2);

  const imgProps = data.pics.edges.map(({ node }, idx) => {
    const { image, artist, subject, dimensions, id, sold } = node;
    const imgTitle = dimensions
      ? `${subject.name} - ${dimensions.width}x${dimensions.height}cm`
      : `${subject.name}`;
    return {
      image,
      alt: artist.name,
      title: artist.name,
      artist: artist.name,
      subject: subject.name,
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

  const modalGalleryProps = data.pics.edges.map(({ node }) => {
    const { image, subject, artist, sold, dimensions } = node;
    return {
      image,
      artist: artist.name,
      subject: subject.name,
      sold,
      dimensions,
    };
  });

  const clickHandler = useCallback(
    evt => {
      if (evt.target.nodeName !== 'IMG') {
        return;
      }
      if (evt.target.attributes.idx) {
        setIndex(parseInt(evt.target.attributes.idx.value, 10));
        setOpen(true);
      }
    },
    [setOpen, setIndex],
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
    <GalleryLayout width={imgWidth} span2={span2} modal={openModal}>
      <SEO title={data.title.subject} />
      {imgProps.map(props => {
        const { image, key, ratio, sold, alt, title, imgStyle, imgTitle, ...others } =
          props;

        return (
          <PictureBox
            key={key}
            className={addClass(ratio)}
            style={{
              transform: xy.to((x, y) => `translate(${x}rem, ${y}rem)`),
              ...rest,
            }}>
            <SEO title={data.title.subject} imageSrc={image.asset.url} />
            <GatsbyImage
              image={image.asset.gatsbyImageData}
              width={imgWidth * span2 * 10} // no span3
              title={imgTitle}
              style={imgStyle}
              alt={alt}
              {...others}
            />
            {sold && <SoldTag>SOLD</SoldTag>}
            <p>{title}</p>
          </PictureBox>
        );
      })}
      {portrait && openModal && (
        <Modal
          onCloseRequest={() => setOpen(false)}
          uiIndex={index}
          imgProps={modalGalleryProps}
        />
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
          subject {
            name
          }
          image {
            asset {
              gatsbyImageData(height: 800, layout: CONSTRAINED, placeholder: BLURRED)
              url
              metadata {
                dimensions {
                  aspectRatio
                }
              }
            }
          }
          dimensions {
            width
            height
          }
        }
      }
    }
    title: sanitySubject(slug: { current: { eq: $slug } }) {
      subject: name
    }
  }
`;
