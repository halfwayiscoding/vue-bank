export default {
  // 初始化侧滑监听
  initSwipeBack(exitCallback) {
    let startX = 0;
    let startY = 0;
    let startTime = 0;
    let isSwipeInProgress = false;
    
    const minSwipeDistance = 60; // 最小滑动距离（px）
    const maxVerticalOffset = 40; // 最大垂直偏移（避免误触上下滑动）
    const maxSwipeTime = 500; // 最大滑动时间（ms）
    const edgeThreshold = 30; // 边缘检测阈值（px）

    // 阻止默认浏览器侧滑行为的函数
    const preventDefaultSwipe = (e) => {
      // 如果是从左边缘开始的触摸，阻止默认行为
      if (isSwipeInProgress && startX < edgeThreshold) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // 触摸开始
    document.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      startTime = Date.now();
      isSwipeInProgress = false;
      
      // 如果是从左边缘开始，标记为潜在的侧滑手势
      if (startX < edgeThreshold) {
        isSwipeInProgress = true;
        console.log('🟡 Potential edge swipe detected:', { startX, startY });
      }
    }, { passive: false });

    // 触摸移动 - 实时检测并阻止默认行为
    document.addEventListener('touchmove', (e) => {
      if (!isSwipeInProgress) return;
      
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const diffX = currentX - startX;
      const diffY = Math.abs(currentY - startY);
      
      // 只有在明确的水平滑动且从边缘开始时才阻止默认行为
      // 确保不影响垂直滚动
      if (diffX > 20 && diffY < 30) {
        e.preventDefault();
        e.stopPropagation();
        console.log('🚫 Preventing default browser swipe behavior');
      }
    }, { passive: false });

    // 触摸结束
    document.addEventListener('touchend', (e) => {
      if (!startX) return;

      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const endTime = Date.now();
      
      const diffX = endX - startX; // 水平滑动距离（正值为右滑）
      const diffY = Math.abs(endY - startY); // 垂直滑动距离（取绝对值）
      const swipeTime = endTime - startTime; // 滑动时间
      const swipeSpeed = diffX / swipeTime; // 滑动速度 (px/ms)

      console.log('🔵 Gesture Analysis:', {
        startX,
        endX,
        diffX,
        diffY,
        swipeTime,
        swipeSpeed: swipeSpeed.toFixed(3),
        isFromLeftEdge: startX < edgeThreshold,
        isRightSwipe: diffX > minSwipeDistance,
        isHorizontal: diffY < maxVerticalOffset,
        isQuickSwipe: swipeTime < maxSwipeTime,
        isValidGesture: startX < edgeThreshold && 
                       diffX > minSwipeDistance && 
                       diffY < maxVerticalOffset && 
                       swipeTime < maxSwipeTime
      });

      // 满足条件：从左侧边缘向右滑，距离足够，垂直偏移小，时间合理
      if (startX < edgeThreshold && 
          diffX > minSwipeDistance && 
          diffY < maxVerticalOffset && 
          swipeTime < maxSwipeTime) {
        
        console.log('✅ Valid swipe back gesture detected!');
        
        // 添加视觉反馈（边缘阴影效果）
        this.showSwipeBackFeedback();
        
        // 延迟执行回调，给用户视觉反馈时间
        setTimeout(() => {
          exitCallback();
        }, 100);
      }

      // 重置状态
      startX = 0;
      startY = 0;
      startTime = 0;
      isSwipeInProgress = false;
    }, { passive: false });

    // 监听浏览器的导航手势事件（额外保险）
    window.addEventListener('popstate', (e) => {
      console.log('🔄 Browser popstate event detected');
      // 这里可以添加额外的处理逻辑
    });

    // 监听浏览器手势事件
    document.addEventListener('gesturestart', preventDefaultSwipe, { passive: false });
    document.addEventListener('gesturechange', preventDefaultSwipe, { passive: false });
    document.addEventListener('gestureend', preventDefaultSwipe, { passive: false });
  },

  // 显示侧滑反馈效果
  showSwipeBackFeedback() {
    // 创建边缘阴影效果
    const feedback = document.createElement('div');
    feedback.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 5px;
      height: 100vh;
      background: linear-gradient(to right, rgba(0,122,255,0.8), transparent);
      z-index: 10000;
      pointer-events: none;
      animation: swipeBackFeedback 0.3s ease-out;
    `;
    
    // 添加动画样式
    if (!document.getElementById('swipe-feedback-style')) {
      const style = document.createElement('style');
      style.id = 'swipe-feedback-style';
      style.textContent = `
        @keyframes swipeBackFeedback {
          0% { width: 0px; opacity: 0; }
          50% { width: 8px; opacity: 1; }
          100% { width: 0px; opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
    
    document.body.appendChild(feedback);
    
    // 300ms后移除反馈元素
    setTimeout(() => {
      if (feedback.parentNode) {
        feedback.parentNode.removeChild(feedback);
      }
    }, 300);
    
    console.log('💫 Swipe back feedback displayed');
  }
};