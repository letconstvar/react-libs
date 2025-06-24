# AutoScrollList 组件文档

## Demo

https://codesandbox.io/p/sandbox/9mj97g

## 中文文档

### 概述

AutoScrollList 是一个功能强大的 React 组件，用于创建自动滚动的列表。它支持自动播放、循环滚动、鼠标悬停暂停等功能，适用于新闻滚动、公告展示等场景。

### 特性

- 🎯 **自动滚动**：支持自定义滚动间隔和动画时长
- 🔄 **循环播放**：可选择是否循环滚动到列表开头
- ⏸️ **悬停暂停**：鼠标悬停时自动暂停滚动
- 📱 **自适应**：响应窗口大小变化
- 🎮 **可控制**：提供播放、暂停、回到顶部等方法
- 👁️ **可见性检测**：检测最后一项是否可见，支持到达底部回调

### 安装

确保您的项目中已安装 React 和相关依赖：

```bash
npm install react
```

### 类型定义

```typescript
interface AutoScrollListProps<T> {
  data: T[] // 数据数组
  rowItem: (item: T, index: number) => JSX.Element // 渲染每一行的函数
  autoPlay?: boolean // 是否自动播放，默认 false
  loop?: boolean // 是否循环播放，默认 false
  scrollDelay?: number // 滚动间隔时间（毫秒），默认 2000
  scrollDuration?: number // 滚动动画时长（毫秒），默认 500
  onReachBottom?: () => void // 滚动到底部时的回调
  className?: string // 外层容器的 CSS 类名
  pauseOnHover?: boolean // 鼠标悬停时是否暂停，默认 true
}

interface AutoScrollListRef {
  scrollToTop: () => void // 滚动到顶部
  pause: () => void // 暂停滚动
  play: () => void // 开始滚动
}
```

### 基本用法

```tsx
import { useRef } from 'react'
import { AutoScrollList, type AutoScrollListRef } from '@zhou96/auto-scroll-list'

type SampleData = {
  id: number
  title: string
  description: string
}

const sampleData: SampleData[] = [
  { id: 1, title: '第一行内容', description: '这是第一行的详细描述信息' },
  {
    id: 2,
    title: '第二行内容',
    description: '这是第二行的详细描述信息，内容稍微长一些',
  },
  { id: 3, title: '第三行内容', description: '这是第三行的详细描述' },
  {
    id: 4,
    title: '第四行内容',
    description: '这是第四行的详细描述信息，包含更多的文本内容，用于测试不同高度的行',
  },
  { id: 5, title: '第五行内容', description: '这是第五行' },
  { id: 6, title: '第六行内容', description: '这是第六行的详细描述信息' },
  {
    id: 7,
    title: '第七行内容',
    description: '这是第七行的内容，用于演示滚动效果',
  },
  {
    id: 8,
    title: '第八行内容',
    description: '最后一行内容，滚动到这里会触发回调',
  },
  {
    id: 9,
    title: '第九行内容',
    description: '最后一行内容，滚动到这里会触发回调',
  },
]

const renderRowItem = (item: (typeof sampleData)[0], index: number) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      marginBottom: '8px',
    }}
  >
    <div style={{ fontWeight: 500, color: '#1f2937' }}>{item.title}</div>
    <div style={{ fontSize: '14px', color: '#6b7280' }}>{item.description}</div>
    <div style={{ fontSize: '12px', color: '#9ca3af' }}>行号: {index + 1}</div>
  </div>
)

export default function AutoScrollListExample() {
  const scrollContainerRef = useRef<AutoScrollListRef>(null)

  const handleReachBottom = () => {
    console.log('Reached bottom of the list')
  }

  return (
    <>
      <div style={{ marginBottom: '24px' }}>
        <button onClick={() => scrollContainerRef.current?.play()}>play</button>
        <button onClick={() => scrollContainerRef.current?.pause()}>pause</button>
        <button onClick={() => scrollContainerRef.current?.scrollToTop()}>scrollToTop</button>
      </div>

      <div style={{ width: '200px', height: '200px', background: '#f3f4f6' }}>
        <AutoScrollList<SampleData>
          ref={scrollContainerRef}
          data={sampleData}
          loop={true}
          rowItem={renderRowItem}
          autoPlay={true}
          scrollDelay={2000}
          onReachBottom={handleReachBottom}
        />
      </div>
    </>
  )
}
```

