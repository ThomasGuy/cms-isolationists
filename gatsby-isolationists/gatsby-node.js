/* eslint-disable no-shadow */
const path = require('path');
// Log out information after a build is done
exports.onPostBuild = ({ reporter }) => {
  reporter.info(`Sport your Gatsby site has been built!`);
};

const subjectPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      subjects: allSanitySubject {
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

  // Create pages for each markdown file.
  const subjectTemplate = path.resolve(`src/templates/subject.jsx`);
  result.data.subjects.edges.forEach(({ node }) => {
    const slug = node.slug.current;
    const path = `/gallery/subject/${slug}`;
    createPage({
      path,
      component: subjectTemplate,
      // In your blog post template's graphql query, you can use pagePath
      // as a GraphQL variable to query for data from the markdown file.
      context: {
        pagePath: path,
        slug,
      },
    });
  });
};

const artistPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      artists: allSanityArtist {
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

  // Create pages for each markdown file.
  const artistTemplate = path.resolve(`src/templates/artist.jsx`);
  result.data.artists.edges.forEach(({ node }) => {
    const slug = node.slug.current;
    const path = `/gallery/artist/${slug}`;
    createPage({
      path,
      component: artistTemplate,
      // In your blog post template's graphql query, you can use pagePath
      // as a GraphQL variable to query for data from the markdown file.
      context: {
        pagePath: path,
        slug,
      },
    });
  });
};

const bioPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      bio: allSanityArtist {
        edges {
          node {
            id
            name
            slug {
              current
            }
            social {
              twitter
              instagram
              facebook
            }
            links {
              href
              name
            }
            email
            education
            biography
            mainImage {
              asset {
                gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
              }
            }
            mug {
              asset {
                gatsbyImageData(layout: FIXED, width: 200)
              }
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

  const bioTemplate = path.resolve(`src/templates/biography.jsx`);
  result.data.bio.edges.forEach(({ node }) => {
    const slug = node.slug.current;
    const path = `/biography/${slug}`;
    createPage({
      path,
      component: bioTemplate,
      // In your blog post template's graphql query, you can use pagePath
      // as a GraphQL variable to query for data from the markdown file.
      context: {
        pagePath: path,
        node,
      },
    });
  });
};

exports.createPages = async params => {
  await Promise.all([subjectPages(params), artistPages(params), bioPages(params)]);
};
