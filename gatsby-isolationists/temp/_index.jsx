/* eslint-disable react/no-unescaped-entities */
import React, { useRef } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

import { FrontPage } from '../src/styles';
import SanityImageBox from '../src/components/SanityImageBox';

const STUDIO_QUERY = graphql`
  query myStudio {
    studio: file(relativePath: { regex: "/studio/" }) {
      childImageSharp {
        asset {
          gatsbyImageData(layout: CONSTRAINED, width: 600, placeholder: BLURRED)
        }
        }
      }
    }
    allSanityArtist {
      nodes {
        name
        id
        slug {
          current
        }
        mug {
          asset {
            gatsbyImageData(layout: CONSTRAINED, width: 600, placeholder: BLURRED)
            }
          }
        }
      }
    }
  }
`;

function ArtistLink({ artist }) {
  return (
    <li>
      <Link className="artistLink" to={`/biography/${artist.slug.current}`}>
        <SanityImageBox image={artist.mug} alt={artist.name} />
        <h3>{artist.name}</h3>
      </Link>
    </li>
  );
}

export default function Home() {
  const layout = useRef(null);
  const { studio, allSanityArtist } = useStaticQuery(STUDIO_QUERY);
  return (
    <div ref={layout}>
      <SanityImageBox
        name="Sally Scott Studio"
        image={studio.childImageSharp}
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
          {allSanityArtist.nodes.map(artist => (
            <ArtistLink key={artist.id} artist={artist} />
          ))}
        </ul>
      </FrontPage>
    </div>
  );
}
