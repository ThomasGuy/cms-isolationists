/* eslint-disable react/no-unescaped-entities */
import React, { useContext, useEffect, useRef } from 'react';
import { graphql, Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { FrontPage } from '../styles';
import { TitleContext } from '../components/Layout';

export const STUDIO_QUERY = graphql`
  query {
    artists: allSanityArtist {
      edges {
        node {
          name
          id
          slug {
            current
          }
          mug {
            asset {
              gatsbyImageData(layout: FIXED, width: 30, height: 30)
            }
          }
        }
      }
    }
    file(relativePath: { regex: "/studio/" }) {
      childImageSharp {
        gatsbyImageData(
          layout: FULL_WIDTH
          tracedSVGOptions: { alphaMax: 1.5 }
          placeholder: TRACED_SVG
        )
      }
    }
  }
`;

function ArtistLink({ artist }) {
  return (
    <li>
      <Link className="artistLink" to={`/biography/${artist.slug.current}`}>
        <GatsbyImage image={artist.mug.asset.gatsbyImageData} alt={artist.name} />
        <h3>{artist.name}</h3>
      </Link>
    </li>
  );
}

export default function Home({ data: { artists, file } }) {
  const layout = useRef(null);
  const { setTitle } = useContext(TitleContext);

  useEffect(() => {
    setTitle('Home Page');
  }, []);

  return (
    <div ref={layout}>
      <GatsbyImage
        image={file.childImageSharp.gatsbyImageData}
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
          {artists.edges.map(({ node }) => (
            <ArtistLink key={node.id} artist={node} />
          ))}
        </ul>
      </FrontPage>
    </div>
  );
}
