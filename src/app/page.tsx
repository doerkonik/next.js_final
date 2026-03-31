import { Container, Section, SectionHeader, GlassCard, PricingCard, GlassButton } from '@/components/UI'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-teal-300/15 rounded-full blur-3xl animate-float animation-delay-400" />
        <div className="absolute top-40 right-1/3 w-48 h-48 bg-emerald-300/10 rounded-full blur-2xl animate-float animation-delay-200" />

        <Container className="relative z-10 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm font-semibold text-primary border border-primary/30 mb-6">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Host Any App. Any Stack. Instantly.
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
                Premium Cloud{' '}
                <span className="text-gradient block">Hosting for</span>
                Bangladesh
              </h1>
              <p className="text-lg text-slate-500 dark:text-slate-400 mb-8 max-w-lg leading-relaxed">
                Deploy Node.js, Python, PHP, .NET, Next.js, React & more on high-performance infrastructure with one-click deployment and 24/7 support.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/hosting" className="px-8 py-4 rounded-2xl font-bold bg-primary text-white glow-primary hover:scale-105 active:scale-95 transition-all duration-300 text-sm">
                  Get Started Free →
                </Link>
                <Link href="/domain" className="px-8 py-4 rounded-2xl font-bold glass border border-primary/30 text-primary hover:bg-primary/10 transition-all text-sm">
                  Search Domain
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-12">
                {[
                  { n: '10K+', l: 'Happy Clients' },
                  { n: '99.9%', l: 'Uptime SLA' },
                  { n: '24/7', l: 'Support' },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="text-2xl font-extrabold text-gradient">{s.n}</div>
                    <div className="text-xs text-slate-400 font-semibold">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Glass Card */}
            <div className="hidden lg:block">
              <div className="glass-card rounded-3xl p-6 border-glow max-w-sm ml-auto animate-float">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="text-xs text-slate-400 ml-2">dtech-dashboard</span>
                </div>
                <div className="space-y-3 mb-6">
                  {[
                    { name: 'Web Server', status: 'Running', color: 'bg-green-400' },
                    { name: 'Database', status: 'Active', color: 'bg-green-400' },
                    { name: 'SSL Certificate', status: 'Valid', color: 'bg-green-400' },
                    { name: 'CDN', status: 'Enabled', color: 'bg-blue-400' },
                  ].map((item) => (
                    <div key={item.name} className="flex items-center justify-between p-3 rounded-xl bg-white/30 dark:bg-white/5">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${item.color} animate-pulse`} />
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.name}</span>
                      </div>
                      <span className="text-xs text-primary font-bold">{item.status}</span>
                    </div>
                  ))}
                </div>
                <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
                  <div className="text-xs text-primary font-bold mb-1">Monthly Usage</div>
                  <div className="flex items-end gap-1 h-12">
                    {[40, 65, 45, 80, 60, 90, 70].map((h, i) => (
                      <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-primary/40 rounded-sm" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Features */}
      <Section>
        <Container>
          <SectionHeader title="Everything You Need to" highlight="Scale Fast" subtitle="World-class infrastructure with Bangladesh-local support." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <GlassCard key={f.title} className="group">
                <div className={`w-12 h-12 rounded-2xl ${f.bg} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                  {f.icon}
                </div>
                <h3 className="font-bold text-slate-800 dark:text-white mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{f.desc}</p>
              </GlassCard>
            ))}
          </div>
        </Container>
      </Section>

      {/* Hosting Plans Preview */}
      <Section className="bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <Container>
          <SectionHeader title="Hosting Plans" highlight="Built for Speed" subtitle="Transparent pricing with everything you need." />
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <PricingCard
              name="Starter"
              price="700"
              features={['1 Website', '5 GB SSD', '10 GB Bandwidth', 'Free SSL', '24/7 Support']}
            />
            <PricingCard
              name="Business"
              price="1,200"
              features={['5 Websites', '20 GB SSD', 'Unlimited Bandwidth', 'Free SSL', 'Daily Backup', 'Priority Support']}
              popular
            />
            <PricingCard
              name="Pro"
              price="2,000"
              features={['Unlimited Sites', '50 GB SSD', 'Unlimited Bandwidth', 'Free SSL', 'Daily Backup', 'Dedicated IP']}
            />
          </div>
          <div className="text-center mt-10">
            <Link href="/hosting" className="px-8 py-3 rounded-xl font-bold glass border border-primary/30 text-primary hover:bg-primary/10 transition-all text-sm inline-block">
              View All Plans →
            </Link>
          </div>
        </Container>
      </Section>

      {/* VPS Preview */}
      <Section>
        <Container>
          <SectionHeader title="Blazing-Fast" highlight="VPS Hosting" subtitle="Full root access, guaranteed resources, and instant provisioning." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {vpsPlans.map((p) => (
              <GlassCard key={p.name}>
                <div className="text-xs font-bold text-primary mb-2 uppercase tracking-wider">{p.name}</div>
                <div className="text-2xl font-extrabold text-slate-800 dark:text-white mb-4">৳{p.price}<span className="text-sm text-slate-400 font-normal">/mo</span></div>
                <div className="space-y-2">
                  {[p.cpu, p.ram, p.storage, p.bandwidth].map((s, i) => (
                    <div key={i} className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-primary" />
                      {s}
                    </div>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/vps" className="px-8 py-3 rounded-xl font-bold bg-primary text-white glow-primary hover:scale-105 transition-all text-sm inline-block">
              Explore VPS Plans →
            </Link>
          </div>
        </Container>
      </Section>

      {/* CTA Banner */}
      <Section>
        <Container>
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-teal-500 to-emerald-600" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_70%)]" />
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
            <div className="relative p-12 text-center text-white">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready to Go Live?</h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">Join thousands of Bangladeshi businesses running on dTech&apos;s lightning-fast infrastructure.</p>
              <div className="flex justify-center gap-4 flex-wrap">
                <Link href="/signup" className="px-8 py-4 rounded-2xl bg-white text-primary font-extrabold hover:scale-105 active:scale-95 transition-all shadow-xl text-sm">
                  Start Free Today
                </Link>
                <Link href="/domain" className="px-8 py-4 rounded-2xl bg-white/20 text-white font-bold border border-white/30 hover:bg-white/30 transition-all text-sm">
                  Search Domain
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}

const features = [
  { icon: '⚡', title: 'Instant Deployment', desc: 'Go live in seconds with our one-click deployment system. Zero configuration headaches.', bg: 'bg-yellow-100 dark:bg-yellow-900/30' },
  { icon: '🛡️', title: 'Enterprise Security', desc: 'DDoS protection, WAF, free SSL, and daily backups keep your data safe 24/7.', bg: 'bg-blue-100 dark:bg-blue-900/30' },
  { icon: '🌍', title: 'Bangladesh CDN', desc: 'Local edge nodes ensure blazing-fast load times for your Bangladeshi audience.', bg: 'bg-green-100 dark:bg-green-900/30' },
  { icon: '📊', title: 'Real-time Analytics', desc: 'Monitor bandwidth, requests, and uptime from your intuitive control panel.', bg: 'bg-purple-100 dark:bg-purple-900/30' },
  { icon: '🔄', title: 'Auto Backups', desc: 'Daily automated backups with one-click restoration. Never lose your data again.', bg: 'bg-orange-100 dark:bg-orange-900/30' },
  { icon: '💬', title: '24/7 Local Support', desc: 'Bangla-speaking support team available round the clock via WhatsApp and chat.', bg: 'bg-teal-100 dark:bg-teal-900/30' },
]

const vpsPlans = [
  { name: 'VPS Nano', price: '1,200', cpu: '1 vCPU', ram: '1 GB RAM', storage: '20 GB SSD', bandwidth: '1 TB/mo' },
  { name: 'VPS Micro', price: '2,000', cpu: '2 vCPU', ram: '2 GB RAM', storage: '40 GB SSD', bandwidth: '2 TB/mo' },
  { name: 'VPS Pro', price: '3,500', cpu: '4 vCPU', ram: '4 GB RAM', storage: '80 GB SSD', bandwidth: '4 TB/mo' },
  { name: 'VPS Ultra', price: '6,000', cpu: '8 vCPU', ram: '8 GB RAM', storage: '160 GB SSD', bandwidth: '8 TB/mo' },
]
