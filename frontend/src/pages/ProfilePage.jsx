import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchEntries } from '../services/journal'
import { getUsernameFromToken, removeToken } from '../services/auth'

function ProfilePage() {
  const navigate = useNavigate()
  const username = getUsernameFromToken()

  const [entries, setEntries] = useState([])

  useEffect(() => {
    const load = async () => {
      const data = await fetchEntries()
      setEntries(data)
    }

    load()
  }, [])

  const recentEntries = entries.slice(0, 5)

  const recentAverageMood =
    recentEntries.length > 0
      ? (
          recentEntries.reduce((sum, entry) => sum + entry.mood_score, 0) /
          recentEntries.length
        ).toFixed(1)
      : null

  const latestState = entries.length ? entries[0].mood_label : '--'

  const handleLogout = () => {
    removeToken()
    navigate('/')
  }

  return (
    <div style={pageStyle}>
      <div style={topBarStyle}>
        <div>
          <h1 style={{ margin: 0 }}>Profile</h1>
          <p style={{ color: '#94a3b8', marginTop: '8px' }}>
            Personal account overview
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button style={secondaryButtonStyle} onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </button>
          <button style={logoutButtonStyle} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div style={cardStyle}>
        <p style={labelStyle}>Username</p>
        <h2 style={valueStyle}>{username || '--'}</h2>
      </div>

      <div style={statsGridStyle}>
        <div style={cardStyle}>
          <p style={labelStyle}>Total entries</p>
          <h2 style={valueStyle}>{entries.length}</h2>
        </div>

        <div style={cardStyle}>
          <p style={labelStyle}>Recent avg mood</p>
          <h2 style={valueStyle}>{recentAverageMood ?? '--'}</h2>
        </div>

        <div style={cardStyle}>
          <p style={labelStyle}>Latest state</p>
          <h2 style={valueStyle}>{latestState}</h2>
        </div>
      </div>
    </div>
  )
}

const pageStyle = {
  minHeight: '100vh',
  width: '100%',
  background: '#0f172a',
  color: 'white',
  padding: 'clamp(16px, 3vw, 40px)',
}

const topBarStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: '16px',
  marginBottom: '30px',
  flexWrap: 'wrap',
}

const statsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '18px',
  marginTop: '24px',
}

const cardStyle = {
  background:
    'linear-gradient(180deg, rgba(30,41,59,0.96) 0%, rgba(15,23,42,0.96) 100%)',
  padding: '24px',
  borderRadius: '24px',
  border: '1px solid rgba(148,163,184,0.12)',
  boxShadow: '0 24px 60px rgba(0,0,0,0.28)',
}

const labelStyle = {
  color: '#94a3b8',
  fontSize: '14px',
  marginBottom: '10px',
}

const valueStyle = {
  margin: 0,
  fontSize: '28px',
}

const secondaryButtonStyle = {
  padding: '12px 18px',
  borderRadius: '14px',
  border: '1px solid rgba(148,163,184,0.2)',
  background: '#0f172a',
  color: '#e2e8f0',
  fontWeight: 600,
  cursor: 'pointer',
}

const logoutButtonStyle = {
  padding: '12px 18px',
  borderRadius: '14px',
  border: '1px solid rgba(148,163,184,0.2)',
  background: '#1e293b',
  color: '#e2e8f0',
  fontWeight: 600,
  cursor: 'pointer',
}

export default ProfilePage