import React, { FunctionComponent } from 'react'

const PageContentContainer: FunctionComponent = ({ children }) => {
  return (
    <div>
      {children}
      <style jsx>
        {`
          div {
            max-width: 960px;
            margin: 0 auto;
            padding: 100px 8%;
          }

          @media (max-width: 768px) {
            div {
              padding: 20px;
            }
          }
        `}
      </style>
    </div>
  )
}

export default PageContentContainer
