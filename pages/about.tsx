import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { ParallaxBanner } from 'react-scroll-parallax'

import Layout from '../components/Layout'
import PageContentContainer from '../components/PageContentContainer'

import { makeParallaxProps } from '../utils'

const PARALLAX_IMAGE = (
  'https://goliath-construction-gallery-images.s3-us-west-1.amazonaws.com/test-gallery-image-2.jpeg'
)
const PAGE_IMAGE = (
  'https://goliath-construction-general.s3-us-west-1.amazonaws.com/about-page-1.jpeg'
)

const About = () => {
  const parallaxProps = makeParallaxProps(
    PARALLAX_IMAGE,
    { amount: 0.2 }
  )

  const [pageImageLoaded, setPageImageLoaded] = useState(false)

  useEffect(() => {
    const image = new Image()
    image.src = PAGE_IMAGE

    image.addEventListener('load', () => setPageImageLoaded(true))
  }, [])

  const getPageImageStyle = () => {
    const baseStyle = {
      transition: 'opacity .3s ease-out'
    }

    if (pageImageLoaded) {
      return {
        ...baseStyle,
        opacity: 1
      }
    }

    return {
      ...baseStyle,
      opacity: 0
    }
  }

  return (
    <Layout>
      <Head>
        <title>About | Goliath Construction</title>
        <meta property="og:title" content="About | Goliath Construction" />
        <meta property="og:image" content={PAGE_IMAGE} />
        <meta property="twitter:title" content="About | Goliath Construction" />
        <meta property="twitter:image" content={PAGE_IMAGE} />
      </Head>
      <ParallaxBanner {...parallaxProps } />
      <PageContentContainer>
        <div className="about-content">
          <div className="text-container">
            <h3>
              As a second generation Builder/ Developer, Alberto Canseco has more than 20 years experience in the building business.
            </h3>
            <p>
              His attention to detail has allowed Goliath Construction to build projects from Additions/Renovations, Apartments, Condominiums, Tract Homes and Custom Homes.
            </p>
            <p>
              Unlike many builders, Goliath Construction self-performs several categories of construction with its own forces. With our own crews of full time skilled employees, we will complete concrete, framing, finish carpentry and cabinetry and stone work to properly ensure quality work.
            </p>
            <p>
              During construction, our services include quality control, safety management, and construction administration. Our extensive experience in completing high-end quality projects on time and within budget informs everything we do as a Construction Manager.  We help owners identify and hire the right design and consultant teams, and then provide the leadership and resources required to make these projects successful.
            </p>
            <p>
              We keep projects on time and within budget and teams working together. Our emphasis on collaboration creates teamwork between our owner, and construction team. Our highest priority is the satisfaction of the clients project and the quality of our finished work.
            </p>
            <p>
              Give us a call at <a href="tel:+1-310-902-6616">(310) 902-6616</a>.
            </p>
            <p>
              License #1056541-B
            </p>
          </div>
          <div className="image-container">
            <div className="image-block">
              <img src={PAGE_IMAGE} style={getPageImageStyle()} />
            </div>
          </div>
        </div>
      </PageContentContainer>
      <style jsx>
        {`
          .about-content {
            display: flex;
          }

          p > a {
            text-decoration: none;
            color: inherit;
          }

          .text-container {
            flex: 1;
            margin-right: 15px;
          }

          .text-container h3 {
            text-transform: uppercase;
          }

          .image-container {
            width: 100%;
            flex: 1;
            margin-top: 7px;
            display: flex;
            flex-direction: column;
          }

          .image-block {
            padding-bottom: 66.666%;
            position: relative;
            overflow: hidden;
            max-width: 1000px;
          }

          .image-block img {
            width: 100%;
            max-width: none;
            position: absolute;
            top: 0;
            left: 0;
          }

          .contact-info-block {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
          }

          .contact-info {
            text-align: center;
          }

          hr {
            opacity: 0.25;
            margin-top: 25px;
            margin-bottom: 25px;
          }

          .contact-info span {
            font-size: 140%;
          }

          @media (max-width: 768px) {
            .about-content {
              display: block;
            }

            .text-container {
              margin-right: 0;
            }
            
            .image-container {
              margin-left: 0;
              margin-top: 40px;
            }
          }
        `}
      </style>
    </Layout>
  )
}

export default About
