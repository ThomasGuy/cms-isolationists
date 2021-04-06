import React, { useRef } from 'react';
import { getGatsbyImageData } from 'gatsby-source-sanity';
import { GatsbyImage } from 'gatsby-plugin-image';
import sanityConfig from '../../client-config';

import { GalleryLayout } from '../styles';

const subjectPage = ({ pageContext }) => {
  const layout = useRef(null);
  console.log({ pageContext });
  return (
    <GalleryLayout ref={layout}>
      {pageContext.subject.Pictures.map(node => {
        const { image, artist, _key } = node;
        const imageData = getGatsbyImageData(
          image.asset.url,
          { maxWidth: 350 },
          sanityConfig.sanity,
        );
        console.log(imageData);
        return (
          <>
            <GatsbyImage image={imageData} loading="eager" alt={artist.name} key={_key} />
            <h3>{artist.name}</h3>
          </>
        );
      })}
    </GalleryLayout>
  );
};

export default subjectPage;
