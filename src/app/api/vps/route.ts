import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/vps - Get all VPS plans
export async function GET() {
  try {
    const plans = await prisma.vPSPlan.findMany({
      orderBy: { createdAt: 'asc' }
    })
    return NextResponse.json(plans)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch VPS plans' }, { status: 500 })
  }
}

// POST /api/vps - Create a new VPS plan (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, price, cpu, ram, storage, href, bandwidth, port, popular } = body

    const plan = await prisma.vPSPlan.create({
      data: {
        name,
        price,
        cpu,
        ram,
        href,
        storage,
        bandwidth,
        port,
        popular: popular || false
      }
    })

    return NextResponse.json(plan, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create VPS plan' }, { status: 500 })
  }
}