// import { graphql } from 'gatsby';
import React, { useRef } from 'react';

// import { FaEnvelope } from 'react-icons/fa';
// import SanityImageBox from '../components/SanityImageBox';
// import { Image, Grid, Row, Col, Title } from '../styles';

// export const query = graphql`
//   query BioPageQuery($slug: String!) {
//     bio: sanityArtist(slug: { current: { eq: $slug } }) {
//       id
//       name
//       mug {
//         asset {
//           gatsbyImageData(layout: FIXED, width: 200)
//         }
//       }
//     }
//     mainImage {
//       asset {
//         gatsbyImageData(layout: CONSTRAINED, width: 600, placeholder: BLURRED)
//         originalFilename
//       }
//     }
//     links {
//       href
//       name
//     }
//     social {
//       facebook
//       twitter
//       instagram
//     }
//     email
//     education
//     biography
//   }
// `;

// const BioPage = ({ data: { bio } }) => {
//   // const top = useRef(null);
//   const layout = useRef(null);

//   // useLayoutEffect(() => {
//   //   const { height } = top.current.getBoundingClientRect();
//   //   layout.current.style.marginTop = `${height + 15}px`;
//   // }, []);

//   function makeId(idx) {
//     return `${bio.id}-${idx}`;
//   }

//   return (
//     <>
//       <Grid ref={layout}>
//         <Row>
//           <SanityImageBox name={bio.name} key={bio.id} image={bio.mainImage} alt={bio.name} />
//         </Row>

//         <Row>
//           <Image width="200px">
//             <SanityImageBox name={bio.name} image={bio.mug} alt={bio.name} />
//           </Image>
//           <Col>
//             <Title>
//               {bio.name}
//               <div id="cert">{bio.education}</div>
//             </Title>

//             <div className="bottom">
//               <a href={`mailto:${bio.email}`}>
//                 Email&nbsp;&nbsp;&nbsp;
//                 <FaEnvelope />
//               </a>
//             </div>
//           </Col>
//         </Row>

//         <Row>
//           <Col>
//             {bio.biography.map((item, idx) => (
//               <p key={makeId(idx)}>{item}</p>
//             ))}
//           </Col>
//         </Row>
//         {bio.links[0] && (
//           <Row>
//             <Col>
//               <p>
//                 {`More of ${bio.name.split(' ')[0]}'s work can be seen on the following websites.`}
//               </p>
//               <ul>
//                 {bio.links.map((link, idx) => (
//                   <li key={makeId(idx)}>
//                     <a href={link.href}>{link.name}</a>
//                   </li>
//                 ))}
//                 {bio.social !== null &&
//                   // eslint-disable-next-line array-callback-return
//                   Object.values(bio.social).map((value, idx) => {
//                     if (value !== null) {
//                       return (
//                         <li key={idx}>
//                           <a title="follow me on facebook" href={value}>
//                             <img
//                               style={{ marginBottom: '0' }}
//                               alt="follow me on facebook"
//                               src="https://c866088.ssl.cf3.rackcdn.com/assets/facebook30x30.png"
//                               border={0}
//                             />
//                           </a>
//                         </li>
//                       );
//                     }
//                   })}
//               </ul>
//             </Col>
//           </Row>
//         )}
//       </Grid>
//     </>
//   );
// };

function BioPage() {
  return <div>Bollox</div>;
}

export default BioPage;
