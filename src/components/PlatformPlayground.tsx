import { useState } from 'react'
import {
  ArrowRight,
  Battery,
  BarChart3,
  ChevronLeft,
  Globe,
  Leaf,
  ScanLine,
  Wifi,
} from 'lucide-react'

type Platform = 'android' | 'ios' | 'web'
type DemoScreen = 'overview' | 'reports'

const platformTraits: Record<Platform, string[]> = {
  android: ['Primary specialization', 'Material surfaces', 'Prominent action'],
  ios: ['iOS mobile apps', 'Cupertino grouping', 'Native navigation'],
  web: ['Websites & web apps', 'Browser layout', 'Responsive dashboard'],
}

const platformCaptions: Record<Platform, string> = {
  android: 'Android · Primary specialization (Material)',
  ios: 'iOS · Mobile application (Cupertino)',
  web: 'Web · Responsive website & dashboard',
}

export function PlatformPlayground() {
  const [platform, setPlatform] = useState<Platform>('android')
  const [screen, setScreen] = useState<DemoScreen>('overview')

  return (
    <section className="platform-lab" aria-labelledby="platform-lab-title">
      <div className="platform-lab-copy">
        <span className="tiny-label">INTERACTIVE MULTI-PLATFORM CONCEPT</span>
        <h2 id="platform-lab-title">Android first. Ready for iOS &amp; Web.</h2>
        <p>
          Android is my primary specialization and daily professional focus, and
          I also build iOS mobile applications and websites. Switch views to see
          how the same product adapts across Android, iOS, and the web.
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
          <button
            type="button"
            className={platform === 'web' ? 'selected' : ''}
            aria-pressed={platform === 'web'}
            onClick={() => setPlatform('web')}
          >
            Web
          </button>
        </div>
        <div className="platform-traits" aria-live="polite">
          {platformTraits[platform].map((trait) => (
            <span key={trait}>{trait}</span>
          ))}
        </div>
      </div>

      <div className={`platform-device ${platform}`}>
        <div className="platform-device-frame">
          {platform !== 'web' && <div className="platform-camera" />}
          <div className="platform-screen">
            {platform === 'web' ? (
              <div className="demo-browserbar">
                <span className="demo-browser-dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="demo-browser-url">
                  <Globe size={11} /> coffeetect.app/{screen}
                </span>
              </div>
            ) : (
              <div className="demo-statusbar">
                <span>9:41</span>
                <span className="demo-system-icons">
                  <Wifi size={14} />
                  <Battery size={15} />
                </span>
              </div>
            )}
            <header className="demo-appbar">
              {platform === 'ios' && <ChevronLeft size={19} />}
              <span className="demo-app-icon">
                <Leaf size={17} />
              </span>
              <strong>Coffeetect</strong>
              {platform !== 'ios' && <span className="demo-app-spacer" />}
              {platform === 'web' && (
                <span className="demo-web-badge">Web Portal</span>
              )}
            </header>
            <div
              className="demo-screen-tabs"
              role="group"
              aria-label="Preview screen"
            >
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
                  Check a leaf and monitor disease severity across mobile and
                  web.
                </p>
                <div className="demo-action-card">
                  <span className="demo-feature-icon">
                    <ScanLine size={19} />
                  </span>
                  <span>
                    <strong>Leaf detection</strong>
                    <small>
                      {platform === 'web'
                        ? 'Upload & batch analysis'
                        : 'Camera & ML analysis'}
                    </small>
                  </span>
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
                  Review disease assessments and browse monthly or yearly
                  summaries.
                </p>
                <div className="demo-report-card">
                  <span className="demo-feature-icon">
                    <BarChart3 size={19} />
                  </span>
                  <span>
                    <strong>Visual summaries</strong>
                    <small>Monthly · Yearly</small>
                  </span>
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
            {platform !== 'web' && <div className="demo-home-indicator" />}
          </div>
        </div>
        <span className="platform-device-caption">
          {platformCaptions[platform]}
        </span>
      </div>
    </section>
  )
}
