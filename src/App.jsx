import { useState } from 'react'
import { AnimationLayer } from './components/AnimationLayer'
import { escapeHtml, sanitizeName } from './utils'
import './App.css'

function App() {
  const [name, setName] = useState('')
  const [greeting, setGreeting] = useState(null)
  const [showGreeting, setShowGreeting] = useState(false)
  const [animationTrigger, setAnimationTrigger] = useState(0)

  function handleSubmit(e) {
    e.preventDefault()
    const raw = name
    const sanitized = sanitizeName(raw)

    setAnimationTrigger((t) => t + 1)
    setShowGreeting(false)

    setTimeout(() => {
      setGreeting(sanitized ? { type: 'welcome', name: sanitized } : { type: 'empty' })
      setShowGreeting(true)
    }, 50)
  }

  return (
    <>
      <AnimationLayer trigger={animationTrigger} />
      <div className="container">
        <div className="card">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name-input" className="label">
              Enter your name
            </label>
            <input
              type="text"
              id="name-input"
              className="input"
              placeholder="enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              aria-label="Your name"
              maxLength={100}
            />
            <button type="submit" className="btn">
              Greet
            </button>
          </form>
          <div className="greeting" aria-live="polite">
            {greeting != null && (
              <p className={`greeting-text ${showGreeting ? 'visible' : ''}`}>
                {greeting.type === 'welcome' ? (
                  <>
                    <span className="name">{escapeHtml(greeting.name)}</span>, welcome!
                  </>
                ) : (
                  'Please enter your name above.'
                )}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
