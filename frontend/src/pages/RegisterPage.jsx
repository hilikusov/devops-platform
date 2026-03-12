import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { authApi } from '../services/api'

function RegisterPage() {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      await authApi.post('/register', null, {
        params: {
          username,
          password,
        },
      })

      setSuccess('Account created successfully. Redirecting to login...')
      setTimeout(() => navigate('/'), 1200)
       } catch (err) {
      const message =
        err.response?.data?.detail ||
        'Registration failed. Please try again.'

      setError(message)
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
        <h1>Create Account</h1>

        <form onSubmit={handleRegister}>
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

          {success && (
            <p style={{
              color: '#4ade80',
              marginBottom: '15px',
              fontSize: '14px'
            }}>
              {success}
            </p>
          )}

          <button style={buttonStyle} disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p style={{ marginTop: '20px', color: '#94a3b8' }}>
          Already have an account? <Link to="/" style={{ color: '#38bdf8' }}>Login</Link>
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

export default RegisterPage