import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './MarqueeText.module.css'
import type { MarqueeTextProps } from './types'

export const MarqueeText: React.FC<MarqueeTextProps> = ({
  text,
  className = '',
  style = {},
  speed = 20,
  pauseOnHover = true,
  direction = 'left',
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const [animationDuration, setAnimationDuration] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const isPaused = useMemo(() => {
    return isHovered && pauseOnHover
  }, [isHovered, pauseOnHover])

  useEffect(() => {
    const updateAnimation = () => {
      if (containerRef.current && textRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        const textWidth = textRef.current.offsetWidth

        if (textWidth > containerWidth) {
          const totalDistance = containerWidth + textWidth
          const duration = totalDistance / speed

          setContainerWidth(containerWidth)
          setAnimationDuration(duration)
          setShouldAnimate(true)
        } else {
          setShouldAnimate(false)
        }
      }
    }

    updateAnimation()

    window.addEventListener('resize', updateAnimation)
    return () => window.removeEventListener('resize', updateAnimation)
  }, [text, speed])

  const animationClass = useMemo(() => {
    if (!shouldAnimate) return ''
    return direction === 'right' ? styles.animateRight : styles.animate
  }, [shouldAnimate, direction])

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${className}`}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={textRef}
        className={`${styles.textContent} ${animationClass}`}
        style={{
          ...(shouldAnimate &&
            ({
              '--animation-duration': `${animationDuration}s`,
              '--container-width': containerWidth + 'px',
              animationPlayState: isPaused ? 'paused' : 'running',
            } as React.CSSProperties)),
        }}
      >
        {text}
      </div>
    </div>
  )
}

export default MarqueeText
