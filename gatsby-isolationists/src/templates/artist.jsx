/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
import React, { useCallback, useEffect, useState } from 'react';
import { useTrail } from 'react-spring';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import { GalleryLayout, SoldTag, PictureBox } from '../styles';
import SEO from '../components/Seo';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { addClass } from '../utils/helpers';
import { Modal } from '../components/SimpleModal/Modal';
import { useTitleContext } from '../hooks/TitleContext';

let span2 = 1;
let imgWidth = 18;

// eslint-disable-next-line react/function-component-definition
const ArtistPage = ({ data, pageContext }) => {
  const { pageTitle } = pageContext;
  const [openModal, setOpen] = useState(false);
  const { galleryLg, portrait, mobile } = useBreakpoint();
  const [index, setIndex] = useState(0);
  const { setPageTitle, setSubtitle } = useTitleContext();

  useEffect(() => {
    setPageTitle(pageTitle);
    setSubtitle(true);
  }, [pageTitle]);

  galleryLg ? (imgWidth = 23) : (imgWidth = 18);
  mobile ? (span2 = 1) : (span2 = 2);

  const imgProps = data.pics.edges.map(({ node }, idx) => {
    const { image, artist, subject, title, dimensions, id, sold } = node;
    const imgTitle = title ? `${artist.name} - ${title}` : `${artist.name}`;
    return {
      image,
      alt: subject.name,
      title: subject.name,
      artist: artist.name,
      subject: subject.name,
      imgTitle,
      key: id,
      idx,
      sold,
      dimensions,
      ratio: image.asset.metadata.dimensions.aspectRatio,
      loading: 'eager',
      imgStyle: { objectFit: 'contain', width: '100%', height: '100%' },
    };
  });

  const modalGalleryProps = data.pics.edges.map(({ node }) => {
    const { image, subject, artist, sold, dimensions } = node;
    return {
      image,
      artist: artist.name,
      subject: subject.name,
      sold,
      dimensions,
      loading: 'eager',
    };
  });

  const clickHandler = useCallback(
    evt => {
      if (evt.target.nodeName !== 'IMG') {
        return;
      }
      if (evt.target.attributes.idx) {
        setIndex(parseInt(evt.target.attributes.idx.value, 10));
        setOpen(true);
      }
    },
    [setOpen, setIndex],
  );

  useEffect(() => {
    window.addEventListener('click', clickHandler, false);

    return () => {
      window.removeEventListener('click', clickHandler, false);
    };
  }, [clickHandler]);

  const trail = useTrail(imgProps.length, {
    to: { opacity: 1, transform: 'scale(1)' },
    from: { opacity: 0, transform: 'scale(0.3)' },
  });

  return (
    <GalleryLayout width={imgWidth} span2={span2} modal={openModal}>
      {trail.map((props, idx) => {
        const { image, key, ratio, sold, alt, title, imgStyle, imgTitle, ...others } =
          imgProps[idx];
        return (
          <PictureBox className={addClass(ratio)} style={{ ...props }} key={key}>
            <SEO title={pageTitle} imageSrc={image.asset.url} />
            <GatsbyImage
              image={image.asset.gatsbyImageData}
              width={imgWidth * span2 * 10} // no span3 now
              title={imgTitle}
              style={imgStyle}
              alt={alt}
              {...others}
            />
            {sold && <SoldTag>SOLD</SoldTag>}
            <p>{title}</p>
          </PictureBox>
        );
      })}
      {portrait && openModal && (
        <Modal
          onCloseRequest={() => setOpen(false)}
          uiIndex={index}
          imgProps={modalGalleryProps}
        />
      )}
    </GalleryLayout>
  );
};

export default ArtistPage;

export const Head = () => {
  const title = ({ pageContext }) => pageContext.pageTitle;
  return <SEO title={title} />;
};

export const ARTIST_QUERY = graphql`
  query ($slug: String!) {
    pics: allSanityPicture(filter: { artist: { slug: { current: { eq: $slug } } } }) {
      edges {
        node {
          id
          sold
          subject {
            name
          }
          artist {
            name
          }
          image {
            asset {
              gatsbyImageData(height: 800, layout: CONSTRAINED, placeholder: BLURRED)
              url
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
          title
        }
      }
    }
  }
`;
