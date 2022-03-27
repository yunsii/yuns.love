import Card from '@/components/Card'
import { PageSEO } from '@/components/SEO'
import projectsData from '@/data/projectsData'
import siteMetadata from '@/data/siteMetadata'

export default function Projects() {
  return (
    <>
      <PageSEO
        title={`项目 - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />
      <div className='divide-y divide-gray-200 dark:divide-gray-700'>
        <div className='space-y-2 pt-6 pb-8 md:space-y-5'>
          <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14'>
            项目
          </h1>
          <p className='text-lg leading-7 text-gray-500 dark:text-gray-400'>
            分享热爱，分享创造。
          </p>
        </div>
        <div className='container py-12'>
          <div className='-m-4 flex flex-wrap'>
            {projectsData.map((d) => (
              <Card
                key={d.title}
                title={d.title}
                description={d.description}
                imgSrc={d.imgSrc}
                href={d.href}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}