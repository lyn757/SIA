<template>
  <div class="home-page" :key="componentKey">
    <!-- Top Navigation Bar - Part 1 -->
    <div class="top-nav-bar">
      <div class="container-fluid px-4">
        <div class="d-flex align-items-center justify-content-end gap-3">
          <button class="btn btn-sm btn-register">{{ $t('nav.register') }}</button>
          <LanguageSwitcher />
          <UserAvatar />
        </div>
      </div>
    </div>

    <!-- Top Navigation Bar - Part 2 -->
    <header class="main-header">
      <div class="container-fluid px-4">
        <div class="d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center gap-4">
            <a href="#" class="navbar-brand">LOGO</a>
            <nav class="d-none d-md-flex align-items-center">
              <router-link to="/" class="nav-link" exact active-class="active">{{ $t('nav.home') }}</router-link>
              <router-link to="/shop" class="nav-link" active-class="active">{{ $t('nav.shop') }}</router-link>
              <router-link to="/designers" class="nav-link" active-class="active">{{ $t('nav.designers') }}</router-link>
              <router-link to="/community" class="nav-link" active-class="active">{{ $t('nav.community') }}</router-link>
              <AboutUsDropdown />
            </nav>
          </div>
          <div class="d-flex align-items-center gap-3">
            <div class="position-relative">
              <input type="text" class="form-control search-input" :placeholder="$t('home.search')">
              <i class="bi bi-search search-icon"></i>
            </div>
            <router-link to="/cart" class="btn btn-icon">
              <i class="bi bi-cart"></i>
            </router-link>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="main-content-wrapper">
      <div class="content-container">
        <!-- Left Sidebar Menu -->
        <aside class="sidebar-menu" ref="sidebarRef">
          <div class="sidebar-content" ref="sidebarContentRef">
          <!-- Style Filter -->
          <div class="filter-section">
            <h6 class="filter-title">Style Filter</h6>
            <div class="filter-options">
              <label class="filter-checkbox">
                <input type="checkbox" v-model="filters.styles" value="modern">
                <span>Modern Minimalist</span>
              </label>
              <label class="filter-checkbox">
                <input type="checkbox" v-model="filters.styles" value="nordic">
                <span>Nordic Style</span>
              </label>
              <label class="filter-checkbox">
                <input type="checkbox" v-model="filters.styles" value="chinese">
                <span>Chinese Style</span>
              </label>
              <label class="filter-checkbox">
                <input type="checkbox" v-model="filters.styles" value="american">
                <span>American Style</span>
              </label>
              <label class="filter-checkbox">
                <input type="checkbox" v-model="filters.styles" value="japanese">
                <span>Japanese Style</span>
              </label>
              <label class="filter-checkbox">
                <input type="checkbox" v-model="filters.styles" value="luxury">
                <span>Light Luxury Style</span>
              </label>
              <label class="filter-checkbox">
                <input type="checkbox" v-model="filters.styles" value="industrial">
                <span>Industrial Style</span>
              </label>
              <label class="filter-checkbox">
                <input type="checkbox" v-model="filters.styles" value="mediterranean">
                <span>Mediterranean Style</span>
              </label>
            </div>
          </div>

          <!-- Color and Tone -->
          <div class="filter-section">
            <h6 class="filter-title">Color and Tone</h6>
            <div class="color-grid">
              <div 
                v-for="color in colorOptions" 
                :key="color"
                class="color-box" 
                :style="{ background: color }" 
                @click="toggleColor(color)" 
                :class="{ active: filters.colors.includes(color) }"
              ></div>
            </div>
          </div>

          <!-- Material and Elements -->
          <div class="filter-section">
            <h6 class="filter-title">Material and Elements</h6>
            <div class="filter-options">
              <label class="filter-checkbox">
                <input type="checkbox" v-model="filters.materials" value="wood">
                <span>Wood</span>
              </label>
              <label class="filter-checkbox">
                <input type="checkbox" v-model="filters.materials" value="metal">
                <span>Metal</span>
              </label>
              <label class="filter-checkbox">
                <input type="checkbox" v-model="filters.materials" value="fabric">
                <span>Fabric</span>
              </label>
              <label class="filter-checkbox">
                <input type="checkbox" v-model="filters.materials" value="leather">
                <span>Leather</span>
              </label>
              <label class="filter-checkbox">
                <input type="checkbox" v-model="filters.materials" value="glass">
                <span>Glass</span>
              </label>
              <label class="filter-checkbox">
                <input type="checkbox" v-model="filters.materials" value="stone">
                <span>Stone</span>
              </label>
            </div>
          </div>

          <!-- Gear Selection (Tier) -->
          <div class="filter-section">
            <h6 class="filter-title">Gear Selection</h6>
            <div class="filter-options">
              <label class="filter-radio">
                <input type="radio" v-model="filters.tier" value="basic">
                <span>Basic Version</span>
              </label>
              <label class="filter-radio">
                <input type="radio" v-model="filters.tier" value="standard">
                <span>Standard Version</span>
              </label>
              <label class="filter-radio">
                <input type="radio" v-model="filters.tier" value="premium">
                <span>Premium Version</span>
              </label>
              <label class="filter-radio">
                <input type="radio" v-model="filters.tier" value="luxury">
                <span>Luxury Version</span>
              </label>
            </div>
          </div>

          <!-- Gear Selection (Recommendations) -->
          <div class="filter-section">
            <h6 class="filter-title">Gear Selection</h6>
            <div class="filter-options">
              <label class="filter-checkbox">
                <input type="checkbox" v-model="filters.recommendations" value="popular">
                <span>Popular Recommendations</span>
              </label>
              <label class="filter-checkbox">
                <input type="checkbox" v-model="filters.recommendations" value="new">
                <span>New Arrivals</span>
              </label>
              <label class="filter-checkbox">
                <input type="checkbox" v-model="filters.recommendations" value="designer">
                <span>Designer Recommendations</span>
              </label>
              <label class="filter-checkbox">
                <input type="checkbox" v-model="filters.recommendations" value="reviews">
                <span>User Reviews</span>
              </label>
            </div>
          </div>
          </div>
        </aside>

        <!-- Main Content Area -->
        <main class="content-area">
          <!-- Room Type Navigation -->
          <div class="room-nav">
            <a 
              v-for="room in roomNavItems" 
              :key="room.id"
              href="#" 
              class="room-nav-item" 
              :class="{ active: selectedRoom === room.id }" 
              @click.prevent="selectRoom(room.id)"
            >
              {{ room.label }}
            </a>
          </div>

          <!-- Carousel -->
          <div class="carousel-section">
            <div id="mainCarousel" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-indicators">
                <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="0" class="active"></button>
                <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="1"></button>
                <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="2"></button>
              </div>
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1920&h=688&fit=crop&q=80" class="d-block w-100" alt="Modern Living Room">
                  
                  <!-- Top Left Tags -->
                  <div class="carousel-tags-left">
                    <span class="tag-primary">Modern Style</span>
                    <span class="tag-secondary">120㎡</span>
                    <span class="tag-secondary">Whole House</span>
                    <span class="tag-secondary">All Designs</span>
                  </div>
                  
                  <!-- Top Right Action Buttons -->
                  <div class="carousel-actions-right" @mouseenter="showAllButtons = true" @mouseleave="showAllButtons = false">
                    <button v-show="showAllButtons" class="carousel-action-btn" :class="{ active: likedCarousel }" @click="likedCarousel = !likedCarousel" title="Favorite">
                      <i :class="likedCarousel ? 'bi bi-heart-fill' : 'bi bi-heart'"></i>
                    </button>
                    <button v-show="showAllButtons" class="carousel-action-btn" :class="{ active: favoritedCarousel }" @click="favoritedCarousel = !favoritedCarousel" title="Like">
                      <i :class="favoritedCarousel ? 'bi bi-star-fill' : 'bi bi-star'"></i>
                    </button>
                    <button class="carousel-action-btn carousel-action-share" title="Share">
                      <i class="bi bi-share"></i>
                    </button>
                  </div>
                  
                  <!-- Bottom Center Content -->
                  <div class="carousel-caption-center">
                    <h3 class="carousel-title">Modern Soft Decoration Design · Three-Bedroom Apartment</h3>
                    <p class="carousel-desc">Selected soft decoration cases, professional design, quality assurance. Enjoy a comfortable and stylish home environment.</p>
                    <div class="carousel-buttons">
                      <button class="btn-carousel-secondary">Add to cart</button>
                      <button class="btn-carousel-primary">Buy now</button>
                    </div>
                  </div>
                </div>
                
                <div class="carousel-item">
                  <img src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1920&h=688&fit=crop&q=80" class="d-block w-100" alt="Elegant Bedroom">
                  
                  <div class="carousel-tags-left">
                    <span class="tag-primary">Nordic Style</span>
                    <span class="tag-secondary">90㎡</span>
                    <span class="tag-secondary">Bedroom</span>
                    <span class="tag-secondary">Recommended</span>
                  </div>
                  
                  <div class="carousel-actions-right" @mouseenter="showAllButtons = true" @mouseleave="showAllButtons = false">
                    <button v-show="showAllButtons" class="carousel-action-btn" :class="{ active: likedCarousel }" @click="likedCarousel = !likedCarousel" title="Favorite">
                      <i :class="likedCarousel ? 'bi bi-heart-fill' : 'bi bi-heart'"></i>
                    </button>
                    <button v-show="showAllButtons" class="carousel-action-btn" :class="{ active: favoritedCarousel }" @click="favoritedCarousel = !favoritedCarousel" title="Like">
                      <i :class="favoritedCarousel ? 'bi bi-star-fill' : 'bi bi-star'"></i>
                    </button>
                    <button class="carousel-action-btn carousel-action-share" title="Share">
                      <i class="bi bi-share"></i>
                    </button>
                  </div>
                  
                  <div class="carousel-caption-center">
                    <h3 class="carousel-title">Elegant and Romantic Minimalist Aesthetics</h3>
                    <p class="carousel-desc">The modern minimalist style of Nordic style pursues a design concept of simplicity and brightness.</p>
                    <div class="carousel-buttons">
                      <button class="btn-carousel-secondary">Add to cart</button>
                      <button class="btn-carousel-primary">Buy now</button>
                    </div>
                  </div>
                </div>
                
                <div class="carousel-item">
                  <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1920&h=688&fit=crop&q=80" class="d-block w-100" alt="Luxury Kitchen">
                  
                  <div class="carousel-tags-left">
                    <span class="tag-primary">Light Luxury</span>
                    <span class="tag-secondary">150㎡</span>
                    <span class="tag-secondary">Kitchen</span>
                    <span class="tag-secondary">Popular</span>
                  </div>
                  
                  <div class="carousel-actions-right" @mouseenter="showAllButtons = true" @mouseleave="showAllButtons = false">
                    <button v-show="showAllButtons" class="carousel-action-btn" :class="{ active: likedCarousel }" @click="likedCarousel = !likedCarousel" title="Favorite">
                      <i :class="likedCarousel ? 'bi bi-heart-fill' : 'bi bi-heart'"></i>
                    </button>
                    <button v-show="showAllButtons" class="carousel-action-btn" :class="{ active: favoritedCarousel }" @click="favoritedCarousel = !favoritedCarousel" title="Like">
                      <i :class="favoritedCarousel ? 'bi bi-star-fill' : 'bi bi-star'"></i>
                    </button>
                    <button class="carousel-action-btn carousel-action-share" title="Share">
                      <i class="bi bi-share"></i>
                    </button>
                  </div>
                  
                  <div class="carousel-caption-center">
                    <h3 class="carousel-title">Luxury Kitchen Design · Modern Living Space</h3>
                    <p class="carousel-desc">High-end kitchen design with premium materials and elegant aesthetics for your dream home.</p>
                    <div class="carousel-buttons">
                      <button class="btn-carousel-secondary">Add to cart</button>
                      <button class="btn-carousel-primary">Buy now</button>
                    </div>
                  </div>
                </div>
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#mainCarousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon"></span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#mainCarousel" data-bs-slide="next">
                <span class="carousel-control-next-icon"></span>
              </button>
            </div>
          </div>

          <!-- Product Section Title (outside container) -->
          <h2 class="section-title">Selected Soft Decoration Cases</h2>

          <!-- Product Section Container -->
          <div class="product-section-container">
            <!-- Section Tabs -->
            <div class="section-tabs">
              <a 
                v-for="tab in productTabs" 
                :key="tab.id"
                href="#" 
                class="tab-item" 
                :class="{ active: selectedTab === tab.id }" 
                @click.prevent="selectTab(tab.id)"
              >
                {{ tab.label }}
              </a>
            </div>

            <!-- Product Grid -->
            <div class="product-grid">
            <template v-for="(product, index) in products" :key="product.id">
              <!-- Product Card -->
              <router-link :to="`/case/${product.id}`" class="product-card-link">
                <div class="product-card">
                  <div class="product-image">
                    <img :src="product.image" :alt="product.title">
                  </div>
                  <div class="product-info">
                    <div class="product-price-row">
                      <div class="price-section">
                        <span class="product-price" :class="{ 'has-discount': product.discount }">
                          <span class="currency-symbol">$</span>{{ product.price }}
                        </span>
                        <span v-if="product.originalPrice" class="original-price">was ${{ product.originalPrice }}</span>
                        <span v-if="product.discount" class="discount-badge">{{ product.discount }}% off</span>
                      </div>
                      <div class="product-stats">
                        <span class="stat-item"><i class="bi bi-eye"></i> {{ product.views }}</span>
                        <span class="stat-item"><i class="bi bi-heart"></i> {{ product.likes || '1.2K' }}</span>
                        <span class="stat-item"><i class="bi bi-star"></i> {{ product.favorites || '854' }}</span>
                        <span class="stat-item"><i class="bi bi-share"></i> {{ product.shares || '22' }}</span>
                        <span class="stat-item"><i class="bi bi-cart"></i> {{ product.cart || '12' }}</span>
                      </div>
                    </div>
                    <h6 class="product-title">{{ product.title }}</h6>
                    <p class="product-desc">{{ product.description }}</p>
                    <div class="product-meta">
                      <div class="designer-info">
                        <img :src="product.avatar" :alt="product.designer.name">
                        <span>{{ product.designer.name }}</span>
                      </div>
                    </div>
                    <div class="product-buttons">
                      <button class="btn btn-add-cart" @click.prevent="addToCart(product)">{{ $t('home.addCart') }}</button>
                      <button class="btn btn-buy-now" @click.prevent="buyNow(product)">
                        {{ $t('home.buyNow') }}
                        <i class="bi bi-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </router-link>

              <!-- Promotional Banner (only after 4th product) -->
              <div v-if="index === 3" class="promo-banner">
                <div class="promo-content">
                  <div class="promo-image">
                    <img src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=400&h=300&fit=crop&q=80" alt="Promo">
                  </div>
                  <div class="promo-text">
                    <h4>Promotional discount campaign</h4>
                    <p class="promo-highlight">Limited time discount, starting at 20% off for the entire event</p>
                    <p class="promo-details">Top selling items: Furniture, lighting fixtures, curtain fabrics, fabric sofas, all categories can enjoy a 20% discount and can be stacked for use!</p>
                    <p class="promo-period">
                      <span class="text-highlight">Event time:</span><strong>2026.01.01 ~ 2026.03.10</strong>
                    </p>
                    <p class="promo-howto">
                      <span class="text-highlight">Collection Method:</span><strong>Get a 20 yuan unconditional coupon that can be used in combination! Coupon Code: SALE20</strong>
                    </p>
                    <p class="promo-more"><span class="text-highlight">More activities:</span><strong>Points redemption activity notification</strong></p>
                  </div>
                </div>
                <!-- 装饰图案 -->
                <div class="promo-decoration">
                  <img :src="couponImage" alt="decoration" class="promo-sprite-img" />
                </div>
              </div>
            </template>
          </div>
          </div> <!-- End Product Section Container -->
        </main>
      </div>
    </div>

    <!-- Floating Action Buttons -->
    <FloatingActionButtons />

    <!-- Footer -->
    <footer class="site-footer">
      <div class="container-fluid px-4 py-4">
        <div class="text-center">
          <p class="mb-2">{{ $t('common.copyright') }}</p>
          <p class="mb-0">ICP备案号：京ICP备12345678号</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, onMounted, onBeforeUnmount, computed, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import AboutUsDropdown from '@/components/AboutUsDropdown.vue'
