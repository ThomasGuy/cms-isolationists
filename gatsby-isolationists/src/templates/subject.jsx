import { animated } from 'react-spring';
import { graphql } from 'gatsby';
import React, { useContext, useEffect } from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { TitleContext } from '../components/Layout';

import { GalleryLayout, SoldTag } from '../styles';
import SEO from '../components/seo';

const PictureBox = styled(animated.div)`
  position: relative;
`;

const subjectPage = ({ data }) => {
  const { setTitle } = useContext(TitleContext);
  const { name } = data.title;

  useEffect(() => {
    setTitle(name);
  }, [name]);

  const propsArray = data.pics.edges.map(({ node }, idx) => {
    const { image, artist, dimensions, id, sold } = node;

    return {
      image,
      alt: artist.name,
      name: artist.name,
      key: id,
      idx,
      sold,
      aspectRatio: image.asset.metadata.dimensions.aspectRatio,
      dimensions,
      loading: 'eager',
      imgStyle: { objectFit: 'cover', width: '100%', height: '100%' },
    };
  });
  // eslint-disable-next-line func-names
  // const sorted = propsArray.sort(function (p1, p2) {
  //   return p2.aspectRatio - p1.aspectRatio;
  // });

  return (
    <GalleryLayout>
      {propsArray.map(props => {
        const { image, title, imgStyle, sold, ...others } = props;
        return (
          <PictureBox>
            <SEO title={title} imageSrc={image.asset.url} />
            <GatsbyImage
              image={image.asset.gatsbyImageData}
              title={title}
              imgStyle={imgStyle}
              {...others}
            />
            {sold && <SoldTag>SOLD</SoldTag>}
          </PictureBox>
        );
      })}
    </GalleryLayout>
  );
};

export default subjectPage;

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
            week
            order
          }
          image {
            asset {
              url
              gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED, width: 450)
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
      name
    }
  }
`;
