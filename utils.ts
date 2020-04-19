const makeParallaxProps = (image: string, overrides?: object) => ({
  layers: [
    {
      image,
      amount: 0.5,
      children: null,
      ...overrides
    }
  ],
  style: { height: '315px' }
})

export {
  makeParallaxProps
}
