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
    // eslint-disable-next-line no-shadow
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
    // eslint-disable-next-line no-shadow
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

exports.createPages = async params => {
  await Promise.all([subjectPages(params), artistPages(params)]);
};
