<template>
  <div class="user-info" v-if="userInfo">
    <div class="user-avatar">{{ userInfo.avatar }}</div>
    <div class="user-details">
      <div class="user-name">{{ userInfo.name }}</div>
      <div class="user-role">{{ getRoleText(userInfo.role) }}</div>
      <div class="user-level" :class="getLevelClass(userInfo.level)">
        {{ getLevelText(userInfo.level) }}
      </div>
    </div>
    <div class="user-actions">
      <button @click="handleLogout" class="logout-btn">退出</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { showConfirmDialog } from 'vant'
import auth from '@/utils/auth'

const router = useRouter()

// 获取用户信息
const userInfo = computed(() => auth.getUserDisplayInfo())

// 角色文本映射
const getRoleText = (role) => {
  const roleMap = {
    'admin': '管理员',
    'vip': 'VIP用户',
    'user': '普通用户'
  }
  return roleMap[role] || '未知角色'
}

// 等级文本映射
const getLevelText = (level) => {
  const levelMap = {
    'DIAMOND': '钻石会员',
    'SVIP': '超级VIP',
    'VIP': 'VIP会员',
    'NORMAL': '普通用户'
  }
  return levelMap[level] || '未知等级'
}

// 等级样式类
const getLevelClass = (level) => {
  return {
    'level-diamond': level === 'DIAMOND',
    'level-svip': level === 'SVIP',
    'level-vip': level === 'VIP',
    'level-normal': level === 'NORMAL'
  }
}

// 退出登录
const handleLogout = async () => {
  try {
    await showConfirmDialog({
      title: '确认退出',
      message: '确定要退出登录吗？',
      confirmButtonText: '退出',
      cancelButtonText: '取消',
      confirmButtonColor: '#ee0a24'
    })
    
    await auth.logout()
    router.push('/login')
  } catch (error) {
    // 用户取消退出
  }
}
</script>

<style scoped>
.user-info {
  display: flex;
  align-items: center;
  padding: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  color: white;
  margin-bottom: 20px;
}

.user-avatar {
  font-size: 32px;
  margin-right: 15px;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
}

.user-details {
  flex: 1;
}

.user-name {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 4px;
}

.user-role {
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 4px;
}

.user-level {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 10px;
  display: inline-block;
  font-weight: bold;
}

.level-diamond {
  background: linear-gradient(45deg, #ff6b6b, #feca57);
}

.level-svip {
  background: linear-gradient(45deg, #a8edea, #fed6e3);
  color: #333;
}

.level-vip {
  background: linear-gradient(45deg, #ffecd2, #fcb69f);
  color: #333;
}

.level-normal {
  background: rgba(255, 255, 255, 0.3);
}

.user-actions {
  margin-left: 15px;
}

.logout-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
}
</style>