'use client'
import { useAuth } from '@/contexts/AuthContext'
import { useState, useEffect } from 'react'

export default function StaffHomework() {
  const { token } = useAuth()
  const [homeworks, setHomeworks] = useState<any[]>([])
  const [batches, setBatches] = useState<any[]>([])
  const [form, setForm] = useState({ batchId: '', title: '', description: '', subject: '', dueDate: '' })
  const [creating, setCreating] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [msg, setMsg] = useState('')
  const h = { Authorization: `Bearer ${token}` }

  const load = () => {
    if (!token) return
    fetch('/api/homework', { headers: h }).then(r => r.json()).then(d => setHomeworks(d.homeworks || []))
  }

  useEffect(() => {
    if (!token) return
    fetch('/api/courses', { headers: h }).then(r => r.json()).then(d => setBatches(d.batches || []))
    load()
  }, [token])

  const create = async () => {
    if (!form.batchId || !form.title) { setMsg('Batch and title are required'); return }
    setCreating(true)
    const res = await fetch('/api/homework', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...h },
      body: JSON.stringify(form),
    })
    const d = await res.json()
    setCreating(false)
    if (d.success) { setMsg('✅ Homework assigned!'); setForm({ batchId: '', title: '', description: '', subject: '', dueDate: '' }); setShowForm(false); load() }
    else setMsg(d.error || 'Failed')
  }

  const deleteHW = async (id: string) => {
    if (!confirm('Delete this homework?')) return
    await fetch(`/api/homework?id=${id}`, { method: 'DELETE', headers: h })
    load()
  }

  const inputStyle = { width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: '10px', padding: '12px', color: 'white', fontSize: '14px', boxSizing: 'border-box' as const }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ fontSize: '18px', fontWeight: '800', color: 'white', margin: 0 }}>📚 Homework</h1>
        <button onClick={() => setShowForm(!showForm)}
          style={{ background: '#6366f1', border: 'none', borderRadius: '10px', padding: '8px 16px', color: 'white', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>
          {showForm ? 'Cancel' : '+ Assign'}
        </button>
      </div>

      {msg && <div style={{ background: msg.startsWith('✅') ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)', border: `1px solid ${msg.startsWith('✅') ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`, borderRadius: '10px', padding: '12px', fontSize: '13px', color: msg.startsWith('✅') ? '#10b981' : '#ef4444' }}>{msg}</div>}

      {showForm && (
        <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ color: 'white', margin: 0, fontSize: '15px' }}>Assign New Homework</h3>
          <select value={form.batchId} onChange={e => setForm(p => ({ ...p, batchId: e.target.value }))} style={inputStyle}>
            <option value="">-- Select Batch/Section --</option>
            {batches.map((b: any) => <option key={b.id} value={b.id}>{b.name} ({b.course?.name})</option>)}
          </select>
          <input placeholder="Title *" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} style={inputStyle} />
          <input placeholder="Subject" value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))} style={inputStyle} />
          <textarea placeholder="Description / Instructions" value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} />
          <div>
            <label style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px', display: 'block' }}>Due Date</label>
            <input type="date" value={form.dueDate} onChange={e => setForm(p => ({ ...p, dueDate: e.target.value }))} style={inputStyle} />
          </div>
          <button onClick={create} disabled={creating}
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', border: 'none', borderRadius: '10px', padding: '12px', color: 'white', fontWeight: '700', fontSize: '14px', cursor: 'pointer', opacity: creating ? 0.6 : 1 }}>
            {creating ? 'Assigning...' : '📤 Assign Homework'}
          </button>
        </div>
      )}

      {homeworks.map((hw: any) => (
        <div key={hw.id} style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '14px', padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '15px', fontWeight: '700', color: 'white' }}>{hw.title}</div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>{hw.subject && `${hw.subject} • `}{hw.batch?.name}</div>
              {hw.dueDate && <div style={{ fontSize: '12px', color: '#f59e0b', marginTop: '4px' }}>Due: {new Date(hw.dueDate).toLocaleDateString('en-IN')}</div>}
              <div style={{ fontSize: '12px', color: '#6366f1', marginTop: '6px' }}>{hw._count?.submissions || 0} submissions</div>
            </div>
            <button onClick={() => deleteHW(hw.id)}
              style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', borderRadius: '8px', padding: '6px 10px', fontSize: '12px', cursor: 'pointer' }}>🗑️</button>
          </div>
        </div>
      ))}
    </div>
  )
}
