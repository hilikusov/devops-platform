import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { authApi } from '../services/api'
import { saveToken } from '../services/auth'

function LoginPage() {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await authApi.post('/login', null, {
        params: {
          username,
          password,
        },
      })

      saveToken(response.data.access_token)
      navigate('/dashboard')
    } catch (err) {
      setError('Invalid username or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={pageStyle}>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={cardStyle}
      >
        <h1 style={{ marginBottom: '10px' }}>MindTrack</h1>
        <p style={{ color: '#94a3b8', marginBottom: '30px' }}>
          Track your thoughts privately
        </p>

        <form onSubmit={handleLogin}>
          <input
            placeholder="Username"
            style={inputStyle}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            placeholder="Password"
            type="password"
            style={inputStyle}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p style={{
              color: '#f87171',
              marginBottom: '15px',
              fontSize: '14px'
            }}>
              {error}
            </p>
          )}

          <button style={buttonStyle} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p style={{ marginTop: '20px', color: '#94a3b8' }}>
          No account? <Link to="/register" style={{ color: '#38bdf8' }}>Register</Link>
        </p>
      </motion.div>
    </div>
  )
}

const pageStyle = {
  minHeight: '100vh',
  background: '#0f172a',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white'
}

const cardStyle = {
  background: '#1e293b',
  padding: '40px',
  borderRadius: '20px',
  width: '360px',
  boxShadow: '0 20px 40px rgba(0,0,0,0.35)'
}

const inputStyle = {
  width: '100%',
  padding: '14px',
  marginBottom: '15px',
  borderRadius: '12px',
  border: 'none',
  background: '#334155',
  color: 'white'
}

const buttonStyle = {
  width: '100%',
  padding: '14px',
  borderRadius: '12px',
  border: 'none',
  background: '#38bdf8',
  color: 'black',
  fontWeight: 'bold',
  cursor: 'pointer'
}

export default LoginPage