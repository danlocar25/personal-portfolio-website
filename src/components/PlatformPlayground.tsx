import { useState } from 'react'
import {
  ArrowRight,
  Battery,
  BarChart3,
  ChevronLeft,
  Leaf,
  ScanLine,
  Wifi,
} from 'lucide-react'

type Platform = 'android' | 'ios'
type DemoScreen = 'overview' | 'reports'

export function PlatformPlayground() {
  const [platform, setPlatform] = useState<Platform>('android')
  const [screen, setScreen] = useState<DemoScreen>('overview')

  return (
    <section className="platform-lab" aria-labelledby="platform-lab-title">
      <div className="platform-lab-copy">
        <span className="tiny-label">INTERACTIVE UI CONCEPT</span>
        <h2 id="platform-lab-title">One product, two platforms.</h2>
        <p>
          Explore how the same coffee plant app can keep its identity while
          using familiar Android or iOS patterns.
        </p>
        <div
          className="platform-switch"
          role="group"
          aria-label="Choose platform style"
        >
          <button
            type="button"
            className={platform === 'android' ? 'selected' : ''}
            aria-pressed={platform === 'android'}
            onClick={() => setPlatform('android')}
          >
            Android
          </button>
          <button
            type="button"
            className={platform === 'ios' ? 'selected' : ''}
            aria-pressed={platform === 'ios'}
            onClick={() => setPlatform('ios')}
          >
            iOS
          </button>
        </div>
        <div className="platform-traits" aria-live="polite">
          <span>{platform === 'android' ? 'Material surfaces' : 'Cupertino grouping'}</span>
          <span>{platform === 'android' ? 'Prominent action' : 'Native navigation'}</span>
        </div>
      </div>

      <div className={`platform-device ${platform}`}>
        <div className="platform-device-frame">
          <div className="platform-camera" />
          <div className="platform-screen">
            <div className="demo-statusbar">
              <span>9:41</span>
              <span className="demo-system-icons">
                <Wifi size={14} />
                <Battery size={15} />
              </span>
            </div>
            <header className="demo-appbar">
              {platform === 'ios' && <ChevronLeft size={19} />}
              <span className="demo-app-icon"><Leaf size={17} /></span>
              <strong>Coffeetect</strong>
              {platform === 'android' && <span className="demo-app-spacer" />}
            </header>
            <div className="demo-screen-tabs" role="group" aria-label="Preview screen">
              <button
                type="button"
                aria-pressed={screen === 'overview'}
                className={screen === 'overview' ? 'selected' : ''}
                onClick={() => setScreen('overview')}
              >
                Overview
              </button>
              <button
                type="button"
                aria-pressed={screen === 'reports'}
                className={screen === 'reports' ? 'selected' : ''}
                onClick={() => setScreen('reports')}
              >
                Reports
              </button>
            </div>
            {screen === 'overview' ? (
              <div className="demo-content">
                <p className="demo-greeting">PLANT HEALTH</p>
                <h3>Your coffee plants</h3>
                <p className="demo-description">
                  Check a leaf and keep an eye on its health over time.
                </p>
                <div className="demo-action-card">
                  <span className="demo-feature-icon"><ScanLine size={19} /></span>
                  <span><strong>Leaf detection</strong><small>Image analysis concept</small></span>
                  <ArrowRight size={16} />
                </div>
                <button
                  className="demo-primary-action"
                  type="button"
                  onClick={() => setScreen('reports')}
                >
                  Explore reports <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              <div className="demo-content">
                <p className="demo-greeting">INSIGHTS</p>
                <h3>Leaf reports</h3>
                <p className="demo-description">
                  Review disease assessments and browse monthly or yearly summaries.
                </p>
                <div className="demo-report-card">
                  <span className="demo-feature-icon"><BarChart3 size={19} /></span>
                  <span><strong>Visual summaries</strong><small>Monthly · Yearly</small></span>
                </div>
                <button
                  className="demo-primary-action"
                  type="button"
                  onClick={() => setScreen('overview')}
                >
                  Back to overview <ArrowRight size={16} />
                </button>
              </div>
            )}
            <div className="demo-home-indicator" />
          </div>
        </div>
        <span className="platform-device-caption">
          {platform === 'android' ? 'Android · Material inspired' : 'iOS · Cupertino inspired'}
        </span>
      </div>
    </section>
  )
}
