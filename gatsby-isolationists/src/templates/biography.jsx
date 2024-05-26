import React, { useEffect } from 'react';
import { graphql } from 'gatsby';
import { FaEnvelope } from 'react-icons/fa';
import SanityImageBox from '../components/SanityImageBox';
import SEO from '../components/Seo';
import { Image, Grid, Row, Col, Title, Bio, OutsideLink, Comment } from '../styles';
import { useTitleContext } from '../hooks/TitleContext';

const BioPage = ({ data, pageContext }) => {
  const { id, biography, education, email, links, social, mainImage, mug } =
    data.bio.edges[0].node;
  const { pageTitle } = pageContext;
  const { setPageTitle, setSubtitle } = useTitleContext();

  useEffect(() => {
    setPageTitle(pageTitle);
    setSubtitle(false);
  }, [pageTitle]);

  function makeId(slug, idx) {
    return `${slug}-${idx}`;
  }

  return (
    <Grid>
      <Row>
        <SanityImageBox name="" key={id} image={mainImage} alt={pageTitle} />
      </Row>

      <Row>
        <Image width="200px">
          <SanityImageBox name="" image={mug} alt={pageTitle} />
        </Image>
        <Col>
          <Title>
            {pageTitle}
            {'  '}
            <div id="cert">{education}</div>
          </Title>

          <div className="email">
            <a href={`mailto:${email}`}>
              Email&nbsp;&nbsp;&nbsp;
              <FaEnvelope />
            </a>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          {biography &&
            biography.map((bio, idx) => <Bio key={makeId('bio', idx)}>{bio}</Bio>)}
        </Col>
      </Row>
      <br />
      <hr />
      {(links.length > 0 || social) && (
        <Row>
          <Col>
            <Comment>
              My other work can be found on the following websites and social media
            </Comment>
          </Col>
        </Row>
      )}
      <Row>
        <Col>
          {links.length > 0 && (
            <>
              {links.map((link, idx) => (
                <OutsideLink key={makeId('link', idx)} href={`${link.href}`}>
                  {link.pageTitle}
                </OutsideLink>
              ))}
            </>
          )}

          {social && (
            <ul>
              <li>
                {social.facebook && (
                  <a
                    className="social"
                    title="follow me on facebook"
                    href={`${social.facebook}`}>
                    <img
                      style={{ marginBottom: '0' }}
                      alt="follow me on facebook"
                      src="https://c866088.ssl.cf3.rackcdn.com/assets/facebook30x30.png"
                      border={0}
                    />
                  </a>
                )}
                {social.instagram && (
                  <a
                    className="social"
                    title="follow me on Instagram"
                    href={social.instagram}>
                    <img
                      alt="follow me on instagram"
                      src="https://img.icons8.com/office/30/000000/instagram-new.png"
                      border={0}
                    />
                  </a>
                )}
              </li>
            </ul>
          )}
        </Col>
      </Row>
      <Row />
    </Grid>
  );
};

export default BioPage;

export const Head = () => {
  const title = ({ pageContext }) => pageContext.pageTitle;
  return <SEO title={title} />;
};

export const query = graphql`
  query ($slug: String!) {
    bio: allSanityArtist(filter: { slug: { current: { eq: $slug } } }) {
      edges {
        node {
          id
          biography
          education
          email
          name
          links {
            href
            name
          }
          social {
            instagram
            facebook
          }
          mainImage {
            asset {
              url
              gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
            }
          }
          mug {
            asset {
              url
              gatsbyImageData(layout: CONSTRAINED, width: 200, placeholder: BLURRED)
            }
          }
        }
      }
    }
  }
`;
