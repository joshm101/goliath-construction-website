import React, { useEffect, useState } from 'react'
import Head from 'next/head'

import Layout from '../components/Layout'
import useWindowSize from '../hooks/useWindowSize'

import { GALLERY_IMAGES } from '../constants'

const Index = () => {
  const [imagesLoading, setImagesLoading] = useState(true)
  const [currentImage, setCurrentImage] = useState(0)
  const [loadedImages, setLoadedImages] = useState([] as HTMLImageElement[])
  const { width: windowWidth = 0, height: windowHeight = 0 } = useWindowSize()

  const loadImage = (imageSrc: string) => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image()

      image.onload = () => resolve(image)
      image.onerror = () => reject()

      image.src = imageSrc
    })
  }

  useEffect(() => {
    Promise.all(
      GALLERY_IMAGES.map(image => loadImage(image))
    ).then((images: HTMLImageElement[]) => {
      setImagesLoading(false)
      setLoadedImages(images)
    })
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (currentImage === GALLERY_IMAGES.length - 1) {
        return setCurrentImage(0)
      }

      setCurrentImage(currentImage + 1)
    }, 5000)

    return function cleanup() {
      clearTimeout(timeout)
    }
  }, [currentImage, setCurrentImage])

  interface ImageDimensions {
    container: {
      width: string,
      height: string
    },
    imageOffset: {
      left: string,
      top?: string
    }
  }

  const calculateImageDimensions = (
    image: HTMLImageElement,
    windowWidth: number,
    windowHeight: number
  ): ImageDimensions => {
    if (!image) {
      return {
        container: {
          width: '100%', height: '100%'
        },
        imageOffset: {
          left: '0px',
          top: '0px'
        }
      }
    }

    const {
      width: originalImageWidth,
      height: originalImageHeight
    } = image

    if (windowWidth > windowHeight) {
      const proposedImageWidth = windowWidth

      const ratioDecimal = originalImageHeight / originalImageWidth

      const proposedImageHeight = (
        proposedImageWidth * ratioDecimal
      )


      if (proposedImageHeight < windowHeight) {
        const calculatedImageHeight = windowHeight


        const ratioDecimal = originalImageWidth / originalImageHeight
        const calculatedImageWidth = calculatedImageHeight * ratioDecimal

        return {
          container: {
            width: `${calculatedImageWidth}px`,
            height: `${calculatedImageHeight}px`
          },
          imageOffset: {
            left: `-${(calculatedImageWidth - windowWidth) / 2}px`,
          }
        }
      }

      return {
        container: {
          width: `${proposedImageWidth}px`,
          height: `${proposedImageHeight}px`
        },
        imageOffset: {
          left: `-${(proposedImageWidth - windowWidth) / 2}px`,
          top: `-${(proposedImageHeight - windowHeight) / 2}px`
        }
      }
    }

    const calculatedImageHeight = windowHeight
    const ratioDecimal = originalImageWidth / originalImageHeight

    const calculatedImageWidth = calculatedImageHeight * ratioDecimal

    return {
      container: {
        width: `${calculatedImageWidth}px`,
        height: `${calculatedImageHeight}px`
      },
      imageOffset: {
        left: `-${(calculatedImageWidth - windowWidth) / 2}px`,
        top: '0px'
      }
    }
  }

  const imageDimensions = calculateImageDimensions(
    loadedImages[currentImage],
    windowWidth as number,
    windowHeight as number
  )

  const getImageContainerStyle = (imageIndex: number) => {
    if (imageIndex === currentImage) {
      return { opacity: 1 }
    }

    return { opacity: 0 }
  }

  const getImagesContainerStyle = () => {
    return {
      opacity: imagesLoading ? 0 : 1,
      transition: 'opacity .4s ease-out',
      position: 'relative' as 'relative'
    }
  }

  const imageStyle = {
    height: imageDimensions.container.height,
    width: imageDimensions.container.width
  }

  return (
    <Layout>
      <Head>
        <title>Goliath Construction</title>
      </Head>
      <div className="home-content">
        <div className="home-images-wrapper">
          {GALLERY_IMAGES.map((image, index) =>
            <div key={image} style={getImagesContainerStyle()}>
              <div
                className="image-container"
                style={getImageContainerStyle(index)}
              >
                <img
                  src={image}
                  style={imageStyle}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>
        {`
          .home-content {
            display: flex;
            align-items: start;
            justify-content: start;
            overflow: hidden;

            z-index: 8;
          }

          .home-images-wrapper {
            position: relative;
            display: block;
            width: 100%;
            height: ${windowHeight - 1}px;
            text-align: left;
            overflow: hidden;
          }

          img {
            position: relative;
            left: ${imageDimensions.imageOffset.left};
            top: ${imageDimensions.imageOffset.top};
          }

          .image-container {
            position: absolute;
            top: 0;
            left: 0;
            transition: opacity .4s ease-out;
          }
        `}
      </style>
    </Layout>
  )
}

export default Index
