import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { useTitleContext } from '../hooks/TitleContext';
import BigNav from './BigNav';
import SmallNav from './SmallNav';

export default function Nav() {
  const { title, subTitle } = useTitleContext();
  const { artists, subjects } = useStaticQuery(graphql`{
  artists: allSanityArtist(sort: {name: ASC}) {
    nodes {
      id
      name
      slug {
        current
      }
    }
  }
  subjects: allSanitySubject(sort: {week: DESC}) {
    nodes {
      id
      name
      week
      slug {
        current
      }
    }
  }
}`);

  return (
    <>
      <SmallNav
        title={title}
        subTitle={subTitle}
        artists={artists}
        subjects={subjects}
      />
      <BigNav title={title} subTitle={subTitle} artists={artists} subjects={subjects} />
    </>
  );
}
