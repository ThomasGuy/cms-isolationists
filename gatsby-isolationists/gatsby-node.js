const path = require('path');
// Log out information after a build is done
exports.onPostBuild = ({ reporter }) => {
  reporter.info(`Sport your Gatsby site has been built!`);
};

const subjectPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allSanitySubject {
        edges {
          node {
            name
            slug {
              current
            }
            week
            Pictures {
              artist {
                name
              }
              dimensions {
                height
                width
              }
              image {
                asset {
                  url
                  id
                }
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

  // Create pages for each markdown file.
  const subjectTemplate = path.resolve(`src/templates/subject.jsx`);
  result.data.allSanitySubject.edges.forEach(({ node }) => {
    const slug = node.slug.current;
    const title = node.name;
    // eslint-disable-next-line no-shadow
    const path = `/gallery/subject/${slug}`;
    createPage({
      path,
      component: subjectTemplate,
      // In your blog post template's graphql query, you can use pagePath
      // as a GraphQL variable to query for data from the markdown file.
      context: {
        title,
        pagePath: path,
        subject: node,
      },
    });
  });
};

exports.createPages = async params => {
  await Promise.all([subjectPages(params)]);
};