import FloatingActionButtons from '@/components/FloatingActionButtons.vue'
import type { I18nPlugin } from '@/plugins/i18n'
import spriteImage from '@/assets/images/sprites/sprite.png'
import couponImage from '@/assets/images/sprites/coupon.png'

const router = useRouter()
const i18n = inject<I18nPlugin>('i18n')
const instance = getCurrentInstance()

const currentLanguage = ref(i18n?.currentLocale || 'zh')
const componentKey = ref(0)
const sidebarRef = ref<HTMLElement | null>(null)
const sidebarContentRef = ref<HTMLElement | null>(null)
const isSticky = ref(false)

const $t = (key: string) => {
  const _ = currentLanguage.value
  return i18n?.t(key) || key
}

onMounted(() => {
  window.addEventListener('user-web-language-changed', (event: any) => {
    currentLanguage.value = event.detail.locale
    componentKey.value++
    instance?.proxy?.$forceUpdate()
  })

  // 监听滚动事件
  window.addEventListener('scroll', handleScroll)
})

// 处理滚动事件
const handleScroll = () => {
  if (!sidebarRef.value || !sidebarContentRef.value) return

  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const viewportHeight = window.innerHeight
  const headerHeight = 104 // 顶部导航栏高度（40px + 64px）

  // 获取侧边栏容器和内容的位置信息
  const sidebarRect = sidebarRef.value.getBoundingClientRect()
  const sidebarTop = sidebarRect.top + scrollTop
  const sidebarBottom = sidebarRect.bottom + scrollTop
  const contentHeight = sidebarContentRef.value.scrollHeight

  // 计算触发粘性的临界点（内容底部到达视口底部）
  const triggerPoint = contentHeight - viewportHeight + sidebarTop + headerHeight
  
  // 计算菜单栏应该停止固定的点（容器底部）
  const stopPoint = sidebarBottom - viewportHeight + headerHeight

  // 判断是否应该固定
  if (scrollTop >= triggerPoint && scrollTop < stopPoint) {
    // 固定状态
    if (!isSticky.value) {
      isSticky.value = true
      sidebarContentRef.value.style.position = 'fixed'
      sidebarContentRef.value.style.top = `${headerHeight}px`
      sidebarContentRef.value.style.left = '0'
      sidebarContentRef.value.style.width = `${sidebarRef.value.offsetWidth}px`
      sidebarContentRef.value.style.zIndex = '99'
      sidebarContentRef.value.classList.add('sticky-scrollable')
    }
  } else if (scrollTop >= stopPoint) {
    // 到达容器底部，绝对定位在底部
    if (isSticky.value) {
      isSticky.value = false
    }
    sidebarContentRef.value.style.position = 'absolute'
    sidebarContentRef.value.style.top = 'auto'
    sidebarContentRef.value.style.bottom = '0'
    sidebarContentRef.value.style.left = '0'
    sidebarContentRef.value.style.width = `${sidebarRef.value.offsetWidth}px`
    sidebarContentRef.value.style.zIndex = '99'
    sidebarContentRef.value.classList.add('sticky-scrollable')
  } else {
    // 正常状态
    if (isSticky.value) {
      isSticky.value = false
    }
    sidebarContentRef.value.style.position = ''
    sidebarContentRef.value.style.top = ''
    sidebarContentRef.value.style.bottom = ''
    sidebarContentRef.value.style.left = ''
    sidebarContentRef.value.style.width = ''
    sidebarContentRef.value.style.zIndex = ''
    sidebarContentRef.value.classList.remove('sticky-scrollable')
  }
}

