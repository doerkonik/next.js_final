import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

// PUT /api/vps/[id] - Update a VPS plan (admin only)
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
    const { name, price, cpu, ram, storage, href, bandwidth, port, popular } = body

    const plan = await prisma.vPSPlan.update({
      where: { id: params.id },
      data: {
        name,
        price,
        cpu,
        ram,
        href,
        storage,
        bandwidth,
        port,
        popular
      }
    })

    return NextResponse.json(plan)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update VPS plan' }, { status: 500 })
  }
}

// DELETE /api/vps/[id] - Delete a VPS plan (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.vPSPlan.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'VPS plan deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete VPS plan' }, { status: 500 })
  }
}