import React from 'react'
import Link from 'next/link'

import { NAV_LINKS } from '../constants'

const DesktopNav = () => {
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
            background: transparent;
          }

          ul {
            padding: 0 45px;
            margin: 0;
            font-size: 12px;
            text-align: center;
          }
          li {
            list-style: none;
            text-align: center;
            line-height: 1.6em;
            font-size: 16px;
            letter-spacing: 2px;
            text-transform: uppercase;
            display: inline-block;
          }

          a {
            padding: 15px;
            display: block;
            text-decoration: none;
            color: #ddd;
            text-shadow: 0.5px 0.5px black;
          }
        `}
      </style>
    </div>
  )
}

export default DesktopNav
