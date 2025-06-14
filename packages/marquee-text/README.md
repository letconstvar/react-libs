# Marquee Text Component / 跑马灯文本组件

A lightweight React component for creating smooth, customizable marquee text effects.
一个轻量级的 React 组件，用于创建流畅、可定制的跑马灯文本效果。

## Installation / 安装

```bash
# Using pnpm / 使用 pnpm
pnpm add @zhou96/marquee-text

# Using npm / 使用 npm
# npm install @zhou96/marquee-text

# Using yarn / 使用 yarn
# yarn add @zhou96/marquee-text
```

## Usage / 使用

```tsx
import { MarqueeText } from "@zhou96/marquee-text";
import "@zhou96/marquee-text/dist/style.css";

function App() {
  return (
    <div>
      <h2>Default (Left to Right)</h2>
      <MarqueeText text="This is a sample marquee text that will scroll from right to left" />

      <h2>Right to Left</h2>
      <MarqueeText
        text="This text will scroll from left to right"
        direction="right"
      />

      <h2>Custom Speed</h2>
      <MarqueeText text="This text scrolls faster" speed={50} />

      <h2>Pause on Hover</h2>
      <MarqueeText text="Hover to pause the animation" pauseOnHover={true} />
    </div>
  );
}
```

## Props / 属性

| Prop           | Type                  | Default      | Description                          | 描述                   |
| -------------- | --------------------- | ------------ | ------------------------------------ | ---------------------- |
| `text`         | `string`              | **required** | The text content to display          | 要显示的文本内容       |
| `className`    | `string`              | `''`         | Additional CSS class name            | 额外的 CSS 类名        |
| `style`        | `React.CSSProperties` | `{}`         | Inline styles                        | 行内样式               |
| `speed`        | `number`              | `20`         | Animation speed in pixels per second | 动画速度（像素/秒）    |
| `pauseOnHover` | `boolean`             | `true`       | Whether to pause animation on hover  | 鼠标悬停时是否暂停动画 |
| `direction`    | `'left' \| 'right'`   | `'left'`     | Animation direction                  | 动画方向               |

## Features / 特性

- 🚀 Smooth animation performance / 流畅的动画性能
- 🎨 Fully customizable with CSS / 可通过 CSS 完全自定义
- 🖱️ Pause on hover / 悬停暂停
- ↕️ Direction control / 方向控制
- 📱 Responsive design / 响应式设计

## License / 许可证

MIT
