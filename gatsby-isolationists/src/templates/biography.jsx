/* eslint-disable consistent-return */
import React, { useRef } from 'react';

import { FaEnvelope } from 'react-icons/fa';
import SanityImageBox from '../components/SanityImageBox';
import { Image, Grid, Row, Col, Title } from '../styles';

const BioPage = ({ pageContext: { node } }) => {
  const layout = useRef(null);
  console.log({ node });

  // useLayoutEffect(() => {
  //   const { height } = top.current.getBoundingClientRect();
  //   layout.current.style.marginTop = `${height + 15}px`;
  // }, []);

  const { id, name, social, links, email, education, biography, mug, mainImage } = node;

  function makeId(slug, idx) {
    return `${slug}-${idx}`;
  }

  return (
    <>
      <Grid ref={layout}>
        <Row>
          <SanityImageBox name="" key={id} image={mainImage} alt={name} />
        </Row>

        <Row>
          <Image width="200px">
            <SanityImageBox name={name} image={mug} alt={name} />
          </Image>
          <Col>
            <Title>
              {name}
              <div id="cert">{education}</div>
            </Title>

            <div className="bottom">
              <a href={`mailto:${email}`}>
                Email&nbsp;&nbsp;&nbsp;
                <FaEnvelope />
              </a>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            {biography.map((item, idx) => (
              <p key={makeId('bio', idx)}>{item}</p>
            ))}
          </Col>
        </Row>
        {links[0] && (
          <Row>
            <Col>
              <p>{`More of ${name.split(' ')[0]}'s work can be seen on the following websites.`}</p>
              <ul>
                {links.map((link, idx) => (
                  <li key={makeId('link', idx)}>
                    <a href={link.href}>{link.name}</a>
                  </li>
                ))}
                {social !== null &&
                  // eslint-disable-next-line array-callback-return
                  Object.values(social).map((value, idx) => {
                    if (value !== null) {
                      return (
                        <li key={makeId('social', idx)}>
                          <a title="follow me on facebook" href={value}>
                            <img
                              style={{ marginBottom: '0' }}
                              alt="follow me on facebook"
                              src="https://c866088.ssl.cf3.rackcdn.com/assets/facebook30x30.png"
                              border={0}
                            />
                          </a>
                        </li>
                      );
                    }
                  })}
              </ul>
            </Col>
          </Row>
        )}
      </Grid>
    </>
  );
};

export default BioPage;
