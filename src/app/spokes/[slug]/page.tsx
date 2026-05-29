import { notFound } from 'next/navigation'
import { spokesRegistry } from '@/data/spokes'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Breadcrumb from '@/components/layout/Breadcrumb'

interface Props {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return Object.keys(spokesRegistry).map((slug) => ({
    slug,
  }))
}

export default async function SpokePage({ params }: Props) {
  const { slug } = await params
  const spoke = spokesRegistry[slug]

  if (!spoke) {
    notFound()
  }

  return (
    <div className="flex-grow bg-[#0a0a0a] text-zinc-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Breadcrumb className="mb-6" />
        <div className="mb-6">
          <Link href="/services" className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
            &larr; Back to Services
          </Link>
        </div>

        <div className="bg-[#111111] border border-white/10 rounded-2xl p-8 sm:p-10 shadow-2xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            {spoke.title}
          </h1>
          <p className="text-lg text-zinc-300 mt-4 leading-relaxed font-medium">
            {spoke.description}
          </p>

          <div className="mt-8 pt-8 border-t border-white/5">
            <h2 className="text-xl font-bold text-zinc-100 mb-4">What&apos;s Included:</h2>
            <ul className="space-y-3">
              {spoke.details.map((detail, index) => (
                <li key={index} className="flex items-start gap-3 text-sm sm:text-base text-zinc-400 leading-relaxed">
                  <span className="text-cyan-400 font-bold mt-0.5">&bull;</span>
                  {detail}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <p className="text-xs text-zinc-500 text-center sm:text-left leading-relaxed">
              Have unique requirements? All services can be custom-tailored to your company&apos;s operational context.
            </p>
            <Link href="/book" className="w-full sm:w-auto">
              <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-zinc-50 font-semibold tracking-wide py-3 px-6">
                Consult with Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
