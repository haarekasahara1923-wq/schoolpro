import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { signAccessToken, signRefreshToken, comparePassword } from '@/lib/auth'

export async function POST(req: NextRequest) {
    try {
        const { email, password, role } = await req.json()

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
        }

        const whereClause: any = { isActive: true }
        // Let user log in with email or phone
        whereClause.OR = [
            { email: email.toLowerCase() },
            { phone: email } // 'email' field holds the input
        ]

        if (role) {
            whereClause.role = role
        }

        const user = await prisma.user.findFirst({
            where: whereClause,
            include: {
                studentProfile: true
            }
        })
        if (!user) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
        }

        const isValid = await comparePassword(password, user.password)
        if (!isValid) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
        }

        const tenant = await prisma.tenant.findUnique({
            where: { id: user.tenantId }
        })

        const subscription = await prisma.subscription.findUnique({
            where: { tenantId: user.tenantId }
        })

        const payload = {
            userId: user.id,
            tenantId: user.tenantId,
            role: user.role,
            email: user.email,
        }

        const accessToken = signAccessToken(payload)
        const refreshToken = signRefreshToken(payload)

        await prisma.user.update({
            where: { id: user.id },
            data: { lastLogin: new Date() }
        })

        return NextResponse.json({
            success: true,
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                tenantId: user.tenantId,
                phone: user.phone,
                studentId: user.studentProfile?.id || null,
            },
            tenant: tenant ? {
                id: tenant.id,
                name: tenant.name,
                logo: tenant.logo,
                themeColor: tenant.themeColor,
                phone: tenant.phone,
                address: tenant.address,
            } : null,
            subscription: subscription || null,
        })
    } catch (error) {
        console.error('Login error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
