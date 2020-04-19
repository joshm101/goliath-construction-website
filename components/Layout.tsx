import React, {
  FunctionComponent,
  useState,
  useEffect,
  useRef
} from 'react'
import { ParallaxProvider } from 'react-scroll-parallax'
import clsx from 'clsx'

import MobileNav from './MobileNav'
import DesktopNav from './DesktopNav'
import Header from './Header'
import HamburgerMenuButton from './HamburgerMenuButton'

const Layout: FunctionComponent = ({ children }) => {
  const [navOpen, setNavOpen] = useState(false)
  const [headerOpacity, setHeaderOpacity] = useState(0)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const TRANSPARENT_SCROLL_THRESHOLD = 200;
      window.addEventListener('scroll', () => {
        if (window.pageYOffset > TRANSPARENT_SCROLL_THRESHOLD) {
          setHeaderOpacity(0.5)
          return
        }

        setHeaderOpacity(0)
      })
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined' && navOpen) {
      window.scrollTo(0, 0)
    }
  }, [navOpen])

  const classes = clsx(
    'content',
    navOpen && 'content--nav-open'
  )

  const headerStyles = {
    backgroundColor: `rgba(44, 46, 48, ${headerOpacity})`,
    transition: 'background-color 200ms'
  }

  return (
    <ParallaxProvider>
      <div className="container">
        <MobileNav />
        <div className={classes} style={{ overflow: 'hidden' }}>
          <Header style={headerStyles}>
            <div className="logo">
              <h1>G</h1>
              <h2>Goliath Construction</h2>
            </div>
            <div className="desktop-nav-container">
              <DesktopNav />
            </div>
            <div className="menu-button">
              <HamburgerMenuButton
                onClick={() => setNavOpen(!navOpen)}
              />
            </div>
          </Header>
          <div style={{ height: '100%' }}>
            {children}
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .container {
            height: 100%;
          }
          .content {
            transition: transform .2s;
            z-index: 10;
            position: relative;
            background: #171717;
          }
          button {
            right: 0;
            height: 32px;
          }

          .logo {
            text-align: center;
          }

          .logo h1 {
            font-size: 45px;
            line-height: 45px;
          }

          .logo h2 {
            font-size: 30px;
            line-height: 50px;
            letter-spacing: 4px;
            font-weight: 400;
          }

          .menu-button {
            align-self: flex-start;
          }

          .desktop-nav-container {
            visibility: hidden;
            display: none;
          }

          @media (max-width: 768px) {
            .banner-placeholder {
              height: 180px;
            }

            .content--nav-open {
              transform: translate(-79%, 0);
            }

            .logo h2 {
              font-size: 28px;
              letter-spacing: 2px;
            }

            .logo h1 {
              font-size: 40px;
            }
          }

          @media (min-width: 769px and max-width: 1024px) {
            .banner-placeholder {
              height: 400px;
            }

            .logo h1 {
              font-size: 30px;
            }

            .logo h2 {
              font-size: 25px;
              letter-spacing: 1px;
            }
          }

          @media (min-width: 769px) {
            .menu-button {
              visibility: hiddden;
              display: none;
            }

            .logo {
              flex-shrink: 0;
            }

            .desktop-nav-container {
              visibility: visible;
              display: block;
            }
          }

          @media (max-width: 540px) {
            .logo {
              display: flex;
            }

            .logo h2 {
              font-size: 24px;
              letter-spacing: 2px;
              align-self: center;
            }

            .logo h1 {
              display: none;
              visibility: hidden;
            }

            .menu-button {
              align-self: center;
            }
          }

          .dummy-text {
            color: #666;
            text-align: center;
            font-family: monospace;
          }
        `}
      </style>
      <style jsx global>
        {`
          body {
            background: #171717;
            color: #d3cec8;
            margin: 0;
            overflow: ${navOpen ? 'hidden' : 'auto'};
            font-family: 'Oswald', sans-serif;
          }
          h1, h2, h3, h4, h5, h6 {
            margin: 0;
          }

          .parallax-banner-layer-0 {
            filter: brightness(0.65);
          }

        `}
      </style>
      
      {/*https://github.com/zeit/next.js/issues/512#issuecomment-367164248*/}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&display=swap');
      `}}/>
    </ParallaxProvider>
  );
};

export default Layout;
