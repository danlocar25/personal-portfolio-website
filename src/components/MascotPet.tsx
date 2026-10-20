import { useState } from 'react'
import { X } from 'lucide-react'

export function MascotPet() {
  const [greetingOpen, setGreetingOpen] = useState(false)

  return (
    <div className="mascot-pet">
      {greetingOpen && (
        <div className="mascot-greeting" role="status">
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
        className={`mascot-launcher ${greetingOpen ? 'greeting-open' : ''}`}
        type="button"
        onClick={() => setGreetingOpen((open) => !open)}
        aria-expanded={greetingOpen}
        aria-label={
          greetingOpen
            ? 'Hide mascot greeting'
            : 'Meet Dan’s Android, iOS, and Web mascots'
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
