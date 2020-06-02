import React, { FunctionComponent, useEffect } from 'react'

import ArrowBackIcon from '@material-ui/icons/ChevronLeft'
import ArrowForwardIcon from '@material-ui/icons/ChevronRight'
import CloseIcon from '@material-ui/icons/Close'

interface ImageViewerProps {
  onArrowLeftKeypress: () => void,
  onArrowRightKeypress: () => void,
  onEscapeKeypress: () => void,
  onClick: (event: React.MouseEvent) => void
}

interface ImageViewerImageProps {
  src: string,
  className?: string
}

interface ImageViewerControl {
  onClick: () => void,
  className?: string,
  disabled?: boolean
}

const ImageViewer: FunctionComponent<ImageViewerProps> = ({
  children,
  onArrowLeftKeypress,
  onArrowRightKeypress,
  onEscapeKeypress,
  onClick
}) => {
  useEffect(() => {
    const keydownEventHandler = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          onArrowLeftKeypress()
          break
        case 'ArrowRight':
          onArrowRightKeypress()
          break
        case 'Escape':
          onEscapeKeypress()
          break
        default:
          break;
      }
    }

    document.addEventListener('keydown', keydownEventHandler)

    const cleanup = () => {
      document.removeEventListener('keydown', keydownEventHandler)
    }

    return cleanup
  }, [onArrowLeftKeypress, onArrowRightKeypress, onEscapeKeypress])

  return (
    <div className="backdrop" onClick={onClick}>
      <div className="content">
        {children}
      </div>
      <style jsx>
        {`
          .backdrop {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            height: 100%;
            width: 100%;
            background-color: #000;
            z-index: 10;
          }
          .content {
            position: relative;
            height: 100%;
            width: 100%;
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
    </div>
  )
}

const ImageViewerImage: FunctionComponent<ImageViewerImageProps> = ({ src, className }) => {
  const style = {
    width: '100%',
    height: 'auto',
    maxHeight: '100%'
  }

  return (
    <div className={className}>
      <img src={src} style={style} />
    </div>
  )
}

const imageViewerControlStyles = {
  cursor: 'pointer'
}

const ImageViewerPrevious: FunctionComponent<ImageViewerControl> = ({
  onClick,
  disabled,
  className
}) => {
  const style = {
    ...imageViewerControlStyles,
    ...(disabled && { cursor: 'not-allowed' })
  }

  return (
    <div
      onClick={onClick}
      className={className}
      style={style}
    >
      <ArrowBackIcon fontSize="large" />
    </div>
  )
}

const ImageViewerNext: FunctionComponent<ImageViewerControl> = ({
  onClick,
  disabled,
  className
}) => {
  const style = {
    ...imageViewerControlStyles,
    ...(disabled && { cursor: 'not-allowed' })
  }

  return (
    <div
      onClick={onClick}
      className={className}
      style={style}
    >
      <ArrowForwardIcon fontSize="large" />
    </div>
  )
}

const ImageViewerClose: FunctionComponent<ImageViewerControl> = ({ onClick, className }) => {
  return (
    <div
      onClick={onClick}
      className={className}
      style={imageViewerControlStyles}
    >
      <CloseIcon fontSize="large" />
    </div>
  )
}

export default ImageViewer

export {
  ImageViewerImage,
  ImageViewerPrevious,
  ImageViewerNext,
  ImageViewerClose
}
