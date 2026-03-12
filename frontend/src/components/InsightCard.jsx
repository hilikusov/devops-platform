import { motion } from 'framer-motion'

function formatPattern(pattern) {
  if (!pattern) return '--'

  const labels = {
    persistently_low: 'Persistently low',
    persistently_positive: 'Persistently positive',
    mixed: 'Mixed',
    neutral: 'Neutral',
  }

  return labels[pattern] || pattern
}

function formatTrend(trend) {
  if (!trend) return '--'

  const labels = {
    declining: 'Declining',
    improving: 'Improving',
    stable: 'Stable',
  }

  return labels[trend] || trend
}

function InsightCard({ insight }) {
  if (!insight) return null

  const toneColor =
    insight.tone === 'supportive'
      ? '#fb923c'
      : insight.tone === 'encouraging'
      ? '#22c55e'
      : '#38bdf8'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      style={{
        background:
          'linear-gradient(180deg, rgba(30,41,59,0.96) 0%, rgba(15,23,42,0.96) 100%)',
        padding: '22px',
        borderRadius: '20px',
        border: `1px solid ${toneColor}33`,
        boxShadow: '0 18px 40px rgba(0,0,0,0.2)',
      }}
    >
      <p
        style={{
          fontSize: '13px',
          fontWeight: 700,
          color: toneColor,
          marginTop: 0,
          marginBottom: '10px',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}
      >
        Reflection Insight
      </p>

      <p
        style={{
          color: '#e2e8f0',
          lineHeight: 1.7,
          margin: 0,
        }}
      >
        {insight.message}
      </p>

      <div
        style={{
          marginTop: '14px',
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
        }}
      >
        {insight.recent_average !== null && (
          <span style={badgeStyle}>Recent avg: {insight.recent_average}</span>
        )}

        <span style={badgeStyle}>Trend: {formatTrend(insight.trend)}</span>

        <span style={badgeStyle}>Pattern: {formatPattern(insight.pattern)}</span>
      </div>
    </motion.div>
  )
}

const badgeStyle = {
  background: '#0f172a',
  padding: '7px 12px',
  borderRadius: '999px',
  fontSize: '12px',
  color: '#cbd5e1',
  border: '1px solid #334155',
  whiteSpace: 'nowrap',
}

export default InsightCard