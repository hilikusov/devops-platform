import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { removeToken } from '../services/auth'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { fetchEntries, createEntry } from '../services/journal'
import EntryCard from '../components/EntryCard'
import EntryModal from '../components/EntryModal'
import MoodTrendChart from '../components/MoodTrendChart'

function DashboardPage() {
  const navigate = useNavigate()

  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  const resetForm = () => {
    setTitle('')
    setContent('')
    setMoodLabel('calm')
    setMoodScore(4)
    setError('')
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

      toast.success('Journal entry saved')
      resetForm()
      setIsModalOpen(false)
      await loadEntries()
    } catch (err) {
      setError('Failed to create journal entry')
      toast.error('Could not save entry')
    } finally {
      setSubmitting(false)
    }
  }

  const averageMood =
    entries.length > 0
      ? (
          entries.reduce((sum, entry) => sum + entry.mood_score, 0) / entries.length
        ).toFixed(1)
      : null

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

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              style={primaryActionStyle}
              onClick={() => setIsModalOpen(true)}
            >
              New Entry
            </button>

            <button style={logoutButtonStyle} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        <div style={statsGridStyle}>
          <div style={statCardStyle}>
            <p style={statLabelStyle}>Total entries</p>
            <h2 style={statValueStyle}>{entries.length}</h2>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Average mood</p>
            <h2 style={statValueStyle}>{averageMood ?? '--'}</h2>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Latest state</p>
            <h2 style={statValueStyle}>
              {entries.length ? entries[0].mood_label : '--'}
            </h2>
          </div>
        </div>

        <div style={layoutStyle}>
          <div style={leftColumnStyle}>
            <div style={cardStyle}>
              <h2 style={{ marginTop: 0, marginBottom: '8px' }}>Mood trend</h2>
              <p style={subTextStyle}>
                Review how your emotional state changes over time.
              </p>

              <MoodTrendChart entries={entries} />
            </div>
          </div>

          <div style={rightColumnStyle}>
            <div style={cardStyle}>
              <h2 style={{ marginTop: 0, marginBottom: '8px' }}>Recent entries</h2>
              <p style={subTextStyle}>
                Review your recent reflections and track your emotional patterns.
              </p>

              {loading ? (
                <p style={{ color: '#94a3b8' }}>Loading entries...</p>
              ) : entries.length === 0 ? (
                <p style={{ color: '#94a3b8' }}>
                  No journal entries yet. Start by creating your first reflection.
                </p>
              ) : (
                entries.map((entry) => (
                  <EntryCard key={entry.id} entry={entry} />
                ))
              )}
            </div>
          </div>
        </div>

        <EntryModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setError('')
          }}
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          moodLabel={moodLabel}
          setMoodLabel={setMoodLabel}
          moodScore={moodScore}
          setMoodScore={setMoodScore}
          onSubmit={handleCreateEntry}
          submitting={submitting}
          error={error}
        />
      </motion.div>
    </div>
  )
}

const pageStyle = {
  minHeight: '100vh',
  width: '100%',
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

const statsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: '18px',
  marginBottom: '24px'
}

const statCardStyle = {
  background: 'linear-gradient(180deg, rgba(30,41,59,0.96) 0%, rgba(15,23,42,0.96) 100%)',
  padding: '22px',
  borderRadius: '20px',
  border: '1px solid rgba(148,163,184,0.12)',
  boxShadow: '0 18px 40px rgba(0,0,0,0.22)'
}

const statLabelStyle = {
  color: '#94a3b8',
  fontSize: '14px',
  marginBottom: '10px'
}

const statValueStyle = {
  margin: 0,
  fontSize: '28px'
}

const layoutStyle = {
  display: 'grid',
  gridTemplateColumns: 'minmax(320px, 460px) 1fr',
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

const subTextStyle = {
  color: '#94a3b8',
  marginTop: 0,
  marginBottom: '22px',
  lineHeight: 1.6
}

const primaryActionStyle = {
  padding: '12px 18px',
  borderRadius: '14px',
  border: 'none',
  background: 'linear-gradient(135deg, #38bdf8 0%, #22c55e 100%)',
  color: '#020617',
  fontWeight: 700,
  cursor: 'pointer',
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