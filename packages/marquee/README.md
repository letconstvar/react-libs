# @zhou96/marquee

[English](#english) | [中文](#chinese)

## DEMO
https://codesandbox.io/p/sandbox/fw467c

---

## English

A lightweight, high-performance React marquee component with customizable scroll direction, speed control, hover pause, and more.

### Features

- 🚀 **Lightweight**: Zero dependencies, small bundle size
- 📱 **Responsive**: Automatically adapts to container width changes
- 🎯 **Smart Scrolling**: Supports overflow detection, scrolls only when needed
- ⏸️ **Hover Pause**: Can pause scrolling on mouse hover
- 🎨 **Highly Customizable**: Supports custom styles, speed, and direction
- 🔄 **Bidirectional**: Supports left-to-right or right-to-left scrolling
- 💪 **TypeScript Support**: Complete type definitions

### Installation

```bash
npm install @zhou96/marquee
```

```bash
yarn add @zhou96/marquee
```

```bash
pnpm add @zhou96/marquee
```

### Basic Usage

```tsx
import Marquee from '@zhou96/marquee';
import "@zhou96/marquee/dist/style.css";

function App() {
  return (
    <div style={{ width: '300px' }}>
      <Marquee>
        This is a long text content that will automatically scroll when it exceeds the container width
      </Marquee>
    </div>
  );
}
```

### API Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Content to be scrolled |
| `className` | `string` | `""` | Custom CSS class name |
| `style` | `React.CSSProperties` | `{}` | Custom inline styles |
| `speed` | `number` | `20` | Scroll speed (pixels/second) |
| `pauseOnHover` | `boolean` | `true` | Whether to pause scrolling on mouse hover |
| `direction` | `"left" \| "right"` | `"left"` | Scroll direction |
| `overflowOnly` | `boolean` | `true` | Whether to scroll only when content overflows |

### Examples

#### Basic Scrolling

```tsx
<Marquee>
  This is a marquee message that scrolls from right to left
</Marquee>
```

#### Custom Speed

```tsx
<Marquee speed={50}>
  Fast scrolling text content
</Marquee>

<Marquee speed={10}>
  Slow scrolling text content
</Marquee>
```

#### Change Scroll Direction

```tsx
<Marquee direction="right">
  Content scrolling from left to right
</Marquee>
```

#### Disable Hover Pause

```tsx
<Marquee pauseOnHover={false}>
  Content that won't pause on mouse hover
</Marquee>
```

#### Force Scrolling (Regardless of Overflow)

```tsx
<Marquee overflowOnly={false}>
  Short text will also scroll
</Marquee>
```

#### Custom Styling

```tsx
<Marquee 
  className="custom-marquee"
  style={{ 
    backgroundColor: '#f0f0f0', 
    padding: '10px',
    borderRadius: '4px'
  }}
>
  Marquee with custom styling
</Marquee>
```

### Advanced Usage

#### News Ticker

```tsx
function NewsMarquee() {
  const news = [
    "Breaking: Tech company releases new product",
    "Economy: Stock market rises 2.5% today",
    "Sports: World Cup finals tonight"
  ];

  return (
    <div className="news-container">
      <span className="news-label">Latest News:</span>
      <Marquee speed={30} className="news-marquee">
        {news.join(' • ')}
      </Marquee>
    </div>
  );
}
```

### Compatibility

- React 16.8+
- Modern browsers (supporting CSS animations and custom properties)
- IE 11+ (with polyfills)

---

## Chinese

一个轻量级、高性能的 React 跑马灯组件，支持自定义滚动方向、速度控制、悬停暂停等功能。

### 特性

- 🚀 **轻量级**：零依赖，小体积
- 📱 **响应式**：自动适配容器宽度变化
- 🎯 **智能滚动**：支持溢出检测，只在需要时滚动
- ⏸️ **悬停暂停**：鼠标悬停时可暂停滚动
- 🎨 **高度可定制**：支持自定义样式、速度、方向
- 🔄 **双向滚动**：支持从左到右或从右到左滚动
- 💪 **TypeScript 支持**：完整的类型定义

### 安装

```bash
npm install @zhou96/marquee
```

```bash
yarn add @zhou96/marquee
```

```bash
pnpm add @zhou96/marquee
```

### 基础用法

```tsx
import Marquee from '@zhou96/marquee';
import "@zhou96/marquee/dist/style.css";

function App() {
  return (
    <div style={{ width: '300px' }}>
      <Marquee>
        这是一个很长的文本内容，当内容超出容器宽度时会自动滚动显示
      </Marquee>
    </div>
  );
}
```

### API 参数

| 参数 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `children` | `React.ReactNode` | - | 要滚动显示的内容 |
| `className` | `string` | `""` | 自定义 CSS 类名 |
| `style` | `React.CSSProperties` | `{}` | 自定义内联样式 |
| `speed` | `number` | `20` | 滚动速度（像素/秒） |
| `pauseOnHover` | `boolean` | `true` | 鼠标悬停时是否暂停滚动 |
| `direction` | `"left" \| "right"` | `"left"` | 滚动方向 |
| `overflowOnly` | `boolean` | `true` | 是否只在内容溢出时滚动 |

### 使用示例

#### 基础滚动

```tsx
<Marquee>
  这是一条跑马灯消息，会从右到左滚动显示
</Marquee>
```

#### 自定义速度

```tsx
<Marquee speed={50}>
  快速滚动的文本内容
</Marquee>

<Marquee speed={10}>
  慢速滚动的文本内容
</Marquee>
```

#### 改变滚动方向

```tsx
<Marquee direction="right">
  从左到右滚动的内容
</Marquee>
```

#### 禁用悬停暂停

```tsx
<Marquee pauseOnHover={false}>
  鼠标悬停时不会暂停的内容
</Marquee>
```

#### 强制滚动（无论是否溢出）

```tsx
<Marquee overflowOnly={false}>
  短文本也会滚动
</Marquee>
```

#### 自定义样式

```tsx
<Marquee 
  className="custom-marquee"
  style={{ 
    backgroundColor: '#f0f0f0', 
    padding: '10px',
    borderRadius: '4px'
  }}
>
  带有自定义样式的跑马灯
</Marquee>
```

### 高级用法

#### 新闻滚动条

```tsx
function NewsMarquee() {
  const news = [
    "突发：科技公司发布新产品",
    "经济：股市今日上涨 2.5%",
    "体育：世界杯决赛今晚开始"
  ];

  return (
    <div className="news-container">
      <span className="news-label">最新消息：</span>
      <Marquee speed={30} className="news-marquee">
        {news.join(' • ')}
      </Marquee>
    </div>
  );
}
```

#### 产品展示

```tsx
function ProductShowcase() {
  return (
    <Marquee 
      speed={25}
      direction="right"
      pauseOnHover={true}
      className="product-marquee"
    >
      <div className="product-list">
        <img src="/product1.jpg" alt="Product 1" />
        <img src="/product2.jpg" alt="Product 2" />
        <img src="/product3.jpg" alt="Product 3" />
      </div>
    </Marquee>
  );
}
```

### 样式定制

组件使用 CSS Modules，你可以通过以下方式自定义样式：

```css
/* 自定义容器样式 */
.custom-marquee {
  background: linear-gradient(90deg, #ff6b6b, #4ecdc4);
  color: white;
  padding: 12px 0;
  font-weight: bold;
}

/* 自定义文本内容样式 */
.custom-marquee .textContent {
  font-size: 18px;
  letter-spacing: 1px;
}
```

### 性能优化

- 组件使用 `useMemo` 和 `useCallback` 优化渲染性能
- 自动检测内容是否溢出，避免不必要的动画
- 响应式设计，窗口大小变化时自动重新计算
- CSS 动画实现，性能优于 JavaScript 动画

### 兼容性

- React 16.8+
- 现代浏览器（支持 CSS 动画和自定义属性）
- IE 11+（需要 polyfill）

### 故障排除

#### 文本不滚动

1. 检查容器是否有固定宽度
2. 确认文本内容超出了容器宽度
3. 如果希望短文本也滚动，设置 `overflowOnly={false}`

#### 滚动太快或太慢

调整 `speed` 参数的值：
- 增大数值：滚动更快
- 减小数值：滚动更慢

#### 动画不流畅

1. 确保没有过多的 DOM 操作影响性能
2. 检查 CSS 样式是否有冲突
3. 考虑使用 `will-change: transform` 优化动画性能

### 贡献

欢迎提交 Issue 和 Pull Request！

### 许可证

MIT License

### 更新日志

#### v1.0.0
- 初始版本发布
- 支持基础滚动功能
- 支持自定义方向、速度、悬停暂停
- 添加 `overflowOnly` 参数
- 完整的 TypeScript 支持