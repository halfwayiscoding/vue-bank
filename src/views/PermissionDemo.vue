<template>
  <div class="permission-demo">
    <van-nav-bar title="权限管理演示" left-arrow @click-left="$router.back()" />
    
    <div class="content">
      <!-- 当前用户信息 -->
      <div class="user-status">
        <h3>当前用户状态</h3>
        <UserInfo />
      </div>

      <!-- 权限测试区域 -->
      <div class="permission-tests">
        <h3>权限测试</h3>
        
        <!-- 基础权限测试 -->
        <van-cell-group title="基础权限">
          <van-cell 
            title="用户信息查看" 
            :value="hasPermission('user:read') ? '✅ 有权限' : '❌ 无权限'"
            @click="testPermission('user:read')"
          />
          <van-cell 
            title="用户信息编辑" 
            :value="hasPermission('user:write') ? '✅ 有权限' : '❌ 无权限'"
            @click="testPermission('user:write')"
          />
          <van-cell 
            title="管理员功能" 
            :value="hasPermission('admin:manage') ? '✅ 有权限' : '❌ 无权限'"
            @click="testPermission('admin:manage')"
          />
        </van-cell-group>

        <!-- 角色权限测试 -->
        <van-cell-group title="角色权限">
          <van-cell 
            title="普通用户功能" 
            :value="hasRole('user') ? '✅ 有权限' : '❌ 无权限'"
            @click="testRole('user')"
          />
          <van-cell 
            title="VIP用户功能" 
            :value="hasRole('vip') ? '✅ 有权限' : '❌ 无权限'"
            @click="testRole('vip')"
          />
          <van-cell 
            title="管理员功能" 
            :value="hasRole('admin') ? '✅ 有权限' : '❌ 无权限'"
            @click="testRole('admin')"
          />
        </van-cell-group>

        <!-- VIP等级权限测试 -->
        <van-cell-group title="VIP等级权限">
          <van-cell 
            title="普通用户功能" 
            :value="hasVIPLevel('NORMAL') ? '✅ 有权限' : '❌ 无权限'"
            @click="testVIPLevel('NORMAL')"
          />
          <van-cell 
            title="VIP会员功能" 
            :value="hasVIPLevel('VIP') ? '✅ 有权限' : '❌ 无权限'"
            @click="testVIPLevel('VIP')"
          />
          <van-cell 
            title="超级VIP功能" 
            :value="hasVIPLevel('SVIP') ? '✅ 有权限' : '❌ 无权限'"
            @click="testVIPLevel('SVIP')"
          />
          <van-cell 
            title="钻石会员功能" 
            :value="hasVIPLevel('DIAMOND') ? '✅ 有权限' : '❌ 无权限'"
            @click="testVIPLevel('DIAMOND')"
          />
        </van-cell-group>
      </div>

      <!-- 权限切换区域 -->
      <div class="permission-switch">
        <h3>权限切换演示</h3>
        <van-cell-group>
          <van-cell title="切换为普通用户" @click="switchUser('user')" />
          <van-cell title="切换为VIP用户" @click="switchUser('vip')" />
          <van-cell title="切换为管理员" @click="switchUser('admin')" />
        </van-cell-group>
      </div>

      <!-- 受保护的功能区域 -->
      <div class="protected-features">
        <h3>受保护的功能</h3>
        <van-cell-group>
          <van-cell 
            title="账户管理" 
            @click="goToAccount"
            :disabled="!hasPermission('user:read')"
          />
          <van-cell 
            title="转账功能" 
            @click="goToTransfer"
            :disabled="!hasPermission('user:read')"
          />
          <van-cell 
            title="理财产品" 
            @click="goToWealth"
            :disabled="!hasVIPLevel('VIP')"
          />
          <van-cell 
            title="开发者工具" 
            @click="goToComponentDemo"
            :disabled="!hasRole('admin')"
          />
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { showToast, showConfirmDialog } from 'vant'
import auth from '@/utils/auth'
import UserInfo from '@/components/UserInfo.vue'

const router = useRouter()

// 权限检查方法
const hasPermission = (permission) => {
  return auth.hasPermission(permission)
}

const hasRole = (role) => {
  return auth.hasRole(role)
}

const hasVIPLevel = (level) => {
  return auth.hasVIPLevel(level)
}

// 测试权限
const testPermission = (permission) => {
  const result = hasPermission(permission)
  showToast({
    message: `权限 ${permission}: ${result ? '通过' : '拒绝'}`,
    type: result ? 'success' : 'fail'
  })
}

const testRole = (role) => {
  const result = hasRole(role)
  showToast({
    message: `角色 ${role}: ${result ? '通过' : '拒绝'}`,
    type: result ? 'success' : 'fail'
  })
}

const testVIPLevel = (level) => {
  const result = hasVIPLevel(level)
  showToast({
    message: `VIP等级 ${level}: ${result ? '通过' : '拒绝'}`,
    type: result ? 'success' : 'fail'
  })
}

// 切换用户角色
const switchUser = async (role) => {
  try {
    await showConfirmDialog({
      title: '切换用户',
      message: `确定要切换为${role === 'admin' ? '管理员' : role === 'vip' ? 'VIP用户' : '普通用户'}吗？`,
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    })

    // 模拟不同角色的用户数据
    const userData = {
      user: {
        id: 1,
        username: 'testuser',
        name: '测试用户',
        avatar: '👤',
        role: 'user',
        level: 'NORMAL',
        permissions: ['user:read']
      },
      vip: {
        id: 2,
        username: 'vipuser',
        name: 'VIP用户',
        avatar: '💎',
        role: 'vip',
        level: 'VIP',
        permissions: ['user:read', 'user:write']
      },
      admin: {
        id: 3,
        username: 'admin',
        name: '管理员',
        avatar: '👑',
        role: 'admin',
        level: 'DIAMOND',
        permissions: ['user:read', 'user:write', 'admin:manage']
      }
    }

    // 更新用户信息
    auth.setUserInfo(userData[role])
    showToast({
      message: `已切换为${role === 'admin' ? '管理员' : role === 'vip' ? 'VIP用户' : '普通用户'}`,
      type: 'success'
    })
  } catch (error) {
    // 用户取消
  }
}

// 导航方法
const goToAccount = () => {
  if (hasPermission('user:read')) {
    router.push('/account')
  } else {
    showToast('权限不足')
  }
}

const goToTransfer = () => {
  if (hasPermission('user:read')) {
    router.push('/transfer')
  } else {
    showToast('权限不足')
  }
}

const goToWealth = () => {
  if (hasVIPLevel('VIP')) {
    router.push('/wealth')
  } else {
    showToast('需要VIP权限')
  }
}

const goToComponentDemo = () => {
  if (hasRole('admin')) {
    router.push('/component-demo')
  } else {
    showToast('需要管理员权限')
  }
}
</script>

<style scoped>
.permission-demo {
  min-height: 100vh;
  background-color: #f7f8fa;
}

.content {
  padding: 16px;
  padding-bottom: 80px;
}

.user-status {
  margin-bottom: 20px;
}

.user-status h3,
.permission-tests h3,
.permission-switch h3,
.protected-features h3 {
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: bold;
  color: #323233;
}

.permission-tests,
.permission-switch,
.protected-features {
  margin-bottom: 20px;
}

.van-cell-group {
  margin-bottom: 16px;
}

.van-cell[disabled] {
  opacity: 0.5;
}
</style>