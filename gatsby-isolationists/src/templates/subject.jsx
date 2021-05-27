/* eslint-disable no-unused-expressions */
import { useSpring } from 'react-spring';
import { graphql } from 'gatsby';
import React, { useContext, useEffect } from 'react';
import Image from 'gatsby-plugin-sanity-image';
import { TitleContext } from '../components/Layout';

import SEO from '../components/seo';
import { GalleryLayout, PictureBox, SoldTag } from '../styles';
import { addClass } from '../utils/helpers';
import { useBreakpoint } from '../hooks/useBreakpoint';

let span2 = 1;
let imgWidth = 18;

const SubjectPage = ({ data }) => {
  const breakpoint = useBreakpoint();
  const { setTitle } = useContext(TitleContext);
  const { subject } = data.title;

  useEffect(() => {
    setTitle(subject);
  }, [subject]);

  breakpoint.galleryLg ? (imgWidth = 23) : (imgWidth = 18);
  breakpoint.mobile ? (span2 = 1) : (span2 = 2);

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

  const { xy, ...rest } = useSpring({
    xy: [0, 0],
    opacity: 1,
    from: { xy: [0, -10], opacity: 0 },
    config: { mass: 1.5, tension: 50, friction: 30 },
  });

  return (
    <GalleryLayout width={imgWidth} span2={span2}>
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
            <SEO title={title} imageSrc={image.asset.url} />
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
