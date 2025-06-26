# @zhou96/countdown-worker

一个基于 Web Worker 的高性能倒计时库，支持暂停、恢复、重启等功能。<br>
A high-performance countdown library based on Web Worker, supporting pause, resume, restart and other features.

## 🚀 特性 Features

- ✅ **高性能** - 基于 Web Worker，不阻塞主线程 / Based on Web Worker, non-blocking main thread
- ✅ **状态管理** - 完整的状态管理系统 / Complete state management system
- ✅ **灵活控制** - 支持暂停、恢复、重启 / Support pause, resume, restart
- ✅ **类型安全** - 完整的 TypeScript 支持 / Full TypeScript support
- ✅ **资源管理** - 自动资源清理 / Automatic resource cleanup
- ✅ **高精度** - 毫秒级精度控制 / Millisecond precision control
- ✅ **事件丰富** - 丰富的回调事件 / Rich callback events

---

## 📦 安装 Installation

## 📦 安装 Installation

```bash
npm install @zhou96/countdown-worker
# or
yarn add @zhou96/countdown-worker
# or
pnpm add @zhou96/countdown-worker
```

---

## 🔧 中文文档 Chinese Documentation

### 🎯 快速开始 Quick Start

```javascript
import { CountdownWorker } from '@zhou96/countdown-worker'

const countdown = new CountdownWorker({
  duration: 60000, // 60秒倒计时
  interval: 1000, // 每秒更新一次
  onTick: remainingTime => {
    console.log(`剩余时间: ${Math.ceil(remainingTime / 1000)}秒`)
  },
  onDone: () => {
    console.log('倒计时完成！')
  },
})

countdown.start()
```

### ⚙️ 配置选项 Configuration Options

```typescript
interface CountdownOptions {
  duration: number // 倒计时总时长（毫秒）
  interval?: number // 更新间隔（毫秒），默认 1000
  onTick?: (remainingTime: number) => void // 每次更新回调
  onDone: () => void // 完成回调
  onStarted?: () => void // 开始回调
  onPaused?: (remainingTime: number) => void // 暂停回调
  onResumed?: () => void // 恢复回调
  onStopped?: () => void // 停止回调
}
```

### 📋 API 方法 API Methods

| 方法                 | 参数                   | 返回值   | 描述         |
| -------------------- | ---------------------- | -------- | ------------ |
| `start()`            | -                      | `void`   | 开始倒计时   |
| `pause()`            | -                      | `void`   | 暂停倒计时   |
| `resume()`           | -                      | `void`   | 恢复倒计时   |
| `stop()`             | -                      | `void`   | 停止倒计时   |
| `restart()`          | `newDuration?: number` | `void`   | 重启倒计时   |
| `getRemainingTime()` | -                      | `number` | 获取剩余时间 |
| `getStatus()`        | -                      | `string` | 获取当前状态 |
| `destroy()`          | -                      | `void`   | 销毁倒计时器 |

#### 🎮 方法详解

**`start()`**
开始倒计时。如果已在运行或暂停状态，会输出警告并忽略操作。

**`pause()`**
暂停倒计时，保持当前剩余时间。只有在运行状态下才能暂停。

**`resume()`**
从暂停点恢复倒计时。只有在暂停状态下才能恢复。

**`stop()`**
停止倒计时并重置到初始状态。

**`restart(newDuration?: number)`**
重新开始倒计时。可选择传入新的时长（毫秒）。

**`getRemainingTime(): number`**
获取当前剩余时间（毫秒）。

**`getStatus(): 'idle' | 'running' | 'paused' | 'stopped' | 'destroyed'`**
获取当前倒计时状态。

**`destroy()`**
销毁倒计时器，释放所有资源。销毁后实例不可再用。

### 💡 完整示例 Complete Example

