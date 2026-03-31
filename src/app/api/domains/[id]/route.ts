import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

// PUT /api/domains/[id] - Update a domain (admin only)
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
    const { extension, price, description, popular } = body

    const domain = await prisma.domain.update({
      where: { id: params.id },
      data: {
        extension,
        price,
        description,
        popular
      }
    })

    return NextResponse.json(domain)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update domain' }, { status: 500 })
  }
}

// DELETE /api/domains/[id] - Delete a domain (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.domain.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Domain deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete domain' }, { status: 500 })
  }
}