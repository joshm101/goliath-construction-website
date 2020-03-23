import React, { FunctionComponent, useState } from 'react';
import clsx from 'clsx'

import MobileNav from '../components/MobileNav'

const Layout: FunctionComponent = ({ children }) => {
  const [navOpen, setNavOpen] = useState(false)

  const classes = clsx(
    'content',
    navOpen && 'content--nav-open'
  );


  return (
    <div className="container">
      <MobileNav />
      <div className={classes}>
        <button onClick={() => setNavOpen(!navOpen)}>
          Toggle Mobile Nav
        </button>
        {children}
      </div>
      <style jsx>
        {`
          @media (max-width: 768px) {
            .content--nav-open {
              transform: translate(-79%, 0);
            }
          }
          .container {
            height: 100%;
          }
          .content {
            transition: transform .2s;
            z-index: 10;
            height: 100%;
            position: relative;
            background: #ddd;
          }
          button {
            position: absolute;
            right: 0;
            height: 64px;
          }
        `}
      </style>
      <style jsx global>
        {`
          html {
            width: 100%;
            height: 100%;
          }
          body {
            width: 100%;
            height: 100%;
            background: #ddd;
            color: #111;
            margin: 0;
          }
          h1, h2, h3, h4, h5, h6 {
            margin: 0;
          }
          #__next {
            height: 100%;
            width: 100%;
          }
        `}
      </style>
    </div>
  );
};

export default Layout;
