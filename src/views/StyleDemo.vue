<template>
  <div class="demo-container">
    <h2>CSS样式演示</h2>
    
    <div class="box margin-demo">
      外边距演示 (margin)
    </div>
    
    <div class="box padding-demo">
      内边距演示 (padding)
    </div>
    
    <div class="box gradient-demo">
      渐变背景演示
    </div>
    
    <div class="flex-demo">
      <div class="flex-item">项目1</div>
      <div class="flex-item">项目2</div>
      <div class="flex-item">项目3</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StyleDemo'
}
</script>

<style scoped>
.demo-container {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.box {
  width: 200px;
  height: 60px;
  background-color: #f0f0f0;
  border: 2px solid #ccc;
  text-align: center;
  line-height: 60px;
  margin-bottom: 20px;
}

.margin-demo {
  margin: 30px;  /* 外边距：与其他元素的距离 */
  background-color: #ffeb3b;
}

.padding-demo {
  padding: 20px;  /* 内边距：内容与边框的距离 */
  background-color: #4caf50;
  color: white;
  line-height: 20px;  /* 重新调整行高 */
}

.gradient-demo {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  color: white;
  border-radius: 10px;  /* 圆角 */
}

.flex-demo {
  display: flex;  /* 弹性布局 */
  gap: 10px;     /* 项目之间的间距 */
  margin-top: 20px;
}

.flex-item {
  flex: 1;       /* 平均分配空间 */
  padding: 20px;
  background-color: #2196f3;
  color: white;
  text-align: center;
  border-radius: 5px;
}
</style>