/* eslint-disable no-param-reassign */
/* eslint-disable radix */
/* eslint-disable no-unused-expressions */
import { useTrail } from 'react-spring';
import { graphql } from 'gatsby';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import Image from 'gatsby-plugin-sanity-image';

import { TitleContext } from '../components/Layout';
import { GalleryLayout, SoldTag, PictureBox } from '../styles';
import SEO from '../components/seo';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { addClass } from '../utils/helpers';
import { Modal } from '../components/SimpleModal/Modal';

let span2 = 1;
let imgWidth = 18;

const ArtistPage = ({ data }) => {
  const [openModal, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const { galleryLg, mobile } = useBreakpoint();
  const { setTitle, setSubtitle } = useContext(TitleContext);
  // const { artist } = data.title;
  console.log(data.title.artist);

  useEffect(() => {
    setTitle(data.title.artist);
    setSubtitle(true);
  }, [data.title.artist]);

  galleryLg ? (imgWidth = 23) : (imgWidth = 18);
  mobile ? (span2 = 1) : (span2 = 2);

  const imgProps = data.pics.edges.map(({ node }, idx) => {
    const { image, subject, dimensions, id, sold, artist } = node;
    const imgTitle = dimensions
      ? `${artist.name} - ${dimensions.width}x${dimensions.height}cm`
      : `${artist.name}`;
    return {
      image,
      alt: subject.name,
      title: subject.name,
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

  const clickHandler = useCallback(
    evt => {
      if (evt.target.nodeName !== 'IMG') {
        return;
      }
      if (evt.target.attributes.idx) {
        setIndex(parseInt(evt.target.attributes.idx.value));
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

  const trail = useTrail(imgProps.length, {
    to: { opacity: 1, transform: 'scale(1)' },
    from: { opacity: 0, transform: 'scale(0.3)' },
  });

  return (
    <GalleryLayout width={imgWidth} span2={span2} modal={openModal}>
      <SEO title={data.title.artist} />
      {trail.map((props, idx) => {
        const { image, key, ratio, sold, alt, title, imgStyle, imgTitle, ...others } =
          imgProps[idx];
        return (
          <PictureBox className={addClass(ratio)} style={{ ...props }} key={key}>
            <SEO title={data.title.artist} imageSrc={image.asset.url} />
            <Image
              {...image}
              width={imgWidth * span2 * 10} // no span3 now
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
      {galleryLg && openModal && (
        <Modal
          onCloseRequest={() => setOpen(false)}
          index={index}
          imgProps={imgProps}
        />
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
          id
          sold
          subject {
            name
          }
          artist {
            name
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
