import React from 'react';
// import { useSpring } from 'react-spring';

import MenuItems from './MenuItems';
import { Navbar } from '../styles';

const MainNav = ({ title, subTitle, artists, subjects }) => {
  const depthLevel = 0;
  const menuItems = [
    {
      id: 'home',
      name: 'Home',
      slug: '',
      url: '/',
    },
    {
      id: 'artists',
      name: 'Artisis',
      slug: '',
      url: '/gallery/artist/',
      submenu: artists,
    },
    {
      id: 'subjects',
      name: 'Subjects',
      slug: '',
      url: '/gallery/subject/',
      submenu: subjects,
    },
    {
      id: 'about',
      name: 'About',
      slug: '',
      url: '/biography/',
      submenu: artists,
    },
  ];

  // abit of animation for thr non visually impared
  // const config = { mass: 20, tension: 100, friction: 76 };
  // const springProps = useSpring({
  //   xy: [0, 0],
  //   opacity: 1,
  //   from: { opacity: 0, xy: [-200, 0] },
  //   ...config,
  // });

  return (
    <Navbar id="navigation" aria-labelledby="site-navigation" subTitle={subTitle}>
      <div className="heading">{title}</div>
      {subTitle && (
        <p>
          All pictures for sale from £50 <span>email artist</span>
        </p>
      )}
      <nav>
        <ul>
          {menuItems.map(node => {
            return <MenuItems items={node} key={node.id} depthLevel={depthLevel} />;
          })}
        </ul>
      </nav>
    </Navbar>
  );
};

export default MainNav;
