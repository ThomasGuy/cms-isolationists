import React, { useContext, useEffect } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { TitleContext } from '../components/Layout';
import SEO from '../components/Seo';
import { FrontPage, MiniTitle } from '../styles';

// function ArtistLink({ artist }) {
//   const { id, name, slug, mug } = artist;
//   return (
//     <li>
//       <Link key={id} className="artistLink" to={`/biography/${slug.current}`}>
//         <SEO title={name} imageSrc={mug.asset.url} />
//         <GatsbyImage image={mug.asset.gatsbyImageData} alt={name} />
//         <h2>{name}</h2>
//       </Link>
//     </li>
//   );
// }

export default function Homepage() {
  const { setTitle, setSubtitle } = useContext(TitleContext);
  const { studio, mugs, title } = useStaticQuery(
    graphql`
      query {
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
        title: site {
          siteMetadata {
            title
          }
        }
      }
    `
  );

  const pageTitle = title.siteMetadata.title;

  useEffect(() => {
    setTitle(pageTitle);
    setSubtitle(false);
  }, [pageTitle]);

  return (
    <FrontPage>
      <SEO title={pageTitle} />
      <section style={{ padding: '3rem 0' }}>
        <SEO title={pageTitle} imageSrc={studio.childImageSharp.original.src} />
        <GatsbyImage
          image={studio.childImageSharp.gatsbyImageData}
          title="Sally Scott Studio"
          alt="Sally Scott Studio"
        />
      </section>
      <p>
        Prior to the Lockdown of 2020 a small group of friends in Putney met regularly
        on Wednesdays in each other&apos;s houses, or weather permitting in Richmond
        Park or on the Thames tow path to paint, and subsequently go for a pub lunch.
        This had been working fine for years.
      </p>
      <p>Lockdown put a stop to this.</p>
      <p>
        They decided the way to continue was for one member to choose a subject each
        week and they all should post their results on Wednesdays. They had no
        collective name before Lockdown, but with this new way of working from home they
        became the...
      </p>
      <MiniTitle>Wednesday Isolationists</MiniTitle>

      <ul>
        {mugs.edges.map(({ node }) => {
          const { id, name, slug, mug } = node;
          return (
            <li>
              <Link key={id} className="artistLink" to={`/biography/${slug.current}`}>
                <SEO title={name} imageSrc={mug.asset.url} />
                <GatsbyImage image={mug.asset.gatsbyImageData} alt={name} />
                <h2>{name}</h2>
              </Link>
            </li>
          );
        })}
      </ul>
    </FrontPage>
  );
}
