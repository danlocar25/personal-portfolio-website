import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from 'react'
import { X } from 'lucide-react'

type Position = { x: number; y: number }

const POSITION_KEY = 'mascot-position'
const VIEWPORT_MARGIN = 12

export function MascotPet() {
  const [greetingOpen, setGreetingOpen] = useState(false)
  const [position, setPosition] = useState<Position | null>(null)
  const [dragging, setDragging] = useState(false)
  const [greetingPosition, setGreetingPosition] = useState<CSSProperties>({})
  const launcherRef = useRef<HTMLButtonElement>(null)
  const positionRef = useRef<Position | null>(null)
  const dragRef = useRef<{
    pointerId: number
    startX: number
    startY: number
    originX: number
    originY: number
    moved: boolean
  } | null>(null)
  const suppressClickRef = useRef(false)

  const clampPosition = (point: Position): Position => {
    const launcher = launcherRef.current
    return {
      x: Math.max(
        VIEWPORT_MARGIN,
        Math.min(
          point.x,
          window.innerWidth - (launcher?.offsetWidth ?? 0) - VIEWPORT_MARGIN,
        ),
      ),
      y: Math.max(
        VIEWPORT_MARGIN,
        Math.min(
          point.y,
          window.innerHeight - (launcher?.offsetHeight ?? 0) - VIEWPORT_MARGIN,
        ),
      ),
    }
  }

  useEffect(() => {
    try {
      const saved = localStorage.getItem(POSITION_KEY)
      if (saved) {
        const point = JSON.parse(saved) as Position
        if (Number.isFinite(point.x) && Number.isFinite(point.y)) {
          const clamped = clampPosition(point)
          positionRef.current = clamped
          setPosition(clamped)
        }
      }
    } catch {
      // Storage may be unavailable; dragging still works for this visit.
    }

    const handleResize = () => {
      if (!positionRef.current) return
      const clamped = clampPosition(positionRef.current)
      positionRef.current = clamped
      setPosition(clamped)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0 || dragRef.current) return
    const rect = event.currentTarget.getBoundingClientRect()
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: rect.left,
      originY: rect.top,
      moved: false,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    const dx = event.clientX - drag.startX
    const dy = event.clientY - drag.startY
    if (!drag.moved && Math.hypot(dx, dy) < 5) return
    if (!drag.moved) {
      drag.moved = true
      setDragging(true)
      setGreetingOpen(false)
    }
    const next = clampPosition({ x: drag.originX + dx, y: drag.originY + dy })
    positionRef.current = next
    setPosition(next)
  }

  const handlePointerEnd = (event: PointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    if (drag.moved && positionRef.current) {
      suppressClickRef.current = true
      window.setTimeout(() => {
        suppressClickRef.current = false
      }, 0)
      try {
        localStorage.setItem(POSITION_KEY, JSON.stringify(positionRef.current))
      } catch {
        // Keep the position for this visit if storage is unavailable.
      }
    }
    dragRef.current = null
    setDragging(false)
  }

  const toggleGreeting = () => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false
      return
    }
    if (greetingOpen) {
      setGreetingOpen(false)
      return
    }
    const rect = launcherRef.current?.getBoundingClientRect()
    if (rect) {
      const width = Math.min(240, window.innerWidth - 2 * VIEWPORT_MARGIN)
      const left = Math.max(
        VIEWPORT_MARGIN,
        Math.min(
          rect.left + rect.width / 2 - width / 2,
          window.innerWidth - width - VIEWPORT_MARGIN,
        ),
      )
      const above =
        rect.top >= 120 || rect.top > window.innerHeight - rect.bottom
      setGreetingPosition({
        left: left - rect.left,
        right: 'auto',
        top: above ? 'auto' : rect.height + 10,
        bottom: above ? rect.height + 10 : 'auto',
      })
    }
    setGreetingOpen(true)
  }

  return (
    <div
      className={`mascot-pet ${position ? 'mascot-pet-moved' : ''}`}
      style={position ? { left: position.x, top: position.y } : undefined}
    >
      {greetingOpen && (
        <div className="mascot-greeting" role="status" style={greetingPosition}>
          <button
            className="mascot-greeting-close"
            type="button"
            onClick={() => setGreetingOpen(false)}
            aria-label="Close mascot greeting"
          >
            <X size={15} />
          </button>
          <strong>Hi there, explorer!</strong>
          <span>
            Dan is a Software Engineer specializing in Android, and also builds
            iOS apps &amp; websites.
          </span>
        </div>
      )}
      <button
        ref={launcherRef}
        className={`mascot-launcher ${greetingOpen ? 'greeting-open' : ''} ${dragging ? 'is-dragging' : ''}`}
        type="button"
        onClick={toggleGreeting}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        aria-expanded={greetingOpen}
        aria-label={
          greetingOpen
            ? 'Hide mascot greeting'
            : 'Meet Dan’s Android, iOS, and Web mascots. Drag to move.'
        }
      >
        <svg
          className="mascot-art"
          viewBox="0 0 168 126"
          role="img"
          aria-label="A friendly green Android-inspired robot and a blue iOS-inspired phone mascot"
        >
          <ellipse className="mascot-shadow" cx="82" cy="113" rx="60" ry="8" />
          <g className="mascot-android">
            <path className="android-antenna" d="M44 31 35 18M75 31l9-13" />
            <rect
              className="android-head"
              x="30"
              y="27"
              width="61"
              height="47"
              rx="23"
            />
            <path className="android-eye" d="M46 47v1M75 47v1" />
            <path className="android-smile" d="M51 59q9 7 18 0" />
            <rect
              className="android-body"
              x="37"
              y="70"
              width="48"
              height="35"
              rx="14"
            />
            <path
              className="android-limb"
              d="M31 79v19M91 79v19M49 102v10M74 102v10"
            />
          </g>
          <g className="mascot-ios">
            <rect
              className="ios-phone"
              x="88"
              y="34"
              width="54"
              height="75"
              rx="17"
            />
            <rect
              className="ios-screen"
              x="93"
              y="40"
              width="44"
              height="62"
              rx="12"
            />
            <rect
              className="ios-notch"
              x="105"
              y="44"
              width="20"
              height="4"
              rx="2"
            />
            <path className="ios-eye" d="M105 68v1M124 68v1" />
            <path className="ios-smile" d="M108 79q7 6 14 0" />
            <rect
              className="ios-home"
              x="108"
              y="96"
              width="15"
              height="2.5"
              rx="1.25"
            />
          </g>
          <path
            className="mascot-spark"
            d="m19 48 2.5 6.5L28 57l-6.5 2.5L19 66l-2.5-6.5L10 57l6.5-2.5L19 48ZM133 17l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5Z"
          />
        </svg>
        <span className="mascot-caption">Android · iOS · Web</span>
      </button>
    </div>
  )
}
