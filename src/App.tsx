import { useState, useEffect } from 'react'
import './App.css'
import apiService from './services/api'
import { type MessageResponse, type ApiError } from './types/api'

function Home() {
  const [message, setMessage] = useState<MessageResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBackendMessage = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await apiService.fetchMessage()
        setMessage(response)
      } catch (err) {
        const apiError = err as ApiError
        setError(apiError.error || 'Failed to fetch message from backend')
        setMessage(null)
      } finally {
        setLoading(false)
      }
    }

    fetchBackendMessage()
  }, [])

  return (
    <div className="container">
      <header className="header">
        <h1>Welcome to My App</h1>
        <p className="subtitle">Built with React, TypeScript, and Vite</p>
      </header>

      <main className="main-content">
        <section className="hero">
          <h2>Get Started</h2>
          <p>This is your landing page. You can customize it with your own content.</p>
        </section>

        <section className="features">
          <h2>Features</h2>
          <ul>
            <li>⚡ Fast development with Vite</li>
            <li>🎨 React for interactive UIs</li>
            <li>🔷 TypeScript for type safety</li>
          </ul>
        </section>

        <section className="backend-message">
          <h2>Message from Backend</h2>
          {loading && <p className="loading">Loading message from backend...</p>}
          {error && <p className="error">Error: {error}</p>}
          {message && (
            <div className="message-box">
              <p className="message-text">{message.message}</p>
              <p className="message-timestamp">
                Received at: {new Date(message.timestamp).toLocaleString()}
              </p>
              <p className="message-status">Status: {message.status}</p>
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2026 My App. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Home
