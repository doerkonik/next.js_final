import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/domains - Get all domains
export async function GET() {
  try {
    const domains = await prisma.domain.findMany({
      orderBy: { createdAt: 'asc' }
    })
    return NextResponse.json(domains)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch domains' }, { status: 500 })
  }
}

// POST /api/domains - Create a new domain (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { extension, price, description, popular } = body

    const domain = await prisma.domain.create({
      data: {
        extension,
        price,
        description,
        popular: popular || false
      }
    })

    return NextResponse.json(domain, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create domain' }, { status: 500 })
  }
}