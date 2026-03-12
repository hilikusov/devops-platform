import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { removeToken } from '../services/auth'

function DashboardPage() {
  const navigate = useNavigate()

  const handleLogout = () => {
    removeToken()
    navigate('/')
  }

  return (
    <div style={pageStyle}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div style={topBarStyle}>
          <div>
            <h1 style={{ margin: 0 }}>MindTrack</h1>
            <p style={{ color: '#94a3b8', marginTop: '8px' }}>
              Your private mental journal dashboard
            </p>
          </div>

          <button style={logoutButtonStyle} onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div style={heroCardStyle}>
          <h2>Welcome back</h2>
          <p style={{ color: '#94a3b8' }}>
            Next we’ll connect your journal entries, mood tracking, and dashboard charts.
          </p>
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

const heroCardStyle = {
  marginTop: '30px',
  background: '#1e293b',
  padding: '25px',
  borderRadius: '20px',
  boxShadow: '0 20px 40px rgba(0,0,0,0.25)'
}

const logoutButtonStyle = {
  padding: '12px 18px',
  borderRadius: '12px',
  border: 'none',
  background: '#38bdf8',
  color: 'black',
  fontWeight: 'bold',
  cursor: 'pointer'
}

export default DashboardPage