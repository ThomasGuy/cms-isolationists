import { animated, useSpring } from 'react-spring';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import useDetectOutsideClick from '../hooks/useDetectOutsideClick';
import { mediaQuery } from '../styles/mediaQuery';

const Dropdown = styled(animated.ul)`
  position: absolute;
  top: 16rem;
  left: 2rem;
  width: 28rem;
  max-height: 55rem;
  display: grid;
  place-items: center center;
  justify-content: start;
  list-style: none;
  background: var(--grey);
  padding: 1rem;
  z-index: 15;
  overflow-y: auto;
`;

const Li = styled.li`
  display: grid;
  place-items: center center;
  justify-content: start;
  text-align: center;
  font-size: 1.6rem;
  font-weight: normal;
  padding: 0.5rem 0.8rem;
  min-width: 26rem;
  min-height: 3rem;
  background: var(--button);
  border-radius: 0 0 1rem 1rem;
  border: 1px solid black;
  box-shadow: 0 2px 4px 0 rgba(202, 173, 173, 0.288);
  a {
    text-decoration: none;
    color: var(--offWhite);
    font-weight: normal;
  }
  &:focus,
  &:hover {
    background: var(--grey);
  }
`;

const FullWidth = styled.div`
  width: 100%;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  background: var(--bg);
  height: 11.5rem;
`;

const Navbar = styled.nav`
  max-width: var(--pageWidth);
  margin: 0 auto;
  display: grid;
  padding: 1rem;
  padding-bottom: 2rem;
  grid-template-columns: repeat(4, auto);
  grid-template-rows: repeat(2, auto);
  place-items: center center;
  column-gap: 2rem;
  row-gap: 2rem;
  line-height: 2rem;

  .heading {
    grid-column: ${({ subTitle }) => {
      if (subTitle) {
        return '1 / 3';
      }
      return '1 / -1';
    }};

    justify-self: ${({ subTitle }) => {
      if (subTitle) {
        return 'end';
      }
      return 'center';
    }};

    font-size: 2.1rem;
    letter-spacing: 1.1px;
    color: var(--offWhite);
    font-weight: 600;
    margin: 0.7rem;
    padding: 0 1rem;
    padding-top: 0.7rem;

    ${mediaQuery('lg')`
      font-size: 3rem;
      letter-spacing: 1.2px;
    `};

    ${mediaQuery('xl')`
      font-size: 3.6rem;
    `};
  }

  p {
    justify-self: start;
    grid-column: 3 / 5;
    font-size: 1.5rem;
    color: var(--title);
    margin: 0;
    margin-top: 1rem;

    span {
      font-size: 1.2rem;
    }

    ${mediaQuery('lg')`
      font-size: 1.8rem;
      span {
        font-size: 1.5rem;
      }
    `};
  }
`;

const NavDropdown = styled.div`
  button {
    font-size: 1.8rem;
    background: var(--button);
    outline: none;
    border: none;
    cursor: pointer;
    border-radius: 1.5rem;
    box-shadow: var(--bs);
    min-width: 15rem;
    margin: 0;
    margin-bottom: 1rem;

    padding: 0.7rem;
    margin: 0;
    color: var(--offWhite);
    opacity: 0.9;
    letter-spacing: 1.2px;
    line-height: 1.5rem;

    &:focus,
    &:hover {
      color: var(--bg);
      background: purple;
    }
  }
`;

const NavButtons = styled.div`
  grid-column: 1 / -1;
  display: grid;
  place-items: center center;
  grid-template-columns: repeat(4, auto);
  gap: 2rem;
`;

const Nav = ({ children, subTitle }) => {
  return (
    <FullWidth>
      <Navbar subTitle={subTitle}>{children}</Navbar>
    </FullWidth>
  );
};

