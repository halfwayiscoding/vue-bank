<template>
  <div class="life-container">
    <!-- 导航栏 -->
    <div class="custom-nav-bar">
      <div class="nav-content">
        <van-search 
          v-model="searchValue" 
          placeholder="请输入搜索内容"
          shape="round"
          background="transparent"
          @search="onSearch"
          class="nav-search"
        />
        <div class="nav-icons">
          <van-icon name="scan" size="20" @click="showToast('扫一扫')" />
          <van-icon name="service-o" size="20" @click="showToast('客服')" />
          <van-icon name="add-o" size="20" @click="showToast('添加')" />
        </div>
      </div>
    </div>

    <div class="content">
      <!-- 分类标签 -->
      <div class="category-tabs">
        <van-tabs v-model:active="activeCategory" @change="onCategoryChange">
          <van-tab title="生活缴费" />
          <van-tab title="政务民生" />
          <van-tab title="粉丝福利" />
        </van-tabs>
      </div>

      <!-- 生活缴费内容 -->
      <div v-if="activeCategory === 0" class="life-payment">
        <van-grid :column-num="2" :gutter="16" class="payment-grid">
          <van-grid-item
            v-for="item in paymentServices"
            :key="item.id"
            @click="handleServiceClick(item)"
          >
            <div class="service-card">
              <div class="service-icon">
                {{ item.icon }}
              </div>
              <div class="service-info">
                <h3>{{ item.title }}</h3>
                <p>{{ item.description }}</p>
              </div>
            </div>
          </van-grid-item>
        </van-grid>
      </div>

      <!-- 汽车服务 -->
      <div class="car-service-section">
        <div class="section-header">
          <h2>汽车服务</h2>
          <van-icon name="arrow" />
        </div>
        
        <!-- 营速2024活动 -->
        <div class="car-activity">
          <div class="activity-content">
            <h3>「营速2024」</h3>
            <p>内卷的尽头是抽象？</p>
            <div class="stars">
              <span v-for="i in 4" :key="i" class="star">✨</span>
            </div>
          </div>
        </div>

        <!-- 汽车品牌 -->
        <div class="car-brands">
          <div 
            v-for="brand in carBrands" 
            :key="brand.id"
            class="brand-item"
            @click="handleBrandClick(brand)"
          >
            <div class="brand-logo">{{ brand.logo }}</div>
            <span>{{ brand.name }}</span>
          </div>
        </div>

        <!-- 汽车服务项目 -->
        <van-grid :column-num="2" :gutter="16" class="car-services">
          <van-grid-item
            v-for="service in carServices"
            :key="service.id"
            @click="handleServiceClick(service)"
          >
            <div class="car-service-card">
              <div class="service-icon">
                <van-icon :name="service.icon" size="24" />
              </div>
              <h4>{{ service.title }}</h4>
              <p>{{ service.description }}</p>
            </div>
          </van-grid-item>
        </van-grid>
      </div>

      <!-- 出行礼遇 -->
      <div class="travel-section">
        <div class="section-header">
          <h2>出行礼遇</h2>
        </div>

        <div class="travel-services">
          <!-- 地铁公交 -->
          <div class="travel-main-card" @click="handleServiceClick({type: 'metro'})">
            <div class="card-content">
              <h3>地铁公交</h3>
              <p>绿色出行，随机立减</p>
            </div>
            <div class="card-image">
              <van-icon name="logistics" size="40" color="#4A90E2" />
            </div>
          </div>

          <!-- 其他出行服务 -->
          <div class="travel-grid">
            <div 
              v-for="service in travelServices"
              :key="service.id"
              class="travel-card"
              @click="handleServiceClick(service)"
            >
              <div class="travel-icon">
                <van-icon :name="service.icon" size="20" />
              </div>
              <h4>{{ service.title }}</h4>
              <p>{{ service.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 便民服务 -->
      <div class="convenience-section">
        <van-grid :column-num="5" :gutter="12" class="convenience-grid">
          <van-grid-item
            v-for="item in conveniences"
            :key="item.id"
            @click="handleServiceClick(item)"
          >
            <div class="convenience-item">
              <div class="convenience-icon" :style="{ background: item.gradient }">
                <van-icon :name="item.icon" size="20" color="white" />
              </div>
              <span>{{ item.title }}</span>
            </div>
          </van-grid-item>
        </van-grid>
      </div>
    </div>

    <!-- 底部标签栏 -->
    <van-tabbar v-model="activeTab" fixed>
      <van-tabbar-item icon="wap-home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="gold-coin-o" to="/wealth">理财</van-tabbar-item>
      <van-tabbar-item icon="shop-o" to="/life">生活</van-tabbar-item>
      <van-tabbar-item icon="credit-pay" to="/cards">卡片</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref, onMounted, onActivated, computed } from 'vue'
import { useRoute } from 'vue-router'
import { showToast } from 'vant'

const route = useRoute()

// 根据当前路由计算activeTab
const activeTab = computed(() => {
  const routeToTabMap = {
    '/home': 0,
    '/wealth': 1,
    '/life': 2,
    '/cards': 3
  }
  return routeToTabMap[route.path] || 2
})
const activeCategory = ref(0)
const searchValue = ref('')

// 生活缴费服务
const paymentServices = ref([
  {
    id: 1,
    title: '水费',
    description: '在线缴水费',
    icon: '💧',
    type: 'water'
  },
  {
    id: 2,
    title: '手机话费',
    description: '在线缴话费',
    icon: '📱',
    type: 'phone'
  },
  {
    id: 3,
    title: '燃气费',
    description: '在线缴燃气费',
    icon: '🔥',
    type: 'gas'
  },
  {
    id: 4,
    title: '固话',
    description: '在线缴固话费',
    icon: '☎️',
    type: 'landline'
  }
])

// 汽车品牌
const carBrands = ref([
  { id: 1, name: '别克', logo: '🚗' },
  { id: 2, name: '奔驰', logo: '🚙' },
  { id: 3, name: '大众', logo: '🚐' },
  { id: 4, name: '本田', logo: '🚕' },
  { id: 5, name: '凯迪拉克', logo: '🚖' },
  { id: 6, name: '雪佛兰', logo: '🚗' }
])

// 汽车服务
const carServices = ref([
  {
    id: 1,
    title: '看车有礼',
    description: '到店看车享好礼',
    icon: 'gift-o',
    type: 'car_gift'
  },
  {
    id: 2,
    title: '优惠购车',
    description: '超值优惠购新车',
    icon: 'discount',
    type: 'car_discount'
  }
])

// 出行服务
const travelServices = ref([
  {
    id: 1,
    title: '权益洗车',
    description: '洗车更优惠',
    icon: 'fire-o',
    type: 'car_wash'
  },
  {
    id: 2,
    title: '停车缴费',
    description: '扫码缴费',
    icon: 'scan',
    type: 'parking'
  },
  {
    id: 3,
    title: '机场贵宾服务',
    description: '享贵宾礼遇',
    icon: 'gem-o',
    type: 'airport_vip'
  }
])

// 便民服务
const conveniences = ref([
  {
    id: 1,
    title: '粉丝福利社',
    description: '专属福利',
    icon: 'star-o',
    gradient: 'linear-gradient(135deg, #FF6B6B, #FF8E8E)',
    type: 'fans'
  },
  {
    id: 2,
    title: '领券中心',
    description: '优惠券',
    icon: 'coupon-o',
    gradient: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
    type: 'coupon'
  },
  {
    id: 3,
    title: '付款码',
    description: '快速支付',
    icon: 'qr',
    gradient: 'linear-gradient(135deg, #45B7D1, #96C93D)',
    type: 'qr_pay'
  },
  {
    id: 4,
    title: '电影票',
    description: '优惠购票',
    icon: 'video-o',
    gradient: 'linear-gradient(135deg, #F093FB, #F5576C)',
    type: 'movie'
  },
  {
    id: 5,
    title: '话费充值',
    description: '快速充值',
    icon: 'phone-o',
    gradient: 'linear-gradient(135deg, #4FACFE, #00F2FE)',
    type: 'recharge'
  },
  {
    id: 6,
    title: '医保码',
    description: '医保支付',
    icon: 'certificate',
    gradient: 'linear-gradient(135deg, #43E97B, #38F9D7)',
    type: 'medical'
  },
  {
    id: 7,
    title: '中小学学费',
    description: '在线缴费',
    icon: 'certificate',
    gradient: 'linear-gradient(135deg, #FA709A, #FEE140)',
    type: 'tuition'
  },
  {
    id: 8,
    title: '学生儿童医保',
    description: '医保服务',
    icon: 'like-o',
    gradient: 'linear-gradient(135deg, #A8EDEA, #FED6E3)',
    type: 'student_medical'
  },
  {
    id: 9,
    title: '全部菜单',
    description: '更多服务',
    icon: 'ellipsis',
    gradient: 'linear-gradient(135deg, #D299C2, #FEF9D7)',
    type: 'more'
  }
])

// 搜索功能
const onSearch = (value) => {
  showToast(`搜索: ${value}`)
}

// 分类切换
const onCategoryChange = (index) => {
  showToast(`切换到分类: ${index}`)
}

// 服务点击处理
const handleServiceClick = (service) => {
  showToast(`点击了: ${service.title || service.type}`)
}

// 品牌点击处理
const handleBrandClick = (brand) => {
  showToast(`选择品牌: ${brand.name}`)
}

// 刷新页面数据
const refreshData = () => {
  console.log('生活页面数据刷新')
  // 这里可以添加实际的数据刷新逻辑，比如重新获取生活服务数据
}

onMounted(() => {
  refreshData()
})

// 页面激活时刷新（用于tab切换）
onActivated(() => {
  refreshData()
})
</script>

<style scoped>
.life-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 60px;
}

