export interface AutoScrollListRef {
  scrollToTop: () => void
  pause: () => void
  play: () => void
}

export interface AutoScrollListProps<T> {
  data: T[]
  /**
   * AutoPlay
   * @description 是否自动播放
   * @default true
   */
  autoPlay?: boolean
  /**
   * Loop Play
   * @description 是否循环播放
   * @default false
   */
  loop?: boolean
  /**
   * ScrollDelay
   * @description 滚动延迟时间
   * @default 2000
   */
  scrollDelay?: number
  /**
   * ScrollDuration
   * @description 滚动持续时间
   * @default 500
   */
  scrollDuration?: number
  /**
   * ClassName
   * @description 自定义样式
   */
  className?: string
  /**
   * PauseOnHover
   * @description 悬停时暂停播放
   * @default true
   */
  pauseOnHover?: boolean
  /**
   * OnReachBottom
   * @description 滚动到底部时的回调
   */
  onReachBottom?: () => void
  /**
   * RowItem
   * @description 自定义行渲染函数
   */
  rowItem: (item: T, index: number) => React.ReactNode
}