function BigNav({ title, subTitle, artists, subjects }) {
  const dropRef1 = useRef();
  const dropRef2 = useRef();
  const dropRef3 = useRef();
  const [open1, setOpen1] = useDetectOutsideClick(dropRef1, false);
  const [open2, setOpen2] = useDetectOutsideClick(dropRef2, false);
  const [open3, setOpen3] = useDetectOutsideClick(dropRef3, false);

  function handleArtistMenu(evt) {
    const expanded = evt.target.getAttribute('aria-expanded') === 'true' || false;
    evt.target.setAttribute('aria-expanded', !expanded);
    setOpen1(state => !state);
  }

  function handleSubjectMenu(evt) {
    const expanded = evt.target.getAttribute('aria-expanded') === 'true' || false;
    evt.target.setAttribute('aria-expanded', !expanded);
    setOpen2(state => !state);
  }

  function handleAboutMenu(evt) {
    const expanded = evt.target.getAttribute('aria-expanded') === 'true' || false;
    evt.target.setAttribute('aria-expanded', !expanded);
    setOpen3(state => !state);
  }

  useEffect(() => {
    const artistButton = document.querySelector('#artist-menu-button');
    artistButton.addEventListener('click', handleArtistMenu);

    const subjectButton = document.querySelector('#subject-menu-button');
    subjectButton.addEventListener('click', handleSubjectMenu);

    const aboutButton = document.querySelector('#about-menu-button');
    aboutButton.addEventListener('click', handleAboutMenu);

    return () => {
      artistButton.removeEventListener('click', handleArtistMenu);
      subjectButton.removeEventListener('click', handleSubjectMenu);
      aboutButton.removeEventListener('click', handleAboutMenu);
    };
  }, []);

  // abit of animation for thr non visually impared
  const config = { mass: 20, tension: 100, friction: 76 };
  const springProps = useSpring({
    xy: [0, 0],
    opacity: 1,
    from: { opacity: 0, xy: [-200, 0] },
    ...config,
  });

  return (
    <Nav id="navigation" aria-labelledby="site-navigation" subTitle={subTitle}>
      <div className="heading">{title}</div>
      {subTitle && (
        <p>
          All pictures for sale from £50 <span>email artist</span>
        </p>
      )}
      <NavButtons>
        <NavDropdown>
          <button type="button" role="link" aria-label="link homepage">
            <Link to="/">Home</Link>
          </button>
        </NavDropdown>
        {/* artists dropdown menu */}
        <NavDropdown ref={dropRef1}>
          <button
            id="artist-menu-button"
            type="button"
            onClick={() => handleArtistMenu}
            aria-label="artist gallery menu"
            aria-haspopup="true"
            aria-expanded="false"
            aria-controls="menu-list">
            Artists
            {open1 && (
              <Dropdown id="artist-menu-list" roll="menu" style={{ ...springProps }}>
                {artists.nodes.map(node => {
                  const { id, name, slug } = node;
                  return (
                    <Li key={id}>
                      <Link role="menuitem" to={`/gallery/artist/${slug.current}`}>
                        {name}
                      </Link>
                    </Li>
                  );
                })}
              </Dropdown>
            )}
          </button>
        </NavDropdown>

        {/* subjects dropdown menu */}
        <NavDropdown ref={dropRef2}>
          <button
            id="subject-menu-button"
            type="button"
            onClick={() => handleSubjectMenu}
            aria-label="subject gallery menu"
            aria-haspopup="true"
            aria-expanded="false"
            aria-controls="menu-list">
            Subjects
            {open2 && (
              <Dropdown id="subject-menu-list" roll="menu" style={{ ...springProps }}>
                {subjects.nodes.map(node => {
                  const { id, name, week, slug } = node;
                  return (
                    <Li key={id}>
                      <Link role="menuitem" to={`/gallery/subject/${slug.current}`}>
                        {`${week}. ${name}`}
                      </Link>
                    </Li>
                  );
                })}
              </Dropdown>
            )}
          </button>
        </NavDropdown>
        {/* about artists dropdown menu */}
        <NavDropdown ref={dropRef3}>
          <button
            id="about-menu-button"
            type="button"
            onClick={() => handleAboutMenu}
            aria-label="about artist menu"
            aria-haspopup="true"
            aria-expanded="false"
            aria-controls="menu-list">
            About
            {open3 && (
              <Dropdown id="about-menu-list" roll="menu" style={{ ...springProps }}>
                {artists.nodes.map(node => {
                  const { id, name, slug } = node;
                  return (
                    <Li key={id}>
                      <Link role="menuitem" to={`/biography/${slug.current}`}>
                        {name}
                      </Link>
                    </Li>
                  );
                })}
              </Dropdown>
            )}
          </button>
        </NavDropdown>
      </NavButtons>
    </Nav>
  );
}

export default BigNav;
