import React from 'react'
import Link from 'next/link'

import Layout from '../components/Layout'

import { NAV_LINKS } from '../constants'

const Index = () => {
  return (
    <Layout>
      <h2>Goliath Construction</h2>
      <style jsx>
        {`
          li {
            list-style: none;
          }
          h2 {
            margin: 0;
          }
        `}
      </style>
    </Layout>
  )
}

export default Index
