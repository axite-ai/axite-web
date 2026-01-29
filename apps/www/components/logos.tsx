import { cn } from 'ui'

const logos = [
  { image: `/images/logos/publicity/mozilla.svg`, alt: 'mozilla' },
  { image: `/images/logos/publicity/github.svg`, alt: 'github' },
  { image: `/images/logos/publicity/1password.svg`, alt: '1password' },
  { image: `/images/logos/publicity/pwc.svg`, alt: 'pwc' },
  { image: `/images/logos/publicity/langchain.svg`, alt: 'langchain' },
  { image: `/images/logos/publicity/resend.svg`, alt: 'resend' },
]

interface Props {
  className?: string
}

const Logos: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn('py-12 md:py-16', className)}>
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-center text-sm text-foreground-muted mb-8">
          Trusted by teams shipping production agents
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-70">
          {logos.map((logo) => (
            <img
              key={logo.alt}
              src={logo.image}
              alt={logo.alt}
              className="h-8 md:h-10 w-auto grayscale"
              draggable={false}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Logos
