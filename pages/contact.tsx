import React from 'react'
import { ParallaxBanner } from 'react-scroll-parallax'

import Layout from '../components/Layout'
import DummyContent from '../components/DummyContent'

import { makeParallaxProps } from '../utils'

const PARALLAX_IMAGE = (
  'https://goliath-construction-gallery-images.s3-us-west-1.amazonaws.com/test-gallery-image-4.jpeg'
)

const Contact = () => {
  const parallaxProps = makeParallaxProps(
    PARALLAX_IMAGE,
    { amount: 0.2 }
  )

  return (
    <Layout>
      <ParallaxBanner {...parallaxProps} />
      <DummyContent />
    </Layout>
  )
}

export default Contact
