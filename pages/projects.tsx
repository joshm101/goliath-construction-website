import React from 'react'
import { ParallaxBanner } from 'react-scroll-parallax'

import Layout from '../components/Layout'
import DummyContent from '../components/DummyContent'
import PageContentContainer from '../components/PageContentContainer'

import { makeParallaxProps } from '../utils'

const PARALLAX_IMAGE = (
  'https://goliath-construction-gallery-images.s3-us-west-1.amazonaws.com/test-gallery-image-1.jpeg'
)

const Projects = () => {
  const parallaxProps = makeParallaxProps(
    PARALLAX_IMAGE,
    { amount: 0.2 }
  )

  return (
    <Layout>
      <ParallaxBanner {...parallaxProps} />
      <PageContentContainer>
        <DummyContent />
      </PageContentContainer>
    </Layout>
  )
}

export default Projects
