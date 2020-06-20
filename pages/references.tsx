import React from 'react'
import Head from 'next/head'
import { ParallaxBanner } from 'react-scroll-parallax'

import Layout from '../components/Layout'
import PageContentContainer from '../components/PageContentContainer'

import { makeParallaxProps } from '../utils'

const PARALLAX_IMAGE = (
  'https://goliath-construction-gallery-images.s3-us-west-1.amazonaws.com/test-gallery-image-3.jpeg'
)

const References = () => {
  const parallaxProps = makeParallaxProps(
    PARALLAX_IMAGE,
    { amount: 0.2 }
  )

  interface Reference {
    id: number,
    name: string,
    designation?: string
  }

  const references: Reference[] = [
    { id: 1, name: 'Transform LP' },
    { id: 2, name: 'F&G Development' },
    { id: 3, name: 'Peter Brunk', designation: 'Peter Brunk LLC' },
    { id: 4, name: 'Dave Witherow', designation: 'Investor' },
    { id: 5, name: 'Gabriel Grouch', designation: 'Project Manager' },
    { id: 6, name: 'Sky Reiss', designation: 'Project Manageer' },
    { id: 7, name: 'Ryan Sullivan', designation: 'Project Manager' },
    { id: 8, name: 'Nancy Kuai', designation: 'Custom Home' },
    { id: 9, name: 'Greg Koltsov', designation: 'Investor' }
  ]

  return (
    <Layout>
      <Head>
        <title>References | Goliath Construction</title>
      </Head>
      <ParallaxBanner {...parallaxProps} />
      <PageContentContainer>
        <h1 className="references-header">
          Professional
        </h1>
        {references.map(reference => (
          <div key={reference.id} className="reference">
            <span>{reference.name}</span>
            {reference.designation &&
            <span className="designation">
              &nbsp;&nbsp;({reference.designation})
            </span>
            }
          </div>
        ))}
      </PageContentContainer>
      <style jsx>
        {`
          .references-header {
            margin-bottom: 12px;
          }
        `}
      </style>
      <style jsx global>
        {`
          .reference {
            display: flex;
            padding: 12px 0;
            font-size: 1.2em;
          }
          .designation {
            opacity: 0.5;
          }
        `}
      </style>
    </Layout>
  )
}

export default References