// 清理事件监听器
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

// Filter states
const filters = ref({
  styles: [] as string[],
  colors: [] as string[],
  materials: [] as string[],
  tier: '',
  recommendations: [] as string[]
})

// Room selection state
const selectedRoom = ref('all')

// Room navigation items
const roomNavItems = [
  { id: 'all', label: 'All' },
  { id: 'kitchen', label: 'Kitchen' },
  { id: 'bathroom', label: 'Bathroom' },
  { id: 'living', label: 'Living Room' },
  { id: 'bedroom', label: 'Bedroom' },
  { id: 'dining', label: 'Dining Room' },
  { id: 'entrance', label: 'Entrance' },
  { id: 'whole', label: 'Whole House' }
]

// Product tab selection state
const selectedTab = ref('all')

// Product tab items
const productTabs = [
  { id: 'all', label: 'All Designs' },
  { id: 'recommended', label: 'Recommended' },
  { id: 'popular', label: 'Most Popular' },
  { id: 'bestsellers', label: 'Bestsellers' },
  { id: 'special', label: 'Special Offer' }
]

// Color options
const colorOptions = [
  '#e8e8e8',
  '#2c3e50',
  '#7f8c8d',
  '#95a5a6',
  '#a0522d',
  '#27ae60',
  '#3498db',
  '#16a085'
]

