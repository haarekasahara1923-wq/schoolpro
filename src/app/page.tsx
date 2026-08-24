'use client'
import Link from 'next/link'
import { useState } from 'react'

const features = [
  { icon: '👨‍🎓', title: 'Student Management', desc: 'Admissions, profiles, class & section management with parent portals', color: '#6366f1' },
  { icon: '💰', title: 'Fee Collection', desc: 'Automated reminders, installment plans, UPI/Cash/Bank payments', color: '#10b981' },
  { icon: '📊', title: 'Live Analytics', desc: 'Real-time revenue, attendance & performance dashboards', color: '#f59e0b' },
  { icon: '📝', title: 'Exams & Tests', desc: 'MCQ + descriptive tests, auto evaluation, rank & report cards', color: '#ec4899' },
  { icon: '✅', title: 'Attendance System', desc: 'Daily attendance, bulk marking, parent instant alerts', color: '#06b6d4' },
  { icon: '🤖', title: 'AI Question Generator', desc: 'Generate MCQs & descriptive questions for any subject instantly', color: '#8b5cf6' },
  { icon: '💬', title: 'WhatsApp Automation', desc: 'Fee reminders, admission alerts & results via WhatsApp', color: '#25d366' },
  { icon: '📈', title: 'Lead CRM', desc: 'Inquiries, follow-ups, conversion tracking & lead analytics', color: '#f97316' },
  { icon: '👩‍🏫', title: 'Teacher Portal', desc: 'Profiles, homework, attendance, salary & performance metrics', color: '#14b8a6' },
  { icon: '💼', title: 'Expense Tracking', desc: 'Rent, salary, utilities, marketing with profit/loss reports', color: '#ef4444' },
  { icon: '🌐', title: 'Multi-Branch', desc: 'Manage all school branches from one centralized dashboard', color: '#a855f7' },
  { icon: '🔒', title: 'Enterprise Security', desc: 'Role-based access, audit logs, encrypted & HTTPS secured', color: '#64748b' },
]

const stats = [
  { value: '5,000+', label: 'Schools Onboard' },
  { value: '5 Lakh+', label: 'Students Managed' },
  { value: '₹50 Cr+', label: 'Fees Collected' },
  { value: '99.9%', label: 'Uptime SLA' },
]

