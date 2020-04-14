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
              <br />
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
            font-size: 40px;
          }

          .logo h2 {
            font-size: 30px;
            letter-spacing: 2px;
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
              font-size: 35px;
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
          }
          h1, h2, h3, h4, h5, h6 {
            margin: 0;
          }
        `}
      </style>
    </ParallaxProvider>
  );
};

export default Layout;
