/**
 * Stubbed contribute module for marketing site
 *
 * The original contribute feature required Supabase-specific infrastructure
 * (NEXT_PUBLIC_SUPABASE_CONTRIBUTE_URL and NEXT_PUBLIC_SUPABASE_CONTRIBUTE_PUBLISHABLE_KEY)
 * that is not available in our standalone deployment.
 *
 * All functions return empty results to allow the build to complete.
 */

import type {
  LeaderboardRow,
  ThreadRow,
} from '~/types/contribute'

export async function getChannelCounts(
  _product_area?: string | string[],
  _stack?: string | string[],
  _search?: string
): Promise<{ all: number; discord: number; reddit: number; github: number }> {
  // Stubbed - no contribute database available
  return { all: 0, discord: 0, reddit: 0, github: 0 }
}

export async function getUnansweredThreads(
  _product_area?: string | string[],
  _channel?: string,
  _stack?: string | string[],
  _search?: string,
  _offset: number = 0,
  _limit: number = 100
): Promise<ThreadRow[]> {
  // Stubbed - no contribute database available
  return []
}

export async function getThreadById(_id: string): Promise<ThreadRow | null> {
  // Stubbed - no contribute database available
  return null
}

export async function getThreadRepliesById(_thread_key: string | null) {
  // Stubbed - no contribute database available
  return { question: null, replies: [] }
}

export async function getAllProductAreas(): Promise<string[]> {
  // Stubbed - no contribute database available
  return []
}

export async function getAllStacks(): Promise<string[]> {
  // Stubbed - no contribute database available
  return []
}

export const LEADERBOARD_PERIODS = ['all', 'year', 'quarter', 'month', 'week', 'today'] as const

export async function getLeaderboard(
  _period: (typeof LEADERBOARD_PERIODS)[number]
): Promise<LeaderboardRow[]> {
  // Stubbed - no contribute database available
  return []
}

export async function getUserActivity(_author: string) {
  // Stubbed - no contribute database available
  return {
    threads: [],
    replies: [],
    replyThreads: [],
    stats: {
      threadCount: 0,
      replyCount: 0,
    },
  }
}
