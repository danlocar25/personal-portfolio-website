import { useEffect, useState } from 'react'
import {
  ArrowRight,
  Code2,
  Database,
  Layers3,
  Play,
  Smartphone,
  Wifi,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const layers: {
  title: string
  summary: string
  details: string
  tools: string[]
  icon: LucideIcon
}[] = [
  {
    title: 'App UI',
    summary: 'Collect input and show clear status to the operator.',
    details:
      'The screen presents a focused task, such as adding an item or confirming a payment, and reflects the latest app state.',
    tools: ['Android UI', 'Jetpack Compose', 'XML layouts'],
    icon: Smartphone,
  },
  {
    title: 'ViewModel',
    summary: 'Keep screen state and business actions organized.',
    details:
      'An MVVM boundary keeps interface code manageable while coroutines and Flow handle asynchronous updates.',
    tools: ['MVVM', 'Kotlin Coroutines', 'Kotlin Flow'],
    icon: Code2,
  },
  {
    title: 'Data layer',
    summary: 'Coordinate local records and remote services.',
    details:
      'Local persistence and network calls give the app a clear place to read, update, and reconcile business data.',
    tools: ['Room / SQLite', 'REST APIs', 'MySQL'],
    icon: Database,
  },
  {
    title: 'Integrations',
    summary: 'Connect the app to services and physical devices.',
    details:
      'The app can exchange data with backend services and work with peripherals such as printers, scanners, and payment devices.',
    tools: ['Retrofit', 'RabbitMQ', 'POS hardware'],
    icon: Wifi,
  },
]

export function ArchitectureExplorer() {
  const [selected, setSelected] = useState(0)
  const [tracing, setTracing] = useState(false)

  useEffect(() => {
    if (!tracing) return

    let step = 0
    const interval = window.setInterval(() => {
      step += 1
      setSelected(step)
      if (step === layers.length - 1) setTracing(false)
    }, 850)

    return () => window.clearInterval(interval)
  }, [tracing])

  const activeLayer = layers[selected]

  return (
    <section className="architecture-explorer" aria-labelledby="architecture-title">
      <div className="architecture-heading">
        <div>
          <span className="tiny-label">HOW THE PIECES CONNECT</span>
          <h2 id="architecture-title">Trace a mobile transaction.</h2>
          <p>
            A conceptual Android POS flow, based on the patterns and integrations
            I work with.
          </p>
        </div>
        <button
          className={`architecture-trace ${tracing ? 'is-tracing' : ''}`}
          type="button"
          aria-pressed={tracing}
          onClick={() => {
            if (tracing) {
              setTracing(false)
            } else if (
              window.matchMedia('(prefers-reduced-motion: reduce)').matches
            ) {
              setSelected(layers.length - 1)
            } else {
              setSelected(0)
              setTracing(true)
            }
          }}
        >
          <Play size={15} fill="currentColor" />
          {tracing ? 'Stop trace' : 'Trace the flow'}
        </button>
      </div>

      <div className="architecture-flow" aria-label="Mobile app architecture flow">
        {layers.map((layer, index) => {
          const Icon = layer.icon
          return (
            <div className="architecture-flow-step" key={layer.title}>
              <button
                className={`architecture-node ${selected === index ? 'active' : ''} ${selected > index ? 'complete' : ''}`}
                type="button"
                aria-pressed={selected === index}
                onClick={() => {
                  setTracing(false)
                  setSelected(index)
                }}
              >
                <span className="architecture-node-icon"><Icon size={19} /></span>
                <span className="architecture-node-index">0{index + 1}</span>
                <strong>{layer.title}</strong>
                <small>{layer.summary}</small>
              </button>
              {index < layers.length - 1 && (
                <span
                  className={`architecture-connector ${selected > index ? 'complete' : ''}`}
                  aria-hidden="true"
                >
                  <ArrowRight size={16} />
                </span>
              )}
            </div>
          )
        })}
      </div>

      <div className="architecture-detail" aria-live="polite" aria-atomic="true">
        <div className="architecture-detail-copy">
          <span className="tiny-label">LAYER 0{selected + 1}</span>
          <h3>{activeLayer.title}</h3>
          <p>{activeLayer.details}</p>
        </div>
        <div className="architecture-tools" aria-label={`${activeLayer.title} tools`}>
          {activeLayer.tools.map((tool) => <span key={tool}>{tool}</span>)}
        </div>
      </div>
      <p className="architecture-note">
        Architecture concept for illustration; each product’s implementation varies.
      </p>
    </section>
  )
}
