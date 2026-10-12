
import { useEffect, useRef, useState } from 'react'
import './SnakeGame.css'

const COLS = 20
const ROWS = 15

const INITIAL_SNAKE = [
  { x: 5, y: 7 },
  { x: 4, y: 7 },
  { x: 3, y: 7 },
]

const INITIAL_DIRECTION = { x: 1, y: 0 }

function randomFood(snake) {
  const empty = []

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (!snake.some((part) => part.x === x && part.y === y)) {
        empty.push({ x, y })
      }
    }
  }

  return empty[Math.floor(Math.random() * empty.length)] ?? { x: 0, y: 0 }
}

function SnakeGame() {
  const [expanded, setExpanded] = useState(false)
  const [snake, setSnake] = useState(INITIAL_SNAKE)
  const [food, setFood] = useState(() => randomFood(INITIAL_SNAKE))
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(() => {
    try {
      return Number(localStorage.getItem('snake-best')) || 0
    } catch {
      return 0
    }
  })
  const [status, setStatus] = useState('ready')

  const direction = useRef(INITIAL_DIRECTION)
  const queuedDirection = useRef(INITIAL_DIRECTION)

  function changeDirection(next) {
    const current = queuedDirection.current

    if (next.x === -current.x && next.y === -current.y) return

    queuedDirection.current = next
  }

  function startGame() {
    direction.current = INITIAL_DIRECTION
    queuedDirection.current = INITIAL_DIRECTION
    setSnake(INITIAL_SNAKE)
    setFood(randomFood(INITIAL_SNAKE))
    setScore(0)
    setStatus('playing')
  }

  useEffect(() => {
    if (!expanded || status !== 'playing') return

    const handleKey = (event) => {
      const key = event.key.toLowerCase()
      const directions = {
        arrowup: { x: 0, y: -1 },
        w: { x: 0, y: -1 },
        arrowdown: { x: 0, y: 1 },
        s: { x: 0, y: 1 },
        arrowleft: { x: -1, y: 0 },
        a: { x: -1, y: 0 },
        arrowright: { x: 1, y: 0 },
        d: { x: 1, y: 0 },
      }

      if (directions[key]) {
        event.preventDefault()
        changeDirection(directions[key])
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [expanded, status])

  useEffect(() => {
    if (!expanded || status !== 'playing') return

    const timer = window.setInterval(() => {
      const nextDirection = queuedDirection.current
      direction.current = nextDirection

      setSnake((current) => {
        const head = {
          x: current[0].x + nextDirection.x,
          y: current[0].y + nextDirection.y,
        }

        const ate = head.x === food.x && head.y === food.y
        const body = ate ? current : current.slice(0, -1)

        const crashed =
          head.x < 0 ||
          head.x >= COLS ||
          head.y < 0 ||
          head.y >= ROWS ||
          body.some((part) => part.x === head.x && part.y === head.y)

        if (crashed) {
          setStatus('over')
          return current
        }

        const nextSnake = [head, ...current]
        if (!ate) nextSnake.pop()

        if (ate) {
          setScore((previous) => {
            const updated = previous + 10
            setBest((record) => {
              const nextBest = Math.max(record, updated)
              try {
                localStorage.setItem('snake-best', String(nextBest))
              } catch {
                // Local storage may be unavailable.
              }
              return nextBest
            })
            return updated
          })
          setFood(randomFood(nextSnake))
        }

        return nextSnake
      })
    }, 130)

    return () => window.clearInterval(timer)
  }, [expanded, status, food])

  return (
    <section className="snake-mini-section" id="snake-game">
      <button
        className="snake-teaser"
        type="button"
        aria-expanded={expanded}
        aria-controls="snake-arcade-panel"
        onClick={() => setExpanded((value) => !value)}
      >
        <span className="snake-teaser-icon" aria-hidden="true">🐍</span>

        <span className="snake-teaser-copy">
          <span className="snake-teaser-eyebrow">A LITTLE EXTRA</span>
          <strong>Need a break?</strong>
          <span>There's a tiny game hiding here.</span>
        </span>

        <span className="snake-teaser-action">
          {expanded ? 'Close game ↑' : 'Play a round ↗'}
        </span>
      </button>

      {expanded && (
        <div className="snake-arcade" id="snake-arcade-panel">
          <div className="snake-arcade-header">
            <span> SNAKE ARCADE / 001</span>
            <span>SCORE <strong>{score}</strong> · BEST <strong>{best}</strong></span>
          </div>

          <div className="snake-board">
            {Array.from({ length: COLS * ROWS }, (_, index) => {
              const x = index % COLS
              const y = Math.floor(index / COLS)
              const partIndex = snake.findIndex(
                (part) => part.x === x && part.y === y,
              )
              const isFood = food.x === x && food.y === y

              return (
                <div
                  key={index}
                  className={[
                    'snake-cell',
                    partIndex === 0 ? 'snake-head' : '',
                    partIndex > 0 ? 'snake-body' : '',
                    isFood ? 'snake-food' : '',
                  ].filter(Boolean).join(' ')}
                />
              )
            })}

            {status !== 'playing' && (
              <div className="snake-overlay">
                <strong>
                  {status === 'over' ? 'GAME OVER' : 'READY PLAYER ONE'}
                </strong>
                <p>
                  {status === 'over'
                    ? `You scored ${score} points. Try again!`
                    : 'Collect food. Avoid the walls and yourself.'}
                </p>
                <button
                  className="button button-primary"
                  type="button"
                  onClick={startGame}
                >
                  {status === 'over' ? 'Play again ↗' : 'Start game ↗'}
                </button>
              </div>
            )}
          </div>

          <div className="snake-controls">
            <span>ARROW KEYS / WASD</span>
            <span>COLLECT FOOD · DON'T CRASH</span>
          </div>

          <div className="snake-mobile-controls">
            <button type="button" onClick={() => changeDirection({ x: 0, y: -1 })}>↑</button>
            <div>
              <button type="button" onClick={() => changeDirection({ x: -1, y: 0 })}>←</button>
              <button type="button" onClick={() => changeDirection({ x: 0, y: 1 })}>↓</button>
              <button type="button" onClick={() => changeDirection({ x: 1, y: 0 })}>→</button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default SnakeGame
