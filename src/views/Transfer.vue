<template>
  <div class="transfer-container">
    <van-nav-bar title="转账" left-arrow @click-left="$router.back()" />
    
    <div class="content">
      <!-- 转账表单 -->
      <van-form @submit="onSubmit">
        <van-cell-group inset title="收款人信息">
          <van-field
            v-model="recipient.name"
            name="name"
            label="收款人"
            placeholder="请输入收款人姓名"
            :rules="[{ required: true, message: '请填写收款人姓名' }]"
          />
          <van-field
            v-model="recipient.account"
            name="account"
            label="收款账号"
            placeholder="请输入收款账号"
            :rules="[{ required: true, message: '请填写收款账号' }]"
          />
          <van-field
            v-model="recipient.bank"
            name="bank"
            label="收款银行"
            placeholder="请选择收款银行"
            readonly
            @click="showBankPicker = true"
          />
        </van-cell-group>

        <van-cell-group inset title="转账信息">
          <van-field
            v-model="amount"
            name="amount"
            label="转账金额"
            placeholder="请输入转账金额"
            type="number"
            :rules="[{ required: true, message: '请填写转账金额' }]"
          >
            <template #left-icon>
              <span style="margin-right: 4px;">¥</span>
            </template>
          </van-field>
          <van-field
            v-model="remark"
            name="remark"
            label="转账备注"
            placeholder="请输入转账备注（可选）"
            maxlength="50"
            show-word-limit
          />
        </van-cell-group>

        <div class="submit-section">
          <van-button 
            round 
            block 
            type="primary" 
            native-type="submit"
            :loading="loading"
            loading-text="处理中..."
          >
            确认转账
          </van-button>
        </div>
      </van-form>
    </div>

    <!-- 银行选择器 -->
    <van-popup v-model:show="showBankPicker" position="bottom">
      <van-picker
        :columns="bankList"
        @confirm="onBankConfirm"
        @cancel="showBankPicker = false"
      />
    </van-popup>

    <!-- 底部标签栏 -->
    <van-tabbar v-model="activeTab" fixed>
      <van-tabbar-item icon="wap-home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="balance-list-o" to="/account">账户</van-tabbar-item>
      <van-tabbar-item icon="credit-pay" to="/cards">卡片</van-tabbar-item>
      <van-tabbar-item icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast, showConfirmDialog } from 'vant'

const router = useRouter()
const activeTab = ref(1)
const loading = ref(false)
const showBankPicker = ref(false)

// 表单数据
const recipient = ref({
  name: '',
  account: '',
  bank: ''
})
const amount = ref('')
const remark = ref('')

// 银行列表
const bankList = ref([
  '招商银行',
  '中国工商银行',
  '中国建设银行',
  '中国农业银行',
  '中国银行',
  '交通银行',
  '中信银行',
  '光大银行',
  '华夏银行',
  '民生银行'
])

// 银行选择确认
const onBankConfirm = ({ selectedValues }) => {
  recipient.value.bank = selectedValues[0]
  showBankPicker.value = false
}

// 提交转账
const onSubmit = async () => {
  try {
    await showConfirmDialog({
      title: '确认转账',
      message: `向 ${recipient.value.name} 转账 ¥${amount.value} 元？`
    })

    loading.value = true
    
    // 模拟转账请求
    setTimeout(() => {
      showToast('转账成功')
      router.back()
      loading.value = false
    }, 2000)
  } catch {
    // 用户取消
  }
}
</script>

<style scoped>
.transfer-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 60px;
}

.content {
  padding: 16px;
}

.submit-section {
  margin: 32px 16px 16px;
}
</style>