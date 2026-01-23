/**
 * CMS integration stubbed - returns empty results.
 * Static MDX posts in _blog/ used instead.
 *
 * The original implementation used Payload CMS API which requires
 * authentication we don't have configured. These stub functions
 * allow the blog to work with static posts only.
 */

// Keep types for future CMS integration
type CMSBlogPost = {
  id: string
  title: string
  slug: string
  description: string
  content: {
    root: {
      children: Array<{
        type: string
        children: Array<{
          text: string
          type: string
          [key: string]: any
        }>
        [key: string]: any
      }>
    }
  }
  date?: string
  launchweek?: string
  toc_depth?: number
  readingTime?: number
  categories?: string[]
  tags?: string[]
  industry?: string[]
  supabase_products?: string[]
  company_size?: string
  region?: string
  logo?: string
  logo_inverse?: string
  thumb?: {
    url: string
  }
  createdAt: string
  updatedAt: string
  authors?: {
    author: string
    author_id: string
    position: string
    author_url: string
    author_image_url: {
      url: string
    }
    username: string
  }[]
  meta?: {
    title?: string | null
    image?: (number | string | null) | Media
    description?: string | null
  }
}

/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: number
  alt?: string | null
  caption?: {
    root: {
      type: string
      children: {
        type: string
        version: number
        [k: string]: unknown
      }[]
      direction: ('ltr' | 'rtl') | null
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
      indent: number
      version: number
    }
    [k: string]: unknown
  } | null
  prefix?: string | null
  updatedAt: string
  createdAt: string
  url?: string | null
  thumbnailURL?: string | null
  filename?: string | null
  mimeType?: string | null
  filesize?: number | null
  width?: number | null
  height?: number | null
  focalX?: number | null
  focalY?: number | null
  sizes?: {
    thumbnail?: {
      url?: string | null
      width?: number | null
      height?: number | null
      mimeType?: string | null
      filesize?: number | null
      filename?: string | null
    }
    square?: {
      url?: string | null
      width?: number | null
      height?: number | null
      mimeType?: string | null
      filesize?: number | null
      filename?: string | null
    }
    small?: {
      url?: string | null
      width?: number | null
      height?: number | null
      mimeType?: string | null
      filesize?: number | null
      filename?: string | null
    }
    medium?: {
      url?: string | null
      width?: number | null
      height?: number | null
      mimeType?: string | null
      filesize?: number | null
      filename?: string | null
    }
    large?: {
      url?: string | null
      width?: number | null
      height?: number | null
      mimeType?: string | null
      filesize?: number | null
      filename?: string | null
    }
    xlarge?: {
      url?: string | null
      width?: number | null
      height?: number | null
      mimeType?: string | null
      filesize?: number | null
      filename?: string | null
    }
    og?: {
      url?: string | null
      width?: number | null
      height?: number | null
      mimeType?: string | null
      filesize?: number | null
      filename?: string | null
    }
  }
}

type ProcessedPost = {
  slug: string
  title: string
  description: string
  date: string
  formattedDate: string
  readingTime: string
  industry?: string[]
  supabase_products?: string[]
  company_size?: string
  region?: string
  logo?: string
  logo_inverse?: string
  authors: Array<{
    author: string
    author_id: string
    position: string
    author_url: string
    author_image_url: string | null
    username: string
  }>
  toc_depth: number
  thumb: string | null
  url: string
  path: string
  isCMS: boolean
  tags: string[]
  content: string
  meta?: {
    title?: string | null
    image?: (number | string | null) | Media
    description?: string | null
  }
}

/**
 * Fetch all blog post slugs from the CMS
 * STUBBED: Returns empty array - static MDX posts used instead
 */
export async function getAllCMSPostSlugs(): Promise<{ params: { slug: string } }[]> {
  return []
}

/**
 * Fetch a single blog post from the CMS by slug
 * STUBBED: Returns null - static MDX posts used instead
 */
export async function getCMSPostBySlug(
  _slug: string,
  _preview = false
): Promise<null> {
  return null
}

/**
 * Fetch all blog posts from the CMS
 * STUBBED: Returns empty array - static MDX posts used instead
 */
export async function getAllCMSPosts(_options: {
  limit?: number
  tags?: string[]
  currentPostSlug?: string
} = {}): Promise<ProcessedPost[]> {
  return []
}
