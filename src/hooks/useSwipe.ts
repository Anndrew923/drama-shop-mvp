import { useRef, useState, useCallback } from "react";

interface SwipeHandlers {
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
}

interface UseSwipeOptions {
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number; // 滑動距離閾值，默認 50px
}

export const useSwipe = (options: UseSwipeOptions = {}): SwipeHandlers => {
  const { onSwipeUp, onSwipeDown, threshold = 50 } = options;
  
  const touchStartY = useRef<number>(0);
  const touchStartX = useRef<number>(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartY.current = touch.clientY;
    touchStartX.current = touch.clientX;
    setIsSwiping(false);
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchStartY.current) return;
    
    const touch = e.touches[0];
    const deltaY = touch.clientY - touchStartY.current;
    const deltaX = touch.clientX - touchStartX.current;
    
    // 判斷是否為垂直滑動（垂直距離大於水平距離）
    if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 10) {
      setIsSwiping(true);
      e.preventDefault(); // 防止頁面滾動
    }
  }, []);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStartY.current || !isSwiping) {
      touchStartY.current = 0;
      touchStartX.current = 0;
      return;
    }

    const touch = e.changedTouches[0];
    const deltaY = touch.clientY - touchStartY.current;
    const deltaX = touch.clientX - touchStartX.current;

    // 判斷滑動方向
    if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > threshold) {
      if (deltaY > 0) {
        // 向下滑動
        onSwipeDown?.();
      } else {
        // 向上滑動
        onSwipeUp?.();
      }
    }

    touchStartY.current = 0;
    touchStartX.current = 0;
    setIsSwiping(false);
  }, [isSwiping, threshold, onSwipeUp, onSwipeDown]);

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd
  };
};

