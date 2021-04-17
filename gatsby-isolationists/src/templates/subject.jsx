import { graphql } from 'gatsby';
import React, { useRef } from 'react';
import SanityImageBox from '../components/SanityImageBox';

import { GalleryLayout } from '../styles';

const subjectPage = ({ data }) => {
  const layout = useRef(null);
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
    };
  });
  const sorted = propsArray.sort(function (p1, p2) {
    return p2.aspectRatio - p1.aspectRatio;
  });

  return (
    <GalleryLayout ref={layout}>
      {sorted.map(props => {
        const { dimensions, ...others } = props;
        return <SanityImageBox dimensions={dimensions} {...others} />;
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
  }
`;
