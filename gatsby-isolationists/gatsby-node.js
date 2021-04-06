const path = require('path');
<<<<<<< HEAD

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Query for markdown nodes to use in creating pages.
  const result = await graphql(
    `
      {
        allSanitySubject {
          edges {
            node {
              name
              slug {
                current
=======
// Log out information after a build is done
exports.onPostBuild = ({ reporter }) => {
  reporter.info(`Sport your Gatsby site has been built!`);
};

// exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
//   if (stage === 'build-html' || stage === 'develop-html') {
//     actions.setWebpackConfig({
//       module: {
//         rules: [
//           {
//             test: /bad-module/,
//             use: loaders.null(),
//           },
//         ],
//       },
//     });
//   }
// };

exports.createPages = async ({ graphql, actions, reporter }) => {
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
                  id
                  url
                }
>>>>>>> gatsby_v3
              }
            }
          }
        }
      }
    `,
  );

  // Handle errors
  if (result.errors) {
<<<<<<< HEAD
    reporter.panicOnBuild(`Error while running GraphQL query.`);
=======
<<<<<<< Updated upstream
    reporter.panicOnBuild(`Error biographyPages while running GraphQL query.`);
>>>>>>> gatsby_v3
    return;
  }

  // Create pages for each markdown file.
  const productTemplate = path.resolve(`src/templates/product.jsx`);
  result.data.allSanitySubject.edges.forEach(({ node }) => {
    const slug = node.slug.current;
    createPage({
      path: `/mypage/${slug}`,
      component: productTemplate,
      // In your blog post template's graphql query, you can use pagePath
      // as a GraphQL variable to query for data from the markdown file.
      context: {
<<<<<<< HEAD
        pagePath: node.name,
        product: {
          name: node.name,
          price: 23.45,
          description: 'Comfortable',
        },
=======
        slug,
=======
    reporter.panicOnBuild(`Error in Subject Pages while running GraphQL query.`);
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
>>>>>>> Stashed changes
>>>>>>> gatsby_v3
      },
    });
  });
};

// exports.createPages = async params => {
//   await Promise.all([subjectPages(params)]);
// };
