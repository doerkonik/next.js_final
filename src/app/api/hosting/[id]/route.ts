import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

// PUT /api/hosting/[id] - Update a hosting plan (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, price, href, features, popular } = body

    const plan = await prisma.hostingPlan.update({
      where: { id: params.id },
      data: {
        name,
        price,
        href,
        features,
        popular
      }
    })

    return NextResponse.json(plan)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update hosting plan' }, { status: 500 })
  }
}

// DELETE /api/hosting/[id] - Delete a hosting plan (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.hostingPlan.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Hosting plan deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete hosting plan' }, { status: 500 })
  }
}