import { forwardRef, useEffect, useRef, useCallback, useImperativeHandle } from 'react'
import { useWindowResize } from './hooks/use-window-resize'
import type { AutoScrollListProps, AutoScrollListRef } from './types'

const AutoScrollList = forwardRef(
  <T,>(
    {
      data,
      rowItem,
      autoPlay = false,
      loop = false,
      scrollDelay = 2000,
      scrollDuration = 500,
      onReachBottom,
      className = '',
      pauseOnHover = true,
    }: AutoScrollListProps<T>,
    ref: React.ForwardedRef<AutoScrollListRef>
  ) => {
    // 滚动容器
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    // 每个 item 的 ref
    const itemsRef = useRef<(HTMLDivElement | null)[]>([])
    // 当前显示的 item 索引
    const currentIndexRef = useRef(0)
    // 动画帧引用
    const animationFrameRef = useRef<number>()
    // 定时器引用
    const timeoutRef = useRef<NodeJS.Timeout>()
    // 是否正在滚动
    const isScrollingRef = useRef(false)
    // 是否正在播放
    const isPlayingRef = useRef(autoPlay)

    // 平滑滚动到指定位置
    const smoothScrollTo = useCallback(
      (targetScrollTop: number) => {
        if (!scrollContainerRef.current) return

        const container = scrollContainerRef.current
        const startScrollTop = container.scrollTop
        const distance = targetScrollTop - startScrollTop
        const duration = scrollDuration // 动画持续时间
        let startTime: number

        const animateScroll = (currentTime: number) => {
          if (!startTime) startTime = currentTime
          const elapsed = currentTime - startTime
          const progress = Math.min(elapsed / duration, 1)

          // 使用缓动函数实现平滑效果
          const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1)

          const easedProgress = easeInOutCubic(progress)
          container.scrollTop = startScrollTop + distance * easedProgress

          if (progress < 1) {
            animationFrameRef.current = requestAnimationFrame(animateScroll)
          } else {
            isScrollingRef.current = false
            // 滚动完成后继续下一个
            if (isPlayingRef.current) {
              timeoutRef.current = setTimeout(() => {
                scrollToNext()
              }, scrollDelay)
            }
          }
        }

        isScrollingRef.current = true
        animationFrameRef.current = requestAnimationFrame(animateScroll)
      },
      [scrollDelay, scrollDuration]
    )

    // 滚动到下一行
    const scrollToNext = useCallback(() => {
      if (!scrollContainerRef.current || isScrollingRef.current || data.length === 0) {
        return
      }

      const nextIndex = currentIndexRef.current + 1

      if (nextIndex >= data.length) {
        onReachBottom?.()
        if (loop) {
          currentIndexRef.current = 0
          smoothScrollTo(itemsRef.current[0]?.offsetTop || 0)
        } else {
          isPlayingRef.current = false
        }
        return
      }

      currentIndexRef.current = nextIndex
      smoothScrollTo(itemsRef.current[nextIndex]?.offsetTop || 0)
    }, [data.length, onReachBottom, smoothScrollTo])

    // 滚动到顶部
    const scrollToTop = useCallback(() => {
      if (!scrollContainerRef.current) return
      clearAutoScroll()
      currentIndexRef.current = 0
      smoothScrollTo(itemsRef.current[0]?.offsetTop || 0)
    }, [])

    // 暂停播放
    const pause = useCallback(() => {
      isPlayingRef.current = false
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }, [])

    // 开始播放
    const play = useCallback(() => {
      isPlayingRef.current = true
      startAutoScroll()
    }, [])

    // 开始自动滚动
    const startAutoScroll = useCallback(() => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      if (isPlayingRef.current) {
        timeoutRef.current = setTimeout(() => {
          scrollToNext()
        }, scrollDelay)
      }
    }, [scrollDelay, scrollToNext])

    const clearAutoScroll = useCallback(() => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }, [])

    const handleMouseEnter = useCallback(() => {
      if (pauseOnHover) {
        pause()
      }
    }, [pauseOnHover])

    const handleMouseLeave = useCallback(() => {
      if (pauseOnHover) {
        play()
      }
    }, [pauseOnHover])

    // 监听 autoPlay 属性变化
    useEffect(() => {
      isPlayingRef.current = autoPlay
      if (autoPlay) {
        startAutoScroll()
      }
      return () => {
        clearAutoScroll()
      }
    }, [autoPlay, startAutoScroll])

    // 监听窗口大小变化
    useWindowResize(
      300,
      () => {
        pause()
      },
      () => {
        currentIndexRef.current = 0
        smoothScrollTo(itemsRef.current[0]?.offsetTop || 0)
        setTimeout(() => {
          play()
        }, scrollDelay)
      }
    )

    // 监听数据变化
    useEffect(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0
        currentIndexRef.current = 0
      }
    }, [data])

    useImperativeHandle(ref, () => ({
      scrollToTop,
      pause,
      play,
    }))

    return (
      <div
        className={className}
        style={{
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          height: '100%',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={scrollContainerRef}
          style={{
            width: '100%',
            height: '100%',
            overflow: 'hidden',
          }}
        >
          {data.map((item, index) => (
            <div key={index} ref={el => (itemsRef.current[index] = el)}>
              {rowItem(item, index)}
            </div>
          ))}
        </div>
      </div>
    )
  }
) as <T>(
  props: AutoScrollListProps<T> & {
    ref?: React.ForwardedRef<AutoScrollListRef>
  }
) => JSX.Element

export default AutoScrollList
