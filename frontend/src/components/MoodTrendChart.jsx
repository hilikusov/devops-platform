import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'

function MoodTrendChart({ entries }) {
  const chartData = [...entries]
    .slice()
    .reverse()
    .map((entry) => ({
      date: new Date(entry.created_at).toLocaleDateString(),
      mood: entry.mood_score,
      label: entry.mood_label,
    }))

  if (!entries.length) {
    return (
      <p style={{ color: '#94a3b8' }}>
        Mood trends will appear after you create a few entries.
      </p>
    )
  }

  return (
    <div style={{ width: '100%', height: 260 }}>
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <CartesianGrid stroke="rgba(148,163,184,0.12)" strokeDasharray="3 3" />
          <XAxis dataKey="date" stroke="#94a3b8" />
          <YAxis domain={[1, 5]} stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              background: '#0f172a',
              border: '1px solid #334155',
              borderRadius: '14px',
              color: '#f8fafc',
            }}
          />
          <Line
            type="monotone"
            dataKey="mood"
            stroke="#38bdf8"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default MoodTrendChart