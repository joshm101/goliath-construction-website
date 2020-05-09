interface Project {
  slug: string,
  thumbnailImage: string,
  images: string[],
  name: string,
  id: number
}

const projects: Project[] = [
  {
    slug: '11875-missouri-ave',
    thumbnailImage: 'https://goliath-construction-projects.s3-us-west-1.amazonaws.com/11875-missouri-ave/ISma27ueule4p61000000000.jpeg',
    images: [],
    name: '11875 Missouri Ave',
    id: 1
  },
  {
    slug: '7957-mcconnell-ave',
    thumbnailImage: 'https://goliath-construction-projects.s3-us-west-1.amazonaws.com/7957-mcconnell-ave/ISizi9hldjzu1y1000000000.jpeg',
    images: [],
    name: '7957 McConnell Ave',
    id: 2
  },
  {
    slug: '7713-midfield-ave',
    thumbnailImage: 'https://goliath-construction-projects.s3-us-west-1.amazonaws.com/7713-midfield-ave/IS6m8rh2elxbf70000000000.jpeg',
    images: [],
    name: '7713 Midfield Ave',
    id: 3
  },
  {
    slug: '6440-80th-ave',
    thumbnailImage: 'https://goliath-construction-projects.s3-us-west-1.amazonaws.com/6440-80th-ave/ISvkng6vcz1cya0000000000.jpeg',
    images: [],
    name: '6440 80th Ave',
    id: 4
  },
  {
    slug: '2149-keaton-ave',
    thumbnailImage: 'https://goliath-construction-projects.s3-us-west-1.amazonaws.com/2149-kelton-ave/ISeko4s3iwcpah0000000000.jpeg',
    images: [],
    name: '2149 Keaton Ave',
    id: 5
  },
  {
    slug: '1050-amoroso-pl',
    thumbnailImage: 'https://goliath-construction-projects.s3-us-west-1.amazonaws.com/1050-amoroso-pl/ISiffpftqdc9vx0000000000.jpeg',
    images: [],
    name: '1050 Amoroso Pl',
    id: 6
  },
  {
    slug: '815-commonwealth-ave',
    thumbnailImage: 'https://goliath-construction-projects.s3-us-west-1.amazonaws.com/815-commonwealth-ave/ISrdnsczyek4je1000000000.jpeg',
    images: [],
    name: '815 Commonwealth Ave',
    id: 7
  }
]

export type { Project }
export default projects
