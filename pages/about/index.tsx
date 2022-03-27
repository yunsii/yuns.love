import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { getFileBySlug } from '@/lib/mdx'

import styles from './index.module.css'

import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import type { AuthorFrontMatter } from 'types/AuthorFrontMatter'

const DEFAULT_LAYOUT = 'AuthorLayout'

export const getStaticProps: GetStaticProps<{
  authorDetails: { mdxSource: string; frontMatter: AuthorFrontMatter }
}> = async () => {
  const authorDetails = await getFileBySlug('authors', ['default'])
  const { mdxSource, frontMatter } = authorDetails
  return { props: { authorDetails: { mdxSource, frontMatter } } } as any
}

export default function About({
  authorDetails,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { mdxSource, frontMatter } = authorDetails

  console.log('styles', styles)
  return (
    <div className={styles.about}>
      <MDXLayoutRenderer
        layout={frontMatter.layout || DEFAULT_LAYOUT}
        mdxSource={mdxSource}
        frontMatter={frontMatter}
      />
    </div>
  )
}
