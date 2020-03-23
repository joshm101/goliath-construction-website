import React from 'react'
import Link from 'next/link'

import Layout from '../components/Layout'

import { NAV_LINKS } from '../constants'

const Index = () => {
  return (
    <Layout>
      <h2>Goliath Construction</h2>
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
      <style jsx>
        {`
          li {
            list-style: none;
          }
        `}
      </style>
    </Layout>
  )
}

export default Index
