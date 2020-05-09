import React, { useCallback } from 'react'
import { ParallaxBanner } from 'react-scroll-parallax'
import { useRouter } from 'next/router'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'

import Layout from '../components/Layout'
import PageContentContainer from '../components/PageContentContainer'

import useGrid from '../hooks/useGrid'

import { makeParallaxProps } from '../utils'

import projects from '../data/projects'

const PARALLAX_IMAGE = (
  'https://goliath-construction-gallery-images.s3-us-west-1.amazonaws.com/test-gallery-image-1.jpeg'
)


const Projects = () => {
  const router = useRouter()
  const parallaxProps = makeParallaxProps(
    PARALLAX_IMAGE,
    { amount: 0.2 }
  )

  const { columns, cellHeight } = useGrid()

  const handleProjectClick = useCallback(
    project => {
      return (event: React.MouseEvent) => {
        event.preventDefault()
        router.push(`/projects/${project.slug}`)
      }
    },
    []
  )

  return (
    <Layout>
      <ParallaxBanner {...parallaxProps} />
      <PageContentContainer>
        <GridList cellHeight={cellHeight} cols={columns}>
          {projects.map(project => (
            <GridListTile
              key={project.id}
              cols={1}
            >
              <img
                src={project.thumbnailImage}
                alt={project.name}
                onClick={handleProjectClick(project)}
              />
            </GridListTile>
          ))}
        </GridList>
      </PageContentContainer>

      <style jsx>
        {`
          img {
            cursor: pointer;
          }
        `}
      </style>
    </Layout>
  )
}

export default Projects