/* 自定义导航栏 */
.custom-nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 46px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  z-index: 100;
  display: flex;
  align-items: center;
  padding: 0 16px;
}

.nav-content {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 12px;
}

.nav-search {
  flex: 1;
}

.nav-icons {
  display: flex;
  gap: 12px;
  color: white;
}

.nav-icons .van-icon {
  cursor: pointer;
}

.content {
  padding-top: 46px;
}

/* 分类标签 */
.category-tabs {
  background: white;
  position: sticky;
  top: 46px;
  z-index: 10;
}

/* 生活缴费 */
.life-payment {
  padding: 16px;
}

.payment-grid .service-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.payment-grid .service-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.service-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.service-info h3 {
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 4px 0;
  color: #333;
}

.service-info p {
  font-size: 12px;
  color: #666;
  margin: 0;
}

/* 汽车服务 */
.car-service-section {
  margin: 16px;
  background: white;
  border-radius: 16px;
  padding: 20px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-header h2 {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  color: #333;
}

.car-activity {
  background: linear-gradient(135deg, #87CEEB, #98D8E8);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  position: relative;
  overflow: hidden;
}

.activity-content h3 {
  font-size: 20px;
  font-weight: bold;
  color: white;
  margin: 0 0 8px 0;
}

.activity-content p {
  font-size: 14px;
  color: white;
  margin: 0 0 12px 0;
  opacity: 0.9;
}

.stars {
  display: flex;
  gap: 4px;
}

.star {
  font-size: 16px;
}

.car-brands {
  display: flex;
  justify-content: space-between;
  margin: 16px 0;
  flex-wrap: wrap;
  gap: 8px;
}

.brand-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  border-radius: 8px;
  background: #f8f9fa;
  min-width: 60px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.brand-item:hover {
  background: #e9ecef;
  transform: translateY(-2px);
}

.brand-logo {
  font-size: 24px;
  margin-bottom: 4px;
}

.brand-item span {
  font-size: 12px;
  color: #666;
}

.car-services .car-service-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.car-services .car-service-card:hover {
  background: #e9ecef;
  transform: translateY(-2px);
}

.car-service-card .service-icon {
  margin-bottom: 8px;
  color: #FF6B6B;
}

.car-service-card h4 {
  font-size: 14px;
  font-weight: bold;
  margin: 0 0 4px 0;
  color: #333;
}

.car-service-card p {
  font-size: 12px;
  color: #666;
  margin: 0;
}

/* 出行礼遇 */
.travel-section {
  margin: 16px;
  background: white;
  border-radius: 16px;
  padding: 20px;
}

.travel-main-card {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.travel-main-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.card-content h3 {
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 8px 0;
}

.card-content p {
  font-size: 14px;
  margin: 0;
  opacity: 0.9;
}

.travel-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.travel-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.travel-card:hover {
  background: #e9ecef;
  transform: translateY(-2px);
}

.travel-icon {
  margin-bottom: 8px;
  color: #4A90E2;
}

.travel-card h4 {
  font-size: 14px;
  font-weight: bold;
  margin: 0 0 4px 0;
  color: #333;
}

.travel-card p {
  font-size: 12px;
  color: #666;
  margin: 0;
}

/* 便民服务 */
.convenience-section {
  padding: 16px;
}

.convenience-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.convenience-item:hover {
  transform: translateY(-2px);
}

.convenience-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}

.convenience-item span {
  font-size: 12px;
  color: #333;
  line-height: 1.2;
}

/* 搜索框样式 */
:deep(.van-search) {
  padding: 0;
  background: transparent;
}

:deep(.van-search__content) {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

:deep(.van-field__control) {
  color: white;
  font-size: 14px;
}

:deep(.van-field__control::placeholder) {
  color: rgba(255, 255, 255, 0.7);
}

:deep(.van-search__action) {
  display: none;
}
</style>