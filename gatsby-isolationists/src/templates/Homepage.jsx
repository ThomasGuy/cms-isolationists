import React, { useContext, useEffect } from 'react';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components';

import { TitleContext } from '../components/Layout';
import SEO from '../components/seo';

const FrontPage = styled.article`
  max-width: var(--pageWidth);
  margin: 0 auto;
  font-size: 1.8rem;
  line-height: 1.6;
  padding: 2rem;

  .artistLink {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
  }

  ul > li {
    padding: 8px;
    margin-bottom: 7px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

    &:hover {
      background-color: #242424;
    }

    h3 {
      color: inherit;
      opacity: 0.85;
      font-weight: 400;
      font-size: 2.8.rem;
    }
  }

  span {
    font-size: 2.4rem;
    text-align: center;
    color: var(--title);
  }

  h3 {
    color: inherit;
    opacity: 0.85;
    font-weight: 400;
    font-size: 2.8.rem;
  }
`;

function ArtistLink({ artist }) {
  const { id, name, slug, mug } = artist;
  return (
    <li>
      <Link key={id} className="artistLink" to={`/biography/${slug.current}`}>
        <SEO title={name} imageSrc={mug.asset.url} />
        <GatsbyImage image={mug.asset.gatsbyImageData} alt={name} />
        <h3>{name}</h3>
      </Link>
    </li>
  );
}

export default function Homepage({ pageContext }) {
  const { studio, mugs, title } = pageContext;
  const { setTitle } = useContext(TitleContext);

  useEffect(() => {
    setTitle(title);
  }, [title]);

  return (
    <FrontPage>
      <section style={{ padding: '3rem 0' }}>
        <GatsbyImage
          image={studio.childImageSharp.gatsbyImageData}
          title="Sally Scott Studio"
          alt="Sally Scott Studio"
        />
      </section>
      <p>
        Prior to the Lockdown of 2020 a small group of friends in Putney met regularly
        on Wednesdays in each other//&aposs houses, or weather permitting in Richmond
        Park or on the Thames tow path to paint, and subsequently go for a pub lunch.
        This had been working fine for years.
      </p>
      <p>Lockdown put a stop to this.</p>
      <p>
        They decided the way to continue was for one member to choose a subject each
        week and they all should post their results on Wednesdays. They had no
        collective name before Lockdown, but with this new way of working from home they
        became the...
        <br />
        <span>Wednesday Isolationists</span>
      </p>

      <ul>
        {mugs.map(({ node }) => (
          <ArtistLink key={node.id} artist={node} />
        ))}
      </ul>
    </FrontPage>
  );
}
