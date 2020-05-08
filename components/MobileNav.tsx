import React from 'react'
import Link from 'next/link'

import { NAV_LINKS } from '../constants'

const MobileNav = () => {
  return (
    <div className="mobile-nav-wrapper">
      <nav>
        <div className="nav-container">
          <ul>
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <Link href={link.href}>
                  <a title={link.label}>
                    {link.label}
                  </a>
                </Link>
              </li>
            ))}
            <li>
              <a href="tel:+1-310-902-6616">
                (310) 902-6616
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <style jsx>
        {`
          div {
            background-color: #1e2223;
          }

          ul {
            padding: 0;
            margin: 0;
          }
          li {
            list-style: none;
            text-align: center;
            border-bottom: 1px solid #5d5c59;
            line-height: 1.6em;
            font-size: 16px;
            letter-spacing: 2px;
            text-transform: uppercase;
          }

          li > * {
            padding: 20px;
            color: #ddd;
            display: block;
          }

          a {
            text-decoration: none;
          }

          .nav-container {
            width: 79%;
            position: fixed;
            top: 0;
            bottom: 0;
            right: 0;
          }

          .mobile-nav-wrapper {
            visibility: hidden;
            display: none;
          }

          @media (max-width: 768px) {
            .mobile-nav-wrapper {
              visibility: visible;
              display: block;
            }
          }
        `}
      </style>
    </div>
  )
}

export default MobileNav
