import React, {
  FunctionComponent,
  useState,
  useEffect,
  useCallback
} from 'react'
import aws from 'aws-sdk'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { ParallaxBanner } from 'react-scroll-parallax'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import Typography from '@material-ui/core/Typography'

import Layout from '../../components/Layout'
import PageContentContainer from '../../components/PageContentContainer'
import ImageViewer, {
  ImageViewerImage,
  ImageViewerNext,
  ImageViewerPrevious,
  ImageViewerClose
} from '../../components/ImageViewer'

import projects, { Project } from '../../data/projects'
import { makeParallaxProps } from '../../utils'
import useGrid from '../../hooks/useGrid'
import clsx from 'clsx'

const S3_BUCKET = 'goliath-construction-projects'
const ROOT_S3_URL = `https://s3.us-west-1.amazonaws.com/${S3_BUCKET}`

interface ProjectDetailsPageComponent extends FunctionComponent {
  project: Project
}

const ProjectDetailsPage = ({ project }: ProjectDetailsPageComponent) => {
  interface LoadedImages {
    [image: string]: boolean
  }

  const initialLoadedImagesState = project.images.reduce((accumulator, image) => {
    return {
      ...accumulator,
      [image]: false
    }
  }, {})
  const [loadedImages, setLoadedImages] = (
    useState(initialLoadedImagesState as LoadedImages)
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

    project.images.forEach(projectImage => {
      const image = new Image()
      image.src = projectImage

      image.addEventListener('load', () => onImageLoad(image.src))
    })

  }, [])

  const parallaxProps = makeParallaxProps(
    project.thumbnailImage,
    { amount: 0.2 }
  )

  const imagesCount = project.images.length

  const [ imageViewerIndex, setImageViewerIndex ] = useState(-1)

  const onImageViewerNextClick = useCallback(() => {
    if (imageViewerIndex === imagesCount - 1) {
      return
    }

    setImageViewerIndex(imageViewerIndex + 1)
  }, [imageViewerIndex, setImageViewerIndex])

  const onImageViewerPreviousClick = useCallback(() => {
    if (imageViewerIndex === 0) {
      return
    }

    setImageViewerIndex(imageViewerIndex - 1)
  }, [imageViewerIndex, setImageViewerIndex])

  const onImageViewerCloseClick = useCallback(() => {
    setImageViewerIndex(-1)
  }, [imageViewerIndex, setImageViewerIndex])

  const onImageClick = useCallback(index => {
    setImageViewerIndex(index)
  }, [setImageViewerIndex])

  const imageViewerPreviousButtonClasses = clsx(
    'image-viewer-control',
    'image-viewer-previous',
    imageViewerIndex === 0 && 'control-disabled'
  )
  const imageViewerNextButtonClasses = clsx(
    'image-viewer-control',
    'image-viewer-next',
    imageViewerIndex === imagesCount - 1 && 'control-disabled'
  )

  const onImageViewerRootClick = useCallback((event: any) => {
    const image = document.querySelector('.image-viewer-image')
    const previous = document.querySelector('.image-viewer-previous')
    const next = document.querySelector('.image-viewer-next')
    const close = document.querySelector('.image-viewer-close')

    const emptySpaceClicked = (
      !image?.contains(event.target) &&
      !previous?.contains(event.target) &&
      !next?.contains(event.target) &&
      !close?.contains(event.target)
    )

    if (emptySpaceClicked) {
      setImageViewerIndex(-1)
    }
  }, [setImageViewerIndex])

  const { columns, cellHeight } = useGrid()

  const getTileStyle = (image: string) => {
    const imageHasLoaded = loadedImages[image]

    const baseStyle = {
      cursor: 'pointer',
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
        <title>{project.name} | Goliath Construction</title>
        <meta property="og:title" content={project.name} />
        <meta property="og:image" content={project.thumbnailImage} />
      </Head>
      <ParallaxBanner {...parallaxProps} />
      <PageContentContainer>
        <h1>{project.name}</h1>
        <br />
        <GridList cellHeight={cellHeight} cols={columns}>
          {project.images.map((image, index) => (
            <GridListTile
              key={image}
              cols={1}
              onClick={() => onImageClick(index)}
              style={getTileStyle(image)}
            >
              <img src={image} />
            </GridListTile>
          ))}
        </GridList>
        {imageViewerIndex > -1 &&
          <ImageViewer
            onArrowLeftKeypress={onImageViewerPreviousClick}
            onArrowRightKeypress={onImageViewerNextClick}
            onEscapeKeypress={onImageViewerCloseClick}
            onClick={onImageViewerRootClick}
          >
            <div className="image-viewer-close-wrapper">
              <ImageViewerClose
                onClick={onImageViewerCloseClick}
                className="image-viewer-close"
              />
            </div>
            <Typography
              className="notice notice-top"
            >
              Tap / click anywhere to close
            </Typography>
            <div className="image-viewer-content">
              <ImageViewerPrevious
                onClick={onImageViewerPreviousClick}
                className={imageViewerPreviousButtonClasses}
                disabled={imageViewerIndex === 0}
              />
              <ImageViewerImage
                src={project.images[imageViewerIndex]}
                className="image-viewer-image"
              />
              <ImageViewerNext
                onClick={onImageViewerNextClick}
                className={imageViewerNextButtonClasses}
                disabled={imageViewerIndex === imagesCount - 1}
              />
            </div>
            <Typography
              className="notice notice-bottom"
            >
              Tap / click anywhere to close
            </Typography>
          </ImageViewer>
        }
      </PageContentContainer>
      <style jsx>
        {`
          h1 {
            font-weight: 500;
            line-height: 0.9em;
            margin-top: -3px;
          }

          @media (max-width: 500px) {
            h1 {
              font-size: 1.5em;
            }
          }
        `}
      </style>
      <style jsx global>
        {`
          .image-viewer-control {
            min-width: 48px;
            max-width: 120px;
            width: 100%;
            height: 80%;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .image-viewer-control.control-disabled {
            opacity: 0.5;
          }

          .image-viewer-close {
            width: 64px;
            height: 64px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            z-index: 13;
          }

          .image-viewer-content {
            position: absolute;
            top: 0;
            bottom: 0;
            width: 100%;

            display: flex;
            justify-content: space-evenly;
            align-items: center;
          }

          .image-viewer-image {
            width: 100%;
            max-width: 80%;

            display: flex;
            align-items: center;
            justify-content: center;
            margin: auto;
          }

          .image-viewer-image img {
            z-index: 11;
          }

          .image-viewer-close-wrapper {
            display: flex;
            align-items: center;
            justify-content: flex-end;
          }

          .notice {
            position: absolute;
            left: 0;
            right: 0;
            text-align: center;
            opacity: 0.65;
            z-index: 10;
            font-size: 0.75em;
          }

          .notice-bottom {
            bottom: 64px;
          }

          .notice-top {
            top: 64px;
          }

          @media (max-width: 768px) {
            .image-viewer-control {
              max-width: 48px;
            }

            .notice-bottom {
              bottom: 128px;
            }

            .notice-top {
              top: 128px;
            }
          }

          @media (min-width: 1850px) {
            .notice-top {
              top: 32px;
            }

            .notice-bottom {
              bottom: 32px;
            }
          }
        `}
      </style>
    </Layout>
  )
}

const getStaticPaths = async () => {
  const paths = projects.map(project => {
      return { params: { slug: project.slug } }
  })

  return { paths, fallback: false }
}

const getStaticProps: GetStaticProps = async context => {
  const { params } = context

  if (!params) {
    return { props: { project: null } }
  }

  const slug = params['slug']
  const project = projects.find(project => project.slug === slug)

  const s3 = new aws.S3({
    accessKeyId: process.env.awsAccessKeyId,
    secretAccessKey: process.env.awsAccessSecret
  })


  const fetchS3Images = () => new Promise((resolve, reject) => {
    const s3Params = { Bucket: S3_BUCKET }

    s3.listObjectsV2(s3Params, (error, data) => {
      if (error) {
        reject(error)
      }

      resolve(data)
    })
  })


  const s3Response: any = await fetchS3Images()
  const projectImages = s3Response.Contents.filter((imageData: any) =>
    imageData.Key.includes(slug)
  ).map((imageData: any) => `${ROOT_S3_URL}/${imageData.Key}`)


  const projectWithImages = { ...project, images: projectImages }
  return { props: { project: projectWithImages } }
}

export default ProjectDetailsPage
export { getStaticPaths, getStaticProps }