#### 自定义样式

```jsx
<AutoScrollList className="custom-scroll-list" data={data} rowItem={renderItem} autoPlay={true} pauseOnHover={false} />
```

```css
.custom-scroll-list {
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}
```

### API 参考

#### Props

| 属性             | 类型                                      | 默认值  | 说明                           |
| ---------------- | ----------------------------------------- | ------- | ------------------------------ |
| `data`           | `T[]`                                     | -       | 要显示的数据数组（必需）       |
| `rowItem`        | `(item: T, index: number) => JSX.Element` | -       | 渲染每一行的函数（必需）       |
| `autoPlay`       | `boolean`                                 | `false` | 是否自动开始滚动               |
| `loop`           | `boolean`                                 | `false` | 滚动到底部后是否循环到顶部     |
| `scrollDelay`    | `number`                                  | `2000`  | 每次滚动之间的延迟时间（毫秒） |
| `scrollDuration` | `number`                                  | `500`   | 滚动动画的持续时间（毫秒）     |
| `onReachBottom`  | `() => void`                              | -       | 滚动到底部时的回调函数         |
| `className`      | `string`                                  | `''`    | 应用到外层容器的 CSS 类名      |
| `pauseOnHover`   | `boolean`                                 | `true`  | 鼠标悬停时是否暂停滚动         |

#### Ref 方法

| 方法            | 说明           |
| --------------- | -------------- |
| `play()`        | 开始自动滚动   |
| `pause()`       | 暂停自动滚动   |
| `scrollToTop()` | 滚动到列表顶部 |

### 注意事项

1. **容器高度**：组件需要父容器有明确的高度，否则可能无法正确计算是否需要滚动
2. **数据变化**：当 `data` 属性变化时，组件会自动重置到顶部
3. **窗口大小变化**：组件会自动响应窗口大小变化，重新计算滚动状态
4. **性能优化**：组件使用了 `useCallback` 和 `useRef` 来优化性能

### 依赖项

- `useWindowResize` 自定义 Hook（需要单独实现）
- React 16.8+ （需要 Hooks 支持）

---

## English Documentation

### Overview

AutoScrollList is a powerful React component for creating auto-scrolling lists. It supports autoplay, loop scrolling, pause on hover, and other features, making it perfect for news tickers, announcements, and similar use cases.

### Features

- 🎯 **Auto Scrolling**: Customizable scroll intervals and animation duration
- 🔄 **Loop Playback**: Optional loop back to the beginning of the list
- ⏸️ **Pause on Hover**: Automatically pause scrolling when mouse hovers
- 📱 **Responsive**: Responds to window size changes
- 🎮 **Controllable**: Provides play, pause, and scroll to top methods
- 👁️ **Visibility Detection**: Detects when the last item is visible with bottom reach callback

### Installation

Make sure React and related dependencies are installed in your project:

```bash
npm install react
```

### Type Definitions

```typescript
interface AutoScrollListProps<T> {
  data: T[] // Data array
  rowItem: (item: T, index: number) => JSX.Element // Function to render each row
  autoPlay?: boolean // Whether to auto play, default false
  loop?: boolean // Whether to loop, default false
  scrollDelay?: number // Scroll interval in milliseconds, default 2000
  scrollDuration?: number // Scroll animation duration in milliseconds, default 500
  onReachBottom?: () => void // Callback when reaching bottom
  className?: string // CSS class name for outer container
  pauseOnHover?: boolean // Whether to pause on hover, default true
}

interface AutoScrollListRef {
  scrollToTop: () => void // Scroll to top
  pause: () => void // Pause scrolling
  play: () => void // Start scrolling
}
```

### Basic Usage

