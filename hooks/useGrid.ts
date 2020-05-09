import { useState, useEffect } from 'react'

import useWindowSize from './useWindowSize'

const useGrid = () => {
  const [ cellHeight, setCellHeight ] = useState(200)
  const [ columns, setColumns ] = useState(4)

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

  return { columns, cellHeight }
}

export default useGrid