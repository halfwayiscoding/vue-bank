<template>
  <div class="render-demo">
    <div class="demo-header">
      <h2>渲染函数演示</h2>
      <p>使用 Vue 3 的 h() 函数创建动态组件</p>
    </div>

    <div class="demo-section">
      <h3>1. 动态标题组件</h3>
      <p>根据 level 属性动态生成不同级别的标题</p>
      <div class="demo-content">
        <DynamicHeading :level="1" text="一级标题" />
        <DynamicHeading :level="2" text="二级标题" />
        <DynamicHeading :level="3" text="三级标题" />
        <DynamicHeading :level="4" text="四级标题" />
      </div>
    </div>

    <div class="demo-section">
      <h3>2. 交易状态组件</h3>
      <p>根据状态动态渲染不同样式的交易信息</p>
      <div class="demo-content">
        <TransactionStatus status="success" amount="1000.00" />
        <TransactionStatus status="pending" amount="500.50" />
        <TransactionStatus status="failed" amount="200.00" />
      </div>
    </div>

    <div class="demo-section">
      <h3>3. 银行卡类型组件</h3>
      <p>根据卡片类型渲染不同的卡片样式</p>
      <div class="demo-content">
        <div class="card-grid">
          <BankCardType type="credit" />
          <BankCardType type="debit" />
          <BankCardType type="savings" />
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h3>4. 菜单树组件</h3>
      <p>递归渲染树形菜单结构</p>
      <div class="demo-content">
        <MenuTree :menuData="bankServices" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, h } from 'vue'

// 1. 动态标题组件
const DynamicHeading = {
  props: ['level', 'text'],
  render() {
    return h(`h${this.level}`, {
      class: 'dynamic-heading',
      style: {
        color: '#667eea',
        fontSize: `${2.5 - this.level * 0.3}rem`,
        margin: '8px 0'
      }
    }, this.text)
  }
}

// 2. 交易状态组件
const TransactionStatus = {
  props: ['status', 'amount'],
  render() {
    const statusConfig = {
      success: {
        color: '#28a745',
        icon: '✅',
        text: '交易成功'
      },
      pending: {
        color: '#ffc107',
        icon: '⏳',
        text: '处理中'
      },
      failed: {
        color: '#dc3545',
        icon: '❌',
        text: '交易失败'
      }
    }
    
    const config = statusConfig[this.status]
    
    return h('div', {
      class: 'transaction-status',
      style: {
        display: 'flex',
        alignItems: 'center',
        padding: '12px 16px',
        backgroundColor: `${config.color}15`,
        border: `2px solid ${config.color}30`,
        borderRadius: '8px',
        margin: '8px 0'
      }
    }, [
      h('span', { style: { fontSize: '20px', marginRight: '8px' } }, config.icon),
      h('div', [
        h('div', {
          style: { fontWeight: 'bold', color: config.color }
        }, config.text),
        h('div', {
          style: { fontSize: '14px', color: '#666' }
        }, `金额: ¥${this.amount}`)
      ])
    ])
  }
}

// 3. 银行卡类型组件
const BankCardType = {
  props: ['type'],
  render() {
    const cardConfig = {
      credit: {
        name: '信用卡',
        icon: '💳',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        features: ['透支消费', '分期付款', '积分奖励']
      },
      debit: {
        name: '借记卡',
        icon: '🏦',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        features: ['即时扣款', 'ATM取现', '转账汇款']
      },
      savings: {
        name: '储蓄卡',
        icon: '💰',
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        features: ['定期存款', '活期存款', '理财产品']
      }
    }
    
    const config = cardConfig[this.type]
    
    return h('div', {
      class: 'bank-card-type',
      style: {
        background: config.gradient,
        color: 'white',
        padding: '20px',
        borderRadius: '12px',
        margin: '10px 0',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }
    }, [
      h('div', {
        style: { display: 'flex', alignItems: 'center', marginBottom: '12px' }
      }, [
        h('span', { style: { fontSize: '24px', marginRight: '8px' } }, config.icon),
        h('h4', { style: { margin: '0', fontSize: '18px' } }, config.name)
      ]),
      h('ul', {
        style: { margin: '0', paddingLeft: '20px' }
      }, config.features.map(feature => 
        h('li', { style: { marginBottom: '4px' } }, feature)
      ))
    ])
  }
}

// 4. 菜单树组件
const MenuTree = {
  props: ['menuData'],
  render() {
    const renderMenuItem = (item) => {
      if (item.children && item.children.length > 0) {
        return h('li', {
          style: { marginBottom: '8px' }
        }, [
          h('div', {
            style: {
              fontWeight: 'bold',
              color: '#667eea',
              marginBottom: '4px',
              cursor: 'pointer'
            }
          }, [
            h('span', '📁 '),
            h('span', item.name)
          ]),
          h('ul', {
            style: { 
              marginLeft: '20px', 
              borderLeft: '2px solid #f0f0f0',
              paddingLeft: '12px'
            }
          }, item.children.map(renderMenuItem))
        ])
      }
      
      return h('li', {
        style: { 
          marginBottom: '4px',
          cursor: 'pointer',
          padding: '4px 8px',
          borderRadius: '4px',
          transition: 'background-color 0.2s'
        },
        onMouseenter: (e) => {
          e.target.style.backgroundColor = '#f8f9fa'
        },
        onMouseleave: (e) => {
          e.target.style.backgroundColor = 'transparent'
        }
      }, [
        h('span', '📄 '),
        h('span', item.name)
      ])
    }
    
    return h('ul', {
      style: { 
        listStyle: 'none', 
        padding: '0',
        border: '1px solid #e8e8e8',
        borderRadius: '8px',
        padding: '16px',
        backgroundColor: '#fafafa'
      }
    }, this.menuData.map(renderMenuItem))
  }
}

const bankServices = ref([
  {
    name: '账户服务',
    children: [
      { name: '余额查询' },
      { name: '交易明细' },
      { name: '账户设置' }
    ]
  },
  {
    name: '转账汇款',
    children: [
      { name: '行内转账' },
      { name: '跨行转账' },
      { name: '国际汇款' }
    ]
  },
  {
    name: '理财服务',
    children: [
      { name: '定期存款' },
      { name: '基金投资' },
      { name: '保险产品' }
    ]
  },
  {
    name: '信用卡服务',
    children: [
      { name: '账单查询' },
      { name: '还款服务' },
      { name: '积分兑换' }
    ]
  }
])
</script>

<style scoped>
.render-demo {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.demo-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
}

.demo-header h2 {
  margin: 0 0 10px 0;
  font-size: 2rem;
}

.demo-header p {
  margin: 0;
  opacity: 0.9;
}

.demo-section {
  margin-bottom: 40px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.demo-section h3 {
  color: #667eea;
  margin: 0 0 10px 0;
  font-size: 1.5rem;
}

.demo-section p {
  color: #666;
  margin: 0 0 20px 0;
}

.demo-content {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e8e8e8;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.dynamic-heading {
  font-weight: bold;
}

@media (max-width: 768px) {
  .render-demo {
    padding: 10px;
  }
  
  .demo-section {
    padding: 15px;
  }
  
  .demo-content {
    padding: 15px;
  }
  
  .card-grid {
    grid-template-columns: 1fr;
  }
}
</style>