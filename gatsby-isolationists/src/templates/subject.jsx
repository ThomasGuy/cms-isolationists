import React, { useRef } from 'react';
import { getGatsbyImageData } from 'gatsby-source-sanity';
import SanityImageBox from '../components/SanityImageBox';
import sanityConfig from '../../client-config';

import { GalleryLayout } from '../styles';

const subjectPage = ({ pageContext }) => {
  const layout = useRef(null);
  return (
    <GalleryLayout ref={layout}>
      {pageContext.subject.Pictures.map((node, idx) => {
        const { image, artist, dimensions } = node;
        const imageData = getGatsbyImageData(
          image.asset.id,
          { maxWidth: 350 },
          sanityConfig.sanity,
        );

        return (
          <SanityImageBox
            image={imageData}
            alt={artist.name}
            title={artist.name}
            key={image.asset.id}
            idx={idx}
            dimensions={dimensions}
          />
        );
      })}
    </GalleryLayout>
  );
};

export default subjectPage;
