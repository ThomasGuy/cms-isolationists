/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import useSiteMetadata from '../hooks/useSiteMetadata';

function SEO({ children, location, description, title, imageSrc }) {
  const {
    title: siteTitle,
    description: siteDescription,
    siteUrl,
    image,
    author,
  } = useSiteMetadata();

  const seo = {
    title: title || siteTitle || 'Wednesday Isolationists',
    description: description || siteDescription,
    image: `${siteUrl}${image}`,
    url: `${siteUrl}${location?.pathname || ``}`,
    author,
  };

  return (
    <>
      <title id="title">{seo.title}</title>
      <link id="icon" rel="icon" type="image/png" href="/favicon.ico" />
      <link rel="alternate icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />
      <meta name="description" content={seo.description} />
      <meta name="author" content={seo.author} />
      <meta name="image" content={imageSrc || seo.image} />
      <meta name="url" content={seo.url} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:image" content={imageSrc || seo.image} />
      <meta property="og:title" content={seo.title} key="ogtitle" />
      <meta property="og:site_name" content={seo.title} key="ogsitename" />
      <meta property="og:description" content={seo.description} key="ogdescription" />
      <meta property="og:author" content={seo.author} key="ogauthor" />
      {children}
    </>
  );
}

SEO.defaultProps = {
  lang: `en`,
  // eslint-disable-next-line react/default-props-match-prop-types
  meta: [],
  description: ``,
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  // meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
};

export default SEO;
