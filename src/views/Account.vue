<template>
  <div class="account-container">
    <van-nav-bar title="账户明细" left-arrow @click-left="$router.back()" />
    
    <div class="content">
      <!-- 账户信息 -->
      <div class="account-info">
        <div class="account-card">
          <div class="card-header">
            <span class="card-type">储蓄卡</span>
            <span class="card-bank">招商银行</span>
          </div>
          <div class="card-number">**** **** **** 8888</div>
          <div class="card-balance">
            <span class="label">可用余额</span>
            <span class="amount">¥128,888.88</span>
          </div>
        </div>
      </div>

      <!-- 筛选器 -->
      <div class="filter-section">
        <van-dropdown-menu>
          <van-dropdown-item v-model="filterType" :options="typeOptions" />
          <van-dropdown-item v-model="filterTime" :options="timeOptions" />
        </van-dropdown-menu>
      </div>

      <!-- 交易列表 -->
      <div class="transaction-list">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div v-for="(group, date) in groupedTransactions" :key="date" class="transaction-group">
            <div class="date-header">{{ date }}</div>
            <van-cell-group>
              <van-cell
                v-for="transaction in group"
                :key="transaction.id"
                :title="transaction.title"
                :label="transaction.description"
                :value="transaction.amount"
                :value-class="transaction.type === 'income' ? 'income' : 'expense'"
                @click="showTransactionDetail(transaction)"
              >
                <template #icon>
                  <div :class="['transaction-icon', transaction.type]">
                    <van-icon :name="transaction.icon" size="20" />
                  </div>
                </template>
                <template #right-icon>
                  <van-icon name="arrow" />
                </template>
              </van-cell>
            </van-cell-group>
          </div>
        </van-list>
      </div>
    </div>

    <!-- 底部标签栏 -->
    <van-tabbar v-model="activeTab" fixed>
      <van-tabbar-item icon="wap-home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="balance-list-o" to="/account">账户</van-tabbar-item>
      <van-tabbar-item icon="credit-pay" to="/cards">卡片</van-tabbar-item>
      <van-tabbar-item icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { showToast } from 'vant'

export default {
  name: 'Account',
  setup() {
    const activeTab = ref(1)
    const loading = ref(false)
    const finished = ref(false)
    const filterType = ref(0)
    const filterTime = ref(0)

    // 筛选选项
    const typeOptions = ref([
      { text: '全部类型', value: 0 },
      { text: '收入', value: 1 },
      { text: '支出', value: 2 },
      { text: '转账', value: 3 }
    ])

    const timeOptions = ref([
      { text: '最近一周', value: 0 },
      { text: '最近一月', value: 1 },
      { text: '最近三月', value: 2 },
      { text: '最近一年', value: 3 }
    ])

    // 交易数据
    const transactions = ref([
      {
        id: 1,
        title: '工资发放',
        description: '公司转账 - 月薪',
        amount: '+8,500.00',
        type: 'income',
        icon: 'gold-coin-o',
        date: '2024-01-15',
        time: '14:30'
      },
      {
        id: 2,
        title: '超市购物',
        description: '华润万家 - 刷卡消费',
        amount: '-156.80',
        type: 'expense',
        icon: 'shop-o',
        date: '2024-01-14',
        time: '19:20'
      },
      {
        id: 3,
        title: '转账给张三',
        description: '个人转账',
        amount: '-2,000.00',
        type: 'expense',
        icon: 'exchange',
        date: '2024-01-14',
        time: '15:45'
      },
      {
        id: 4,
        title: '理财收益',
        description: '朝朝盈 - 收益到账',
        amount: '+25.60',
        type: 'income',
        icon: 'gold-coin-o',
        date: '2024-01-13',
        time: '09:00'
      },
      {
        id: 5,
        title: '餐厅消费',
        description: '海底捞 - 刷卡消费',
        amount: '-298.00',
        type: 'expense',
        icon: 'shop-o',
        date: '2024-01-13',
        time: '20:15'
      }
    ])

    // 按日期分组的交易记录
    const groupedTransactions = computed(() => {
      const groups = {}
      transactions.value.forEach(transaction => {
        const date = formatDate(transaction.date)
        if (!groups[date]) {
          groups[date] = []
        }
        groups[date].push(transaction)
      })
      return groups
    })

    // 格式化日期
    const formatDate = (dateStr) => {
      const date = new Date(dateStr)
      const today = new Date()
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)

      if (date.toDateString() === today.toDateString()) {
        return '今天'
      } else if (date.toDateString() === yesterday.toDateString()) {
        return '昨天'
      } else {
        return `${date.getMonth() + 1}月${date.getDate()}日`
      }
    }

    // 加载更多数据
    const onLoad = () => {
      setTimeout(() => {
        loading.value = false
        finished.value = true
      }, 1000)
    }

    // 显示交易详情
    const showTransactionDetail = (transaction) => {
      showToast(`查看 ${transaction.title} 详情`)
    }

    onMounted(() => {
      // 初始化数据
    })

    return {
      activeTab,
      loading,
      finished,
      filterType,
      filterTime,
      typeOptions,
      timeOptions,
      groupedTransactions,
      onLoad,
      showTransactionDetail
    }
  }
}
</script>

<style scoped>
.account-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 60px;
}

.content {
  padding-top: 46px;
}

.account-info {
  padding: 16px;
}

.account-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 24px;
  color: white;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
}

.card-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  font-size: 14px;
  opacity: 0.9;
}

.card-number {
  font-size: 18px;
  font-family: 'Courier New', monospace;
  margin-bottom: 16px;
  letter-spacing: 2px;
}

.card-balance {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.label {
  font-size: 14px;
  opacity: 0.9;
}

.amount {
  font-size: 20px;
  font-weight: bold;
}

.filter-section {
  background: white;
}

.transaction-list {
  padding: 0 16px;
}

.transaction-group {
  margin-bottom: 16px;
}

.date-header {
  padding: 12px 16px 8px;
  font-size: 14px;
  color: #666;
  background: transparent;
}

.transaction-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  color: white;
}

.transaction-icon.income {
  background: linear-gradient(135deg, #00b894, #00cec9);
}

.transaction-icon.expense {
  background: linear-gradient(135deg, #fd79a8, #e84393);
}

.income {
  color: #00b894 !important;
  font-weight: bold;
}

.expense {
  color: #e84393 !important;
  font-weight: bold;
}
</style>