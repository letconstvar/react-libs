import { useEffect, useRef } from "react";

type ResizeCallback = () => void;

/**
 * 监听窗口大小变化的 Hook
 * @param delay - 防抖延迟时间（毫秒）
 * @param onStart - 开始变化时的回调函数
 * @param onEnd - 结束变化时的回调函数
 */
export const useWindowResize = (
  delay: number = 300,
  onStart?: ResizeCallback,
  onEnd?: ResizeCallback
): void => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isResizingRef = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      // 如果是第一次开始 resize，执行开始回调
      if (!isResizingRef.current) {
        isResizingRef.current = true;
        if (onStart && typeof onStart === "function") {
          onStart();
        }
      }

      // 清除之前的定时器
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // 设置新的定时器，在指定延迟后执行结束回调
      timeoutRef.current = setTimeout(() => {
        isResizingRef.current = false;
        if (onEnd && typeof onEnd === "function") {
          onEnd();
        }
      }, delay);
    };

    // 添加事件监听器
    window.addEventListener("resize", handleResize);

    // 清理函数
    return () => {
      window.removeEventListener("resize", handleResize);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [delay, onStart, onEnd]);
};
