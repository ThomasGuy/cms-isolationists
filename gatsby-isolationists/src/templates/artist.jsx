import { graphql } from 'gatsby';
import React, { useRef } from 'react';
import SanityImageBox from '../components/SanityImageBox';

import { GalleryLayout } from '../styles';

const artistPage = ({ data }) => {
  const layout = useRef(null);
  return (
    <GalleryLayout ref={layout}>
      {data.pics.edges.map(({ node }, idx) => {
        const { image, subject, dimensions, id } = node;

        return (
          <SanityImageBox
            image={image.asset.gatsbyImageData}
            alt={subject.name}
            title={subject.name}
            key={id}
            idx={idx}
            dimensions={dimensions}
          />
        );
      })}
    </GalleryLayout>
  );
};

export default artistPage;

export const ARTIST_QUERY = graphql`
  query ARTIST_QUERY($slug: String!) {
    pics: allSanityPicture(
      filter: { artist: { slug: { current: { eq: $slug } } } }
      sort: { fields: image___asset___fluid___aspectRatio, order: DESC }
    ) {
      edges {
        node {
          subject {
            name
          }
          id
          image {
            asset {
              gatsbyImageData(layout: CONSTRAINED, width: 350, placeholder: BLURRED)
            }
          }
          dimensions {
            width
            height
          }
        }
      }
    }
  }
`;
