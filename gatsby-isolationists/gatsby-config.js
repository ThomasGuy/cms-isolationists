// const sanityClient = require('@sanity/client');
const dotenv = require('dotenv');

dotenv.config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
});

const token = process.env.SANITY_READ_TOKEN;
const isProd = process.env.NODE_ENV === 'production';

const sanity = {
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2021-05-01',
  useCdn: isProd,
  token,
};

module.exports = {
  siteMetadata: {
    title: `Wednesday Isolationists`,
    description: `A collective of UK Artists had no name before the Covid Lockdown, but with this new way of working from home they became the "Wednesday Isolationists"`,
    author: `TWGuy <twguy.weddev@gmail.com>`,
    siteUrl: `https://wednesday-isolationists.co.uk`,
  },
  plugins: [
    'gatsby-plugin-robots-txt',
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    'gatsby-plugin-image',
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sitemap`,
    `gatsby-transformer-sharp`,
    'gatsby-plugin-react-svg',
    {
      resolve: `gatsby-source-sanity`,
      options: {
        ...sanity,
        watchMode: !isProd,
        overlayDrafts: !isProd && token,
      },
    },
    {
      resolve: 'gatsby-plugin-sanity-image',
      options: {
        ...sanity,
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
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Wednesday Isolationists`,
        short_name: `WednesdayIsolationists`,
        start_url: `/`,
        background_color: `#282c34`,
        theme_color: `#282c34`,
        display: `standalone`,
        icon: 'src/icons/gatsby-icon.png',
        crossOrigin: `use-credentials`,
      },
    },
    `gatsby-plugin-offline`,
    'gatsby-plugin-gatsby-cloud',
  ],
  flags: {
    FAST_DEV: true,
    DEV_SSR: true,
  },
};
