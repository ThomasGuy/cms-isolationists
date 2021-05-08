/* eslint-disable no-unused-expressions */
import { useTrail } from 'react-spring';
import { graphql } from 'gatsby';
import React, { useContext, useEffect } from 'react';
import Image from 'gatsby-plugin-sanity-image';

import { TitleContext } from '../components/Layout';
import { GalleryLayout, SoldTag, PictureBox } from '../styles';
import SEO from '../components/seo';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { addClass } from '../utils/helpers';

let span3 = 2;
let span2 = 1;
let imgWidth = 18;

const ArtistPage = ({ data }) => {
  const breakpoint = useBreakpoint();
  const { setTitle } = useContext(TitleContext);
  const { artist } = data.title;

  useEffect(() => {
    setTitle(artist);
  }, [artist]);

  if (breakpoint.galleryMd) {
    breakpoint.span ? (span3 = 3) : (span3 = 2);
    breakpoint.galleryLg ? (imgWidth = 23) : (imgWidth = 18);
  }

  if (breakpoint.mobile) {
    span2 = 1;
    span3 = 1;
  } else {
    span2 = 2;
  }

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

  const trail = useTrail(imageProps.length, {
    to: { opacity: 1, transform: 'scale(1)' },
    from: { opacity: 0, transform: 'scale(0.3)' },
  });

  return (
    <GalleryLayout width={imgWidth} span3={span3} span2={span2}>
      {trail.map((props, idx) => {
        const { image, key, ratio, sold, title, imgStyle, imgTitle, ...others } = imageProps[idx];
        return (
          <PictureBox className={addClass(ratio)} style={{ ...props }} key={key}>
            <SEO title={title} imageSrc={image.asset.url} />
            <Image
              {...image}
              width={imgWidth * span3 * 10}
              title={imgTitle}
              style={imgStyle}
              {...others}
            />
            {sold && <SoldTag>SOLD</SoldTag>}
            <p>{title}</p>
          </PictureBox>
        );
      })}
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
