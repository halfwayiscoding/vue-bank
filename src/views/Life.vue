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

      <!-- 政务民生内容 -->
      <div v-if="activeCategory === 1" class="government-services">
        <div class="section-header">
          <h2>🏛️ 政务服务</h2>
        </div>
        <van-grid :column-num="2" :gutter="16" class="government-grid">
          <van-grid-item
            v-for="item in governmentServices"
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

        <div class="section-header">
          <h2>🏥 民生服务</h2>
        </div>
        <van-grid :column-num="3" :gutter="12" class="livelihood-grid">
          <van-grid-item
            v-for="item in livelihoodServices"
            :key="item.id"
            @click="handleServiceClick(item)"
          >
            <div class="livelihood-item">
              <div class="livelihood-icon" :style="{ background: item.gradient }">
                <van-icon :name="item.icon" size="20" color="white" />
              </div>
              <span>{{ item.title }}</span>
            </div>
          </van-grid-item>
        </van-grid>
      </div>

      <!-- 粉丝福利内容 -->
      <div v-if="activeCategory === 2" class="fans-benefits">
        <div class="benefits-banner">
          <div class="banner-content">
            <h2>🎉 粉丝专属福利</h2>
            <p>感谢您的支持，专属福利等您来领！</p>
          </div>
        </div>

        <div class="section-header">
          <h2>🎁 限时福利</h2>
        </div>
        <div class="benefits-list">
          <div 
            v-for="benefit in fansBenefits"
            :key="benefit.id"
            class="benefit-card"
            @click="handleServiceClick(benefit)"
          >
            <div class="benefit-icon">
              {{ benefit.icon }}
            </div>
            <div class="benefit-info">
              <h3>{{ benefit.title }}</h3>
              <p>{{ benefit.description }}</p>
              <div class="benefit-tag">{{ benefit.tag }}</div>
            </div>
            <div class="benefit-action">
              <van-button size="small" type="primary">{{ benefit.action }}</van-button>
            </div>
          </div>
        </div>

        <div class="section-header">
          <h2>🏆 会员特权</h2>
        </div>
        <van-grid :column-num="2" :gutter="16" class="privilege-grid">
          <van-grid-item
            v-for="privilege in memberPrivileges"
            :key="privilege.id"
            @click="handleServiceClick(privilege)"
          >
            <div class="privilege-card">
              <div class="privilege-icon" :style="{ background: privilege.gradient }">
                <van-icon :name="privilege.icon" size="24" color="white" />
              </div>
              <h3>{{ privilege.title }}</h3>
              <p>{{ privilege.description }}</p>
            </div>
          </van-grid-item>
        </van-grid>
      </div>

      <!-- 生活缴费的其他服务 -->
      <div v-if="activeCategory === 0">
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
    </div>

    <!-- 底部标签栏 -->
  <BottomTabbar />
  </div>
</template>

<script setup>
import { ref, onMounted, onActivated } from 'vue'
import { useRoute } from 'vue-router'
import { showToast } from 'vant'
import BottomTabbar from '@/components/BottomTabbar.vue'

const route = useRoute()
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

// 政务服务
const governmentServices = ref([
  {
    id: 1,
    title: '社保查询',
    description: '查询社保缴费记录',
    icon: '🏛️',
    type: 'social_security'
  },
  {
    id: 2,
    title: '公积金查询',
    description: '查询公积金余额',
    icon: '🏦',
    type: 'housing_fund'
  },
  {
    id: 3,
    title: '个税查询',
    description: '个人所得税查询',
    icon: '📊',
    type: 'tax_query'
  },
  {
    id: 4,
    title: '违章查询',
    description: '车辆违章查询',
    icon: '🚗',
    type: 'violation_query'
  },
  {
    id: 5,
    title: '证件办理',
    description: '身份证等证件办理',
    icon: '📄',
    type: 'document_service'
  },
  {
    id: 6,
    title: '户籍服务',
    description: '户口迁移等服务',
    icon: '🏠',
    type: 'household_service'
  }
])

