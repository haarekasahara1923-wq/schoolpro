import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const schools = await prisma.tenant.findMany({
      where: { isActive: true },
      select: { id: true, name: true },
      orderBy: { name: 'asc' },
    })
    return NextResponse.json({ success: true, schools })
  } catch (error: any) {
    console.error('Fetch schools error:', error)
    return NextResponse.json({ error: 'Failed to fetch schools' }, { status: 500 })
  }
}
