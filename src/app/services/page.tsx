import Link from 'next/link'
import { spokesRegistry } from '@/data/spokes'
import { Button } from '@/components/ui/button'
import Breadcrumb from '@/components/layout/Breadcrumb'

export default function ServicesPage() {
  const services = Object.values(spokesRegistry)

  return (
    <div className="flex-grow bg-[#0a0a0a] text-zinc-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Breadcrumb className="mb-8" />
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Our HR Solutions
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-4">
            Affordable, expert, and AI-augmented California compliance services for small businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.slug}
              className="bg-[#111111] border border-white/5 hover:border-white/10 rounded-2xl p-6 flex flex-col justify-between transition-all duration-200"
            >
              <div>
                <h2 className="text-xl font-bold text-zinc-100">{service.title}</h2>
                <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                  {service.description}
                </p>
              </div>
              <div className="mt-6">
                <Link href={`/spokes/${service.slug}`}>
                  <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold tracking-wide py-2 rounded-lg cursor-pointer transition-colors">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
