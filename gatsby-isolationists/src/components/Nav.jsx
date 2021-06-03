import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import BigNav from './BigNav';
import SmallNav from './SmallNav';

export default function Nav({ title, subTitle }) {
  const { artists, subjects } = useStaticQuery(graphql`
    query {
      artists: allSanityArtist(sort: { fields: name, order: ASC }) {
        nodes {
          id
          name
          slug {
            current
          }
        }
      }
      subjects: allSanitySubject(sort: { fields: week, order: DESC }) {
        nodes {
          id
          name
          week
          slug {
            current
          }
        }
      }
    }
  `);

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
