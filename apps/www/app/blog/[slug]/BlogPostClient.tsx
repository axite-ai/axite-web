'use client'

import dynamic from 'next/dynamic'
import { useMemo } from 'react'

import authors from 'lib/authors.json'
import { isNotNullOrUndefined } from 'lib/helpers'
import useActiveAnchors from 'hooks/useActiveAnchors'

import type { Blog, BlogData, CMSAuthor, PostReturnType, ProcessedBlogData } from 'types/post'

const BlogPostRenderer = dynamic(() => import('components/Blog/BlogPostRenderer'), { ssr: false })

type BlogPostPageProps = {
  prevPost: PostReturnType | null
  nextPost: PostReturnType | null
  relatedPosts: (PostReturnType & BlogData)[]
  blog: Blog & BlogData
  isDraftMode: boolean
}

export default function BlogPostClient(props: BlogPostPageProps) {
  const isDraftMode = props.isDraftMode

  useActiveAnchors()

  const blogMetaData = props.blog as ProcessedBlogData

  const isCMS = 'isCMS' in blogMetaData && blogMetaData.isCMS

  const blogAuthors = isCMS
    ? ('authors' in blogMetaData ? (blogMetaData.authors as CMSAuthor[]) : []) || []
    : ('author' in blogMetaData ? (blogMetaData.author as string) : '')
          ?.split(',')
          .map((authorId: string) => {
            const foundAuthor = authors.find((author) => author.author_id === authorId)
            return foundAuthor ?? null
          })
          .filter(isNotNullOrUndefined) || []

  return (
    <BlogPostRenderer
      blog={props.blog as ProcessedBlogData}
      blogMetaData={blogMetaData}
      isDraftMode={isDraftMode}
      isLivePreviewLoading={false}
      prevPost={props.prevPost}
      nextPost={props.nextPost}
      authors={blogAuthors}
    />
  )
}
