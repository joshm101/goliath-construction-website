import React from 'react'
import { ParallaxBanner } from 'react-scroll-parallax'

import Layout from '../components/Layout'

const About = () => {
  const dummyArray = Array.from({ length: 10 }, (_, key) => key)

  return (
    <Layout>
      <ParallaxBanner
        layers={[
          {
            image: 'https://goliath-construction-gallery-images.s3-us-west-1.amazonaws.com/test-gallery-image-3.jpeg',
            amount: 0.5,
            children: null
          }
        ]}
        style={{ height: '315px' }}
      />
      <div className="content">
        <br />
        <br />
        {dummyArray.map(value => (
          <div key={value}>
            <h2 className="dummy-text">
              Content to trigger overflow
            </h2>
            <br />
            <br />
            <br />
            <br />
          </div>
        ))}
      </div>

      <style>
        {`
          .content {
            text-align: center;
          }
        `}
      </style>
    </Layout>
  )
}

export default About
