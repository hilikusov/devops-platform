import { motion, AnimatePresence } from 'framer-motion'
import MoodSelector from './MoodSelector'

function EntryModal({
  isOpen,
  onClose,
  title,
  setTitle,
  content,
  setContent,
  moodLabel,
  setMoodLabel,
  moodScore,
  setMoodScore,
  onSubmit,
  submitting,
  error,
  mode = 'create'
}) {
  const isEdit = mode === 'edit'

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={overlayStyle}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            style={modalStyle}
          >
            <div style={headerStyle}>
              <div>
                <h2 style={{ margin: 0 }}>
                  {isEdit ? 'Edit reflection' : 'New reflection'}
                </h2>
                <p style={subTextStyle}>
                  {isEdit
                    ? 'Refine or update your reflection.'
                    : 'Capture your thoughts in a calm private space.'}
                </p>
              </div>

              <button type="button" onClick={onClose} style={closeButtonStyle}>
                Close
              </button>
            </div>

            <form onSubmit={onSubmit}>
              <input
                placeholder="Entry title"
                style={inputStyle}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <textarea
                placeholder="Write about your day, thoughts, emotions, or patterns..."
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

              {error && <p style={errorStyle}>{error}</p>}

              <div style={footerStyle}>
                <button type="button" onClick={onClose} style={secondaryButtonStyle}>
                  Cancel
                </button>

                <button type="submit" style={primaryButtonStyle} disabled={submitting}>
                  {submitting ? 'Saving...' : isEdit ? 'Save Changes' : 'Save Entry'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const overlayStyle = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(2, 6, 23, 0.72)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  padding: '24px'
}

const modalStyle = {
  width: '100%',
  maxWidth: '700px',
  maxHeight: '90vh',
  overflowY: 'auto',
  background: 'linear-gradient(180deg, rgba(30,41,59,0.98) 0%, rgba(15,23,42,0.98) 100%)',
  border: '1px solid rgba(148,163,184,0.12)',
  borderRadius: '24px',
  padding: 'clamp(18px, 2vw, 24px)',
  boxShadow: '0 24px 80px rgba(0,0,0,0.35)'
}

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: '16px',
  marginBottom: '20px',
  flexWrap: 'wrap'
}

const subTextStyle = {
  color: '#94a3b8',
  marginTop: '8px',
  marginBottom: 0,
  lineHeight: 1.6
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
  minHeight: '180px',
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

const footerStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '12px',
  marginTop: '18px',
  flexWrap: 'wrap'
}

const primaryButtonStyle = {
  padding: '12px 18px',
  borderRadius: '14px',
  border: 'none',
  background: 'linear-gradient(135deg, #38bdf8 0%, #22c55e 100%)',
  color: '#020617',
  fontWeight: 700,
  cursor: 'pointer'
}

const secondaryButtonStyle = {
  padding: '12px 18px',
  borderRadius: '14px',
  border: '1px solid rgba(148,163,184,0.2)',
  background: '#1e293b',
  color: '#e2e8f0',
  fontWeight: 600,
  cursor: 'pointer'
}

const closeButtonStyle = {
  padding: '10px 14px',
  borderRadius: '12px',
  border: '1px solid rgba(148,163,184,0.2)',
  background: '#0f172a',
  color: '#e2e8f0',
  cursor: 'pointer'
}

const errorStyle = {
  color: '#f87171',
  marginBottom: '14px'
}

export default EntryModal