import { CountdownOptions } from './types'
// @ts-ignore
import workerCode from './worker.js?raw'

/**
 * CountdownWorker
 * 倒计时工作线程
 * 使用 Worker 线程进行倒计时
 * @param {CountdownOptions} options - 倒计时选项
 * @returns {CountdownWorker}
 * @example
 * const worker = new CountdownWorker({
 *   duration: 3000, // 倒计时时长为 3 秒
 *   onDone: () => {
 *     console.log('倒计时完成')
 *     worker.stop() // 倒计时完成后停止
 *     worker.destroy() // 倒计时完成后销毁
 *   },
 *   onTick: (remainingTime) => {
 *     console.log('倒计时剩余时间:', remainingTime)
 *   },
 *   onStarted: () => {
 *     console.log('倒计时开始')
 *   },
 *   onPaused: (remainingTime) => {
 *     console.log('倒计时暂停，剩余时间:', remainingTime)
 *   },
 *   onResumed: () => {
 *     console.log('倒计时恢复')
 *   },
 *   onStopped: () => {
 *     console.log('倒计时停止')
 *   },
 *   interval: 1000 // 每秒更新一次
 * });
 * worker.start() // 开始倒计时
 */
export class CountdownWorker {
  private worker: Worker | null = null
  private options: CountdownOptions
  private currentRemainingTime: number = 0
  private status: 'idle' | 'running' | 'paused' | 'stopped' | 'destroyed' = 'idle'

  constructor(options: CountdownOptions) {
    this.options = { ...options } // 复制一份 options，避免外部修改
    this.initWorker()
  }

  private initWorker(): void {
    if (this.worker) {
      this.worker.terminate() // 确保旧的 worker 被销毁
    }
    const blob = new Blob([workerCode], { type: 'text/javascript' })
    this.worker = new Worker(URL.createObjectURL(blob))

    this.worker.onmessage = (e: MessageEvent) => {
      const { type, payload } = e.data
      switch (type) {
        case 'started':
          this.status = 'running'
          this.options.onStarted?.()
          break
        case 'done':
          this.status = 'stopped' // 倒计时完成后状态变为 stopped
          this.currentRemainingTime = 0
          this.options.onDone()
          break
        case 'tick':
          this.currentRemainingTime = payload
          this.options.onTick?.(payload)
          break
        case 'paused':
          this.status = 'paused'
          this.currentRemainingTime = payload
          this.options.onPaused?.(payload)
          break
        case 'resumed':
          this.status = 'running'
          this.options.onResumed?.()
          break
        case 'stopped':
          this.status = 'stopped'
          this.currentRemainingTime = 0 // 停止时重置剩余时间
          this.options.onStopped?.()
          break
        case 'remainingTime':
          this.currentRemainingTime = payload
          // 这里可以触发一个回调或者通过 Promise 返回，取决于你的需求
          // 为了简化，这里只是更新了内部状态
          break
      }
    }

    this.worker.onerror = error => {
      console.error('Web Worker error:', error)
      // 可以向上层抛出错误，或者进行重试等操作
    }
  }

  /**
   * 开始倒计时
   * 如果已在运行或暂停，则不执行
   */
  public start(): void {
    if (this.status === 'running' || this.status === 'paused') {
      console.warn('倒计时正在进行或已暂停，请勿重复开始。')
      return
    }
    this.status = 'running' // 临时设置为 running，等待 worker 确认
    this.worker?.postMessage({
      type: 'start',
      payload: { duration: this.options.duration, interval: this.options.interval },
    })
  }

  /**
   * 暂停倒计时
   * 倒计时会保持当前的剩余时间
   */
  public pause(): void {
    if (this.status !== 'running') {
      console.warn('倒计时未在运行，无法暂停。')
      return
    }
    this.worker?.postMessage({ type: 'pause' })
  }

  /**
   * 从暂停点恢复倒计时
   */
  public resume(): void {
    if (this.status !== 'paused') {
      console.warn('倒计时未暂停，无法恢复。')
      return
    }
    this.status = 'running' // 临时设置为 running，等待 worker 确认
    this.worker?.postMessage({
      type: 'resume',
      payload: { interval: this.options.interval },
    })
  }

  /**
   * 停止倒计时并重置
   * 倒计时将回到初始状态
   */
  public stop(): void {
    if (this.status === 'idle' || this.status === 'stopped' || this.status === 'destroyed') {
      console.warn('倒计时未在运行或已停止/销毁，无需停止。')
      return
    }
    this.worker?.postMessage({ type: 'stop' })
  }

  /**
   * 重新开始倒计时
   * 会先停止当前倒计时，然后以新的或相同的时长重新开始
   * @param newDuration 可选，新的倒计时时长 (毫秒)
   */
  public restart(newDuration?: number): void {
    this.stop() // 先停止当前的倒计时
    if (newDuration !== undefined && newDuration >= 0) {
      this.options.duration = newDuration // 更新时长
    }
    // 等待 Worker 确认停止后，再重新开始。或者直接开始，让 Worker 处理竞态条件
    // 为了简化，这里直接开始，Worker 会清除旧的计时器
    this.start()
  }

  /**
   * 获取当前倒计时的剩余时间 (毫秒)
   * 注意：这个值是主线程中保存的最新值，可能与 Worker 中的实际值略有延迟
   */
  public getRemainingTime(): number {
    // 如果需要实时的精确值，可以向 Worker 发送查询消息并等待其回复
    // 但通常情况下，onTick 提供的值已经足够
    return this.currentRemainingTime
  }

  /**
   * 获取倒计时器的当前状态
   */
  public getStatus(): 'idle' | 'running' | 'paused' | 'stopped' | 'destroyed' {
    return this.status
  }

  /**
   * 销毁倒计时 Worker
   * 释放资源，停止所有倒计时活动。销毁后此实例不可再用。
   */
  public destroy(): void {
    if (this.status === 'destroyed') {
      console.warn('倒计时已销毁，请勿重复销毁。')
      return
    }
    this.worker?.postMessage({ type: 'destroy' })
    this.worker?.terminate() // 彻底终止 Worker 线程
    this.worker = null
    this.status = 'destroyed'
    this.currentRemainingTime = 0
  }
}