// Carousel button states
const likedCarousel = ref(false)
const favoritedCarousel = ref(false)
const showAllButtons = ref(false)

// Select room function
const selectRoom = (room: string) => {
  selectedRoom.value = room
  // 这里可以添加筛选逻辑，根据选中的房间类型过滤商品
  console.log('Selected room:', room)
}

// Select product tab function
const selectTab = (tab: string) => {
  selectedTab.value = tab
  // 这里可以添加筛选逻辑，根据选中的标签过滤商品
  console.log('Selected tab:', tab)
}

// Toggle color selection
const toggleColor = (color: string) => {
  const index = filters.value.colors.indexOf(color)
  if (index > -1) {
    filters.value.colors.splice(index, 1)
  } else {
    filters.value.colors.push(color)
  }
}

// Add to cart
const addToCart = (product: any) => {
  console.log('Add to cart:', product)
  // TODO: Implement add to cart logic
}

// Buy now
const buyNow = (product: any) => {
  console.log('Buy now:', product)
  // TODO: Implement buy now logic
}

// 导入统一的模拟数据
import { getAllProducts } from '@/data/mockData'

// Product data - 使用统一数据源
const baseProducts = getAllProducts()

const products = computed(() => 
  baseProducts.map(product => ({
    ...product,
    designer: {
      name: $t('designer.name'),
      avatar: product.avatar
    }
  }))
)
</script>

<style scoped>
/* 页面整体最小宽度设置 */
.home-page {
  min-width: 1200px;
  overflow-x: auto;
}

/* Top Navigation Bar - Part 1 */
.top-nav-bar {
  background: #333333;
  color: white;
  padding: 0.5rem 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1001;
}

.btn-register {
  background: transparent;
  border: 1px solid white;
  color: white;
  padding: 0.25rem 1rem;
  border-radius: 0.25rem; /* 4px */
  font-size: 0.875rem; /* 14px */
}

.btn-register:hover {
  background: white;
  color: #333333;
}

/* Main Header - Part 2 */
.main-header {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem 0;
  position: fixed;
  top: 2.5rem; /* 40px */
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.05); /* 0 2px 4px */
  margin-bottom: 0;
}

.navbar-brand {
  font-size: 1.5rem; /* 24px */
  font-weight: 700;
  color: #00699A;
  text-decoration: none;
}

.nav-link {
  color: #6b7280;
  text-decoration: none;
  padding: 0.5rem 1rem;
  font-size: 0.9375rem; /* 15px */
  transition: color 0.2s;
}

.nav-link:hover,
.nav-link.active {
  color: #00699A;
}

.search-input {
  width: 18.75rem; /* 300px */
  padding-left: 2.5rem; /* 40px */
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem; /* 4px */
  font-size: 0.875rem; /* 14px */
}

.search-icon {
  position: absolute;
  left: 0.75rem; /* 12px */
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
}

.btn-icon {
  width: 2.5rem; /* 40px */
  height: 2.5rem; /* 40px */
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem; /* 4px */
  background: white;
  color: #6b7280;
  text-decoration: none;
  transition: all 0.2s;
}

.btn-icon:hover {
  background: #f9fafb;
  color: #00699A;
  border-color: #00699A;
}

/* Main Content */
.main-content-wrapper {
  margin-top: 6.5rem; /* 调整为紧贴头部，40px + 64px(header高度) = 104px，约6.5rem */
  padding: 0;
  width: 100%;
  background: #F4F4F4; /* 整体背景色 */
  min-width: 1200px; /* 设置最小宽度，防止过度挤压 */
  overflow-x: auto; /* 小于最小宽度时允许横向滚动 */
}

.content-container {
  display: flex;
  width: 100%;
  min-height: calc(100vh - 6.5rem); /* 调整为匹配新的margin-top */
  background: #F4F4F4; /* 容器背景色 */
}

/* Sidebar Menu */
.sidebar-menu {
  width: 12.5rem; /* 200px */
  background: #F4F4F4;
  border-right: none;
  padding: 0;
  min-height: 100%;
  flex-shrink: 0;
  box-sizing: border-box;
  position: relative; /* 添加相对定位，让子元素的绝对定位相对于它 */
}

.sidebar-content {
  width: 100%;
  padding: 1.5rem 1rem;
  transition: none;
  box-sizing: border-box;
  background: #F4F4F4;
}

.sidebar-content.sticky-scrollable {
  overflow-y: auto;
  overflow-x: hidden;
  max-height: calc(100vh - 6.5rem);
  /* 隐藏滚动条但保持可滚动 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

/* 隐藏 Webkit 浏览器的滚动条 */
.sidebar-content.sticky-scrollable::-webkit-scrollbar {
  display: none;
}

.filter-section {
  margin-bottom: 2rem;
}

.filter-title {
  font-size: 0.9375rem; /* 15px */
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.filter-options {
  display: flex;
  flex-direction: column;
  gap: 0.75rem; /* 12px */
}

.filter-checkbox,
.filter-radio {
  display: flex;
  align-items: center;
  gap: 0.5rem; /* 8px */
  cursor: pointer;
  font-size: 0.875rem; /* 14px */
  color: #6b7280;
  transition: color 0.2s;
}

.filter-checkbox:hover,
.filter-radio:hover {
  color: #00699A;
}

.filter-checkbox input[type="checkbox"],
.filter-radio input[type="radio"] {
  width: 1rem; /* 16px */
  height: 1rem; /* 16px */
  cursor: pointer;
  accent-color: #00699A;
}

.filter-checkbox input[type="checkbox"]:checked + span,
.filter-radio input[type="radio"]:checked + span {
  color: #00699A;
  font-weight: 500;
}

/* Color Grid */
.color-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem; /* 8px */
}

.color-box {
  width: 32px;
  height: 32px;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid #e5e7eb;
  transition: all 0.2s;
  position: relative;
}

.color-box:hover {
  transform: scale(1.1);
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.15); /* 0 2px 8px */
}

