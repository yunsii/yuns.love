import 'heti/umd/heti.min.css'

import SectionContainer from '@/components/SectionContainer'
import { BlogSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import formatDate from '@/lib/utils/formatDate'
import Comments from '@/components/comments'
import Link from '@/components/Link'

import type { PostFrontMatter } from 'types/PostFrontMatter'

interface Props {
  frontMatter: PostFrontMatter
  next?: { slug: string; title: string }
  prev?: { slug: string; title: string }
}

export default function HetiLayout(props: React.PropsWithChildren<Props>) {
  const { frontMatter, next, prev, children } = props
  const { slug, date, title } = frontMatter

  // 尝试使用 autoSpacing 功能，貌似不生效
  // useEffect(() => {
  //   const Heti = require('heti/js/heti-addon').default
  //   const heti = new Heti('.heti')
  //   heti.autoSpacing() // 自动进行中西文混排美化和标点挤压
  // }, [])

  return (
    <SectionContainer>
      <BlogSEO url={`${siteMetadata.siteUrl}/blog/${slug}`} {...frontMatter} />
      <ScrollTopAndComment />
      <article className='heti mx-auto'>
        <header>
          <div className='space-y-1 border-b border-gray-200 pb-10 text-center dark:border-gray-700'>
            <dl>
              <div>
                <dt className='sr-only'>Published on</dt>
                <dd className='text-base font-medium leading-6 text-gray-500 dark:text-gray-400'>
                  <time dateTime={date}>{formatDate(date)}</time>
                </dd>
              </div>
            </dl>
            <div>
              <h1>{title}</h1>
            </div>
          </div>
        </header>
        <div className='max-w-none pt-10 pb-8'>{children}</div>
        <div className='border-b border-gray-200'>
          <small className='pb-2 text-gray-400'>
            文章排版基于
            <a href='https://github.com/sivan/heti' target='_blank' rel='noreferrer'>
              <ruby className='heti-ruby--inline'>
                赫<rp>(</rp>
                <rt lang='zh-Latn'>hè</rt>
                <rp>)</rp>
              </ruby>
              <ruby className='heti-ruby--inline'>
                蹏<rp>(</rp>
                <rt lang='zh-Latn'>tí</rt>
                <rp>)</rp>
              </ruby>
            </a>
          </small>
        </div>
        <Comments frontMatter={frontMatter} />
        <footer>
          <div className='flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base'>
            {prev && (
              <div className='pt-4 xl:pt-8'>
                <Link
                  href={`/blog/${prev.slug}`}
                  className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
                >
                  &larr; {prev.title}
                </Link>
              </div>
            )}
            {next && (
              <div className='pt-4 xl:pt-8'>
                <Link
                  href={`/blog/${next.slug}`}
                  className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
                >
                  {next.title} &rarr;
                </Link>
              </div>
            )}
          </div>
        </footer>
      </article>
    </SectionContainer>
  )
}