```javascript
import { CountdownWorker } from '@zhou96/countdown-worker'

const countdown = new CountdownWorker({
  duration: 30000, // 30秒倒计时
  interval: 1000, // 每秒更新

  onStarted: () => {
    console.log('倒计时开始')
    document.getElementById('status').textContent = '运行中'
  },

  onTick: remainingTime => {
    const seconds = Math.ceil(remainingTime / 1000)
    document.getElementById('timer').textContent = `${seconds}秒`
  },

  onPaused: remainingTime => {
    console.log(`倒计时暂停，剩余 ${remainingTime}ms`)
    document.getElementById('status').textContent = '已暂停'
  },

  onResumed: () => {
    console.log('倒计时恢复')
    document.getElementById('status').textContent = '运行中'
  },

  onStopped: () => {
    console.log('倒计时停止')
    document.getElementById('status').textContent = '已停止'
  },

  onDone: () => {
    console.log('倒计时完成！')
    document.getElementById('status').textContent = '完成'
    // 自动清理资源
    countdown.destroy()
  },
})

// 控制按钮
document.getElementById('start').onclick = () => countdown.start()
document.getElementById('pause').onclick = () => countdown.pause()
document.getElementById('resume').onclick = () => countdown.resume()
document.getElementById('stop').onclick = () => countdown.stop()
document.getElementById('restart').onclick = () => countdown.restart(60000) // 重启为60秒
```

### 💎 最佳实践 Best Practices

> **💡 提示**
>
> 1. **及时销毁**: 当不再需要倒计时器时，调用 `destroy()` 方法释放资源
> 2. **状态检查**: 在调用方法前可以通过 `getStatus()` 检查当前状态
> 3. **错误处理**: 监听控制台警告信息，避免在错误状态下调用方法
> 4. **内存管理**: 在单页应用中，页面卸载时确保销毁所有倒计时实例

---

## 🌍 English Documentation

### Installation

```bash
npm install @zhou96/countdown-worker
```

### 🎯 Quick Start

```javascript
import { CountdownWorker } from '@zhou96/countdown-worker'

const countdown = new CountdownWorker({
  duration: 60000, // 60 seconds countdown
  interval: 1000, // Update every second
  onTick: remainingTime => {
    console.log(`Remaining: ${Math.ceil(remainingTime / 1000)} seconds`)
  },
  onDone: () => {
    console.log('Countdown finished!')
  },
})

countdown.start()
```

### ⚙️ Configuration Options

```typescript
interface CountdownOptions {
  duration: number // Total countdown duration (milliseconds)
  interval?: number // Update interval (milliseconds), default 1000
  onTick?: (remainingTime: number) => void // Tick callback
  onDone: () => void // Done callback
  onStarted?: () => void // Started callback
  onPaused?: (remainingTime: number) => void // Paused callback
  onResumed?: () => void // Resumed callback
  onStopped?: () => void // Stopped callback
}
```

### 📋 API Methods

| Method               | Parameters             | Return   | Description        |
| -------------------- | ---------------------- | -------- | ------------------ |
| `start()`            | -                      | `void`   | Start countdown    |
| `pause()`            | -                      | `void`   | Pause countdown    |
| `resume()`           | -                      | `void`   | Resume countdown   |
| `stop()`             | -                      | `void`   | Stop countdown     |
| `restart()`          | `newDuration?: number` | `void`   | Restart countdown  |
| `getRemainingTime()` | -                      | `number` | Get remaining time |
| `getStatus()`        | -                      | `string` | Get current status |
| `destroy()`          | -                      | `void`   | Destroy countdown  |

#### 🎮 Method Details

**`start()`**
Start the countdown. If already running or paused, a warning will be logged and the operation will be ignored.

**`pause()`**
Pause the countdown while maintaining the current remaining time. Can only pause when running.

**`resume()`**
Resume the countdown from the paused point. Can only resume when paused.

**`stop()`**
Stop the countdown and reset to initial state.

**`restart(newDuration?: number)`**
Restart the countdown. Optionally pass a new duration (milliseconds).

**`getRemainingTime(): number`**
Get the current remaining time (milliseconds).

**`getStatus(): 'idle' | 'running' | 'paused' | 'stopped' | 'destroyed'`**
Get the current countdown status.

**`destroy()`**
Destroy the countdown timer and release all resources. The instance cannot be used after destruction.

### 💡 Complete Example

```javascript
import { CountdownWorker } from '@zhou96/countdown-worker'

const countdown = new CountdownWorker({
  duration: 30000, // 30 seconds countdown
  interval: 1000, // Update every second

  onStarted: () => {
    console.log('Countdown started')
    document.getElementById('status').textContent = 'Running'
  },

  onTick: remainingTime => {
    const seconds = Math.ceil(remainingTime / 1000)
    document.getElementById('timer').textContent = `${seconds}s`
  },

  onPaused: remainingTime => {
    console.log(`Countdown paused, ${remainingTime}ms remaining`)
    document.getElementById('status').textContent = 'Paused'
  },

  onResumed: () => {
    console.log('Countdown resumed')
    document.getElementById('status').textContent = 'Running'
  },

  onStopped: () => {
    console.log('Countdown stopped')
    document.getElementById('status').textContent = 'Stopped'
  },

  onDone: () => {
    console.log('Countdown finished!')
    document.getElementById('status').textContent = 'Finished'
    // Auto cleanup
    countdown.destroy()
  },
})

// Control buttons
document.getElementById('start').onclick = () => countdown.start()
document.getElementById('pause').onclick = () => countdown.pause()
document.getElementById('resume').onclick = () => countdown.resume()
document.getElementById('stop').onclick = () => countdown.stop()
document.getElementById('restart').onclick = () => countdown.restart(60000) // Restart with 60s
```

