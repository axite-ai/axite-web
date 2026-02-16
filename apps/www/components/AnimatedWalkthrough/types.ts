// apps/www/components/AnimatedWalkthrough/types.ts

export type BeatId = 'agent-acts' | 'intercept' | 'slack-approval' | 'execution' | 'evidence' | 'cta'

export interface TerminalLine {
  text: string
  color?: 'green' | 'amber' | 'red' | 'blue' | 'dim' | 'white' | 'brand'
  delay?: number      // ms before this line starts typing
  typeSpeed?: number  // ms per character (default 30)
  instant?: boolean   // render immediately, no typing animation
}

export interface Beat {
  id: BeatId
  durationMs: number
  label: string        // for progress bar
  lines?: TerminalLine[]
}
