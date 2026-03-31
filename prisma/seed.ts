import bcrypt from 'bcryptjs'
import { prisma } from '../src/lib/prisma'

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  await prisma.user.upsert({
    where: { email: 'admin@dtech.com' },
    update: {},
    create: {
      email: 'admin@dtech.com',
      password: hashedPassword,
      name: 'Admin',
      role: 'admin'
    }
  })

  // Seed domains
  const domains = [
    { extension: '.com.bd', price: '700', description: 'For businesses', popular: true },
    { extension: '.bd', price: '2,000', description: 'Premium Bangladesh domain', popular: false },
    { extension: '.net.bd', price: '700', description: 'For networks', popular: false },
    { extension: '.info.bd', price: '700', description: 'For information', popular: false },
    { extension: '.edu.bd', price: '1,100', description: 'For educational institutions', popular: false },
    { extension: '.org.bd', price: '1,100', description: 'For organizations', popular: false },
    { extension: '.co.bd', price: '5,000', description: 'Premium co domain', popular: false },
    { extension: '.com', price: '1,200', description: 'Global standard', popular: true },
    { extension: '.net', price: '1,400', description: 'Network sites', popular: false },
    { extension: '.org', price: '1,300', description: 'Organizations', popular: false },
    { extension: '.xyz', price: '800', description: 'Modern & affordable', popular: false },
    { extension: '.online', price: '900', description: 'Get online fast', popular: false },
  ]

  for (const domain of domains) {
    await prisma.domain.upsert({
      where: { extension: domain.extension },
      update: domain,
      create: domain
    })
  }

  // Seed hosting plans
  const hostingPlans = [
    {
      name: 'Starter',
      price: '700',
      href: 'http://konikmahmud.gelignite.net/store/shared-hosting/hosting/1',
      features: ['1 Website', '5 GB SSD Storage', '10 GB Bandwidth', 'Free SSL Certificate', '1 Email Account', '24/7 Support'],
      popular: false
    },
    {
      name: 'Business',
      price: '1,200',
      href: 'https://mercury.gelignite.net',
      features: ['5 Websites', '20 GB SSD Storage', 'Unlimited Bandwidth', 'Free SSL Certificate', '10 Email Accounts', 'Daily Backup', 'Priority Support', 'Free Domain'],
      popular: true
    },
    {
      name: 'Pro',
      price: '2,000',
      href: 'https://mercury.gelignite.net',
      features: ['Unlimited Websites', '50 GB SSD Storage', 'Unlimited Bandwidth', 'Free SSL Certificate', 'Unlimited Email Accounts', 'Daily Backup', 'Dedicated IP', 'Free Domain', 'Free CDN'],
      popular: false
    }
  ]

  for (const plan of hostingPlans) {
    await prisma.hostingPlan.upsert({
      where: { name: plan.name },
      update: plan,
      create: plan
    })
  }

  // Seed VPS plans
  const vpsPlans = [
    { name: 'VPS Nano', price: '1,200', cpu: '1 vCPU Core', ram: '1 GB RAM', storage: '20 GB NVMe SSD', bandwidth: '1 TB/month', port: '1 Gbps Port', popular: false },
    { name: 'VPS Micro', price: '2,000', cpu: '2 vCPU Cores', ram: '2 GB RAM', storage: '40 GB NVMe SSD', bandwidth: '2 TB/month', port: '1 Gbps Port', popular: false },
    { name: 'VPS Pro', price: '3,500', cpu: '4 vCPU Cores', ram: '4 GB RAM', storage: '80 GB NVMe SSD', bandwidth: '4 TB/month', port: '1 Gbps Port', popular: true },
    { name: 'VPS Ultra', price: '6,000', cpu: '8 vCPU Cores', ram: '8 GB RAM', storage: '160 GB NVMe SSD', bandwidth: '8 TB/month', port: '1 Gbps Port', popular: false },
  ]

  for (const plan of vpsPlans) {
    await prisma.vPSPlan.upsert({
      where: { name: plan.name },
      update: plan,
      create: plan
    })
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })