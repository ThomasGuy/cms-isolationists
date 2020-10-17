import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import { FaEnvelope } from 'react-icons/fa';

import { Grid, Row, Col, Image, Title } from '../../styles';

const CHARLES_QUERY = graphql`
  query bioCharles {
    allFile(filter: { relativeDirectory: { regex: "/biography/Charles/" } }) {
      edges {
        node {
          relativePath
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

function Biography() {
  const data = useStaticQuery(CHARLES_QUERY);
  const bioPics = data.allFile.edges.reduce((acc, { node }) => {
    const path = node.relativePath.split('.')[0];
    const idx = path.split('/').slice(-1).pop();
    acc[idx] = {
      fluid: node.childImageSharp.fluid,
      alt: idx,
    };
    return acc;
  }, {});

  return (
    <>
      <Grid>
        <Row>
          <Image>
            <Img
              title='Charles Penny'
              fluid={bioPics.Charles.fluid}
              alt={bioPics.Charles.alt}
            />
          </Image>
        </Row>

        <Row>
          <Image width='200px'>
            <Img fluid={bioPics.mug.fluid} alt='Charles_portrait' />
          </Image>
          <Col>
            <Title>
              <div>Charles Penny</div>
            </Title>
            <div className='bottom'>
              <a href='mailto:charles.penny@gmail.com'>
                Email&nbsp;&nbsp;&nbsp;
                <FaEnvelope />
              </a>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <p>
              Charles Penny is well known for his cheerful and sun filled works.
              He has exhibited widely in the UK, America, Japan and Morrocco.
              His work is in many public and private collections worldwide.
            </p>
          </Col>
        </Row>
      </Grid>
    </>
  );
}

export default Biography;
