import { forwardRef, useEffect, useRef, useCallback, useImperativeHandle, useState } from 'react'
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
    // 定时器引用
    const timeoutRef = useRef<NodeJS.Timeout>()
    // 是否正在播放
    const isPlayingRef = useRef(autoPlay)
    // 最后一个 item 的 ref
    const lastItemRef = useRef<HTMLDivElement>(null)
    // 最后一个 item 是否可见
    const isLastItemVisibleRef = useRef(false)
    // Intersection Observer 引用
    const observerRef = useRef<IntersectionObserver | null>(null)
    // CSS 动画状态
    const [scrollTop, setScrollTop] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)

    // 判断是否溢出
    const isOverflow = useCallback(() => {
      if (!scrollContainerRef.current) return false
      const containerHeight = scrollContainerRef.current.offsetHeight
      const scrollHeight = scrollContainerRef.current.scrollHeight
      return scrollHeight > containerHeight
    }, [])

    // 滚动到指定位置（使用 CSS 动画）
    const smoothScrollTo = useCallback(
      (targetScrollTop: number) => {
        if (!scrollContainerRef.current) return

        setIsAnimating(true)
        setScrollTop(targetScrollTop)

        // 动画完成后的回调
        const handleAnimationEnd = () => {
          setIsAnimating(false)
          // 滚动完成后继续下一个
          if (isPlayingRef.current) {
            timeoutRef.current = setTimeout(() => {
              scrollToNext()
            }, scrollDelay)
          }
        }

        // 使用 setTimeout 模拟动画完成
        setTimeout(handleAnimationEnd, scrollDuration)
      },
      [scrollDelay, scrollDuration]
    )

    // 滚动到下一行
    const scrollToNext = useCallback(() => {
      if (!scrollContainerRef.current || isAnimating || data.length === 0) {
        return
      }

      const nextIndex = currentIndexRef.current + 1

      if (isLastItemVisibleRef.current) {
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
    }, [data.length, isAnimating, loop])

    // 滚动到顶部
    const scrollToTop = useCallback(() => {
      if (!scrollContainerRef.current || !isOverflow()) return
      clearAutoScroll()
      currentIndexRef.current = 0
      smoothScrollTo(0)
    }, [])

    // 暂停播放
    const pause = useCallback(() => {
      isPlayingRef.current = false
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
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
      if (isPlayingRef.current && !isAnimating && isOverflow()) {
        timeoutRef.current = setTimeout(() => {
          scrollToNext()
        }, scrollDelay)
      }
    }, [scrollDelay, isAnimating])

    const clearAutoScroll = useCallback(() => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
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
      if (autoPlay && isOverflow()) {
        startAutoScroll()
      }
      return () => {
        clearAutoScroll()
      }
    }, [autoPlay])

    // 监听窗口大小变化
    useWindowResize(
      500,
      () => {
        pause()
      },
      () => {
        currentIndexRef.current = 0
        smoothScrollTo(0)
        setTimeout(() => {
          play()
        }, scrollDelay)
      }
    )

    // 监听数据变化
    useEffect(() => {
      setScrollTop(0)
      currentIndexRef.current = 0
      setIsAnimating(false)
    }, [data])

    useEffect(() => {
      if (!lastItemRef.current || !scrollContainerRef.current) return

      observerRef.current = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              onReachBottom?.()
              isLastItemVisibleRef.current = true
            } else {
              isLastItemVisibleRef.current = false
            }
          })
        },
        {
          threshold: 1,
        }
      )

      observerRef.current.observe(lastItemRef.current)

      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect()
        }
      }
    }, [onReachBottom, data.length])

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
            transform: `translateY(-${scrollTop}px)`,
            transition: isAnimating ? `transform ${scrollDuration}ms ease-in-out` : 'none',
          }}
        >
          {data.map((item, index) => (
            <div key={index} ref={el => (itemsRef.current[index] = el)}>
              {rowItem(item, index)}
            </div>
          ))}
          <div style={{ visibility: 'hidden' }} ref={lastItemRef} />
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
