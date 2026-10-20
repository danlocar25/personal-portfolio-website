import { useEffect, useState } from 'react'
import {
  ArrowRight,
  Code2,
  Database,
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
    title: 'Client UI',
    summary: 'Deliver responsive interfaces on Android, iOS, or Web.',
    details:
      'Primary focus on commercial Android UI with Jetpack Compose and XML layouts, alongside iOS mobile screens and interactive web interfaces.',
    tools: ['Android UI', 'Jetpack Compose', 'iOS & Web UI'],
    icon: Smartphone,
  },
  {
    title: 'ViewModel & Logic',
    summary: 'Keep screen state and business actions organized.',
    details:
      'An MVVM boundary keeps presentation code clean while Kotlin Coroutines, Flow, and modular logic manage asynchronous updates.',
    tools: ['MVVM', 'Kotlin Coroutines', 'Kotlin Flow'],
    icon: Code2,
  },
  {
    title: 'Data layer',
    summary: 'Coordinate local records and remote databases.',
    details:
      'Local persistence on Android and relational backend databases provide a dependable foundation for reading, syncing, and reconciling data.',
    tools: ['Room / SQLite', 'MySQL / PostgreSQL', 'REST APIs'],
    icon: Database,
  },
  {
    title: 'Integrations',
    summary: 'Connect apps to third-party APIs and POS hardware.',
    details:
      'Applications exchange live data with booking, mall, and backend systems while driving physical POS peripherals like printers, scanners, and payment terminals.',
    tools: ['Retrofit & OkHttp', 'RabbitMQ', 'POS hardware'],
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

  const activeLayer = layers[selected] ?? layers[0]!

  return (
    <section
      className="architecture-explorer"
      aria-labelledby="architecture-title"
    >
      <div className="architecture-heading">
        <div>
          <span className="tiny-label">HOW THE PIECES CONNECT</span>
          <h2 id="architecture-title">Trace a mobile transaction.</h2>
          <p>
            A conceptual Android POS flow, based on the patterns and
            integrations I work with.
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

      <div
        className="architecture-flow"
        aria-label="Mobile app architecture flow"
      >
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
                <span className="architecture-node-icon">
                  <Icon size={19} />
                </span>
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

      <div
        className="architecture-detail"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="architecture-detail-copy">
          <span className="tiny-label">LAYER 0{selected + 1}</span>
          <h3>{activeLayer.title}</h3>
          <p>{activeLayer.details}</p>
        </div>
        <div
          className="architecture-tools"
          aria-label={`${activeLayer.title} tools`}
        >
          {activeLayer.tools.map((tool) => (
            <span key={tool}>{tool}</span>
          ))}
        </div>
      </div>
      <p className="architecture-note">
        Architecture concept for illustration; each product’s implementation
        varies.
      </p>
    </section>
  )
}
