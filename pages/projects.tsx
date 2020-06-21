import React, {
  useState,
  useCallback,
  useEffect
} from 'react'
import Head from 'next/head'
import { ParallaxBanner } from 'react-scroll-parallax'
import { useRouter } from 'next/router'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'

import Layout from '../components/Layout'
import PageContentContainer from '../components/PageContentContainer'

import useGrid from '../hooks/useGrid'

import { makeParallaxProps } from '../utils'

import projects, { Project } from '../data/projects'

const PARALLAX_IMAGE = (
  'https://goliath-construction-gallery-images.s3-us-west-1.amazonaws.com/test-gallery-image-1.jpeg'
)


const Projects = () => {
  interface LoadedImages {
    [image: string]: boolean
  }

  const initialLoadedImagesState = projects.reduce((accumulator, project) => {
    return {
      ...accumulator,
      [project.thumbnailImage]: false
    }
  }, {})

  const [loadedImages, setLoadedImages] = (
    useState(initialLoadedImagesState as LoadedImages)
  )
  const router = useRouter()
  const parallaxProps = makeParallaxProps(
    PARALLAX_IMAGE,
    { amount: 0.2 }
  )

  useEffect(() => {
    const onImageLoad = (image: string) => {
      setLoadedImages(loadedImages => {
        return {
          ...loadedImages,
          [image]: true
        }
      })
    }

    projects.forEach(project => {
      const image = new Image()
      image.src = project.thumbnailImage

      image.addEventListener('load', () => onImageLoad(image.src))
    })

  }, [])

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

  const getTileStyle = (project: Project) => {
    const imageHasLoaded = loadedImages[project.thumbnailImage]

    const baseStyle = {
      transition: 'opacity .3s ease-out'
    }

    if (imageHasLoaded) {
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
        <title>Projects | Goliath Construction</title>
        <meta property="og:title" content="Projects | Goliath Construction" />
        <meta property="og:image" content={PARALLAX_IMAGE} />
        <meta property="twitter:title" content="Projects | Goliath Construction" />
        <meta property="twitter:image" content={PARALLAX_IMAGE} />
      </Head>
      <ParallaxBanner {...parallaxProps} />
      <PageContentContainer>
        <GridList cellHeight={cellHeight} cols={columns}>
          {projects.map(project => (
            <GridListTile
              key={project.id}
              cols={1}
              style={getTileStyle(project)}
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