// 民生服务
const livelihoodServices = ref([
  {
    id: 1,
    title: '医保服务',
    icon: 'certificate',
    gradient: 'linear-gradient(135deg, #43E97B, #38F9D7)',
    type: 'medical_insurance'
  },
  {
    id: 2,
    title: '教育缴费',
    icon: 'certificate',
    gradient: 'linear-gradient(135deg, #FA709A, #FEE140)',
    type: 'education_fee'
  },
  {
    id: 3,
    title: '养老服务',
    icon: 'like-o',
    gradient: 'linear-gradient(135deg, #A8EDEA, #FED6E3)',
    type: 'pension_service'
  },
  {
    id: 4,
    title: '就业服务',
    icon: 'manager-o',
    gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
    type: 'employment_service'
  },
  {
    id: 5,
    title: '法律援助',
    icon: 'balance-o',
    gradient: 'linear-gradient(135deg, #f093fb, #f5576c)',
    type: 'legal_aid'
  },
  {
    id: 6,
    title: '便民热线',
    icon: 'phone-o',
    gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)',
    type: 'hotline'
  }
])

// 粉丝福利
const fansBenefits = ref([
  {
    id: 1,
    title: '新人专享大礼包',
    description: '注册即送1000积分+专属优惠券',
    icon: '🎁',
    tag: '限时',
    action: '立即领取',
    type: 'newbie_gift'
  },
  {
    id: 2,
    title: '每日签到奖励',
    description: '连续签到7天送神秘大奖',
    icon: '📅',
    tag: '每日',
    action: '去签到',
    type: 'daily_checkin'
  },
  {
    id: 3,
    title: '生日专属福利',
    description: '生日当月享受专属折扣',
    icon: '🎂',
    tag: '专属',
    action: '查看详情',
    type: 'birthday_benefit'
  },
  {
    id: 4,
    title: '邀请好友奖励',
    description: '邀请好友注册双方都有奖',
    icon: '👥',
    tag: '双赢',
    action: '邀请好友',
    type: 'invite_reward'
  }
])

// 会员特权
const memberPrivileges = ref([
  {
    id: 1,
    title: 'VIP专属客服',
    description: '7x24小时专属服务',
    icon: 'service-o',
    gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
    type: 'vip_service'
  },
  {
    id: 2,
    title: '免费提现',
    description: '每月10次免费提现',
    icon: 'gold-coin-o',
    gradient: 'linear-gradient(135deg, #f9ca24, #f0932b)',
    type: 'free_withdrawal'
  },
  {
    id: 3,
    title: '积分翻倍',
    description: '消费积分双倍奖励',
    icon: 'fire-o',
    gradient: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
    type: 'double_points'
  },
  {
    id: 4,
    title: '专属理财',
    description: '高收益理财产品',
    icon: 'diamond-o',
    gradient: 'linear-gradient(135deg, #6c5ce7, #a29bfe)',
    type: 'exclusive_finance'
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

/* 政务民生样式 */
.government-services {
  padding: 16px;
}

.government-grid .service-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.government-grid .service-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.livelihood-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.livelihood-item:hover {
  transform: translateY(-2px);
}

.livelihood-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}

.livelihood-item span {
  font-size: 12px;
  color: #333;
  line-height: 1.2;
}

/* 粉丝福利样式 */
.fans-benefits {
  padding: 16px;
}

.benefits-banner {
  background: linear-gradient(135deg, #FF6B6B, #FF8E8E);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  color: white;
  text-align: center;
}

.banner-content h2 {
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 8px 0;
}

.banner-content p {
  font-size: 14px;
  margin: 0;
  opacity: 0.9;
}

.benefits-list {
  margin-bottom: 20px;
}

.benefit-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.benefit-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.benefit-icon {
  font-size: 32px;
  margin-right: 16px;
}

.benefit-info {
  flex: 1;
}

.benefit-info h3 {
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 4px 0;
  color: #333;
}

.benefit-info p {
  font-size: 14px;
  color: #666;
  margin: 0 0 8px 0;
}

.benefit-tag {
  display: inline-block;
  background: #FF6B6B;
  color: white;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 12px;
}

.benefit-action {
  margin-left: 12px;
}

.privilege-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.privilege-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.privilege-icon {
  width: 50px;
  height: 50px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px auto;
}

.privilege-card h3 {
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 8px 0;
  color: #333;
}

.privilege-card p {
  font-size: 14px;
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