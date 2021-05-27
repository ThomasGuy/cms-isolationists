/* eslint-disable consistent-return */
import React, { useContext, useEffect } from 'react';

import { FaEnvelope } from 'react-icons/fa';
import { TitleContext } from '../components/Layout';
import SanityImageBox from '../components/SanityImageBox';
import SEO from '../components/seo';
import { Image, Grid, Row, Col, Title, Bio } from '../styles';

const BioPage = ({ pageContext }) => {
  const { id, name, social, links, email, education, biography, mug, mainImage } =
    pageContext.node;
  const { setTitle } = useContext(TitleContext);

  useEffect(() => {
    setTitle(name);
  }, [name]);

  function makeId(slug, idx) {
    return `${slug}-${idx}`;
  }
  const firstName = name.split(' ')[0];

  return (
    <>
      <Grid>
        <Row>
          <SEO title={name} imageSrc={mainImage.asset.url} />
          <SanityImageBox name="" key={id} image={mainImage} alt={name} />
        </Row>

        <Row>
          <SEO title={name} imageSrc={mug.asset.url} />
          <Image width="200px">
            <SanityImageBox name="" image={mug} alt={name} />
          </Image>
          <Col>
            <Title>
              {name}
              {'  '}
              <div id="cert">{education}</div>
            </Title>

            <div className="email">
              {firstName !== 'Suzanne' ? (
                <a href={`mailto:${email}`}>
                  Email&nbsp;&nbsp;&nbsp;
                  <FaEnvelope />
                </a>
              ) : (
                <a href={email}>
                  Email&nbsp;&nbsp;&nbsp;
                  <FaEnvelope />
                </a>
              )}
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            {biography &&
              biography.map((bio, idx) => <Bio key={makeId('bio', idx)}>{bio}</Bio>)}
          </Col>
        </Row>

        <Row>
          <Col>
            {links && links.length > 0 && (
              <>
                <p className="comment">
                  {`${firstName}'s paintings & other work can be found on the following websites and social media`}
                </p>
                <ul>
                  {links.map((link, idx) => (
                    <li key={makeId('link', idx)}>
                      <a href={`${link.href}`}>{link.name}</a>
                    </li>
                  ))}
                </ul>
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
                        style={{ marginBottom: '0' }}
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
    </>
  );
};

export default BioPage;
