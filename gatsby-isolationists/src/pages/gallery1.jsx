import { graphql, useStaticQuery } from 'gatsby';
import React, { useContext, useEffect } from 'react';
import Image from 'gatsby-plugin-sanity-image';

import { addClass, Container, PictureBox, SoldTag } from '../styles';
import { TitleContext } from '../components/Layout';

const Gallery1 = () => {
  const { setTitle } = useContext(TitleContext);

  useEffect(() => {
    setTitle('Demo Gallery');
  }, []);

  const data = useStaticQuery(graphql`
    query GalleryQuery {
      pics: allSanityPicture {
        edges {
          node {
            id
            sold
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
    }
  `);

  return (
    <Container>
      {data.pics.edges.map(({ node }) => {
        const { image, id, sold } = node;
        const { aspectRatio } = image.asset.metadata.dimensions;
        return (
          <PictureBox className={addClass(aspectRatio)} key={id}>
            <Image
              {...image}
              width={500}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            {sold && <SoldTag>SOLD</SoldTag>}
          </PictureBox>
        );
      })}
    </Container>
  );
};

export default Gallery1;
