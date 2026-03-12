import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null

  const item = payload[0].payload

  return (
    <div
      style={{
        background: '#0f172a',
        border: '1px solid #334155',
        borderRadius: '14px',
        padding: '10px 12px',
        color: '#f8fafc',
        boxShadow: '0 10px 24px rgba(0,0,0,0.25)',
      }}
    >
      <p style={{ margin: '0 0 6px 0', fontSize: '13px', color: '#94a3b8' }}>
        {item.fullDate}
      </p>
      <p style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>
        Mood: {item.label} ({item.mood}/5)
      </p>
    </div>
  )
}

function MoodTrendChart({ entries }) {
  const chartData = [...entries]
    .slice()
    .reverse()
    .map((entry, index) => {
      const dateObj = new Date(entry.created_at)

      return {
        id: `${entry.id}-${index}`,
        shortDate: dateObj.toLocaleDateString(),
        shortTime: dateObj.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        fullDate: dateObj.toLocaleString(),
        xLabel: `${dateObj.toLocaleDateString()} ${dateObj.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}`,
        mood: entry.mood_score,
        label: entry.mood_label,
      }
    })

  if (!entries.length) {
    return (
      <p style={{ color: '#94a3b8' }}>
        Mood trends will appear after you create a few entries.
      </p>
    )
  }

  return (
    <div style={{ width: '100%', height: 280 }}>
      <ResponsiveContainer>
        <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
          <CartesianGrid stroke="rgba(148,163,184,0.12)" strokeDasharray="3 3" />
          <XAxis
            dataKey="xLabel"
            stroke="#94a3b8"
            tick={{ fontSize: 12 }}
            minTickGap={30}
            tickFormatter={(value) => value.split(' ')[1] || value}
          />
          <YAxis
            domain={[1, 5]}
            allowDecimals={false}
            stroke="#94a3b8"
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="mood"
            stroke="#38bdf8"
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 2, fill: '#0f172a' }}
            activeDot={{ r: 6 }}
            connectNulls
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default MoodTrendChart