```tsx
import { useRef } from 'react'
import { AutoScrollList, type AutoScrollListRef } from '@zhou96/auto-scroll-list'

type SampleData = {
  id: number
  title: string
  description: string
}

const sampleData: SampleData[] = [
  { id: 1, title: 'News Title 1', description: 'News Content 1' },
  {
    id: 2,
    title: 'News Title 2',
    description: 'News Content 2',
  },
  { id: 3, title: 'News Title 3', description: 'News Content 3' },
  {
    id: 4,
    title: 'News Title 4',
    description: 'News Content 4',
  },
  { id: 5, title: 'News Title 5', description: 'News Content 5' },
  { id: 6, title: 'News Title 6', description: 'News Content 6' },
  {
    id: 7,
    title: 'News Title 7',
    description: 'News Content 7',
  },
  {
    id: 8,
    title: 'News Title 8',
    description: 'News Content 8',
  },
  {
    id: 9,
    title: 'News Title 9',
    description: 'News Content 9',
  },
]

const renderRowItem = (item: (typeof sampleData)[0], index: number) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      marginBottom: '8px',
    }}
  >
    <div style={{ fontWeight: 500, color: '#1f2937' }}>{item.title}</div>
    <div style={{ fontSize: '14px', color: '#6b7280' }}>{item.description}</div>
    <div style={{ fontSize: '12px', color: '#9ca3af' }}>行号: {index + 1}</div>
  </div>
)

export default function AutoScrollListExample() {
  const scrollContainerRef = useRef<AutoScrollListRef>(null)

  const handleReachBottom = () => {
    console.log('Reached bottom of the list')
  }

  return (
    <>
      <div style={{ marginBottom: '24px' }}>
        <button onClick={() => scrollContainerRef.current?.play()}>play</button>
        <button onClick={() => scrollContainerRef.current?.pause()}>pause</button>
        <button onClick={() => scrollContainerRef.current?.scrollToTop()}>scrollToTop</button>
      </div>

      <div style={{ width: '200px', height: '200px', background: '#f3f4f6' }}>
        <AutoScrollList<SampleData>
          ref={scrollContainerRef}
          data={sampleData}
          loop={true}
          rowItem={renderRowItem}
          autoPlay={true}
          scrollDelay={2000}
          onReachBottom={handleReachBottom}
        />
      </div>
    </>
  )
}
```

#### Custom Styling

```jsx
<AutoScrollList className="custom-scroll-list" data={data} rowItem={renderItem} autoPlay={true} pauseOnHover={false} />
```

```css
.custom-scroll-list {
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}
```

### API Reference

#### Props

| Property         | Type                                      | Default | Description                                      |
| ---------------- | ----------------------------------------- | ------- | ------------------------------------------------ |
| `data`           | `T[]`                                     | -       | Array of data to display (required)              |
| `rowItem`        | `(item: T, index: number) => JSX.Element` | -       | Function to render each row (required)           |
| `autoPlay`       | `boolean`                                 | `false` | Whether to start scrolling automatically         |
| `loop`           | `boolean`                                 | `false` | Whether to loop back to top when reaching bottom |
| `scrollDelay`    | `number`                                  | `2000`  | Delay between each scroll in milliseconds        |
| `scrollDuration` | `number`                                  | `500`   | Duration of scroll animation in milliseconds     |
| `onReachBottom`  | `() => void`                              | -       | Callback function when reaching bottom           |
| `className`      | `string`                                  | `''`    | CSS class name applied to outer container        |
| `pauseOnHover`   | `boolean`                                 | `true`  | Whether to pause scrolling on mouse hover        |

#### Ref Methods

| Method          | Description                   |
| --------------- | ----------------------------- |
| `play()`        | Start auto scrolling          |
| `pause()`       | Pause auto scrolling          |
| `scrollToTop()` | Scroll to the top of the list |

### Important Notes

1. **Container Height**: The component requires a parent container with explicit height, otherwise it may not calculate scrolling correctly
2. **Data Changes**: When the `data` prop changes, the component automatically resets to the top
3. **Window Resize**: The component automatically responds to window size changes and recalculates scroll state
4. **Performance**: The component uses `useCallback` and `useRef` for performance optimization

### Dependencies

- `useWindowResize` custom hook (needs to be implemented separately)
- React 16.8+ (requires Hooks support)

### License

This component is provided as-is. Please ensure you have the appropriate licenses for any dependencies used in your project.
