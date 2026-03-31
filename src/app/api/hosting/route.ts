import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/hosting - Get all hosting plans
export async function GET() {
  try {
    const plans = await prisma.hostingPlan.findMany({
      orderBy: { createdAt: 'asc' }
    })
    return NextResponse.json(plans)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch hosting plans' }, { status: 500 })
  }
}

// POST /api/hosting - Create a new hosting plan (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, price, href, features, popular } = body

    const plan = await prisma.hostingPlan.create({
      data: {
        name,
        price,
        href,
        features,
        popular: popular || false
      }
    })

    return NextResponse.json(plan, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create hosting plan' }, { status: 500 })
  }
}