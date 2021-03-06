interface Link {
  href: string,
  label: string
}

const NAV_LINKS: Link[] = [
  {
    href: '/',
    label: 'Home'
  },
  {
    href: '/projects',
    label: 'Projects'
  },
  {
    href: '/about',
    label: 'About'
  },
  {
    href: '/references',
    label: 'References'
  }
]

const GALLERY_IMAGES = [
  'https://goliath-construction-gallery-images.s3-us-west-1.amazonaws.com/test-gallery-image-1.jpeg',
  'https://goliath-construction-gallery-images.s3-us-west-1.amazonaws.com/test-gallery-image-2.jpeg',
  'https://goliath-construction-gallery-images.s3-us-west-1.amazonaws.com/test-gallery-image-3.jpeg',
  'https://goliath-construction-gallery-images.s3-us-west-1.amazonaws.com/test-gallery-image-4.jpeg'
]

const META_DESCRIPTION = 'Goliath Construction is a construction company based in Los Angeles. The company was founded by Alberto Conseco.'

export {
  NAV_LINKS,
  GALLERY_IMAGES,
  META_DESCRIPTION
}
