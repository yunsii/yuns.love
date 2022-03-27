export type PostFrontMatter = {
  title: string
  date: string
  tags: string[]
  lastMod?: string
  draft?: boolean
  summary?: string
  images?: string[]
  authors?: string[]
  layout?: string
  canonicalUrl?: string
  slug: string
  fileName: string
}
