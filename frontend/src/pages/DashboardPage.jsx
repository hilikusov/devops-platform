import { motion } from 'framer-motion'

function DashboardPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f172a',
      color: 'white',
      padding: '40px'
    }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1>Welcome to MindTrack</h1>
        <p style={{ color: '#94a3b8' }}>
          Your private mental journal dashboard
        </p>

        <div style={{
          marginTop: '30px',
          background: '#1e293b',
          padding: '25px',
          borderRadius: '20px'
        }}>
          <h2>Today's mood</h2>
          <p>Journal cards coming next phase</p>
        </div>
      </motion.div>
    </div>
  )
}

export default DashboardPage