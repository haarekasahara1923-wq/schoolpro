'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'

export default function ExamsPage() {
    const { token } = useAuth()
    const [courses, setCourses] = useState([])
    const [batches, setBatches] = useState([])
    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState('')

    const [form, setForm] = useState({
        title: '', subject: '', date: new Date().toISOString().split('T')[0],
        maxMarks: 100, courseId: '', batchId: ''
    })
    
    const [marks, setMarks] = useState<Record<string, number>>({})

    useEffect(() => {
        if (!token) return
        Promise.all([
            fetch('/api/courses', { headers: { Authorization: 'Bearer ' + token } }).then(r => r.json()),
            fetch('/api/batches', { headers: { Authorization: 'Bearer ' + token } }).then(r => r.json()),
        ]).then(([c, b]) => {
            if (c.success) setCourses(c.data)
            if (b.success) setBatches(b.data)
        })
    }, [token])

    useEffect(() => {
        if (!form.courseId || !form.batchId || !token) return
        fetch(`/api/students?course=${form.courseId}&batch=${form.batchId}`, { headers: { Authorization: 'Bearer ' + token } })
            .then(r => r.json())
            .then(d => { if (d.success) setStudents(d.data) })
    }, [form.courseId, form.batchId, token])

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setLoading(true)
        
        const results = students.map((s: any) => ({
            studentId: s.id,
            marksObtained: marks[s.id] || 0
        }))

        const res = await fetch('/api/exams', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
            body: JSON.stringify({ ...form, results })
        })
        const data = await res.json()
        setLoading(false)
        if (data.success) {
            setToast('Marks saved successfully! Parents can now see them.')
            setMarks({})
        } else {
            setToast(data.error)
        }
    }

    return (
        <div>
            <h1 className="page-title">📑 Monthly Tests & Marks</h1>
            <p className="page-subtitle">Upload marks for students. Parents will see this on their portal.</p>
            
            {toast && <div className="toast toast-success" style={{margin: '10px 0'}}>{toast}</div>}

            <form onSubmit={handleSubmit} className="card">
                <div className="grid-cols-2">
                    <div>
                        <label className="label">Test Title</label>
                        <input className="input" placeholder="August Monthly Test" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
                    </div>
                    <div>
                        <label className="label">Subject</label>
                        <input className="input" placeholder="Mathematics" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} required />
                    </div>
                    <div>
                        <label className="label">Date</label>
                        <input type="date" className="input" value={form.date} onChange={e => setForm({...form, date: e.target.value})} required />
                    </div>
                    <div>
                        <label className="label">Max Marks</label>
                        <input type="number" className="input" value={form.maxMarks} onChange={e => setForm({...form, maxMarks: parseInt(e.target.value)})} required />
                    </div>
                    <div>
                        <label className="label">Class</label>
                        <select className="input" value={form.courseId} onChange={e => setForm({...form, courseId: e.target.value, batchId: ''})} required>
                            <option value="">Select Class</option>
                            {courses.map((c:any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="label">Section</label>
                        <select className="input" value={form.batchId} onChange={e => setForm({...form, batchId: e.target.value})} required>
                            <option value="">Select Section</option>
                            {batches.filter((b:any) => b.courseId === form.courseId).map((b:any) => <option key={b.id} value={b.id}>{b.name}</option>)}
                        </select>
                    </div>
                </div>

                {students.length > 0 && (
                    <div style={{ marginTop: '20px' }}>
                        <h3 style={{ marginBottom: '10px' }}>Enter Marks</h3>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>
                                    <th style={{ padding: '8px 0' }}>Student</th>
                                    <th>Marks (out of {form.maxMarks})</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((s:any) => (
                                    <tr key={s.id} style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: '8px 0' }}>{s.fullName} ({s.studentId})</td>
                                        <td>
                                            <input type="number" className="input" style={{ width: '100px' }} value={marks[s.id] || ''} onChange={e => setMarks({...marks, [s.id]: parseFloat(e.target.value)})} max={form.maxMarks} min={0} required />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div style={{ marginTop: '20px' }}>
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? 'Saving...' : '💾 Publish Marks'}
                            </button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    )
}

