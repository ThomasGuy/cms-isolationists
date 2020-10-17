import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import { FaEnvelope } from 'react-icons/fa';

import { Grid, Row, Col, Image, Title } from '../../styles';

const SUZANNE_QUERY = graphql`
  query bioSuzanne {
    allFile(filter: { relativeDirectory: { regex: "/biography/Suzanne/" } }) {
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
  const data = useStaticQuery(SUZANNE_QUERY);
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
            <Img fluid={bioPics.Suzanne.fluid} alt={bioPics.Suzanne.alt} />
          </Image>
        </Row>

        <Row>
          <Image width='200px'>
            <Img
              title='Suzanne Ewart'
              fluid={bioPics.mug.fluid}
              alt='Suzanne_portrait'
            />
          </Image>
          <Col>
            <Title>
              <div>Suzanne Ewart</div>
            </Title>
            <div className='bottom'>
              <a href='mailto:suzart@virginmedia.com'>
                Email&nbsp;&nbsp;&nbsp;
                <FaEnvelope />
              </a>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <p>
              After studying Art and Graphic Design at Ealing Art College
              Suzanne worked as a graphic designer in both London and Bermuda.
              She then developed a freelance career as an illustrator working
              for major advertising agencies, design studios and publishers...
            </p>
            <p>
              Suzanne taught Illustration, painting and drawing at RACC
              Richmond, North Kingston College and the Landmark Art Centre in
              West London, Art groups in Barnes, the Royal Botanic Gardens Kew,
              France and South Africa.
            </p>
            <p>
              Suzanne has exhibited in a number of galleries including: The
              Royal Watercolour Society Bankside, The Mall Gallery London,
              Llewellyn Alexander Gallery Waterloo, Kirby Gallery Barbados,
              Century Gallery Henley Upon Thames, Riverside Gallery Barnes and
              the Century Gallery Cambridge.
            </p>
            <p>She paints in oil, acrylic and watercolour</p>
          </Col>
        </Row>
      </Grid>
    </>
  );
}

export default Biography;
