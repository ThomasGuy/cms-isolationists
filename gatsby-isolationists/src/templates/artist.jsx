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

const PictureBox = styled(animated.div)`
  position: relative;
`;

const Container = styled.div`
  padding: 2rem;
  display: grid;
  gap: 1rem;
  grid-template-columns: ${({ width }) => `repeat(auto-fit, minmax(${width}rem, 1fr))`};
  grid-auto-flow: dense;

  .tall2 {
    grid-row: span 2;
  }

  .wide2 {
    grid-column: span 2;
  }

  .wide3 {
    grid-column: ${({ span }) => `span ${span}`};
  }

  ${mediaQuery('sm')`
    gap: 2rem;
 `};
`;

function addClass(ratio) {
  switch (true) {
    case ratio < 0.65:
      return 'tall2';
    case ratio > 1.5 && ratio <= 2.4:
      return 'wide2';
    case ratio > 2.4:
      return 'wide3';
    default:
      return '';
  }
}

const artistPage = ({ data }) => {
  const breakpoints = useBreakpoint();
  const { setTitle } = useContext(TitleContext);
  const { name } = data.title;

  let span = 2;
  let width = 14;
  breakpoints.span ? (span = 3) : (span = 2);
  breakpoints.galleryMd ? (width = 20) : (width = 14);

  useEffect(() => {
    setTitle(name);
  }, [name]);

  const imageProps = data.pics.edges.map(({ node }, idx) => {
    const { image, subject, dimensions, id, sold } = node;
    return {
      image,
      alt: subject.name,
      title: subject.name,
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
        const { image, key, ratio, sold, title, imgStyle, ...others } = imageProps[idx];
        return (
          <PictureBox className={addClass(ratio)} style={{ ...props }} key={key}>
            <SEO title={title} imageSrc={image.asset.url} />
            <Image {...image} width={500} title={title} style={imgStyle} {...others} />
            {sold && <SoldTag>SOLD</SoldTag>}
          </PictureBox>
        );
      })}
    </Container>
  );
};

export default artistPage;

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
      name
    }
  }
`;
