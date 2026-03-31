'use client'
import Loader from '@/components/Loading'
import { Container, GlassCard, Section, SectionHeader } from '@/components/UI'
import { useDomains } from '@/hooks/useDomains'
import { useDomainSearch } from '@/hooks/useDomainSearch'

const domainFeatures = [
  {
    icon: '⚡',
    title: 'Instant Activation',
    desc: 'Your domain gets activated immediately after completing the registration process.',
  },
  {
    icon: '🔒',
    title: 'Secure & Trusted',
    desc: 'We are BTCL accredited and ensure safe, reliable domain registration with every order.',
  },
  {
    icon: '🇧🇩',
    title: 'National Identity',
    desc: 'Establish your digital presence with a .BD domain and showcase your Bangladeshi identity online.',
  },
  {
    icon: '🕐',
    title: '24/7 Support',
    desc: 'Our dedicated support team is always ready to help you with any queries in no time.',
  },
]

export default function DomainPage() {
  const { domains, loading, error } = useDomains()
  const { query, setQuery, status, result, errorMsg, search, handleKeyDown } = useDomainSearch()

  const handleTldClick = (ext: string) => {
    const base = query.split('.')[0]
    if (base) setQuery(base + ext)
  }

  const handleTldRegister = (e: React.MouseEvent, ext: string) => {
    e.stopPropagation()
    const base = query.split('.')[0] || 'yourdomain'
    const newDomain = base + ext
    setQuery(newDomain)
    search(newDomain)
  }

  return (
    <div className="pt-24 pb-20">
      {/* Background orb — pointer-events-none so it never blocks clicks */}
      <div className="fixed top-32 left-1/3 w-80 h-80 bg-primary/15 rounded-full blur-3xl pointer-events-none" />

      <Container>
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 px-2">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs font-bold text-primary border border-primary/30 mb-6 uppercase tracking-wider">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0" />
            Live Domain Search
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
            Find Your Perfect{' '}
            <span className="text-gradient">.BD Domain</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Build your digital identity in Bangladesh. Own a local domain that resonates with your audience.
          </p>
        </div>

        {/* Search Box */}
        <div className="max-w-2xl mx-auto mb-12 sm:mb-16 px-2">
          <div className="glass-card rounded-2xl p-2 border-glow">
            {/* Stack vertically on very small screens, side-by-side from sm up */}
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="e.g. mybusiness.com.bd"
                className="flex-1 min-w-0 px-5 py-4 bg-transparent text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none font-medium text-sm rounded-xl"
                disabled={status === 'loading'}
              />
              <button
                onClick={() => search()}
                disabled={status === 'loading' || !query.trim()}
                className="px-8 py-4 rounded-xl bg-primary text-white font-bold glow-primary hover:scale-105 active:scale-95 transition-all text-sm whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 sm:w-auto w-full"
              >
                {status === 'loading' ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Checking…
                  </span>
                ) : (
                  'Search →'
                )}
              </button>
            </div>
          </div>

          {/* Result Banners */}
          {status === 'available' && result && (
            <div className="mt-4 glass-card rounded-2xl px-5 py-4 border border-green-400/30 bg-green-50/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-green-400 font-bold text-sm">✅ Available!</p>
                <p className="text-slate-700 dark:text-white font-extrabold text-lg truncate">
                  {result.domain}
                </p>
              </div>
              <button className="px-5 py-2.5 rounded-xl bg-green-500 text-white text-sm font-bold hover:bg-green-600 transition-all flex-shrink-0 w-full sm:w-auto">
                Register Now
              </button>
            </div>
          )}

          {status === 'taken' && result && (
            <div className="mt-4 glass-card rounded-2xl px-5 py-4 border border-red-400/30 bg-red-50/10">
              <p className="text-red-400 font-bold text-sm">❌ Already Taken</p>
              <p className="text-slate-700 dark:text-white font-semibold text-sm sm:text-base">
                <span className="font-extrabold break-all">{result.domain}</span> is not available.
                Try a different name or extension below.
              </p>
            </div>
          )}

          {status === 'error' && (
            <div className="mt-4 glass-card rounded-2xl px-5 py-4 border border-amber-400/30 bg-amber-50/10">
              <p className="text-amber-400 font-bold text-sm">⚠️ Search Error</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                {errorMsg || 'Could not reach the search API. Please try again.'}
              </p>
            </div>
          )}
        </div>

        {/* TLD Grid */}
        <Section>
          <SectionHeader
            title="Domain Extensions &"
            highlight="Pricing"
            subtitle="Competitively priced domains with everything you need."
          />

          {loading ? (
            <Loader />
          ) : error ? (
            <div className="text-center text-red-500 py-10">{error}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {domains.map((domain) => (
                <div
                  key={domain.id}
                  onClick={() => handleTldClick(domain.extension)}
                  className="glass-card rounded-2xl p-5 group hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 border-glow cursor-pointer relative"
                >
                  {domain.popular && (
                    <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                      HOT
                    </span>
                  )}
                  <div className="text-xl sm:text-2xl font-extrabold text-slate-800 dark:text-white mb-1 group-hover:text-primary transition-colors break-all">
                    {domain.extension}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">
                    {domain.description}
                  </div>
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex-shrink-0">
                      <span className="text-xl font-extrabold text-gradient">৳{domain.price}</span>
                      <span className="text-xs text-slate-400">/yr</span>
                    </div>
                    <button
                      onClick={(e) => handleTldRegister(e, domain.extension)}
                      className="px-4 py-2 rounded-xl bg-primary/10 text-primary text-xs font-bold border border-primary/20 hover:bg-primary hover:text-white transition-all flex-shrink-0"
                    >
                      Register
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* Features */}
        <Section>
          <SectionHeader title="Why Register Domains" highlight="With dTech?" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {domainFeatures.map((f) => (
              <GlassCard key={f.title}>
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-slate-800 dark:text-white mb-2 text-sm">{f.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{f.desc}</p>
              </GlassCard>
            ))}
          </div>
        </Section>
      </Container>
    </div>
  )
}