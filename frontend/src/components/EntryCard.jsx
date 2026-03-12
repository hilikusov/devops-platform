import { motion } from 'framer-motion'

function EntryCard({ entry }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        background: 'linear-gradient(180deg, rgba(30,41,59,0.96) 0%, rgba(15,23,42,0.96) 100%)',
        padding: '22px',
        borderRadius: '20px',
        border: '1px solid rgba(148,163,184,0.12)',
        boxShadow: '0 18px 40px rgba(0,0,0,0.2)',
        marginBottom: '16px'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '16px',
          marginBottom: '12px'
        }}
      >
        <div>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>
            {entry.title}
          </h3>
        </div>

        <span
          style={{
            background: '#0f172a',
            padding: '7px 12px',
            borderRadius: '999px',
            fontSize: '12px',
            color: '#cbd5e1',
            border: '1px solid #334155',
            whiteSpace: 'nowrap'
          }}
        >
          {entry.mood_label}
        </span>
      </div>

      <p
        style={{
          color: '#cbd5e1',
          lineHeight: 1.7,
          marginBottom: '14px'
        }}
      >
        {entry.content}
      </p>

      <p
        style={{
          color: '#64748b',
          fontSize: '13px',
          margin: 0
        }}
      >
        {new Date(entry.created_at).toLocaleString()}
      </p>
    </motion.div>
  )
}

export default EntryCard