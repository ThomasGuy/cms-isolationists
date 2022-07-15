/* eslint-disable no-shadow */
const path = require('path');
// Log out information after a build is done
exports.onPostBuild = ({ reporter }) => {
  reporter.info(`Sport your Gatsby site has been built!`);
};

const subjectPages = async ({ graphql, actions, reporter }) => {
  const subjectTemplate = path.resolve(`src/templates/subject.jsx`);
  const { createPage } = actions;
  const result = await graphql(`
    {
      subjects: allSanitySubject(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            slug {
              current
            }
          }
        }
      }
    }
  `);

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  // Create pages for each graphql query result
  const subjects = result.data.subjects.edges || [];
  subjects.forEach(({ node }) => {
    const slug = node.slug.current;
    const pagePath = `/gallery/subject/${slug}`;
    createPage({
      path: pagePath,
      component: subjectTemplate,
      context: {
        pagePath,
        slug,
      },
    });
  });
};

const artistPages = async ({ graphql, actions, reporter }) => {
  const artistTemplate = path.resolve(`src/templates/artist.jsx`);
  const { createPage } = actions;
  const result = await graphql(`
    {
      artists: allSanityArtist(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            slug {
              current
            }
          }
        }
      }
    }
  `);

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  // Create pages for each graphql query result
  const artists = result.data.artists.edges || [];
  artists.forEach(({ node }) => {
    const slug = node.slug.current;
    const pagePath = `/gallery/artist/${slug}`;
    createPage({
      path: pagePath,
      component: artistTemplate,
      context: {
        pagePath,
        slug,
      },
    });
  });
};

const bioPages = async ({ graphql, actions, reporter }) => {
  const bioTemplate = path.resolve(`src/templates/biography.jsx`);
  const { createPage } = actions;
  const result = await graphql(`
    {
      bio: allSanityArtist {
        edges {
          node {
            id
            biography
            education
            email
            name
            links {
              href
              name
            }
            social {
              instagram
              facebook
            }
            mainImage {
              asset {
                url
                gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
              }
            }
            mug {
              asset {
                url
                gatsbyImageData(layout: CONSTRAINED, width: 200, placeholder: BLURRED)
              }
            }
            slug {
              current
            }
          }
        }
      }
    }
  `);

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  const biographies = (result.data.bio || {}).edges || [];

  biographies.forEach(({ node }) => {
    const slug = node.slug.current;
    const pagePath = `/biography/${slug}`;
    createPage({
      path: pagePath,
      component: bioTemplate,
      context: {
        pagePath,
        node,
        slug,
      },
    });
  });
};

const homePage = async ({ graphql, actions, reporter }) => {
  const homepageTemplate = path.resolve(`src/templates/Homepage.jsx`);
  const { createPage } = actions;
  const result = await graphql(`
    {
      mugs: allSanityArtist {
        edges {
          node {
            id
            name
            slug {
              current
            }
            mug {
              asset {
                url
                gatsbyImageData(
                  layout: FIXED
                  placeholder: NONE
                  width: 50
                  aspectRatio: 1
                  fit: CROP
                )
              }
            }
          }
        }
      }
      studio: file(relativePath: { regex: "/studio/" }) {
        childImageSharp {
          gatsbyImageData(
            layout: FULL_WIDTH
            placeholder: TRACED_SVG
            tracedSVGOptions: { alphaMax: 1.8 }
          )
          original {
            src
          }
        }
      }
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running homepage GraphQL query.`);
    return;
  }

  const { mugs, studio, site } = result.data;
  const pagePath = '/home/';
  createPage({
    path: pagePath,
    component: homepageTemplate,
    context: {
      pagePath,
      mugs: mugs.edges,
      studio,
      title: site.siteMetadata.title,
    },
  });
};

exports.createPages = async params => {
  await Promise.all([
    homePage(params),
    bioPages(params),
    subjectPages(params),
    artistPages(params),
  ]);
};