.color-box.active {
  border-color: #00699A;
  border-width: 2px;
  box-shadow: 0 0 0 0.125rem rgba(0, 105, 154, 0.2); /* 0 0 0 2px */
}

.color-box.active::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 0.875rem; /* 14px */
  font-weight: bold;
  text-shadow: 0 0 0.125rem rgba(0, 0, 0, 0.5); /* 0 0 2px */
}

/* Content Area */
.content-area {
  flex: 1;
  min-width: 0; /* 防止flex子元素溢出 */
  padding: 0;
  background: #F4F4F4; /* 右侧内容区背景色 */
  overflow-x: hidden;
  width: 100%;
  box-sizing: border-box;
}

/* Room Type Navigation */
.room-nav {
  display: flex;
  align-items: center;
  justify-content: center; /* 水平居中 */
  gap: 2rem; /* 32px */
  padding: 0 2rem; /* 0 top/bottom, 32px left/right */
  margin-bottom: 0;
  height: 4.25rem; /* 68px */
  box-sizing: border-box;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  background: #F4F4F4; /* 导航栏背景色 */
}

.room-nav::-webkit-scrollbar {
  height: 0.25rem; /* 4px */
}

.room-nav::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.room-nav::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 0.125rem; /* 2px */
}

.room-nav-item {
  font-family: Inter, sans-serif;
  font-size: 1rem; /* 16px */
  font-weight: 400;
  line-height: 1.25rem; /* 20px */
  letter-spacing: 0;
  color: #333333;
  text-decoration: none;
  padding-bottom: 0.5rem; /* 8px 为下划线留空间 */
  border-bottom: none;
  transition: all 0.2s;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  position: relative;
}

.room-nav-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0.25rem; /* 4px */
  background-color: #00699A;
  transition: width 0.2s;
}

.room-nav-item:hover {
  color: #00699A;
}

.room-nav-item.active {
  color: #00699A;
}

.room-nav-item.active::after {
  width: 0.509rem; /* 8.14px */
}

/* Carousel */
.carousel-section {
  border-radius: 0;
  overflow: hidden;
  box-shadow: none;
  margin-bottom: 0;
  margin-top: 0; /* 移除顶部间距 */
  position: relative;
}

.carousel-inner {
  position: relative;
}

.carousel-inner img {
  height: 43rem; /* 688px */
  object-fit: cover;
}

/* Top Left Tags */
.carousel-tags-left {
  position: absolute;
  top: 1.5rem; /* 24px */
  left: 1.5rem; /* 24px */
  display: flex;
  gap: 0.25rem; /* 4px */
  z-index: 10;
}

.tag-primary,
.tag-secondary {
  background: rgba(0, 0, 0, 0.2); /* #000000 with 20% opacity */
  color: #FFFFFF;
  padding: 0.3125rem 0.5rem; /* 5px 8px */
  border-radius: 0.25rem; /* 4px */
  font-family: Arial, sans-serif;
  font-size: 0.875rem; /* 14px */
  font-weight: 400;
  line-height: 1.375rem; /* 22px */
  letter-spacing: 0;
  white-space: nowrap;
}

/* Top Right Action Buttons */
.carousel-actions-right {
  position: absolute;
  top: 1.5rem; /* 24px */
  right: 1.5rem; /* 24px */
  display: flex;
  flex-direction: row; /* 水平并排展示 */
  gap: 0.625rem; /* 10px */
  z-index: 10;
}

.carousel-action-btn {
  width: 2rem; /* 32px */
  height: 2rem; /* 32px */
  border-radius: 1.125rem; /* 18px */
  background: rgba(255, 255, 255, 0.8); /* #FFFFFF 80% */
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  padding: 0.5rem; /* 8px */
  font-size: 1rem; /* 16px */
}

.carousel-action-btn i {
  color: #333333; /* 默认图标颜色 */
  transition: color 0.3s;
}

/* 悬停按钮时图标颜色变化 */
.carousel-action-btn:hover {
  background: rgba(255, 255, 255, 1);
  transform: scale(1.1);
}

.carousel-action-btn:hover i {
  color: #00699A;
}

/* 激活状态（点击后）图标填充颜色 */
.carousel-action-btn.active i {
  color: #00699A;
}

/* Bottom Center Caption */
.carousel-caption-center {
  position: absolute;
  bottom: 3.625rem; /* 58px */
  left: 50%;
  transform: translateX(-50%); /* 只水平居中 */
  text-align: center;
  z-index: 10;
  max-width: 87rem; /* 1392px */
  width: auto; /* Hug content */
  display: flex;
  flex-direction: column; /* Vertical */
  gap: 1rem; /* 16px */
  align-items: center;
}

.carousel-title {
  font-family: Inter, sans-serif;
  font-size: 2.25rem; /* 36px */
  font-weight: 700;
  line-height: 2.5rem; /* 40px */
  letter-spacing: 0;
  color: #FFFFFF;
  margin-bottom: 0;
  text-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.5); /* 0 2px 4px */
  display: flex;
  align-items: center; /* Vertical alignment: Middle */
}

.carousel-desc {
  font-family: Inter, sans-serif;
  font-size: 1rem; /* 16px */
  font-weight: 400;
  line-height: 1.25rem; /* 20px */
  letter-spacing: 0;
  text-align: center; /* Horizontal alignment: Center */
  color: #FFFFFF;
  margin-bottom: 0;
  text-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.5); /* 0 2px 4px */
  display: flex;
  align-items: center; /* Vertical alignment: Middle */
  justify-content: center;
}

.carousel-buttons {
  display: flex;
  gap: 1rem; /* 16px */
  justify-content: center;
}

.btn-carousel-secondary {
  padding: 0.625rem 1.5rem; /* 10px 24px */
  background: transparent; /* 透明背景 */
  border: 1px solid white;
  color: #FFFFFF;
  border-radius: 0.25rem; /* 4px */
  font-family: Inter, sans-serif;
  font-size: 0.875rem; /* 14px */
  font-weight: 400;
  line-height: 1.125rem; /* 18px */
  letter-spacing: 0;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center; /* Vertical alignment: Middle */
  justify-content: center;
}

