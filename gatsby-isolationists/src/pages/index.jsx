/* eslint-disable react/no-unescaped-entities */
import React, { useRef } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { StaticImage, GatsbyImage } from 'gatsby-plugin-image';
import { getGatsbyImageData } from 'gatsby-source-sanity';
import sanityConfig from '../../client-config';
import { FrontPage } from '../styles';
// import SanityImageBox from '../components/SanityImageBox';

const STUDIO_QUERY = graphql`
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
            }
          }
        }
      }
    }
  }
`;

function ArtistLink({ artist }) {
  const imageData = getGatsbyImageData(artist.mug.asset.url, { maxWidth: 20 }, sanityConfig.sanity);
  return (
    <li>
      <Link className="artistLink" to={`/biography/${artist.slug.current}`}>
        <GatsbyImage image={imageData} alt={artist.name} />
        <h3>{artist.name}</h3>
      </Link>
    </li>
  );
}

export default function Home() {
  const layout = useRef(null);
  const { allSanityArtist } = useStaticQuery(STUDIO_QUERY);
  const width = 500;

  return (
    <div ref={layout}>
      <StaticImage
        src="../images/studio.jpg"
        width={width}
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
          {allSanityArtist.edges.map(({ node }) => (
            <ArtistLink key={node.id} artist={node} />
          ))}
        </ul>
      </FrontPage>
    </}
