export interface CountdownOptions {
  duration: number // 倒计时总时长 (毫秒)
  onDone: () => void // 倒计时完成回调
  onTick?: (remainingTime: number) => void // 每秒更新回调 (可选)
  onStarted?: () => void // 倒计时开始回调
  onPaused?: (remainingTime: number) => void // 倒计时暂停回调
  onResumed?: () => void // 倒计时恢复回调
  onStopped?: () => void // 倒计时停止回调
  interval?: number // 计时器更新频率 (毫秒，默认为 1000)
}
