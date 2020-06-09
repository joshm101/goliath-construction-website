import React, { useEffect, useState } from 'react'

import Layout from '../components/Layout'
import useWindowSize from '../hooks/useWindowSize'

import { GALLERY_IMAGES } from '../constants'

const Index = () => {
  const [imagesLoading, setImagesLoading] = useState(true)
  const [currentImage, setCurrentImage] = useState(0)
  const [loadedImages, setLoadedImages] = useState([] as HTMLImageElement[])
  const { width: windowWidth, height: windowHeight } = useWindowSize()

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
    setTimeout(() => {
      if (currentImage === GALLERY_IMAGES.length - 1) {
        return setCurrentImage(0)
      }

      setCurrentImage(currentImage + 1)
    }, 5000)
  }, [currentImage, setCurrentImage])

  interface ImageDimensions {
    container: {
      width: string,
      height: string
    },
    imageOffset: {
      left: string,
      top: string
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
            top: `-${(calculatedImageHeight - windowHeight) / 2}px`
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
      transition: 'opacity .4s ease-out'
    }
  }

  const imageStyle = {
    height: imageDimensions.container.height,
    width: imageDimensions.container.width
  }

  return (
    <Layout>
      <div className="home-image-wrapper">
        {GALLERY_IMAGES.map((image, index) =>
          <div style={getImagesContainerStyle()}>
            <div
              key={image}
              className="image-container"
              style={getImageContainerStyle(index)}
            >
              <img
                key={image}
                src={image}
                style={imageStyle}
              />
            </div>
          </div>
        )}
      </div>

      <style jsx>
        {`
          .home-image-wrapper {
            position: relative;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            height: ${imageDimensions.container.height};
            width: ${imageDimensions.container.width};
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;

            z-index: 8;
          }

          img {
            width: ${imageDimensions.container.width};
            position: relative;
            left: ${imageDimensions.imageOffset.left};
            top: ${imageDimensions.imageOffset.top};
          }

          .image-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            transition: opacity .4s ease-out;
          }
        `}
      </style>

      <style jsx global>
        {`
          body {
            overflow: hidden !important;
          }
        `}
      </style>
    </Layout>
  )
}

export default Index
