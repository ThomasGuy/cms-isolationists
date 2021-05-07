/* eslint-disable no-unused-expressions */
import { animated } from 'react-spring';
import { graphql } from 'gatsby';
import React, { useContext, useEffect } from 'react';
import Image from 'gatsby-plugin-sanity-image';
import styled from 'styled-components';
import { TitleContext } from '../components/Layout';

import SEO from '../components/seo';
import { SoldTag } from '../styles';
import { addClass } from '../utils/helpers';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { mediaQuery } from '../styles/mediaQuery';

const GalleryLayout = styled.div`
  display: grid;
  max-width: var(--pageWidth);
  margin: 0 auto;
  grid-gap: 1rem;
  grid-template-columns: ${({ width }) => `repeat(auto-fit, minmax(${width}rem, 1fr))`};
  grid-auto-flow: dense;
  padding: 2rem 0.7rem;
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
    gap: 4rem;
 `};
`;

const PictureBox = styled(animated.div)`
  position: relative;

  p {
    margin-top: 0rem;
    text-align: center;
    font-size: 1.6rem;
  }
`;

const SubjectPage = ({ data }) => {
  const { setTitle } = useContext(TitleContext);
  const breakpoint = useBreakpoint();
  const { subject } = data.title;
  let span = 2;
  let imgWidth = 13;

  if (breakpoint.galleryMd) {
    breakpoint.span ? (span = 3) : (span = 2);
    breakpoint.galleryLg ? (imgWidth = 18) : (imgWidth = 16);
  }

  useEffect(() => {
    setTitle(subject);
  }, [subject]);

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
      ratio: image.asset.metadata.dimensions.aspectRatio,
      loading: 'eager',
      imgStyle: { objectFit: 'contain', width: '100%', height: '100%' },
    };
  });

  return (
    <GalleryLayout width={imgWidth} span={span}>
      {propsArray.map(props => {
        const { image, title, imgStyle, ratio, sold, key, imgTitle, ...others } = props;

        return (
          <PictureBox key={key} className={addClass(ratio)}>
            <SEO title={title} imageSrc={image.asset.url} />
            <Image
              {...image}
              width={imgWidth * span * 10}
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
    title: sanitySubject(slug: { current: { eq: $slug } }) {
      subject: name
    }
  }
`;
