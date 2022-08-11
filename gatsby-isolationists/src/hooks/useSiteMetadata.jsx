import { graphql, useStaticQuery } from 'gatsby';

function useSiteMetadata() {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author
          siteUrl
          image
        }
      }
    }
  `);

  return { ...site.siteMetadata };
}

export default useSiteMetadata;