.btn-carousel-secondary:hover {
  background: rgba(255, 255, 255, 0.1); /* 悬停时轻微背景 */
  transform: translateY(-0.125rem); /* -2px */
}

.btn-carousel-primary {
  padding: 0.625rem 1.5rem; /* 10px 24px */
  background: #00699A;
  border: 1px solid #00699A;
  color: #FFFFFF;
  border-radius: 0.25rem; /* 4px */
  font-family: Inter, sans-serif;
  font-size: 0.875rem; /* 14px */
  font-weight: 400;
  line-height: 1.125rem; /* 18px */
  letter-spacing: 0;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center; /* Vertical alignment: Middle */
  justify-content: center;
}

.btn-carousel-primary:hover {
  background: #005580;
  border-color: #005580;
  transform: translateY(-0.125rem); /* -2px */
}

.carousel-caption {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 100%);
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  text-align: left;
}

.carousel-caption h3 {
  font-size: 1.75rem; /* 28px */
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.carousel-caption p {
  font-size: 1rem; /* 16px */
  margin-bottom: 1rem;
}

/* Product Section Title (outside container) */
.section-title {
  font-family: 'Abril Fatface', serif;
  font-size: 1.5rem; /* 24px */
  font-weight: 400;
  line-height: 2.75rem; /* 44px */
  letter-spacing: 0;
  color: #333333;
  text-align: center;
  margin: 2rem 0 1.5rem 0; /* 32px top, 24px bottom */
  display: flex;
  align-items: center; /* Vertical alignment: Middle */
  justify-content: center;
}

/* Product Section Container (white background with margin) */
.product-section-container {
  background: #FFFFFF;
  margin: 0 1.5rem; /* 24px left/right margin only */
  padding: 0;
}

/* Section Tabs */
.section-tabs {
  display: flex;
  flex-direction: row; /* Horizontal */
  justify-content: center;
  align-items: center;
  gap: 2rem; /* 32px */
  flex-wrap: wrap;
  width: 100%; /* Fill */
  height: auto; /* Hug content */
  padding: 1.5rem 0; /* 24px top/bottom, 0 left/right */
  margin: 0; /* 去除外边距 */
}

.tab-item {
  font-family: Inter, sans-serif;
  font-size: 1rem; /* 16px */
  font-weight: 400;
  line-height: 1.25rem; /* 20px */
  letter-spacing: 0;
  color: #333333;
  text-decoration: none;
  padding: 0.5rem 0;
  transition: all 0.3s;
  display: flex;
  align-items: center; /* Vertical alignment: Middle */
  position: relative;
}

.tab-item:hover {
  color: #333333;
}

.tab-item.active {
  color: #333333;
  font-weight: 400; /* 保持字重不变 */
}

/* 使用text-shadow模拟加粗效果，避免布局抖动 */
.tab-item.active {
  text-shadow: 0 0 0.3px #333333, 0 0 0.3px #333333;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: -0.625rem; /* -10px，向下偏移10px */
  left: 50%;
  transform: translateX(-50%);
  width: 2.25rem; /* 36px */
  height: 0.25rem; /* 4px */
  background-color: #D15500;
}

/* Product Grid */
.product-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem; /* 16px */
  padding: 1.5rem; /* 24px */
  background: #FFFFFF; /* 白色背景 */
  min-width: 0; /* 允许网格项收缩 */
}

.product-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.product-card {
  min-width: 0; /* 允许卡片收缩 */
  background: white;
  border: 0.0625rem solid #E5E6E8; /* 1px */
  border-radius: 0.25rem; /* 4px */
  overflow: hidden;
  transition: all 0.3s;
  cursor: pointer;
  display: flex;
  flex-direction: column; /* Vertical */
  gap: 1rem; /* 16px */
  width: 100%; /* 自适应容器宽度 */
  height: auto; /* Hug content */
}

.product-card:hover {
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.1); /* 0 4px 12px */
  transform: translateY(-0.125rem); /* -2px */
}

.product-image {
  position: relative;
  width: 100%; /* 填满容器宽度 */
  height: 20rem; /* 320px */
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.product-info {
  padding: 0 1.5rem 1.5rem 1.5rem; /* 0 top, 24px right/bottom/left */
}

.product-price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: clamp(6px, 0.8vw, 8px);
}

.price-section {
  display: flex;
  align-items: center;
  gap: clamp(6px, 0.8vw, 8px);
}

.product-price {
  font-family: Inter, sans-serif;
  font-size: clamp(20px, 2.2vw, 24px);
  font-weight: 700;
  line-height: clamp(24px, 2.6vw, 28px);
  letter-spacing: 0;
  color: #333333;
  display: flex;
  align-items: center;
}

.product-price.has-discount {
  color: #8B2C00;
}

.product-price.has-discount .currency-symbol {
  color: #8B2C00;
}

.currency-symbol {
  font-family: Inter, sans-serif;
  font-size: clamp(16px, 1.8vw, 20px);
  font-weight: 700;
  line-height: clamp(32px, 3.5vw, 40px);
  letter-spacing: 0;
  color: #333333;
}

.original-price {
  font-family: Inter, sans-serif;
  font-size: clamp(14px, 1.4vw, 16px);
  font-weight: 700;
  line-height: clamp(18px, 1.8vw, 20px);
  letter-spacing: 0;
  color: #333333;
  text-decoration: line-through;
}

.discount-badge {
  background: #8B2C00 !important;
  color: #FFFFFF !important;
  padding: clamp(2px, 0.3vw, 3px) clamp(6px, 0.8vw, 8px) !important;
  border-radius: clamp(3px, 0.4vw, 4px) !important;
  font-family: Arial, sans-serif !important;
  font-size: clamp(12px, 1.2vw, 14px) !important;
  font-weight: 400 !important;
  line-height: clamp(18px, 1.8vw, 22px) !important;
  letter-spacing: 0 !important;
  display: inline-flex !important;
  align-items: center !important;
  white-space: nowrap !important;
}

.product-stats {
  display: flex;
  align-items: center;
  gap: clamp(12px, 1.5vw, 16px);
}

.stat-item {
  display: inline-flex;
  align-items: center;
  gap: clamp(3px, 0.4vw, 4px);
  font-family: Inter, sans-serif;
  font-size: clamp(12px, 1.2vw, 14px);
  font-weight: 400;
  line-height: clamp(16px, 1.6vw, 18px);
  letter-spacing: 0;
  color: #5C5C5C;
}

