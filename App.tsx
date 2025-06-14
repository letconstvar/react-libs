import React from "react";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/style.css";

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
        <MarqueeText text="这是一个跑马灯文本组件，可以自动滚动显示长文本" />
        <MarqueeText
          text="这是一个跑马灯文本组件"
          speed={50}
          pauseOnHover={false}
        />
      </div>
    </div>
  );
}

export default App;
