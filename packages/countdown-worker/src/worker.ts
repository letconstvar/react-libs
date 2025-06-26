// worker.ts
let timer: number | undefined
let duration: number = 0 // 倒计时总时长 (毫秒)
let remainingTime: number = 0 // 剩余时间 (毫秒)
let startTime: number = 0 // 倒计时开始的时间戳

self.onmessage = (e: MessageEvent) => {
  const { type, payload } = e.data

  switch (type) {
    case 'start':
      duration = payload.duration
      remainingTime = duration
      startTime = Date.now()
      if (timer) {
        clearInterval(timer)
      }
      timer = self.setInterval(() => {
        const elapsedTime = Date.now() - startTime
        remainingTime = duration - elapsedTime

        if (remainingTime <= 0) {
          self.postMessage({ type: 'done' })
          clearInterval(timer)
          timer = undefined
        } else {
          // 只在剩余时间发生变化时才发送，减少不必要的通信
          self.postMessage({ type: 'tick', payload: remainingTime })
        }
      }, payload.interval || 1000) // 允许自定义更新频率
      self.postMessage({ type: 'started' }) // 通知主线程已开始
      break

    case 'pause':
      if (timer) {
        clearInterval(timer)
        timer = undefined
        self.postMessage({ type: 'paused', payload: remainingTime })
      }
      break

    case 'resume':
      if (remainingTime > 0 && !timer) {
        // 只有在有剩余时间且未计时时才恢复
        duration = remainingTime // 将剩余时间作为新的总时长
        startTime = Date.now()
        timer = self.setInterval(() => {
          const elapsedTime = Date.now() - startTime
          remainingTime = duration - elapsedTime

          if (remainingTime <= 0) {
            self.postMessage({ type: 'done' })
            clearInterval(timer)
            timer = undefined
          } else {
            self.postMessage({ type: 'tick', payload: remainingTime })
          }
        }, payload.interval || 1000)
        self.postMessage({ type: 'resumed' })
      }
      break

    case 'stop':
      if (timer) {
        clearInterval(timer)
        timer = undefined
      }
      remainingTime = 0 // 停止时重置剩余时间
      self.postMessage({ type: 'stopped' })
      break

    case 'queryRemainingTime':
      self.postMessage({ type: 'remainingTime', payload: remainingTime })
      break

    case 'destroy':
      if (timer) {
        clearInterval(timer)
        timer = undefined
      }
      remainingTime = 0
      self.close() // 销毁 Worker
      break
  }
}
