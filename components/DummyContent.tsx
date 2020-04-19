import React from 'react'

const DummyContent = () => {
  const dummyArray = Array.from({ length: 10 }, (_, key) => key)

  return (
    <div className="content">
      <br />
      <br />
      {dummyArray.map(value => (
        <div key={value}>
          <h2 className="dummy-text">
            Content to trigger overflow
          </h2>
          <br />
          <br />
          <br />
          <br />
        </div>
      ))}
      <style>
        {`
          .content {
            text-align: center;
          }
        `}
      </style>
    </div>
  )
}

export default DummyContent
