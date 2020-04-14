import React, { FunctionComponent } from 'react'

interface HeaderProps {
  style?: object
}

const Header: FunctionComponent<HeaderProps> = ({ children, style }) => {
  const styles = {...style}

  return (
    <header style={styles}>
      <div>
        {children}
      </div>
      <style jsx>
        {`
          header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            padding: 20px;
          }
          div {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
        `}
      </style>
    </header>
  )
}

export default Header
