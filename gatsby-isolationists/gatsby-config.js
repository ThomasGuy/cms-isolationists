const dotenv = require('dotenv');

dotenv.config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
});

// eslint-disable-next-line import/first
const clientConfig = require('./client-config');

const token = process.env.SANITY_READ_TOKEN;
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  siteMetadata: {
    title: `Wednesday Isolationists`,
    description: `A collective of UK Artists had no name before the Covid Lockdown, but with this new way of working from home they became the "Wednesday Isolationists"`,
    author: `TWGuy <twguy.weddev@gmail.com>`,
    siteURL: `https://wednesday-isolationists.co.uk`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    'gatsby-plugin-image',
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    'gatsby-plugin-react-svg',
    {
      resolve: `gatsby-source-sanity`,
      options: {
        ...clientConfig.sanity,
        token,
        watchMode: !isProd,
        useCdn: isProd,
        overlayDrafts: !isProd && token,
        apiVersion: '2021-05-01',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `${__dirname}/src/utils/typography`,
      },
    },
    'gatsby-plugin-gatsby-cloud',
  ],
};
