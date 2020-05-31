import React, { FunctionComponent } from 'react'
import aws from 'aws-sdk'
import { GetStaticProps } from 'next'
import { ParallaxBanner } from 'react-scroll-parallax'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'

import Layout from '../../components/Layout'
import PageContentContainer from '../../components/PageContentContainer'

import projects, { Project } from '../../data/projects'
import { makeParallaxProps } from '../../utils'
import useGrid from '../../hooks/useGrid'

const S3_BUCKET = 'goliath-construction-projects'
const ROOT_S3_URL = `https://s3.us-west-1.amazonaws.com/${S3_BUCKET}`

interface ProjectDetailsPageComponent extends FunctionComponent {
  project: Project
}

const ProjectDetailsPage = ({ project }: ProjectDetailsPageComponent) => {
  const parallaxProps = makeParallaxProps(
    project.thumbnailImage,
    { amount: 0.2 }
  )

  const { columns, cellHeight } = useGrid()

  return (
    <Layout>
      <ParallaxBanner {...parallaxProps} />
      <PageContentContainer>
        <h1>{project.name}</h1>
        <br />
        <GridList cellHeight={cellHeight} cols={columns}>
          {project.images.map(image => (
            <GridListTile key={image} cols={1}>
              <img src={image} />
            </GridListTile>
          ))}
        </GridList>
      </PageContentContainer>
      <style jsx>
        {`
          h1 {
            font-weight: 500;
            line-height: 0.9em;
            margin-top: -3px;
          }

          @media (max-width: 500px) {
            h1 {
              font-size: 1.5em;
            }
          }
        `}
      </style>
    </Layout>
  )
}

const getStaticPaths = async () => {
  const paths = projects.map(project => {
      return { params: { slug: project.slug } }
  })

  return { paths, fallback: false }
}

const getStaticProps: GetStaticProps = async context => {
  const { params } = context

  if (!params) {
    return { props: { project: null } }
  }

  const slug = params['slug']
  const project = projects.find(project => project.slug === slug)

  const s3 = new aws.S3({
    accessKeyId: process.env.awsAccessKeyId,
    secretAccessKey: process.env.awsAccessSecret
  })


  const fetchS3Images = () => new Promise((resolve, reject) => {
    const s3Params = { Bucket: S3_BUCKET }

    s3.listObjectsV2(s3Params, (error, data) => {
      if (error) {
        reject(error)
      }

      resolve(data)
    })
  })


  const s3Response: any = await fetchS3Images()
  const projectImages = s3Response.Contents.filter((imageData: any) =>
    imageData.Key.includes(slug)
  ).map((imageData: any) => `${ROOT_S3_URL}/${imageData.Key}`)


  const projectWithImages = { ...project, images: projectImages }
  return { props: { project: projectWithImages } }
}

export default ProjectDetailsPage
export { getStaticPaths, getStaticProps }
