'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'

function LoginForm() {
    const { user, login } = useAuth()
    const router = useRouter()
    const [role, setRole] = useState('COACHING_ADMIN') // COACHING_ADMIN, TEACHER, STUDENT, PARENT
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (user) {
            if (user.role === 'STUDENT') {
                router.push('/portal/student')
            } else if (user.role === 'PARENT') {
                router.push('/portal/parent')
            } else if (user.role === 'TEACHER' || user.role === 'STAFF') {
                router.push('/portal/staff')
            } else if (user.role === 'SUPER_ADMIN') {
                router.push('/dashboard/super-admin/tenants')
            } else {
                router.push('/dashboard')
            }
        }
    }, [user, router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        
        // Pass optional role filter to verify exact login
        const result = await login(email, password)
        setLoading(false)
        if (result.success) {
            // Get user from local storage since state might not have updated instantly
            const storedUser = localStorage.getItem('cp_user')
            if (storedUser) {
                const user = JSON.parse(storedUser)
                if (user.role === 'STUDENT') {
                    router.push('/portal/student')
                } else if (user.role === 'PARENT') {
                    router.push('/portal/parent')
                } else if (user.role === 'TEACHER' || user.role === 'STAFF') {
                    router.push('/portal/staff')
                } else if (user.role === 'SUPER_ADMIN') {
                    router.push('/dashboard/super-admin/tenants')
                } else {
                    router.push('/dashboard')
                }
            } else {
                router.push('/dashboard')
            }
        } else {
            setError(result.error || 'Login failed')
        }
    }

    const rolesList = [
        { key: 'COACHING_ADMIN', label: 'School Admin' },
        { key: 'TEACHER', label: 'Staff / Teacher' },
        { key: 'STUDENT', label: 'Student' },
        { key: 'PARENT', label: 'Parent' },
    ]

    return (
        <div style={{ minHeight: '100vh', background: 'var(--background)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            {/* Background */}
            <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

            <div style={{ width: '100%', maxWidth: '420px' }}>
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{ width: '56px', height: '56px', background: 'linear-gradient(135deg, #6366f1, #ec4899)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', margin: '0 auto 16px' }}>🏫</div>
                    <h1 style={{ fontSize: '28px', fontWeight: '800', color: 'white' }}>Welcome back!</h1>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '6px', fontSize: '14px' }}>Sign in to SchoolPro Dashboard</p>
                </div>

                {/* Form */}
                <div className="card" style={{ borderRadius: '20px', padding: '32px' }}>
                    {/* Role Selection Tabs */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', background: 'var(--surface-2)', padding: '4px', borderRadius: '10px', marginBottom: '24px' }}>
                        {rolesList.map(r => (
                            <button
                                key={r.key}
                                type="button"
                                onClick={() => setRole(r.key)}
                                style={{
                                    flex: '1 1 auto',
                                    padding: '8px 10px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    background: role === r.key ? '#6366f1' : 'transparent',
                                    color: role === r.key ? 'white' : 'var(--text-secondary)',
                                    fontSize: '11px',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {r.label}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '20px' }}>
                            <label className="label">Email Address</label>
                            <input
                                type="email"
                                className="input"
                                placeholder="your@email.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div style={{ marginBottom: '24px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <label className="label" style={{ marginBottom: 0 }}>Password</label>
                                <Link href="/forgot-password" style={{ fontSize: '12px', color: 'var(--primary-light)', fontWeight: '600', textDecoration: 'none' }}>Forgot password?</Link>
                            </div>
                            <input
                                type="password"
                                className="input"
                                placeholder="Enter your password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {error && (
                            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '10px', padding: '12px', marginBottom: '16px', fontSize: '14px', color: '#fca5a5' }}>
                                ⚠️ {error}
                            </div>
                        )}

                        <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center', fontSize: '15px', padding: '12px' }}>
                            {loading ? <><div className="spinner" style={{ width: '18px', height: '18px', borderWidth: '2px' }} />  Signing in...</> : '🔑 Sign In'}
                        </button>
                    </form>

                    <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                        Don't have an account?{' '}
                        <Link href="/register" style={{ color: 'var(--primary-light)', fontWeight: '600' }}>Sign Up Free</Link>
                    </p>
                </div>

                <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: 'var(--text-muted)' }}>
                    <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>← Back to Home</Link>
                </p>
            </div>
        </div>
    )
}

export default function LoginPage() {
    return (
        <AuthProvider>
            <LoginForm />
        </AuthProvider>
    )
}
