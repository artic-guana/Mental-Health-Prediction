import { useEffect, useState } from 'react'
import { predictionSchema } from '../validation/dataValidation.js'

const initialForm = {
  age: '',
  gender: '',
  country: '',
  academic_level: '',
  most_used_platform: '',
  purpose_of_use: '',
  avg_daily_usage_hours: '',
  daily_unlocks: '',
  study_hours: '',
  physical_activity_hours: '',
  sleep_hours_per_night: '',
  stress_level: '',
}

const numericFields = [
  { name: 'age', label: 'Age', min: 10, max: 100, step: 1, unit: 'years' },
  { name: 'avg_daily_usage_hours', label: 'Daily usage', min: 0, max: 24, step: 0.5, unit: 'hrs' },
  { name: 'daily_unlocks', label: 'Unlocks', min: 0, max: 200, step: 1, unit: 'times' },
  { name: 'study_hours', label: 'Study time', min: 0, max: 24, step: 0.5, unit: 'hrs' },
  { name: 'physical_activity_hours', label: 'Activity', min: 0, max: 24, step: 0.5, unit: 'hrs' },
  { name: 'sleep_hours_per_night', label: 'Sleep', min: 0, max: 24, step: 0.5, unit: 'hrs' },
]

const selectFields = [
  { name: 'gender', label: 'Gender', options: ['Male', 'Female'] },
  { name: 'academic_level', label: 'Academic level', options: ['High School', 'Undergraduate', 'Graduate'] },
  { name: 'most_used_platform', label: 'Most used platform', options: ['Facebook', 'LinkedIn', 'Instagram', 'Snapchat', 'Twitter', 'YouTube', 'TikTok', 'LINE', 'KakaoTalk', 'VKontakte', 'WhatsApp', 'WeChat'] },
  { name: 'purpose_of_use', label: 'Purpose of use', options: ['Networking', 'Education', 'Entertainment', 'News'] },
  { name: 'stress_level', label: 'Stress level', options: ['Low', 'Medium', 'High', 'Very High'] },
]