const testimonials = [
  { name: 'Ramesh Gupta', role: 'Principal, Delhi Public School', text: 'SchoolPro transformed how we manage 1200+ students. Fee collection went fully digital in a week.' },
  { name: 'Priya Sharma', role: 'Director, Sunshine Academy', text: 'The attendance and parent notification system saved us hours every day. Highly recommended!' },
  { name: 'Anil Verma', role: 'Admin, Bright Future Institute', text: 'Finally a software made for Indian schools. Simple, fast and everything in one place.' },
]

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a14', color: 'white', fontFamily: 'inherit' }}>

      {/* Navbar */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(10,10,20,0.85)', backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '0 32px', height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '38px', height: '38px', background: 'linear-gradient(135deg, #6366f1, #ec4899)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>🏫</div>
          <span style={{ fontSize: '20px', fontWeight: '800' }}>School<span style={{ color: '#818cf8' }}>Pro</span></span>
        </div>

        <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
          {[['Features', '#features'], ['About', '#about'], ['Contact', '#contact']].map(([label, href]) => (
            <a key={label} href={href} style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', fontWeight: '500', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = 'white'}
              onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.55)'}
            >{label}</a>
          ))}
        </div>

        <div className="hide-mobile" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Link href="/login" style={{ padding: '8px 20px', fontSize: '13px', fontWeight: '600', background: 'rgba(255,255,255,0.07)', color: 'white', borderRadius: '8px', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.12)' }}>Login</Link>
          <Link href="/register" style={{ padding: '8px 20px', fontSize: '13px', fontWeight: '700', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', borderRadius: '8px', textDecoration: 'none', boxShadow: '0 4px 20px rgba(99,102,241,0.4)' }}>Get Started Free →</Link>
        </div>

        <button className="show-mobile" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '8px 12px', cursor: 'pointer', color: 'white', fontSize: '18px' }}>
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fade-in" style={{ position: 'fixed', top: '64px', left: 0, right: 0, zIndex: 99, background: '#0f0f1e', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[['Features', '#features'], ['About', '#about'], ['Contact', '#contact']].map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMobileMenuOpen(false)} style={{ color: 'white', fontSize: '16px', fontWeight: '600', textDecoration: 'none' }}>{label}</a>
          ))}
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)' }} />
          <Link href="/login" onClick={() => setMobileMenuOpen(false)} style={{ padding: '12px', textAlign: 'center', background: 'rgba(255,255,255,0.07)', color: 'white', borderRadius: '10px', textDecoration: 'none', fontWeight: '600', border: '1px solid rgba(255,255,255,0.12)' }}>Login</Link>
          <Link href="/register" onClick={() => setMobileMenuOpen(false)} style={{ padding: '12px', textAlign: 'center', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', borderRadius: '10px', textDecoration: 'none', fontWeight: '700' }}>Get Started Free →</Link>
        </div>
      )}

      {/* Hero */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '120px 32px 80px', maxWidth: '1200px', margin: '0 auto', gap: '64px', flexWrap: 'wrap', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '20%', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)', pointerEvents: 'none', filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '-5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(236,72,153,0.14) 0%, transparent 70%)', pointerEvents: 'none', filter: 'blur(40px)' }} />

        {/* Left text */}
        <div style={{ flex: '1', minWidth: '300px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '50px', padding: '6px 16px', marginBottom: '28px' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#6366f1', display: 'inline-block' }} />
            <span style={{ fontSize: '13px', color: '#a5b4fc', fontWeight: '600' }}>🇮🇳 Built for Indian Schools</span>
          </div>

          <h1 style={{ fontSize: 'clamp(34px, 5vw, 64px)', fontWeight: '900', lineHeight: '1.1', marginBottom: '24px', letterSpacing: '-1px' }}>
            The Smartest Way to<br />
            <span style={{ background: 'linear-gradient(135deg, #6366f1, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Run Your School
            </span>
          </h1>

          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.5)', maxWidth: '480px', lineHeight: '1.8', marginBottom: '36px' }}>
            Manage students, fees, attendance, homework &amp; parent communication — all from one powerful, AI-driven platform.
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '32px' }}>
            <Link href="/register" style={{ padding: '14px 32px', fontSize: '15px', fontWeight: '700', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', borderRadius: '12px', textDecoration: 'none', boxShadow: '0 8px 32px rgba(99,102,241,0.4)' }}>Start for Free →</Link>
            <Link href="/login" style={{ padding: '14px 32px', fontSize: '15px', fontWeight: '600', background: 'rgba(255,255,255,0.06)', color: 'white', borderRadius: '12px', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.12)' }}>Login</Link>
          </div>

          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            {['No credit card', 'Free setup', 'All features included'].map(t => (
              <span key={t} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ color: '#10b981' }}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right: dashboard mockup */}
        <div style={{ flex: '1', minWidth: '300px', position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center' }}>
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '28px', backdropFilter: 'blur(12px)', boxShadow: '0 32px 80px rgba(0,0,0,0.4)', maxWidth: '420px', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg,#6366f1,#ec4899)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🏫</div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '700' }}>SchoolPro Dashboard</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>Admin Panel</div>
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: '5px' }}>
                {['#ef4444', '#f59e0b', '#10b981'].map(c => <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />)}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
              {[
                { label: 'Total Students', value: '1,248', icon: '👨‍🎓', color: '#6366f1' },
                { label: 'Fee Collected', value: '₹2.4L', icon: '💰', color: '#10b981' },
                { label: 'Present Today', value: '94.2%', icon: '✅', color: '#f59e0b' },
                { label: 'Pending Dues', value: '₹18K', icon: '⚠️', color: '#ef4444' },
              ].map(card => (
                <div key={card.label} style={{ background: `linear-gradient(135deg, ${card.color}18, ${card.color}08)`, border: `1px solid ${card.color}30`, borderRadius: '12px', padding: '14px' }}>
                  <div style={{ fontSize: '20px', marginBottom: '6px' }}>{card.icon}</div>
                  <div style={{ fontSize: '18px', fontWeight: '800' }}>{card.value}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>{card.label}</div>
                </div>
              ))}
            </div>

            <div style={{ fontSize: '11px', fontWeight: '700', color: 'rgba(255,255,255,0.3)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Recent Activity</div>
            {[
              { msg: 'Rahul Sharma paid ₹5,000', time: '2m ago', dot: '#10b981' },
              { msg: 'Attendance marked — Class 10A', time: '15m ago', dot: '#6366f1' },
              { msg: 'New admission: Priya Patel', time: '1h ago', dot: '#f59e0b' },
            ].map(item => (
              <div key={item.msg} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.dot, flexShrink: 0 }} />
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', flex: 1 }}>{item.msg}</span>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)' }}>{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '48px 32px', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '32px', textAlign: 'center' }}>
          {stats.map(s => (
            <div key={s.label}>
              <div style={{ fontSize: '36px', fontWeight: '900', background: 'linear-gradient(135deg, #6366f1, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.value}</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', marginTop: '6px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: '96px 32px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '50px', padding: '6px 16px', marginBottom: '20px' }}>
            <span style={{ fontSize: '13px', color: '#a5b4fc', fontWeight: '600' }}>All-in-One Platform</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '900', letterSpacing: '-0.5px' }}>
            Everything to Run a <span style={{ background: 'linear-gradient(135deg, #6366f1, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Modern School</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: '14px', fontSize: '15px' }}>12+ powerful modules to automate every aspect of your institute</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
          {features.map(f => (
            <div key={f.title}
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '24px', transition: 'all 0.25s', cursor: 'default' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = `${f.color}12`; el.style.borderColor = `${f.color}40`; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = `0 12px 40px ${f.color}20` }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,0.03)'; el.style.borderColor = 'rgba(255,255,255,0.07)'; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none' }}>
              <div style={{ width: '48px', height: '48px', background: `${f.color}20`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '16px' }}>{f.icon}</div>
              <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '8px' }}>{f.title}</h3>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: '1.7' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="about" style={{ padding: '80px 32px', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(24px, 3.5vw, 42px)', fontWeight: '900', marginBottom: '48px' }}>Trusted by School Leaders</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {testimonials.map(t => (
              <div key={t.name} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '28px' }}>
                <div style={{ fontSize: '28px', color: '#6366f1', marginBottom: '14px' }}>❝</div>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.8', marginBottom: '20px' }}>{t.text}</p>
                <div style={{ fontWeight: '700', fontSize: '14px' }}>{t.name}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: '3px' }}>{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" style={{ padding: '96px 32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '400px', background: 'radial-gradient(ellipse, rgba(99,102,241,0.15) 0%, transparent 70%)', pointerEvents: 'none', filter: 'blur(30px)' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: '900', marginBottom: '16px', letterSpacing: '-0.5px' }}>Ready to Transform<br />Your School?</h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.45)', marginBottom: '36px', lineHeight: '1.7' }}>
            Join thousands of schools already using SchoolPro. Setup takes less than 5 minutes.
          </p>
          <Link href="/register" style={{ display: 'inline-block', padding: '16px 48px', fontSize: '16px', fontWeight: '700', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', borderRadius: '14px', textDecoration: 'none', boxShadow: '0 12px 40px rgba(99,102,241,0.45)' }}>
            Get Started for Free 🚀
          </Link>
          <p style={{ marginTop: '20px', fontSize: '13px', color: 'rgba(255,255,255,0.25)' }}>
            📞 +91 9876543210 &nbsp;•&nbsp; 📧 hello@schoolpro.in
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '40px 32px', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
          <div style={{ width: '30px', height: '30px', background: 'linear-gradient(135deg, #6366f1, #ec4899)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🏫</div>
          <span style={{ fontWeight: '800', fontSize: '17px' }}>SchoolPro</span>
        </div>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.25)', lineHeight: '1.8' }}>
          © 2025 SchoolPro. Made with ❤️ in India. All rights reserved.<br />
          Multi-Tenant SaaS • Powered by Next.js • Secured with AES-256
        </p>
      </footer>
    </div>
  )
}
