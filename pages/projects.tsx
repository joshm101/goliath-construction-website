import React, { useEffect, useState } from 'react'
import { ParallaxBanner } from 'react-scroll-parallax'

import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'

import Layout from '../components/Layout'
import PageContentContainer from '../components/PageContentContainer'

import { makeParallaxProps } from '../utils'
import useWindowSize from '../hooks/useWindowSize'

import projects from '../data/projects'

const PARALLAX_IMAGE = (
  'https://goliath-construction-gallery-images.s3-us-west-1.amazonaws.com/test-gallery-image-1.jpeg'
)


const Projects = () => {
  const [ cellHeight, setCellHeight ] = useState(200)
  const [ columns, setColumns ] = useState(4)
  const parallaxProps = makeParallaxProps(
    PARALLAX_IMAGE,
    { amount: 0.2 }
  )

  const windowSize = useWindowSize()

  useEffect(() => {
    const calculateColumns = () => {
      const { width } = windowSize
  
      if (!width) {
        return 4
      }
  
      if (width < 320) {
        return 1
      }
  
      if (width <= 630) {
        return 2
      }
  
      if (width <= 1050) {
        return 3
      }
  
      return 4
    }
  
    const calculateCellHeight = () => {
      const { width } = windowSize
      
      if (!width) {
        return 200
      }
  
      if (width <= 360) {
        return 135
      }
  
      if (width <= 475) {
        return 150
      }
  
      if (width > 630 && width <= 700) {
        return 175
      }
  
      if (width > 850 && width <= 1050) {
        return 225
      }
  
      return 200
    }

    setCellHeight(calculateCellHeight())
    setColumns(calculateColumns())
  }, [windowSize])

  return (
    <Layout>
      <ParallaxBanner {...parallaxProps} />
      <PageContentContainer>
        <GridList
          cellHeight={cellHeight}
          cols={columns}
        >
          {projects.map(project => (
            <GridListTile key={project.id} cols={1}>
              <img
                src={project.thumbnailImage}
                alt={project.name}
              />
            </GridListTile>
          ))}
        </GridList>
      </PageContentContainer>
    </Layout>
  )
}

export default Projects
