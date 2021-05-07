/* eslint-disable no-unused-expressions */
import { animated, useTrail } from 'react-spring';
import { graphql } from 'gatsby';
import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'gatsby-plugin-sanity-image';
import { TitleContext } from '../components/Layout';
import { mediaQuery } from '../styles/mediaQuery';
import { SoldTag } from '../styles';
import SEO from '../components/seo';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { addClass } from '../utils/helpers';

const PictureBox = styled(animated.div)`
  position: relative;
  p {
    margin-top: 0rem;
    text-align: center;
    font-size: 1.6rem;
  }
`;

const Container = styled.div`
  padding: 2rem 0.7rem;
  /* max-width: var(--pageWidth);
  margin: 0 auto; */
  display: grid;
  gap: 1rem;
  grid-template-columns: ${({ width }) => `repeat(auto-fit, minmax(${width}rem, 1fr))`};
  grid-auto-flow: dense;
  align-items: flex-start;

  .tall2 {
    grid-row: span 2;
  }

  .wide2 {
    grid-column: span 2;
  }

  .wide3 {
    grid-column: ${({ span }) => `span ${span}`};
  }

  ${mediaQuery('xs')`
    gap: 1.4rem;
    padding: 2rem 1rem;
  `};

  ${mediaQuery('sm')`
    gap: 2rem;
    padding: 2rem;
 `};

  ${mediaQuery('md')`
    gap: 3rem;
    padding: 3rem;
 `};

  ${mediaQuery('lg')`
    gap: 4rem;
    row-gap: 6rem;
    padding: 6rem;
 `};
`;

let span = 2;
let width = 13;

const ArtistPage = ({ data }) => {
  const breakpoint = useBreakpoint();
  const { setTitle } = useContext(TitleContext);
  const { artist } = data.title;

  if (breakpoint.galleryMd) {
    breakpoint.span ? (span = 3) : (span = 2);
    breakpoint.galleryLg ? (width = 23) : (width = 18);
  } else width = 13;

  useEffect(() => {
    setTitle(artist);
  }, [artist]);

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
      imgStyle: { objectFit: 'cover', width: '100%', height: '100%', marginBottom: '0' },
    };
  });

  const trail = useTrail(imageProps.length, {
    opacity: 1,
    scale: 1,
    from: { opacity: 0, scale: 0.3 },
  });

  return (
    <Container width={width} span={span}>
      {trail.map((props, idx) => {
        const { image, key, ratio, sold, title, imgStyle, imgTitle, ...others } = imageProps[idx];
        return (
          <PictureBox className={addClass(ratio)} style={{ ...props }} key={key}>
            <SEO title={title} imageSrc={image.asset.url} />
            <Image
              {...image}
              width={width * span * 10}
              title={imgTitle}
              style={imgStyle}
              {...others}
            />
            {sold && <SoldTag>SOLD</SoldTag>}
            <p>{title}</p>
          </PictureBox>
        );
      })}
    </Container>
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
