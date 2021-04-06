/* eslint-disable react/no-unescaped-entities */
import React, { useRef } from 'react';
import { graphql, Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { getGatsbyImageData } from 'gatsby-source-sanity';
import sanityConfig from '../../client-config';
import { FrontPage } from '../styles';
// import SanityImageBox from '../components/SanityImageBox';

export const STUDIO_QUERY = graphql`
  query {
    allSanityArtist {
      edges {
        node {
          name
          id
          slug {
            current
          }
          mug {
            asset {
              url
              id
            }
          }
        }
      }
    }
    file(relativePath: { regex: "/studio/" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, width: 1000, placeholder: TRACED_SVG)
      }
    }
  }
`;

function ArtistLink({ artist }) {
  const imageData = getGatsbyImageData(artist.mug.asset.id, { maxWidth: 20 }, sanityConfig.sanity);
  return (
    <li>
      <Link className="artistLink" to={`/biography/${artist.slug.current}`}>
        <GatsbyImage image={imageData} alt={artist.name} maxWwidth={20} />
        <h3>{artist.name}</h3>
      </Link>
    </li>
  );
}

export default function Home({ data }) {
  const layout = useRef(null);
  // const { allSanityArtist, file } = useStaticQuery(STUDIO_QUERY);

  return (
    <div ref={layout}>
      <GatsbyImage
        image={data.file.childImageSharp.gatsbyImageData}
        title="Sally Scott Studio"
        alt="Sally Scott Studio"
      />
      <FrontPage>
        <p>
          Prior to the Lockdown of 2020 a small group of friends in Putney met regularly on
          Wednesdays in each other's houses, or weather permitting in Richmond Park or on the Thames
          tow path to paint, and subsequently go for a pub lunch. This had been working fine for
          years.
        </p>
        <p>Lockdown put a stop to this.</p>
        <p>
          They decided the way to continue was for one member to choose a subject each week and they
          all should post their results on Wednesdays. They had no collective name before Lockdown,
          but with this new way of working from home they became the...
          <br />
          <span>Wednesday Isolationists</span>
        </p>
        <ul>
          {data.allSanityArtist.edges.map(({ node }) => (
            <ArtistLink key={node.id} artist={node} />
          ))}
        </ul>
      </FrontPage>
    </div>
  );
}
