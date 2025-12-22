import Link from 'next/link'

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground font-sans">
      <div className="flex items-center">
        <h1 className="text-2xl font-medium border-r border-muted-foreground/30 pr-6 mr-6 py-2">
          Under Development
        </h1>
        <p className="text-sm font-normal text-muted-foreground">
          This page is currently being built.
        </p>
      </div>
      
      <div className="mt-8 flex gap-8 text-sm">
        <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground transition-colors group">
          <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span> Go to home
        </Link>
        <Link href="/apply" className="flex items-center text-muted-foreground hover:text-foreground transition-colors group">
          Apply Now <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </div>
  )
}