const Page = () => {
  const [formData, setFormData] = useState(initialForm)
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    const payload = {
      age: Number(formData.age || 0),
      gender: formData.gender,
      country: formData.country,
      academic_level: formData.academic_level,
      most_used_platform: formData.most_used_platform,
      purpose_of_use: formData.purpose_of_use,
      avg_daily_usage_hours: Number(formData.avg_daily_usage_hours || 0),
      daily_unlocks: Number(formData.daily_unlocks || 0),
      study_hours: Number(formData.study_hours || 0),
      physical_activity_hours: Number(formData.physical_activity_hours || 0),
      sleep_hours_per_night: Number(formData.sleep_hours_per_night || 0),
      stress_level: formData.stress_level,
    }

    try {
      const result = predictionSchema.safeParse(payload);

      if(!result.success){
        setError("Please fill all the fields!");
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(`Prediction failed with status ${response.status}`)
      }

      const data = await response.json()
      const score = data.predicted_mental_health_score ?? data.prediction ?? data.score ?? null

      if (score === null || score === undefined) {
        throw new Error('Invalid prediction response')
      }

      setPrediction(score)
    } catch (err) {
      setError(err.message)
      setPrediction(null)
    } finally {
      setLoading(false)
    }
  }

  const numericValue = typeof prediction === 'number' ? prediction : Number(prediction)
  const isValidScore = Number.isFinite(numericValue)
  const clampedScore = isValidScore ? Math.max(0, Math.min(10, numericValue)) : 0
  const normalizedValue = isValidScore ? clampedScore / 10 : 0
  const arcLength = 180
  const arcOffset = arcLength - arcLength * normalizedValue
  const scoreLabel = isValidScore
    ? numericValue >= 8
      ? 'Excellent mental health'
      : numericValue >= 6
        ? 'Good mental health'
        : numericValue >= 4
          ? 'Moderate mental health'
          : numericValue >= 2
            ? 'High distress'
            : 'Very high distress'
    : 'Awaiting prediction'

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(139,92,246,0.24),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(244,63,94,0.22),_transparent_32%)] px-3 py-4 text-slate-100 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-7xl flex-col overflow-hidden rounded-[2rem] border border-violet-500/20 bg-slate-950/80 shadow-[0_0_90px_rgba(139,92,246,0.16)] backdrop-blur-xl">
        <header className="border-b border-white/10 bg-gradient-to-br from-violet-950/70 via-slate-950 to-rose-950/70 p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-violet-300">Mental Health Predictor</p>
              <h1 className="text-3xl font-semibold text-white sm:text-4xl">A vivid, fully interactive experience for mental health scoring.</h1>
              <p className="mt-4 text-base leading-7 text-slate-300">
                Tune the inputs with sliders and live controls, then predict the score instantly with a beautiful result panel.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-5 shadow-inner shadow-black/20">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Live output</p>
              <div className="mt-3 flex items-end gap-2">
                <span className="text-5xl font-semibold text-white">{isValidScore ? numericValue.toFixed(1) : '—'}</span>
                <span className="mb-1 text-sm text-slate-400">/ 10</span>
              </div>
              <p className="mt-2 text-sm text-violet-200">{scoreLabel}</p>
            </div>
          </div>
        </header>

        <main className="grid flex-1 gap-6 p-4 sm:p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
          <form onSubmit={handleSubmit} className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-4 shadow-2xl shadow-black/20 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-white">Input profile</h2>
                <p className="text-sm text-slate-400">Every field is interactive and responsive.</p>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-rose-500 px-5 py-3 font-semibold text-white shadow-lg shadow-rose-950/30 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? 'Predicting...' : 'Predict'}
              </button>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {numericFields.map((field) => {
                const currentValue = formData[field.name]
                const numericValue = currentValue === '' ? field.min : Number(currentValue)
                return (
                  <div key={field.name} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <label className="text-sm font-medium text-slate-200" htmlFor={field.name}>{field.label}</label>
                      <span className="rounded-full bg-violet-500/15 px-2.5 py-1 text-sm font-semibold text-violet-200">
                        {numericValue}{field.unit}
                      </span>
                    </div>
                    <input
                      id={field.name}
                      name={field.name}
                      type="range"
                      min={field.min}
                      max={field.max}
                      step={field.step}
                      value={currentValue === '' ? field.min : currentValue}
                      onChange={handleChange}
                      className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-violet-500"
                    />
                    <input
                      type="number"
                      name={field.name}
                      min={field.min}
                      max={field.max}
                      step={field.step}
                      value={currentValue}
                      onChange={handleChange}
                      className="mt-3 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none transition focus:border-violet-400"
                    />
                  </div>
                )
              })}

              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 md:col-span-2">
                <label className="text-sm font-medium text-slate-200" htmlFor="country">Country</label>
                <input
                  id="country"
                  name="country"
                  type="text"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="e.g. India"
                  className="mt-3 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-slate-100 outline-none transition focus:border-violet-400"
                />
              </div>

              {selectFields.map((field) => (
                <div key={field.name} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <label className="text-sm font-medium text-slate-200" htmlFor={field.name}>{field.label}</label>
                  <select
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="mt-3 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-slate-100 outline-none transition focus:border-violet-400"
                  >
                    <option value="">Select one</option>
                    {field.options.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {error ? <p className="mt-4 text-sm text-rose-400">{error}</p> : null}
          </form>

          <aside className="flex flex-col gap-4">
            <div className="rounded-[1.5rem] border border-violet-500/20 bg-gradient-to-br from-violet-950/80 via-slate-900 to-rose-950/70 p-6 shadow-2xl shadow-black/20">
              <p className="text-sm uppercase tracking-[0.25em] text-violet-200">Prediction result</p>
              <div className="mt-5 rounded-[1.25rem] border border-white/10 bg-slate-950/50 p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm text-slate-400">Estimated score</p>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-violet-300">1–10 scale</p>
                </div>

                <div className="mt-4 flex flex-col items-center">
                  <svg viewBox="0 0 220 135" className="w-full max-w-[240px]">
                    <defs>
                      <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#fb7185" />
                        <stop offset="50%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#22c55e" />
                      </linearGradient>
                    </defs>

                    <path d="M 20 110 A 90 90 0 0 1 200 110" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="18" strokeLinecap="round" />
                    <path
                      d="M 20 110 A 90 90 0 0 1 200 110"
                      fill="none"
                      stroke="url(#gauge-gradient)"
                      strokeWidth="18"
                      strokeLinecap="round"
                      strokeDasharray={arcLength}
                      strokeDashoffset={arcOffset}
                    />

                    {Array.from({ length: 10 }, (_, index) => {
                      const tick = index + 1
                      const angle = Math.PI - (index / 9) * Math.PI
                      const x = 110 + 90 * Math.cos(angle)
                      const y = 110 + 90 * Math.sin(angle)
                      return (
                        <g key={tick}>
                          <circle cx={x} cy={y} r="3" fill="rgba(255,255,255,0.85)" />
                          <text
                            x={x}
                            y={y - 12}
                            textAnchor="middle"
                            fontSize="11"
                            fill="rgba(248,250,252,0.8)"
                          >
                            {tick}
                          </text>
                        </g>
                      )
                    })}
                  </svg>

                  <div className="mt-[-4px] text-center">
                    <p className="text-5xl font-semibold text-white">{isValidScore ? numericValue.toFixed(1) : '—'}</p>
                    <p className="mt-2 text-sm text-slate-300">{scoreLabel}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-black/20">
              <h3 className="text-lg font-semibold text-white">Your snapshot</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {Object.entries(formData).filter(([key, value]) => value).slice(0, 6).map(([key, value]) => (
                  <span key={key} className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-sm text-violet-100">
                    {key.replace(/_/g, ' ')}: {value}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </main>
      </div>
    </div>
  )
}

export default Page;