.stat-item i {
  font-size: clamp(16px, 1.6vw, 18px);
  width: clamp(16px, 1.6vw, 18px);
  height: clamp(16px, 1.6vw, 18px);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.product-title {
  font-family: Inter, sans-serif;
  font-size: clamp(14px, 1.4vw, 16px);
  font-weight: 700;
  line-height: clamp(18px, 1.8vw, 20px);
  letter-spacing: 0;
  color: #333333;
  margin-bottom: clamp(6px, 0.8vw, 8px);
  display: flex;
  align-items: center;
}

.product-desc {
  font-family: Inter, sans-serif;
  font-size: clamp(12px, 1.2vw, 14px);
  font-weight: 400;
  line-height: clamp(16px, 1.6vw, 18px);
  letter-spacing: 0;
  color: #333333;
  margin-bottom: clamp(10px, 1.2vw, 12px);
  display: flex;
  align-items: center;
}

.product-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: clamp(10px, 1.2vw, 12px);
  padding-bottom: 0;
  border-bottom: none;
}

.designer-info {
  display: flex;
  align-items: center;
  gap: clamp(6px, 0.8vw, 8px);
}

.designer-info img {
  width: clamp(20px, 2.2vw, 24px);
  height: clamp(20px, 2.2vw, 24px);
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.designer-info span {
  font-family: Inter, sans-serif;
  font-size: clamp(12px, 1.2vw, 14px);
  font-weight: 400;
  line-height: clamp(16px, 1.6vw, 18px);
  letter-spacing: 0;
  color: #00699A;
  display: inline-flex;
  align-items: center;
}

.product-stats {
  display: flex;
  gap: 0.75rem; /* 12px */
  font-size: 0.875rem; /* 14px */
  color: #9ca3af;
}

.product-buttons {
  display: flex;
  gap: 0.625rem; /* 10px */
  align-items: center;
}

.btn-add-cart {
  flex: 0 0 auto;
  width: auto; /* Hug (107px) */
  min-width: 6.6875rem; /* 107px */
  height: 2rem; /* 32px - Fill height */
  padding: 0.3125rem 1rem; /* 5px top/bottom, 16px left/right */
  border: 1px solid #00699A;
  background: white;
  color: #00699A;
  border-radius: 0.5rem; /* 8px */
  font-family: Inter, sans-serif;
  font-size: 0.875rem; /* 14px */
  font-weight: 400;
  line-height: 1.375rem; /* 22px */
  letter-spacing: 0;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center; /* Vertical alignment: Middle */
  justify-content: center;
  white-space: nowrap;
}

.btn-add-cart:hover {
  /* 移除背景色变化 */
}

.btn-buy-now {
  flex: 0 0 auto;
  width: auto; /* Hug (107px) */
  min-width: 6.6875rem; /* 107px */
  height: 2rem; /* 32px - Fill height */
  padding: 0.3125rem 1rem; /* 5px top/bottom, 16px left/right */
  border: none;
  background: #00699A;
  color: #FFFFFF;
  border-radius: 0.5rem; /* 8px */
  font-family: Inter, sans-serif;
  font-size: 0.875rem; /* 14px */
  font-weight: 400;
  line-height: 1.375rem; /* 22px */
  letter-spacing: 0;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center; /* Vertical alignment: Middle */
  justify-content: center;
  gap: 0.5rem; /* 8px */
  white-space: nowrap;
}

.btn-buy-now:hover {
  background: #005580;
}

.btn-buy-now i {
  font-size: 1.125rem; /* 18px */
}

.btn-icon-favorite {
  display: none; /* 隐藏星形按钮 */
}

/* Promotional Banner */
.promo-banner {
  grid-column: 1 / -1;
  background: linear-gradient(to bottom right, #F29265 0%, #8B2C00 30%, #8B2C00 100%);
  border-radius: 0.5rem; /* 8px */
  overflow: hidden; /* 改回hidden */
  box-shadow: 0 0.25rem 0.75rem rgba(139, 44, 0, 0.3); /* 0 4px 12px */
  width: 100%; /* 铺满容器 */
  min-width: 0; /* 允许收缩 */
  position: relative; /* 为装饰图案定位 */
}

/* 右侧装饰图案 - 使用雪碧图背景 */
.promo-decoration {
  position: absolute;
  top: 0;
  right: 0;
  width: 22.5625rem; /* 361px */
  height: 18.125rem; /* 290px */
  opacity: 0.2; /* 20% */
  pointer-events: none;
  z-index: 10;
  overflow: hidden;
}

.promo-sprite-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}

.promo-content {
  position: relative;
  z-index: 1; /* 确保内容在装饰图案下方 */
  display: flex;
  align-items: center;
  padding: clamp(1rem, 2vw, 1.5rem); /* 响应式内边距：最小16px，最大24px */
  gap: clamp(0.5rem, 1.5vw, 1rem); /* 响应式间距：最小8px，最大16px */
  min-width: 0; /* 允许收缩 */
}

.promo-image {
  flex-shrink: 0;
  width: clamp(300px, 40%, 34.6875rem); /* 响应式宽度：最小300px，最大555px */
  min-width: 250px; /* 设置最小宽度，防止过度挤压 */
  height: clamp(10rem, 15vw, 13.875rem); /* 响应式高度：最小160px，最大222px */
  border-radius: 0.375rem; /* 6px */
  overflow: hidden;
}

.promo-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.promo-text {
  flex: 1;
  color: white;
  min-width: 0; /* 允许收缩 */
  overflow: hidden; /* 防止内容溢出 */
}

.promo-text h4 {
  font-family: Inter, sans-serif;
  font-size: clamp(1.5rem, 4vw, 3rem); /* 响应式字体：最小24px，最大48px */
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: 0;
  color: #FFFFFF;
  margin-bottom: 0.75rem; /* 12px */
  display: flex;
  align-items: center; /* Vertical alignment: Middle */
  word-wrap: break-word; /* 允许长单词换行 */
}

.promo-highlight {
  font-family: Arial, sans-serif;
  font-size: clamp(0.75rem, 1.5vw, 0.875rem); /* 响应式字体：最小12px，最大14px */
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0;
  margin-bottom: 0.5rem; /* 8px */
  background: #D17B1F;
  color: #FFFFFF;
  padding: 0.3125rem 0.5rem; /* 5px 8px */
  border-radius: 0.25rem; /* 4px */
  display: inline-block;
  width: auto; /* Hug content */
}

.promo-details,
.promo-period,
.promo-howto,
.promo-more {
  font-family: Inter, sans-serif;
  font-size: clamp(0.75rem, 1.5vw, 0.875rem); /* 响应式字体：最小12px，最大14px */
  font-weight: 400;
  line-height: 1.3;
  letter-spacing: 0;
  color: #FFFFFF;
  margin-bottom: 0.75rem; /* 12px - 行间距 */
  word-wrap: break-word; /* 允许长单词换行 */
  display: block; /* 改为block，让内容自然排列 */
}

.promo-details:last-child,
.promo-period:last-child,
.promo-howto:last-child,
.promo-more:last-child {
  margin-bottom: 0; /* 最后一行不需要底部间距 */
}

/* 具体内容文本（时间、优惠券等）使用加粗样式 */
.promo-period strong,
.promo-howto strong,
.promo-more strong {
  font-family: Inter, sans-serif;
  font-size: 1rem; /* 16px */
  font-weight: 700;
  line-height: 1.25rem; /* 20px */
  letter-spacing: 0;
  color: #FFFFFF;
  margin-left: 0.75rem; /* 12px - 在strong标签前添加间距 */
}

.text-highlight {
  font-family: Inter, sans-serif;
  font-size: 0.875rem; /* 14px */
  font-weight: 400;
  line-height: 1.125rem; /* 18px */
  letter-spacing: 0;
  color: #FFFFFF;
  display: inline-flex;
  align-items: center; /* Vertical alignment: Middle */
}

/* Footer */
.site-footer {
  background: #333333;
  color: white;
  margin-top: 3rem; /* 48px */
}

.site-footer p {
  font-size: 0.875rem; /* 14px */
  color: #9ca3af;
}

/* Responsive */
@media (max-width: 768px) {
  .content-container {
    flex-direction: column;
  }
  
  .sidebar-menu {
    width: 100%;
    min-height: auto;
    border-right: none;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .product-grid {
    grid-template-columns: 1fr;
  }
  
  .promo-content {
    flex-direction: column;
  }
  
  .promo-image {
    width: 100%;
  }
}
</style>


/* Floating Action Buttons */
.home-page .floating-actions {
  position: fixed !important;
  right: clamp(16px, 1.25vw, 24px) !important;
  bottom: clamp(60px, 4.17vw, 80px) !important;
  display: flex !important;
  flex-direction: column !important;
  flex-wrap: nowrap !important;
  gap: clamp(16px, 1.17vw, 22.5px) !important;
  z-index: 1000 !important;
  width: auto !important;
  height: auto !important;
}

.home-page .floating-btn {
  width: clamp(48px, 3.75vw, 72px) !important;
  height: clamp(48px, 3.75vw, 72px) !important;
  min-width: clamp(48px, 3.75vw, 72px) !important;
  min-height: clamp(48px, 3.75vw, 72px) !important;
  border-radius: clamp(24px, 2.11vw, 40.5px) !important;
  background: #FFFFFF !important;
  border: 1px solid #E5E7EB !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  cursor: pointer !important;
  transition: all 0.3s !important;
  box-shadow: 0 clamp(1px, 0.1vw, 2px) clamp(4px, 0.42vw, 8px) rgba(0, 0, 0, 0.15) !important;
  padding: clamp(12px, 0.94vw, 18px) !important;
  margin: 0 !important;
  flex-shrink: 0 !important;
}

.home-page .floating-btn i {
  font-size: clamp(24px, 1.875vw, 36px) !important;
  color: #00699A !important;
  transition: color 0.3s !important;
  width: clamp(24px, 1.875vw, 36px) !important;
  height: clamp(24px, 1.875vw, 36px) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  line-height: 1 !important;
}

.home-page .floating-btn .back-to-top-icon {
  width: clamp(24px, 1.875vw, 36px) !important;
  height: clamp(24px, 1.875vw, 36px) !important;
  color: #FFFFFF !important;
  transition: color 0.3s !important;
  display: block !important;
}

.home-page .floating-btn:hover {
  background: #F5F5F5 !important;
  transform: scale(1.05) !important;
  box-shadow: 0 clamp(2px, 0.21vw, 4px) clamp(8px, 0.63vw, 12px) rgba(0, 0, 0, 0.2) !important;
}

.home-page .floating-btn.active i {
  color: #00699A !important;
}

.home-page .floating-btn:last-child {
  background: #333333 !important;
  border: none !important;
}

.home-page .floating-btn:last-child i {
  color: #FFFFFF !important;
}

.home-page .floating-btn:last-child:hover {
  background: #000000 !important;
}

@media (max-width: 768px) {
  .home-page .floating-actions {
    right: clamp(12px, 2.08vw, 16px) !important;
    bottom: clamp(48px, 8.33vw, 64px) !important;
  }
  
  .home-page .floating-btn {
    width: clamp(40px, 6.25vw, 48px) !important;
    height: clamp(40px, 6.25vw, 48px) !important;
    min-width: clamp(40px, 6.25vw, 48px) !important;
    min-height: clamp(40px, 6.25vw, 48px) !important;
  }
  
  .home-page .floating-btn i {
    font-size: clamp(16px, 2.34vw, 18px) !important;
  }
}


<style>
/* Global Floating Action Buttons - Not Scoped */
.floating-actions {
  position: fixed;
  right: clamp(16px, 1.25vw, 24px);
  bottom: clamp(60px, 4.17vw, 80px);
  display: flex;
  flex-direction: column;
  gap: clamp(16px, 1.17vw, 22.5px);
  z-index: 9999;
}

.floating-btn {
  width: clamp(48px, 3.75vw, 72px);
  height: clamp(48px, 3.75vw, 72px);
  border-radius: clamp(24px, 2.11vw, 40.5px);
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 clamp(1px, 0.1vw, 2px) clamp(4px, 0.42vw, 8px) rgba(0, 0, 0, 0.15);
  padding: clamp(12px, 0.94vw, 18px);
}

.floating-btn i {
  font-size: clamp(24px, 1.875vw, 36px);
  color: #00699A;
  width: clamp(24px, 1.875vw, 36px);
  height: clamp(24px, 1.875vw, 36px);
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.floating-btn .back-to-top-icon {
  width: clamp(24px, 1.875vw, 36px);
  height: clamp(24px, 1.875vw, 36px);
  color: #FFFFFF;
  transition: color 0.3s;
  display: block;
}

.floating-btn:hover {
  background: #F5F5F5;
  transform: scale(1.05);
  box-shadow: 0 clamp(2px, 0.21vw, 4px) clamp(8px, 0.63vw, 12px) rgba(0, 0, 0, 0.2);
}

.floating-btn.active i {
  color: #00699A;
}

.floating-btn:last-child {
  background: #333333;
  border: none;
}

.floating-btn:last-child i {
  color: #FFFFFF;
}

.floating-btn:last-child:hover {
  background: #000000;
}
</style>
