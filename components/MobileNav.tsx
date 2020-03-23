import React from 'react'
import Link from 'next/link'

import { NAV_LINKS } from '../constants'

const MobileNav = () => {
  return (
    <div>
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

          a {
            padding: 20px;
            display: block;
            text-decoration: none;
            color: #ddd;
          }

          .nav-container {
            width: 79%;
            position: fixed;
            top: 0;
            bottom: 0;
            right: 0;
            z-index: 1;
          }
        `}
      </style>
    </div>
  )
}

export default MobileNav
