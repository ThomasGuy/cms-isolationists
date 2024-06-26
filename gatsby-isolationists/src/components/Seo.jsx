/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import useSiteMetadata from '../hooks/use-site-metadata';

function SEO({ children, location, pathname, description, title, imageSrc }) {
  const { siteTitle, siteDescription, siteUrl, image, author } = useSiteMetadata();

  const seo = {
    title: title || siteTitle,
    description: description || siteDescription,
    image: `${siteUrl}${image}`,
    url: `${siteUrl}${pathname || ``}`,
    author,
  };

  return (
    <>
      <title>{seo.title}</title>
      <link rel="icon" type="image/png" href="/favicon.ico" />
      <link rel="alternate icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />
      <meta name="description" content={seo.description} />
      <meta name="author" content={seo.author} />
      <meta name="image" content={imageSrc || seo.image} />
      {location ? (
        <meta property="og:url" content={location.href} />
      ) : (
        <meta property="og:url" content={seo.url} />
      )}
      <meta property="og:image" content={imageSrc || seo.image} />
      <meta property="og:title" content={seo.title} key="ogtitle" />
      <meta property="og:site_name" content={seo.title} key="ogsitename" />
      <meta property="og:description" content={seo.description} key="ogdescription" />
      <meta property="og:author" content={seo.author} key="ogauthor" />
      {children}
    </>
  );
}

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

// SEO.defaultProps = {
//   description: ``,
//   title: ``.isRequired,
// };

export default SEO;
