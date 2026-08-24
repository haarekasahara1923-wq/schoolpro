'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
    const router = useRouter()
    const [role, setRole] = useState('COACHING_ADMIN') // COACHING_ADMIN, TEACHER, STUDENT, PARENT
    const [schools, setSchools] = useState<{ id: string; name: string }[]>([])
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        coachingName: '',
        tenantId: '',
        plan: 'PRO',
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [refCode, setRefCode] = useState('')

    useEffect(() => {
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
            return
        }

        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search)
            const ref = params.get('ref')
            if (ref) setRefCode(ref)
        }

        // Fetch schools list
        fetch('/api/auth/schools')
            .then(r => r.json())
            .then(d => {
                if (d.success) setSchools(d.schools || [])
            })
            .catch(err => console.error('Failed to load schools:', err))
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        // Validation for role
        if (role !== 'COACHING_ADMIN' && !form.tenantId) {
            setError('Please select your school')
            setLoading(false)
            return
        }

        try {
            const payload = { 
                ...form, 
                role, 
                ref: refCode,
                // clear coaching name if joining existing
                coachingName: role === 'COACHING_ADMIN' ? form.coachingName : ''
            }
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })
            const data = await res.json()

            if (!data.success) {
                setError(data.error || 'Registration failed')
                setLoading(false)
                return
            }

            // Store auth data
            localStorage.setItem('cp_token', data.accessToken)
            localStorage.setItem('cp_user', JSON.stringify(data.user))
            localStorage.setItem('cp_tenant', JSON.stringify(data.tenant))
            localStorage.setItem('cp_refresh', data.refreshToken)

            setSuccess(true)
            setTimeout(() => {
                if (role === 'STUDENT') {
                    router.push('/portal/student')
                } else if (role === 'PARENT') {
                    router.push('/portal/parent')
                } else if (role === 'TEACHER') {
                    router.push('/portal/staff')
                } else {
                    router.push('/dashboard')
                }
            }, 1500)
        } catch {
            setError('Network error. Please try again.')
        }
        setLoading(false)
    }

    if (success) {
        return (
            <div style={{ minHeight: '100vh', background: 'var(--background)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎉</div>
                    <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'white', marginBottom: '8px' }}>Welcome to SchoolPro!</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Account created successfully. Redirecting to dashboard...</p>
                    <div className="spinner" style={{ margin: '20px auto' }} />
                </div>
            </div>
        )
    }

    const rolesList = [
        { key: 'COACHING_ADMIN', label: 'School Admin' },
        { key: 'TEACHER', label: 'Staff / Teacher' },
        { key: 'STUDENT', label: 'Student' },
        { key: 'PARENT', label: 'Parent' },
    ]

    return (
        <div style={{ minHeight: '100vh', background: 'var(--background)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse at top right, rgba(236,72,153,0.1) 0%, transparent 60%)', pointerEvents: 'none' }} />

            <div style={{ width: '100%', maxWidth: '480px' }}>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <div style={{ width: '56px', height: '56px', background: 'linear-gradient(135deg, #6366f1, #ec4899)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', margin: '0 auto 16px' }}>🏫</div>
                    <h1 style={{ fontSize: '28px', fontWeight: '800', color: 'white' }}>Create Your Account</h1>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '6px', fontSize: '14px' }}>Set up your school management portal in minutes</p>
                </div>

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
                                    padding: '8px 12px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    background: role === r.key ? '#6366f1' : 'transparent',
                                    color: role === r.key ? 'white' : 'var(--text-secondary)',
                                    fontSize: '12px',
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
                        <div className="grid-cols-2" style={{ marginBottom: '16px' }}>
                            <div>
                                <label className="label">Your Name</label>
                                <input className="input" placeholder="Rajesh Sharma" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                            </div>
                            <div>
                                <label className="label">Phone</label>
                                <input className="input" placeholder="9876543210" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                            </div>
                        </div>

                        {role === 'COACHING_ADMIN' ? (
                            <div style={{ marginBottom: '16px' }}>
                                <label className="label">School Name</label>
                                <input className="input" placeholder="Delhi Public School" value={form.coachingName} onChange={e => setForm({ ...form, coachingName: e.target.value })} required />
                            </div>
                        ) : (
                            <div style={{ marginBottom: '16px' }}>
                                <label className="label">Select School</label>
                                <select className="input" value={form.tenantId} onChange={e => setForm({ ...form, tenantId: e.target.value })} required>
                                    <option value="">-- Choose Your School --</option>
                                    {schools.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                </select>
                            </div>
                        )}

                        <div style={{ marginBottom: '16px' }}>
                            <label className="label">Email Address</label>
                            <input type="email" className="input" placeholder="your@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                        </div>

                        <div style={{ marginBottom: '24px' }}>
                            <label className="label">Password</label>
                            <input type="password" className="input" placeholder="Minimum 6 characters" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required minLength={6} />
                        </div>

                        {error && (
                            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '10px', padding: '12px', marginBottom: '16px', fontSize: '14px', color: '#fca5a5' }}>
                                ⚠️ {error}
                            </div>
                        )}

                        <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center', fontSize: '15px', padding: '13px', background: 'linear-gradient(135deg, #6366f1, #ec4899)' }}>
                            {loading ? <><div className="spinner" style={{ width: '18px', height: '18px', borderWidth: '2px' }} /> Creating account...</> : '🚀 Sign Up Free'}
                        </button>
                    </form>

                    <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                        Already have an account?{' '}
                        <Link href="/login" style={{ color: 'var(--primary-light)', fontWeight: '600' }}>Sign In</Link>
                    </p>
                </div>

                <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '12px', color: 'var(--text-muted)' }}>
                    By signing up, you agree to our Terms of Service and Privacy Policy
                </p>
            </div>
        </div>
    )
}
