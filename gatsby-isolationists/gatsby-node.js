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
            id
            name
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
    const ownerNodeId = node.id;
    const pagePath = `/gallery/subject/${slug}`;
    createPage({
      path: pagePath,
      ownerNodeId,
      component: subjectTemplate,
      context: {
        slug,
        pageTitle: node.name,
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
            id
            name
            biography
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

  // Create a page for each graphql query result...
  const artists = result.data.artists.edges || [];
  artists.forEach(({ node }) => {
    const slug = node.slug.current;
    const ownerNodeId = node.id;
    const pagePath = `/gallery/artist/${slug}`;
    createPage({
      path: pagePath,
      component: artistTemplate,
      ownerNodeId,
      context: {
        slug,
        pageTitle: node.name,
        bio: node.biography,
      },
    });
  });
};

const bioPages = async ({ graphql, actions, reporter }) => {
  const bioTemplate = path.resolve(`src/templates/biography.jsx`);
  const { createPage } = actions;
  const result = await graphql(`
    {
      bio: allSanityArtist(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            id
            name
            biography
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

  const biographies = result.data.bio.edges || [];
  biographies.forEach(({ node }) => {
    const slug = node.slug.current;
    const ownerNodeId = node.id;
    const pagePath = `/biography/${slug}`;
    createPage({
      path: pagePath,
      component: bioTemplate,
      ownerNodeId,
      context: {
        slug,
        pageTitle: node.name,
        bio: node.biography,
      },
    });
  });
};

exports.createPages = async params => {
  await Promise.all([bioPages(params), subjectPages(params), artistPages(params)]);
};
