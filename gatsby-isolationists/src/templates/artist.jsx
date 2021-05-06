import { graphql } from 'gatsby';
import React, { useContext, useEffect } from 'react';
import Image from 'gatsby-plugin-sanity-image';
import { useTrail } from 'react-spring';
import { TitleContext } from '../components/Layout';

import { Container, PictureBox, addClass, SoldTag } from '../styles';
import SEO from '../components/seo';

const artistPage = ({ data }) => {
  const { setTitle } = useContext(TitleContext);
  const { name } = data.title;

  useEffect(() => {
    setTitle(name);
  }, [name]);

  const imageProps = data.pics.edges.map(({ node }, idx) => {
    const { image, subject, dimensions, id, sold } = node;

    return {
      image,
      alt: subject.name,
      title: subject.name,
      key: id,
      idx,
      sold,
      ratio: image.asset.metadata.dimensions.aspectRatio,
      dimensions,
      imgStyle: { width: '100%', height: '100%', objectFit: 'cover', marginBottom: '0' },
    };
  });
  const config = { mass: 5, tension: 2000, friction: 200 };
  const trail = useTrail(imageProps.length, {
    config,
    opacity: 1,
    scale: 1,
    from: { opacity: 0, scale: 0.3 },
  });

  return (
    <Container>
      {trail.map((props, idx) => {
        const { image, ratio, title, key, sold, imgStyle, ...others } = imageProps[idx];
        return (
          <PictureBox className={addClass(ratio)} key={key} style={{ ...props }}>
            <SEO title={title} imageSrc={image.asset.url} />
            <Image {...image} width={500} height={500} title={title} style={imgStyle} {...others} />
            {sold && <SoldTag>SOLD</SoldTag>}
          </PictureBox>
        );
      })}
    </Container>
  );
};

export default artistPage;

export const ARTIST_QUERY = graphql`
  query ARTIST_QUERY($slug: String!) {
    pics: allSanityPicture(filter: { artist: { slug: { current: { eq: $slug } } } }) {
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
          dimensions {
            height
            width
          }
        }
      }
    }
    title: sanityArtist(slug: { current: { eq: $slug } }) {
      name
    }
  }
`;
