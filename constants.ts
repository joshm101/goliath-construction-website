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
  },
  {
    href: '/contact',
    label: 'Contact'
  }
]

export {
  NAV_LINKS
}
