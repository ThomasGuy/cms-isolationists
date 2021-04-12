import { graphql } from 'gatsby';
import React, { useRef } from 'react';
import SanityImageBox from '../components/SanityImageBox';

import { GalleryLayout } from '../styles';

const subjectPage = ({ data }) => {
  const layout = useRef(null);
  return (
    <GalleryLayout ref={layout}>
      {data.pics.edges.map(({ node }, idx) => {
        const { image, artist, dimensions, id } = node;

        return (
          <SanityImageBox
            image={image}
            alt={artist.name}
            name={artist.name}
            key={id}
            idx={idx}
            dimensions={dimensions}
          />
        );
      })}
    </GalleryLayout>
  );
};

export default subjectPage;

export const SUBJECT_QUERY = graphql`
  query SUBJECT_QUERY($slug: String!) {
    pics: allSanityPicture(
      filter: { subject: { slug: { current: { eq: $slug } } } }
      sort: { fields: image___asset___fluid___aspectRatio, order: DESC }
    ) {
      edges {
        node {
          artist {
            name
          }
          id
          image {
            asset {
              gatsbyImageData(layout: CONSTRAINED, width: 450, placeholder: BLURRED)
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
