/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import useSiteMetadata from '../hooks/useSiteMetadata';

function SEO({ children, location, description, title, imageSrc }) {
  const { siteTitle, siteDescription, siteUrl } = useSiteMetadata();

  return (
    <Helmet titleTemplate={`%s - ${siteTitle}`}>
      <html lang="en" />
      <title>{title || siteTitle}</title>
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="alternate icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />
      <meta name="description" content={siteDescription} />
      {location ? (
        <meta property="og:url" content={location.href} />
      ) : (
        <meta property="og:url" content={siteUrl} />
      )}
      <meta property="og:image" content={imageSrc || 'bell.svg'} />
      <meta property="og:title" content={title} key="ogtitle" />
      <meta property="og:site_name" content={siteTitle} key="ogsitename" />
      <meta
        property="og:description"
        content={description || siteDescription}
        key="ogdescription"
      />
      {children}
    </Helmet>
  );
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
};

export default SEO;
