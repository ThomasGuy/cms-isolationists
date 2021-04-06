import React, { useRef } from 'react';
import { graphql } from 'gatsby';
import SanityImageBox from '../src/components/SanityImageBox';

import { GalleryLayout } from '../src/styles';

export const query = graphql`
  query ArtistPageQuery($slug: String!) {
    artist: sanityArtist(slug: { current: { eq: $slug } }) {
      name
      slug {
        current
      }
    }
    images: allSanityPicture(filter: { artist: { slug: { current: { eq: $slug } } } }) {
      nodes {
        id
        width
        height
        subject {
          name
        }
      }
    }
  }
`;

const ArtistPage = ({ data: { images, artist }, pageContext }) => {
  const layout = useRef(null);
  console.log(pageContext);

  return (
    <div>
      <GalleryLayout ref={layout}>
        {images.nodes.map(node => {
          const { id, subject } = node;
          return <SanityImageBox name={subject.name} key={id} alt={subject.name} />;
        })}
      </GalleryLayout>
    </div>
  );
};

export default ArtistPage;
