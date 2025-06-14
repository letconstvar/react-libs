import React from "react";
import Marquee from "@zhou96/marquee";
import "@zhou96/marquee/dist/style.css";

function App() {
  return (
    <div className="app">
      <h1>欢迎使用 React 组件库</h1>
      <div
        style={{
          margin: "20px 0",
          padding: "20px",
          border: "1px solid #eee",
          borderRadius: "4px",
          width: "100px",
        }}
      >
        <h2>示例组件：MarqueeText</h2>
        <Marquee>
          <p>这是一个跑马灯文本组件</p>
        </Marquee>
        <Marquee speed={50} pauseOnHover={false}>
          <p>这是一个自定义速度的跑马灯文本组件</p>
        </Marquee>
        <Marquee
          overflowOnly={false}
          speed={50}
          pauseOnHover={true}
          direction="right"
        >
          <p>12345</p>
        </Marquee>
      </div>
    </div>
  );
}

export default App;
