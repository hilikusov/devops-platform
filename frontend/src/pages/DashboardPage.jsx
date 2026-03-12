import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { removeToken } from '../services/auth'
import { useEffect, useState } from 'react'
import { fetchEntries, createEntry } from '../services/journal'
import MoodSelector from '../components/MoodSelector'
import EntryCard from '../components/EntryCard'

function DashboardPage() {
  const navigate = useNavigate()

  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [moodLabel, setMoodLabel] = useState('calm')
  const [moodScore, setMoodScore] = useState(4)

  const loadEntries = async () => {
    try {
      setLoading(true)
      const data = await fetchEntries()
      setEntries(data)
    } catch (err) {
      setError('Failed to load entries')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadEntries()
  }, [])

  const handleLogout = () => {
    removeToken()
    navigate('/')
  }

  const handleCreateEntry = async (e) => {
    e.preventDefault()
    setError('')

    if (!title.trim() || !content.trim()) {
      setError('Please fill in title and content')
      return
    }

    try {
      setSubmitting(true)

      await createEntry({
        title,
        content,
        mood_score: moodScore,
        mood_label: moodLabel,
      })

      setTitle('')
      setContent('')
      setMoodLabel('calm')
      setMoodScore(4)

      await loadEntries()
    } catch (err) {
      setError('Failed to create journal entry')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div style={pageStyle}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div style={topBarStyle}>
          <div>
            <h1 style={{ margin: 0 }}>MindTrack</h1>
            <p style={{ color: '#94a3b8', marginTop: '8px' }}>
              Your private mental journal
            </p>
          </div>

          <button style={logoutButtonStyle} onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div style={layoutStyle}>
          <div style={leftColumnStyle}>
            <div style={cardStyle}>
              <h2 style={{ marginTop: 0, marginBottom: '8px' }}>Daily reflection</h2>
               <p style={{ color: '#94a3b8', marginTop: 0, marginBottom: '22px', lineHeight: 1.6 }}>
  Capture your thoughts, mood, and emotional state in a calm private space.
</p>
              
            

              <form onSubmit={handleCreateEntry}>
                <input
                  placeholder="Entry title"
                  style={inputStyle}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                  placeholder="Write about your day, thoughts, or feelings..."
                  style={textareaStyle}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />

                <MoodSelector
                  moodLabel={moodLabel}
                  setMoodLabel={setMoodLabel}
                  moodScore={moodScore}
                  setMoodScore={setMoodScore}
                />

                {error && (
                  <p style={{ color: '#f87171', marginBottom: '14px' }}>
                    {error}
                  </p>
                )}

                <button style={submitButtonStyle} disabled={submitting}>
                  {submitting ? 'Saving...' : 'Save Journal Entry'}
                </button>
              </form>
            </div>
          </div>

          <div style={rightColumnStyle}>
            <div style={cardStyle}>
              <h2 style={{ marginTop: 0, marginBottom: '8px' }}>Recent entries</h2>
              <p style={{ color: '#94a3b8', marginTop: 0, marginBottom: '22px', lineHeight: 1.6 }}>
  Review your recent reflections and track how your emotional state changes over time.
</p>

              {loading ? (
                <p style={{ color: '#94a3b8' }}>Loading entries...</p>
              ) : entries.length === 0 ? (
                <p style={{ color: '#94a3b8' }}>
                  No journal entries yet. Start by writing your first one.
                </p>
              ) : (
                entries.map((entry) => (
                  <EntryCard key={entry.id} entry={entry} />
                ))
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

const pageStyle = {
  minHeight: '100vh',
  background: '#0f172a',
  color: 'white',
  padding: '40px'
}

const topBarStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '30px'
}

const layoutStyle = {
  display: 'grid',
  gridTemplateColumns: 'minmax(320px, 420px) 1fr',
  gap: '24px',
  alignItems: 'start'
}

const leftColumnStyle = {
  display: 'flex',
  flexDirection: 'column'
}

const rightColumnStyle = {
  display: 'flex',
  flexDirection: 'column'
}

const cardStyle = {
  background: 'linear-gradient(180deg, rgba(30,41,59,0.96) 0%, rgba(15,23,42,0.96) 100%)',
  padding: '24px',
  borderRadius: '24px',
  border: '1px solid rgba(148,163,184,0.12)',
  boxShadow: '0 24px 60px rgba(0,0,0,0.28)',
  backdropFilter: 'blur(10px)'
}

const inputStyle = {
  width: '100%',
  padding: '14px 16px',
  marginBottom: '15px',
  borderRadius: '14px',
  border: '1px solid #334155',
  background: '#0f172a',
  color: 'white',
  outline: 'none',
  fontSize: '14px',
  boxSizing: 'border-box'
}

const textareaStyle = {
  width: '100%',
  minHeight: '160px',
  padding: '14px 16px',
  marginBottom: '15px',
  borderRadius: '14px',
  border: '1px solid #334155',
  background: '#0f172a',
  color: 'white',
  resize: 'vertical',
  outline: 'none',
  fontSize: '14px',
  lineHeight: 1.6,
  boxSizing: 'border-box'
}

const submitButtonStyle = {
  width: '100%',
  padding: '14px',
  borderRadius: '14px',
  border: 'none',
  background: 'linear-gradient(135deg, #38bdf8 0%, #22c55e 100%)',
  color: '#020617',
  fontWeight: 700,
  cursor: 'pointer',
  fontSize: '14px',
  boxShadow: '0 12px 30px rgba(56,189,248,0.25)'
}

const logoutButtonStyle = {
  padding: '12px 18px',
  borderRadius: '14px',
  border: '1px solid rgba(148,163,184,0.2)',
  background: '#1e293b',
  color: '#e2e8f0',
  fontWeight: 600,
  cursor: 'pointer'
}

export default DashboardPage