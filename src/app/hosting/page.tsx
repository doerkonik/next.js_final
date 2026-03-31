'use client'

import Loader from '@/components/Loading'
import { Container, PricingCard, Section, SectionHeader } from '@/components/UI'
import { useHostingPlans } from '@/hooks/useHosting'

export default function HostingPage() {
  const { plans, loading, error } = useHostingPlans()

  if (loading) {
    return <Loader />
  }

  if (error) {
    return (
      <div className="pt-24 pb-20">
        <Container>
          <div className="text-center text-red-500">{error}</div>
        </Container>
      </div>
    )
  }

  // Transform plans data for the existing components
  const hostingPlans = plans.map(plan => ({
    name: plan.name,
    price: plan.price,
    href: plan.href,
    features: plan.features,
    popular: plan.popular
  }))

  // Create comparison data from plans
  const comparisonRows = [
    { label: 'Websites', values: hostingPlans.map(p => p.name === 'Starter' ? '1' : p.name === 'Business' ? '5' : 'Unlimited') },
    { label: 'SSD Storage', values: hostingPlans.map(p => p.name === 'Starter' ? '5 GB' : p.name === 'Business' ? '20 GB' : '50 GB') },
    { label: 'Bandwidth', values: hostingPlans.map(p => p.name === 'Starter' ? '10 GB' : 'Unlimited') },
    { label: 'Free SSL', values: hostingPlans.map(() => true) },
    { label: 'Email Accounts', values: hostingPlans.map(p => p.name === 'Starter' ? '1' : p.name === 'Business' ? '10' : 'Unlimited') },
    { label: 'Daily Backup', values: hostingPlans.map(p => p.name === 'Starter' ? false : true) },
    { label: 'Free Domain', values: hostingPlans.map(p => p.name === 'Starter' ? false : true) },
    { label: 'Dedicated IP', values: hostingPlans.map(p => p.name === 'Pro' ? true : false) },
    { label: 'Free CDN', values: hostingPlans.map(p => p.name === 'Pro' ? true : false) },
  ]

  const stacks = ['Node.js', 'Python', 'PHP 8.x', '.NET Core', 'Next.js', 'React', 'Vue.js', 'Laravel', 'Django', 'Ruby on Rails', 'WordPress', 'MySQL', 'PostgreSQL', 'Redis']

  return (
    <div className="pt-24 pb-20">
      <div className="fixed top-32 right-1/4 w-80 h-80 bg-primary/15 rounded-full blur-3xl pointer-events-none" />

      <Container>
        <div className="text-center mb-16">

          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
            Simple, Transparent{' '}
            <span className="text-gradient">Hosting Plans</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            High-performance shared hosting with SSD storage, free SSL, and 24/7 Bangladesh support.
          </p>
        </div>

        {/* Plans */}
        <div className="grid sm:grid-cols-3 gap-6 mb-20">
          {hostingPlans.map((p) => (
            <PricingCard key={p.name} {...p} />
          ))}
        </div>

        {/* Feature comparison */}
        <SectionHeader title="Compare" highlight="All Features" />
        <div className="glass-card rounded-2xl overflow-hidden border-glow">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20 dark:border-white/10">
                  <th className="text-left p-5 text-sm font-bold text-slate-600 dark:text-slate-400">Feature</th>
                  {hostingPlans.map((p) => (
                    <th key={p.name} className={`p-5 text-center text-sm font-bold ${p.popular ? 'text-primary' : 'text-slate-600 dark:text-slate-400'}`}>
                      {p.name}
                      {p.popular && <span className="ml-1 text-[10px] bg-primary text-white px-1.5 py-0.5 rounded-full">★</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.label} className={`border-b border-white/10 last:border-0 ${i % 2 === 0 ? 'bg-white/20 dark:bg-white/2' : ''}`}>
                    <td className="p-5 text-sm text-slate-600 dark:text-slate-400 font-medium">{row.label}</td>
                    {row.values.map((v, j) => (
                      <td key={j} className="p-5 text-center text-sm font-semibold">
                        {v === true ? (
                          <span className="text-primary">✓</span>
                        ) : v === false ? (
                          <span className="text-slate-300 dark:text-slate-600">—</span>
                        ) : (
                          <span className="text-slate-700 dark:text-slate-300">{v}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stack support */}
        <Section>
          <SectionHeader title="Supported" highlight="Tech Stacks" subtitle="Deploy anything. We've got you covered." />
          <div className="flex flex-wrap justify-center gap-4">
            {stacks.map((s) => (
              <div key={s} className="glass-card rounded-xl px-6 py-3 text-sm font-bold text-slate-700 dark:text-slate-300 border-glow hover:text-primary hover:border-primary/50 transition-all cursor-default">
                {s}
              </div>
            ))}
          </div>
        </Section>
      </Container>
    </div>
  )
}
