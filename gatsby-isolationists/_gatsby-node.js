const path = require('path');
// Log out information after a build is done
exports.onPostBuild = ({ reporter }) => {
  reporter.info(`Sport your Gatsby site has been built!`);
};

const subjectPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const subjectTemplate = path.resolve('src/templates/Subject.jsx');
  const result = await graphql(`
    {
      subjects: allSanitySubject {
        nodes {
          slug {
            current
          }
        }
      }
    }
  `);

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error subjectPages while running GraphQL query.`);
    return;
  }

  result?.data?.subjects.nodes.forEach(subject => {
    const slug = subject.slug.current;
    createPage({
      path: `gallery/subject/${slug}`,
      component: subjectTemplate,
      context: {
        slug,
      },
    });
  });
};

async function artistPages({ graphql, actions, reporter }) {
  const { createPage } = actions;
  const artistTemplate = path.resolve('src/templates/Artist.jsx');
  const result = await graphql(`
    {
      artists: allSanityArtist {
        nodes {
          slug {
            current
          }
        }
      }
    }
  `);

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error artistPages while running GraphQL query.`);
    return;
  }

  result?.data?.artists.nodes.forEach(artist => {
    const slug = artist.slug.current;
    createPage({
      path: `gallery/artist/${slug}`,
      component: artistTemplate,
      context: {
        slug,
      },
    });
  });
}

async function biographyPages({ graphql, actions, reporter }) {
  const { createPage } = actions;
  const bioTemplate = path.resolve('src/templates/Biography.jsx');
  const result = await graphql(`
    {
      bios: allSanityArtist {
        nodes {
          slug {
            current
          }
        }
      }
    }
  `);

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error biographyPages while running GraphQL query.`);
    return;
  }
  result?.data?.bios.nodes.forEach(bio => {
    const slug = bio.slug.current;
    createPage({
      path: `biography/${slug}`,
      component: bioTemplate,
      context: {
        slug,
      },
    });
  });
}

exports.createPages = async params => {
  await Promise.all([artistPages(params), biographyPages(params), subjectPages(params)]);
};
