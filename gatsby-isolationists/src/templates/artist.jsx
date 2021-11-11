/* eslint-disable no-param-reassign */
/* eslint-disable radix */
/* eslint-disable no-unused-expressions */
import { useTrail } from 'react-spring';
import { graphql } from 'gatsby';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import Image from 'gatsby-plugin-sanity-image';

import { TitleContext } from '../components/Layout';
import { GalleryLayout, SoldTag, PictureBox } from '../styles';
import SEO from '../components/seo';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { addClass } from '../utils/helpers';
import { Modal } from '../components/SimpleModal';
import ModalImg from '../components/ModalImg';

let span2 = 1;
let imgWidth = 18;

const ArtistPage = ({ data }) => {
  const [openModal, setOpen] = useState(false);
  const [index, _setIndex] = useState(-1);
  const indexRef = useRef(index);
  const { galleryLg, mobile } = useBreakpoint();
  const { setTitle, setSubtitle } = useContext(TitleContext);
  const { artist } = data.title;

  useEffect(() => {
    setTitle(artist);
    setSubtitle(true);
  }, [artist]);

  galleryLg ? (imgWidth = 23) : (imgWidth = 18);
  mobile ? (span2 = 1) : (span2 = 2);

  const imageProps = data.pics.edges.map(({ node }, idx) => {
    const { image, subject, dimensions, id, sold } = node;
    const imgTitle = dimensions
      ? `${artist} - ${dimensions.width}x${dimensions.height}cm`
      : `${artist}`;
    return {
      image,
      alt: subject.name,
      title: subject.name,
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

  const pictures = imageProps.map(props => {
    const { image, key, sold, subject, imgTitle, ...rest } = props;
    return (
      <ModalImg
        image={image}
        key={key}
        title={subject}
        sold={sold}
        caption={imgTitle}
        {...rest}
      />
    );
  });

  const setIndex = useCallback(
    idx => {
      idx += imageProps.length;
      idx %= imageProps.length;
      indexRef.current = idx;
      _setIndex(idx);
    },
    [imageProps.length],
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

  const trail = useTrail(imageProps.length, {
    to: { opacity: 1, transform: 'scale(1)' },
    from: { opacity: 0, transform: 'scale(0.3)' },
  });

  return (
    <GalleryLayout width={imgWidth} span2={span2}>
      <SEO title={data.title.artist} />
      {trail.map((props, idx) => {
        const { image, key, ratio, sold, title, imgStyle, imgTitle, ...others } =
          imageProps[idx];
        return (
          <PictureBox className={addClass(ratio)} style={{ ...props }} key={key}>
            <SEO title={data.title.artist} imageSrc={image.asset.url} />
            <Image
              {...image}
              width={imgWidth * span2 * 10} // no span3 now
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

export default ArtistPage;

export const ARTIST_QUERY = graphql`
  query ARTIST_QUERY($slug: String!) {
    pics: allSanityPicture(filter: { artist: { slug: { current: { eq: $slug } } } }) {
      edges {
        node {
          subject {
            name
          }
          id
          sold
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
          dimensions {
            width
            height
          }
        }
      }
    }
    title: sanityArtist(slug: { current: { eq: $slug } }) {
      artist: name
    }
  }
`;
