<template>
  <div class="component-demo">
    <h2>🧩 Vue组件基础演示</h2>
    
    <!-- 📖 理论说明 -->
    <div class="theory-section">
      <h3>💡 什么是Vue组件？</h3>
      <div class="explanation">
        <p><strong>组件</strong>是Vue应用的基础构建块，就像搭积木一样：</p>
        <ul>
          <li>🏗️ <strong>可复用</strong>：一次编写，多处使用</li>
          <li>🔧 <strong>独立</strong>：有自己的数据、方法、样式</li>
          <li>🔗 <strong>可组合</strong>：小组件组成大组件</li>
          <li>📦 <strong>封装性</strong>：内部逻辑对外隐藏</li>
        </ul>
      </div>
    </div>
    
    <!-- 🎯 实际演示 -->
    <div class="demo-section">
      <h3>🎯 实际演示：银行卡组件</h3>
      
      <div class="cards-container">
        <!-- 💳 使用同一个组件，传入不同的数据 -->
        <BankCard
          bank-name="招商银行"
          card-number="6225 8888 1234 5678"
          card-type="savings"
          :balance="128888.88"
          @transfer="handleTransfer"
          @showDetails="handleShowDetails"
        />
        
        <BankCard
          bank-name="招商银行"
          card-number="5555 4444 3333 2222"
          card-type="credit"
          :balance="50000.00"
          @transfer="handleTransfer"
          @showDetails="handleShowDetails"
        />
        
        <BankCard
          bank-name="招商银行"
          card-number="6225 1111 9999 8888"
          card-type="debit"
          :balance="25680.50"
          @transfer="handleTransfer"
          @showDetails="handleShowDetails"
        />
      </div>
    </div>
    
    <!-- 📊 组件交互演示 -->
    <div class="interaction-section">
      <h3>🔄 组件交互演示</h3>
      <div class="interaction-log">
        <h4>操作日志：</h4>
        <div class="log-list">
          <div v-for="(log, index) in interactionLogs" :key="index" class="log-item">
            <span class="timestamp">{{ log.time }}</span>
            <span class="action">{{ log.action }}</span>
            <span class="details">{{ log.details }}</span>
          </div>
        </div>
        <button @click="clearLogs" class="clear-btn">清空日志</button>
      </div>
    </div>
    
    <!-- 🏗️ 组件结构说明 -->
    <div class="structure-section">
      <h3>🏗️ 组件的三个核心部分</h3>
      <div class="structure-grid">
        <div class="structure-item template">
          <h4>📄 Template（模板）</h4>
          <p>定义组件的HTML结构</p>
          <code>&lt;template&gt;<br>&nbsp;&nbsp;&lt;div&gt;界面内容&lt;/div&gt;<br>&lt;/template&gt;</code>
        </div>
        
        <div class="structure-item script">
          <h4>⚙️ Script（脚本）</h4>
          <p>定义组件的逻辑和数据</p>
          <code>&lt;script&gt;<br>&nbsp;&nbsp;export default {<br>&nbsp;&nbsp;&nbsp;&nbsp;// 组件逻辑<br>&nbsp;&nbsp;}<br>&lt;/script&gt;</code>
        </div>
        
        <div class="structure-item style">
          <h4>🎨 Style（样式）</h4>
          <p>定义组件的外观样式</p>
          <code>&lt;style scoped&gt;<br>&nbsp;&nbsp;.component {<br>&nbsp;&nbsp;&nbsp;&nbsp;/* 样式 */<br>&nbsp;&nbsp;}<br>&lt;/style&gt;</code>
        </div>
      </div>
    </div>
    
    <!-- 🔄 组件生命周期 -->
    <div class="lifecycle-section">
      <h3>🔄 组件生命周期</h3>
      <div class="lifecycle-flow">
        <div class="lifecycle-step">
          <div class="step-icon">🚀</div>
          <div class="step-content">
            <h4>创建阶段</h4>
            <p>setup() → 初始化数据</p>
          </div>
        </div>
        
        <div class="lifecycle-arrow">→</div>
        
        <div class="lifecycle-step">
          <div class="step-icon">📱</div>
          <div class="step-content">
            <h4>挂载阶段</h4>
            <p>onMounted() → 渲染到页面</p>
          </div>
        </div>
        
        <div class="lifecycle-arrow">→</div>
        
        <div class="lifecycle-step">
          <div class="step-icon">🔄</div>
          <div class="step-content">
            <h4>更新阶段</h4>
            <p>数据变化 → 重新渲染</p>
          </div>
        </div>
        
        <div class="lifecycle-arrow">→</div>
        
        <div class="lifecycle-step">
          <div class="step-icon">🗑️</div>
          <div class="step-content">
            <h4>销毁阶段</h4>
            <p>onUnmounted() → 清理资源</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BankCard from '../components/BankCard.vue'

const interactionLogs = ref([])

const addLog = (action, details) => {
  interactionLogs.value.unshift({
    time: new Date().toLocaleTimeString(),
    action,
    details
  })
  
  // 限制日志数量
  if (interactionLogs.value.length > 10) {
    interactionLogs.value = interactionLogs.value.slice(0, 10)
  }
}

const handleTransfer = (cardInfo) => {
  addLog('转账操作', `卡号: ${cardInfo.cardNumber}, 类型: ${cardInfo.cardType}`)
}

const handleShowDetails = (cardInfo) => {
  addLog('查看详情', `卡号: ${cardInfo.cardNumber}, 余额: ¥${cardInfo.balance.toLocaleString()}`)
}

const clearLogs = () => {
  interactionLogs.value = []
}
</script>

<style scoped>
.component-demo {
  max-width: 1000px;
  margin: 20px auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
}

.theory-section,
.demo-section,
.interaction-section,
.structure-section,
.lifecycle-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.theory-section h3,
.demo-section h3,
.interaction-section h3,
.structure-section h3,
.lifecycle-section h3 {
  color: #333;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid #667eea;
}

.explanation {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.explanation ul {
  margin: 12px 0 0 0;
  padding-left: 20px;
}

.explanation li {
  margin-bottom: 8px;
  line-height: 1.5;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.interaction-log {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
}

.log-list {
  max-height: 200px;
  overflow-y: auto;
  background: white;
  border-radius: 6px;
  padding: 12px;
  margin: 12px 0;
}

.log-item {
  display: flex;
  align-items: center;
  padding: 6px 0;
  border-bottom: 1px solid #f0f0f0;
  font-size: 14px;
}

.log-item:last-child {
  border-bottom: none;
}

.timestamp {
  color: #666;
  font-size: 12px;
  margin-right: 12px;
  min-width: 80px;
}

.action {
  font-weight: bold;
  color: #667eea;
  margin-right: 12px;
  min-width: 80px;
}

.details {
  color: #333;
  flex: 1;
}

.clear-btn {
  background: #667eea;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.clear-btn:hover {
  background: #5a6fd8;
}

.structure-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.structure-item {
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.structure-item.template {
  background: linear-gradient(135deg, #e3f2fd, #bbdefb);
  border: 2px solid #2196f3;
}

.structure-item.script {
  background: linear-gradient(135deg, #f3e5f5, #e1bee7);
  border: 2px solid #9c27b0;
}

.structure-item.style {
  background: linear-gradient(135deg, #e8f5e8, #c8e6c9);
  border: 2px solid #4caf50;
}

.structure-item h4 {
  margin: 0 0 8px 0;
  color: #333;
}

.structure-item p {
  margin: 0 0 12px 0;
  color: #666;
  font-size: 14px;
}

.structure-item code {
  background: rgba(0, 0, 0, 0.1);
  padding: 8px;
  border-radius: 4px;
  font-size: 12px;
  display: block;
  text-align: left;
  white-space: pre;
  font-family: 'Courier New', monospace;
}

.lifecycle-flow {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 20px;
}

.lifecycle-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-width: 120px;
}

.step-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.step-content h4 {
  margin: 0 0 4px 0;
  color: #333;
  font-size: 14px;
}

.step-content p {
  margin: 0;
  color: #666;
  font-size: 12px;
}

.lifecycle-arrow {
  font-size: 24px;
  color: #667eea;
  font-weight: bold;
}

@media (max-width: 768px) {
  .lifecycle-flow {
    flex-direction: column;
  }
  
  .lifecycle-arrow {
    transform: rotate(90deg);
  }
  
  .cards-container {
    grid-template-columns: 1fr;
  }
  
  .structure-grid {
    grid-template-columns: 1fr;
  }
}
</style>