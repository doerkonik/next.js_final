'use client'

import Loader from '@/components/Loading';
import { Container, GlassCard, Section, SectionHeader } from '@/components/UI';
import { useVPSPlans } from '@/hooks/useVPS';
import { useRouter } from 'next/navigation';

export default function VPSPage() {
  const { plans, loading, error } = useVPSPlans()
  const router = useRouter();

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
  const vpsPlans = plans.map(plan => ({
    name: plan.name,
    price: plan.price,
    cpu: plan.cpu,
    ram: plan.ram,
    storage: plan.storage,
    bandwidth: plan.bandwidth,
    port: plan.port,
    href: plan.href,
    popular: plan.popular
  }))

  // Create spec rows from plans
  const specRows = [
    { label: 'vCPU Cores', values: vpsPlans.map(p => p.cpu.split(' ')[0]) },
    { label: 'RAM', values: vpsPlans.map(p => p.ram) },
    { label: 'NVMe SSD', values: vpsPlans.map(p => p.storage) },
    { label: 'Bandwidth', values: vpsPlans.map(p => p.bandwidth) },
    { label: 'Network Port', values: vpsPlans.map(p => p.port) },
    { label: 'IP Addresses', values: ['1 IPv4', '1 IPv4', '1 IPv4', '2 IPv4'] },
    { label: 'OS Choice', values: ['✓', '✓', '✓', '✓'] },
    { label: 'Root Access', values: ['✓', '✓', '✓', '✓'] },
    { label: 'DDoS Protection', values: ['✓', '✓', '✓', '✓'] },
    { label: 'Backup', values: ['—', 'Weekly', 'Daily', 'Daily'] },
  ]

  const vpsFeatures = [
    { icon: '🔐', title: 'Full Root Access', desc: 'Complete control over your server. Install any OS, software, or run any configuration you need.' },
    { icon: '⚡', title: 'NVMe SSD Storage', desc: 'Ultra-fast NVMe solid-state drives deliver 10x faster read/write speeds than traditional SSDs.' },
    { icon: '🛡️', title: 'DDoS Protection', desc: 'Enterprise-grade DDoS mitigation included in every plan at no extra cost.' },
    { icon: '🌐', title: '1 Gbps Network', desc: 'Blazing-fast 1 Gbps uplink with guaranteed network throughput for your applications.' },
    { icon: '🔄', title: 'Instant Provisioning', desc: 'Your VPS is ready in under 60 seconds after order confirmation.' },
    { icon: '📞', title: 'Managed Support', desc: 'Our Linux experts are on standby to help you configure and optimize your server.' },
  ]

  return (
    <div className="pt-24 pb-20">
      <div className="fixed top-32 left-1/4 w-80 h-80 bg-primary/15 rounded-full blur-3xl pointer-events-none" />

      <Container>
        <div className="text-center mb-16">

          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
            High-Performance{' '}
            <span className="text-gradient">VPS Hosting</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Full root access, guaranteed resources, NVMe SSD storage, and instant provisioning.
          </p>

        </div>

        {/* VPS Plans */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {vpsPlans.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${p.popular
                ? 'bg-primary text-white glow-primary shadow-xl shadow-primary/30'
                : 'glass-card border-glow hover:shadow-primary/10'
                }`}
            >
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-primary text-[10px] font-black px-3 py-1 rounded-full shadow-lg">
                  BEST VALUE
                </div>
              )}
              <div className={`text-xs font-bold mb-2 uppercase tracking-wider ${p.popular ? 'text-white/80' : 'text-primary'}`}>{p.name}</div>
              <div className="flex items-baseline gap-1 mb-4">
                <span className={`text-3xl font-extrabold ${p.popular ? 'text-white' : 'text-slate-800 dark:text-white'}`}>৳{p.price}</span>
                <span className={`text-xs ${p.popular ? 'text-white/60' : 'text-slate-400'}`}>/mo</span>
              </div>
              <div className="space-y-2 mb-6">
                {[
                  { icon: '💻', label: p.cpu },
                  { icon: '🧠', label: p.ram },
                  { icon: '💾', label: p.storage },
                  { icon: '🌐', label: p.bandwidth },
                  { icon: '🔌', label: p.port },
                ].map((spec) => (
                  <div key={spec.label} className={`flex items-center gap-2 text-xs ${p.popular ? 'text-white/90' : 'text-slate-600 dark:text-slate-300'}`}>
                    <span>{spec.icon}</span>
                    <span>{spec.label}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => router.push(p?.href || '#')}
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95 ${p.popular
                  ? 'bg-white text-primary hover:bg-white/90'
                  : 'bg-primary text-white glow-primary hover:bg-primary-500'
                  }`}
              >
                Order Now
              </button>
            </div>
          ))}
        </div>

        {/* Specs Table */}
        <SectionHeader title="Full Specs" highlight="Comparison" />
        <div className="glass-card rounded-2xl overflow-hidden border-glow mb-16">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-primary/10 border-b border-primary/20">
                  <th className="text-left p-4 text-sm font-bold text-slate-700 dark:text-slate-300">Specification</th>
                  {vpsPlans.map((p) => (
                    <th key={p.name} className={`p-4 text-center text-sm font-bold ${p.popular ? 'text-primary' : 'text-slate-600 dark:text-slate-400'}`}>
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {specRows.map((row, i) => (
                  <tr key={row.label} className={`border-b border-white/10 last:border-0 ${i % 2 === 0 ? 'bg-white/20 dark:bg-white/2' : ''}`}>
                    <td className="p-4 text-sm text-slate-600 dark:text-slate-400 font-medium">{row.label}</td>
                    {row.values.map((v, j) => (
                      <td key={j} className="p-4 text-center text-sm font-semibold text-slate-700 dark:text-slate-300">{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* VPS Features */}
        <SectionHeader title="What You Get With" highlight="Every VPS" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {vpsFeatures.map((f) => (
            <GlassCard key={f.title}>
              <div className="text-2xl mb-3">{f.icon}</div>
              <h3 className="font-bold text-slate-800 dark:text-white mb-2 text-sm">{f.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{f.desc}</p>
            </GlassCard>
          ))}
        </div>

        {/* Contact CTA */}
        <Section>
          <div className="glass-card rounded-3xl p-10 text-center border-glow">
            <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white mb-3">Ready to Order?</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm max-w-md mx-auto">
              VPS orders are handled manually. Contact our support team via WhatsApp or email to get started instantly.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <a href="https://wa.me/8801810176823" className="px-8 py-3 rounded-xl bg-green-500 text-white font-bold hover:scale-105 transition-all text-sm glow-primary">
                💬 WhatsApp Us
              </a>
              <a href="mailto:dtech@doer.com.bd" className="px-8 py-3 rounded-xl glass border border-primary/30 text-primary font-bold hover:bg-primary/10 transition-all text-sm">
                ✉️ Email Support
              </a>
            </div>
          </div>
        </Section>
      </Container>
    </div>
  )
}
