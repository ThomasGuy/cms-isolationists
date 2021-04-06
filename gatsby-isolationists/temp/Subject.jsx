import { graphql } from 'gatsby';
import React, { useRef } from 'react';
import SanityImageBox from '../src/components/SanityImageBox';
import { GalleryLayout } from '../src/styles';
// import ArtistPage from './Artist';

export const query = graphql`
  query SubjectPageQuery($slug: String!) {
    subject: sanitySubject(slug: { current: { eq: $slug } }) {
      name
    }
    images: allSanityPicture(filter: { subject: { slug: { current: { eq: $slug } } } }) {
      nodes {
        artist {
          name
        }
        id
      }
    }
  }
`;

const SubjectPage = ({ data: { images }, pageContext }) => {
  const layout = useRef(null);
  console.log(pageContext);
  return (
    <>
      <GalleryLayout ref={layout}>
        {images.nodes.map(node => {
          const { artist, id } = node;
          return <SanityImageBox key={id} name={artist.name} alt={artist.name} />;
        })}
      </GalleryLayout>
    </>
  );
};

export default SubjectPage;
