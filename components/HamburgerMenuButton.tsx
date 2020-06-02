import React, { FunctionComponent } from 'react'

interface HamburgerMenuButtonComponent {
  onClick: () => void
}

const HamburgerMenuButton: FunctionComponent<HamburgerMenuButtonComponent> = ({ onClick }) => {
  return (
    <div className="menu-button" onClick={onClick}>
      <div className="menu-button-bar" />
      <div className="menu-button-bar" />
      <div className="menu-button-bar" />

      <style jsx>
        {`
          .menu-button {
            height: 24px;
            width: 24px;
            padding: 8px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            cursor: pointer;
          }

          .menu-button-bar {
            width: 100%;
            height: 2.5px;
            background: #d3cec8;
            box-shadow: 0 0px 0px rgba(0,0,0,0.12), 0 1px 0px rgba(0,0,0,0.24);
          }
        `}
      </style>
    </div>
  )
}

export default HamburgerMenuButton