### 💎 Best Practices

> **💡 Tips**
>
> 1. **Timely Destruction**: Call `destroy()` method to release resources when countdown is no longer needed
> 2. **Status Checking**: Check current status with `getStatus()` before calling methods
> 3. **Error Handling**: Monitor console warnings to avoid calling methods in wrong states
> 4. **Memory Management**: Ensure all countdown instances are destroyed when pages are unloaded in SPAs

---

## 📖 更多示例 More Examples

### React 组件示例 React Component Example

```tsx
import React, { useState, useEffect } from 'react'
import { CountdownWorker } from '@zhou96/countdown-worker'

const CountdownComponent: React.FC = () => {
  const [countdown, setCountdown] = useState<CountdownWorker | null>(null)
  const [remainingTime, setRemainingTime] = useState(0)
  const [status, setStatus] = useState<string>('idle')

  useEffect(() => {
    const worker = new CountdownWorker({
      duration: 60000, // 60 seconds
      interval: 1000,
      onTick: time => setRemainingTime(time),
      onDone: () => setStatus('completed'),
      onStarted: () => setStatus('running'),
      onPaused: time => setStatus('paused'),
      onResumed: () => setStatus('running'),
      onStopped: () => setStatus('stopped'),
    })

    setCountdown(worker)

    return () => {
      worker.destroy()
    }
  }, [])

  const formatTime = (time: number) => {
    const seconds = Math.ceil(time / 1000)
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`
  }

  return (
    <div className="countdown-container">
      <h2>倒计时器 Countdown Timer</h2>
      <div className="timer-display">
        <span className="time">{formatTime(remainingTime)}</span>
        <span className="status">状态 Status: {status}</span>
      </div>
      <div className="controls">
        <button onClick={() => countdown?.start()}>开始 Start</button>
        <button onClick={() => countdown?.pause()}>暂停 Pause</button>
        <button onClick={() => countdown?.resume()}>恢复 Resume</button>
        <button onClick={() => countdown?.stop()}>停止 Stop</button>
        <button onClick={() => countdown?.restart(30000)}>重启30秒 Restart 30s</button>
      </div>
    </div>
  )
}
```

### Vue 组件示例 Vue Component Example

```vue
<template>
  <div class="countdown-container">
    <h2>倒计时器 Countdown Timer</h2>
    <div class="timer-display">
      <span class="time">{{ formatTime(remainingTime) }}</span>
      <span class="status">状态 Status: {{ status }}</span>
    </div>
    <div class="controls">
      <button @click="start">开始 Start</button>
      <button @click="pause">暂停 Pause</button>
      <button @click="resume">恢复 Resume</button>
      <button @click="stop">停止 Stop</button>
      <button @click="restart">重启30秒 Restart 30s</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { CountdownWorker } from '@zhou96/countdown-worker'

const countdown = ref<CountdownWorker | null>(null)
const remainingTime = ref(0)
const status = ref('idle')

const formatTime = (time: number) => {
  const seconds = Math.ceil(time / 1000)
  return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`
}

const start = () => countdown.value?.start()
const pause = () => countdown.value?.pause()
const resume = () => countdown.value?.resume()
const stop = () => countdown.value?.stop()
const restart = () => countdown.value?.restart(30000)

onMounted(() => {
  countdown.value = new CountdownWorker({
    duration: 60000,
    interval: 1000,
    onTick: time => (remainingTime.value = time),
    onDone: () => (status.value = 'completed'),
    onStarted: () => (status.value = 'running'),
    onPaused: time => (status.value = 'paused'),
    onResumed: () => (status.value = 'running'),
    onStopped: () => (status.value = 'stopped'),
  })
})

onUnmounted(() => {
  countdown.value?.destroy()
})
</script>
```

---

MIT
