import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function RegisterPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f172a',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: '#1e293b',
          padding: '40px',
          borderRadius: '20px',
          width: '360px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.35)'
        }}
      >
        <h1>Create Account</h1>

        <input placeholder="Username" style={inputStyle} />
        <input placeholder="Password" type="password" style={inputStyle} />

        <button style={buttonStyle}>
          Register
        </button>

        <p style={{ marginTop: '20px', color: '#94a3b8' }}>
          Already have an account? <Link to="/" style={{ color: '#38bdf8' }}>Login</Link>
        </p>
      </motion.div>
    </div>
  )
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