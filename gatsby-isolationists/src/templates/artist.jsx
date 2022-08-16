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
let imgWidth = 17;

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
          title
          image {
            asset {
              gatsbyImageData(height: 800, layout: CONSTRAINED, placeholder: BLURRED)
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

export const Head = ({ pageContext }) => {
  const { pageTitle, bio } = pageContext;
  return <SEO title={`${pageTitle} Artist`} description={bio[0]} />;
};

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

  galleryLg ? (imgWidth = 23) : (imgWidth = 17);
  mobile ? (span2 = 1) : (span2 = 2);

  const imgProps = data.pics.edges.map(({ node }, idx) => {
    const { image, artist, subject, title, dimensions, id, sold } = node;
    const imgTitle = dimensions
      ? `${artist.name} - ${dimensions.width}x${dimensions.height}cm`
      : `${artist.name}`;
    return {
      image,
      alt: subject.name,
      title: subject.name,
      artist: artist.name,
      subject: subject.name,
      imgTitle,
      picTitle: title,
      key: id,
      idx,
      sold,
      dimensions,
      ratio: image.asset.metadata.dimensions.aspectRatio,
      loading: 'eager',
      imgStyle: { objectFit: 'contain', width: '100%', height: '100%' },
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
        const {
          image,
          key,
          ratio,
          sold,
          alt,
          title,
          picTitle,
          imgStyle,
          imgTitle,
          ...others
        } = imgProps[idx];
        return (
          <PictureBox className={addClass(ratio)} style={{ ...props }} key={key}>
            <GatsbyImage
              image={image.asset.gatsbyImageData}
              width={imgWidth * span2 * 10} // no span3 now
              title={imgTitle}
              style={imgStyle}
              alt={alt}
              {...others}
            />
            {sold && <SoldTag>SOLD</SoldTag>}
            <p className="picTitle">{picTitle}</p>
            <p>{title}</p>
          </PictureBox>
        );
      })}
      {portrait && openModal && (
        <Modal
          onCloseRequest={() => setOpen(false)}
          uiIndex={index}
          imgProps={imgProps}
        />
      )}
    </GalleryLayout>
  );
};

export default ArtistPage;
