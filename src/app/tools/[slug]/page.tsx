import { notFound } from 'next/navigation'
import { toolsRegistry } from '@/data/tools'
import ToolDetailClient from './ToolDetailClient'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return Object.keys(toolsRegistry).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const tool = toolsRegistry[slug]
  if (!tool) return {}
  return {
    title: `${tool.title} | CalBizHR`,
    description: tool.description,
  }
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params
  const tool = toolsRegistry[slug]
  if (!tool) notFound()
  return <ToolDetailClient tool={tool} />
}
