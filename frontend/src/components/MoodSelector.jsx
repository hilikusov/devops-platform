function MoodSelector({ moodLabel, setMoodLabel, moodScore, setMoodScore }) {
  const moods = [
    { label: 'Low', value: 'low', score: 1 },
    { label: 'Anxious', value: 'anxious', score: 2 },
    { label: 'Neutral', value: 'neutral', score: 3 },
    { label: 'Calm', value: 'calm', score: 4 },
    { label: 'Good', value: 'good', score: 5 },
  ]

  return (
    <div style={{ marginBottom: '24px' }}>
      <p
        style={{
          fontSize: '14px',
          color: '#94a3b8',
          marginBottom: '12px',
          fontWeight: 500
        }}
      >
        Emotional state
      </p>

      <div
        style={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap'
        }}
      >
        {moods.map((mood) => {
          const isActive = moodLabel === mood.value

          return (
            <button
              key={mood.value}
              type="button"
              onClick={() => {
                setMoodLabel(mood.value)
                setMoodScore(mood.score)
              }}
              style={{
                padding: '8px 14px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                border: isActive
                  ? '1px solid #38bdf8'
                  : '1px solid #334155',
                background: isActive
                  ? 'rgba(56,189,248,0.08)'
                  : '#0f172a',
                color: isActive
                  ? '#e0f2fe'
                  : '#cbd5e1',
                transition: 'all 0.2s ease'
              }}
            >
              {mood.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default MoodSelector