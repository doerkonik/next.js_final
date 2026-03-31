import Link from 'next/link'
import React from 'react'

// GlassCard
export function GlassCard({
  children,
  className = '',
  hover = true,
}: {
  children: React.ReactNode
  className?: string
  hover?: boolean
}) {
  return (
    <div
      className={`glass-card rounded-2xl p-6 transition-all duration-300 ${hover ? 'hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 border-glow' : ''
        } ${className}`}
    >
      {children}
    </div>
  )
}

// GlassButton
export function GlassButton({
  children,
  variant = 'primary',
  className = '',
  onClick,
  href,
  type = 'button',
}: {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
  onClick?: () => void
  href?: string
  type?: 'button' | 'submit' | 'reset'
}) {
  const base =
    'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 cursor-pointer'
  const variants = {
    primary:
      'bg-primary text-white glow-primary hover:bg-primary-500 hover:scale-105 active:scale-95',
    secondary:
      'glass border border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/60',
    ghost:
      'text-slate-600 dark:text-slate-300 hover:bg-white/20 dark:hover:bg-white/5 hover:text-primary',
  }

  if (href) {
    return (
      <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  )
}

// Container — max-w added so content never stretches full-viewport on wide screens
export function Container({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  )
}

// Section — horizontal padding added so it works when used outside Container
export function Section({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return <section className={`py-16 sm:py-20 ${className}`}>{children}</section>
}

// SectionHeader
export function SectionHeader({
  title,
  highlight,
  subtitle,
}: {
  title: string
  highlight?: string
  subtitle?: string
}) {
  return (
    <div className="text-center mb-12 sm:mb-16">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-white mb-4">
        {title} {highlight && <span className="text-gradient">{highlight}</span>}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto px-4">
          {subtitle}
        </p>
      )}
    </div>
  )
}

// PricingCard
export function PricingCard({
  name,
  price,
  period = '/mo',
  features,
  cta = 'Get Started',
  popular = false,
  badge,
  href,
}: {
  name: string
  price: string | number
  period?: string
  features: string[]
  cta?: string
  popular?: boolean
  badge?: string
  href?: string
}) {
  return (
    <div
      className={`relative rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 ${popular
          ? 'bg-primary text-white glow-primary shadow-xl shadow-primary/30'
          : 'glass-card border-glow hover:shadow-xl hover:shadow-primary/10'
        }`}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-primary text-xs font-black px-4 py-1 rounded-full shadow-lg whitespace-nowrap">
          MOST POPULAR
        </div>
      )}
      {badge && !popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-black px-4 py-1 rounded-full shadow-lg whitespace-nowrap">
          {badge}
        </div>
      )}
      <div className={`text-sm font-bold mb-2 ${popular ? 'text-white/80' : 'text-primary'}`}>
        {name}
      </div>
      <div className="flex items-baseline gap-1 mb-6 flex-wrap">
        <span
          className={`text-3xl sm:text-4xl font-extrabold ${popular ? 'text-white' : 'text-slate-800 dark:text-white'
            }`}
        >
          ৳{price}
        </span>
        <span className={`text-sm ${popular ? 'text-white/70' : 'text-slate-400'}`}>{period}</span>
      </div>
      <ul className="space-y-3 mb-6">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <svg
              className={`w-4 h-4 mt-0.5 flex-shrink-0 ${popular ? 'text-white' : 'text-primary'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className={popular ? 'text-white/90' : 'text-slate-600 dark:text-slate-300'}>
              {f}
            </span>
          </li>
        ))}
      </ul>
      {popular ? (
        <GlassButton href={href} className="w-full bg-white hover:bg-white/90 !text-[#0ec7b7]">
          {cta}
        </GlassButton>
      ) : (
        <GlassButton href={href} className="w-full">
          {cta}
        </GlassButton>
      )}
    </div>
  )
}

// AuthCard
export function AuthCard({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode
  title: string
  subtitle?: string
}) {
  return (
    <div className="min-h-screen flex items-center justify-center py-24 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center glow-primary">
              <span className="text-white font-black">d</span>
            </div>
            <span className="text-2xl font-extrabold text-gradient">dTech</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-800 dark:text-white mb-2">{title}</h1>
          {subtitle && (
            <p className="text-slate-500 dark:text-slate-400 text-sm">{subtitle}</p>
          )}
        </div>
        <div className="glass-card rounded-3xl p-6 sm:p-8 border-glow">{children}</div>
      </div>
    </div>
  )
}

// FormInput
export function FormInput({
  label,
  type = 'text',
  placeholder,
  id,
  ...props
}: {
  label: string
  type?: string
  placeholder?: string
  id: string
  [key: string]: any
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...props}
        className="w-full px-4 py-3 rounded-xl glass border border-white/30 dark:border-white/10 bg-white/50 dark:bg-white/5 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-sm"
      />
    </div>
  )
}