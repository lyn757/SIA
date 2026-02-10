<template>
  <div class="case-detail-page">
    <!-- Header -->
    <Header />

    <!-- Breadcrumb -->
    <div class="breadcrumb-section">
      <div class="container-fluid px-4 py-3">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item"><router-link to="/">{{ $t('nav.home') }}</router-link></li>
            <li class="breadcrumb-item active">{{ productTitle }}</li>
          </ol>
        </nav>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container-fluid pb-5">
      <div class="main-content-container">
        <div class="row gx-4">
          <!-- Left: Image Gallery -->
          <div class="col-left">
            <div class="image-gallery">
              <div class="gallery-layout">
                <!-- Thumbnail List (Left) -->
                <div class="thumbnail-container">
                  <div class="thumbnail-list" ref="thumbnailListRef">
                    <div 
                      v-for="(img, index) in productImages" 
                      :key="index"
                      class="thumbnail-item"
                      :class="{ active: selectedImage === img }"
                      @click="selectedImage = img"
                    >
                      <img :src="img" alt="Thumbnail">
                    </div>
                  </div>
                </div>
                
                <!-- Main Image (Right) -->
                <div class="main-image">
                  <img :src="selectedImage" alt="Product">
                </div>
              </div>
            </div>

            <!-- Tabs Section -->
            <div class="case-tabs">
              <div class="tab-buttons">
                <button 
                  class="tab-btn" 
                  :class="{ active: activeTab === 'product' }"
                  @click="activeTab = 'product'"
                >
                  Case Product
                </button>
                <button 
                  class="tab-btn" 
                  :class="{ active: activeTab === 'inspiration' }"
                  @click="activeTab = 'inspiration'"
                >
                  Design Inspiration
                </button>
                <button 
                  class="tab-btn" 
                  :class="{ active: activeTab === 'review' }"
                  @click="activeTab = 'review'"
                >
                  Case Review
                </button>
              </div>

              <!-- Tab Content -->
              <div class="tab-content">
                <!-- Case Product Tab -->
                <div v-if="activeTab === 'product'" class="kiro-tab-pane">
                  <div class="product-grid-2col">
                    <div class="product-card-detail" v-for="item in caseProducts" :key="item.id">
                      <div class="product-card-image">
                        <img :src="item.image" :alt="item.name">
                      </div>
                      <div class="product-card-info">
                        <h4 class="product-card-name">{{ item.name }}</h4>
                        <div class="product-card-row">
                          <span class="label">Price:</span>
                          <span class="value price" v-if="item.price">${{ item.price }}</span>
                          <span class="value price" v-else>-</span>
                        </div>
                        <div class="product-card-row">
                          <span class="label">Color:</span>
                          <span class="value">{{ item.color }}</span>
                        </div>
                        <div class="product-card-row">
                          <span class="label">Size:</span>
                          <span class="value">{{ item.size }}</span>
                        </div>
                        <div class="product-card-row">
                          <span class="label">Material:</span>
                          <span class="value">{{ item.material }}</span>
                        </div>
                        <p class="product-card-desc">{{ item.description }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Design Inspiration Tab -->
                <div v-if="activeTab === 'inspiration'" class="kiro-tab-pane">
                  <div class="inspiration-content">
                    <h3 class="inspiration-title">Design inspiration</h3>
                    <p class="inspiration-intro">The overall design is dominated by warm wooden elements, paired with a soft beige color scheme, creating a comfortable and cozy Nordic style bedroom. The design inspiration for this space comes from the natural scenery of Scandinavia, pursuing a simple yet not simplistic aesthetic of life.</p>
                    
                    <div class="inspiration-detail">
                      <div class="detail-row">
                        <span class="detail-label">color matching:</span>
                        <span class="detail-text">Mainly in beige and natural wood colors, with a small amount of gray and green plant accents</span>
                      </div>
                      <div class="detail-row">
                        <span class="detail-label">Material Selection:</span>
                        <span class="detail-text">Natural wood, cotton and linen fabric, wool carpet</span>
                      </div>
                      <div class="detail-row">
                        <span class="detail-label">spatial characteristics:</span>
                        <span class="detail-text">Open and bright, with simple lines and practical functions</span>
                      </div>
                      <div class="detail-row">
                        <span class="detail-label">Designer's suggestion:</span>
                        <span class="detail-text">Soft decoration color matching can be adjusted according to personal preferences, and adding green plants can make the space more vibrant.</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Case Review Tab -->
                <div v-if="activeTab === 'review'" class="kiro-tab-pane">
                  <div class="review-content">
                    <h3 class="review-title">Case Review ({{ totalReviews }}+)</h3>
                    
                    <div class="review-list">
                      <div class="review-item" v-for="review in displayedReviews" :key="review.id">
                        <div class="review-header">
                          <img :src="review.avatar" alt="User Avatar" class="review-avatar">
                          <span class="review-username">{{ review.username }}</span>
                        </div>
                        <p class="review-text">{{ review.text }}</p>
                        <div class="review-images" v-if="review.images && review.images.length > 0">
                          <img v-for="(img, index) in review.images" :key="index" :src="img" alt="Review Image">
                        </div>
                      </div>
                    </div>
                    
                    <div class="view-more-container" v-if="hasMoreReviews">
                      <div class="view-more-line"></div>
                      <button class="view-more-btn" @click="loadMoreReviews">View more</button>
                      <div class="view-more-line"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right: Product Info -->
          <div class="col-right">
            <div class="product-info">
              <h1 class="product-title">{{ productTitle }}</h1>
            
              <!-- Rating -->
              <div class="rating-section">
                <div class="stars">
                  <i class="bi bi-star-fill" v-for="n in 5" :key="n"></i>
                </div>
                <span class="rating-score">5.0</span>
                <a href="#" class="view-reviews-link">View all reviews</a>
              </div>

              <!-- Price and Designer -->
              <div class="price-designer-row">
                <span class="current-price">$405</span>
                <span class="designer-info">Designer: Nancy</span>
              </div>

              <!-- Service Options Title -->
              <h3 class="service-title">service options</h3>

              <!-- Design Drawings Option -->
              <div class="service-option">
                <div class="option-header">
                  <label class="option-checkbox">
                    <input type="checkbox" v-model="services.designDrawings">
                    <span>design drawings</span>
                  </label>
                  <span class="option-price">$399.00</span>
                </div>
              </div>

              <!-- Purchase Materials Option -->
              <div class="service-option">
                <div class="option-header">
                  <label class="option-checkbox">
                    <input type="checkbox" v-model="services.purchaseMaterials">
                    <span>Purchase materials</span>
                  </label>
                  <span class="option-price">$5,460.00</span>
                </div>
                <div v-if="services.purchaseMaterials" class="option-details">
                  <div class="delivery-date">Expected delivery date: 2026-02-20</div>
                  
                  <!-- Materials Table -->
                  <table class="materials-table">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in materials" :key="item.id">
                        <td><input type="checkbox" v-model="item.selected"></td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.quantity }}</td>
                        <td>${{ item.price }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Purchase Construction Option -->
              <div class="service-option">
                <div class="option-header">
                  <label class="option-checkbox">
                    <input type="checkbox" v-model="services.purchaseConstruction">
                    <span>Purchase construction</span>
                  </label>
                  <span class="option-price">$1,200.00</span>
                </div>
                <div v-if="services.purchaseConstruction" class="option-details">
                  <div class="date-picker">
                    <input type="date" placeholder="*Select construction date">
                  </div>
                </div>
              </div>

              <!-- Total Price Section -->
              <div class="total-price-section">
                <h4 class="total-title">Total Price</h4>
                <div class="price-row">
                  <span>Shipping:</span>
                  <span>-</span>
                </div>
                <div class="price-row">
                  <span>Tax:</span>
                  <span>-</span>
                </div>
                <div class="price-row total-row">
                  <span>Order Total:</span>
                  <span>-</span>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="action-buttons">
                <button class="btn btn-redesign">Redesign</button>
                <button class="btn btn-add-cart">Add to Cart</button>
                <button class="btn btn-buy-now">Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, inject, onMounted, getCurrentInstance } from 'vue'
import { useRoute } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import type { I18nPlugin } from '@/plugins/i18n'

const route = useRoute()
const i18n = inject<I18nPlugin>('i18n')
const instance = getCurrentInstance()
const currentLanguage = ref(i18n?.currentLocale || 'zh')
const componentKey = ref(0)

const $t = (key: string) => {
  const _ = currentLanguage.value
  return i18n?.t(key) || key
}

// Product data
const productImages = ref([
  'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&h=600&fit=crop&q=80',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop&q=80',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&q=80',
  'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop&q=80',
  'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop&q=80',
  'https://images.unsplash.com/photo-1600566752229-250ed79470e6?w=800&h=600&fit=crop&q=80',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&q=80',
])

const selectedImage = ref(productImages.value[0])
const quantity = ref(1)
const productTitle = ref('Warm wooden Nordic kitchen')
const thumbnailListRef = ref<HTMLElement | null>(null)
const activeTab = ref('product')

// Service options
const services = ref({
  designDrawings: false,
  purchaseMaterials: false,
  purchaseConstruction: false
})

// Materials list
const materials = ref([
  { id: 1, name: 'Kitchen cabinet', quantity: 1, price: 1500, selected: true },
  { id: 2, name: 'Wall cabinet', quantity: 1, price: 800, selected: true },
  { id: 3, name: 'Solid wood flooring', quantity: 1, price: 2300, selected: true },
  { id: 4, name: 'Three trees painted', quantity: 1, price: 300, selected: true },
  { id: 5, name: 'All wood coffee table', quantity: 1, price: 500, selected: true },
  { id: 6, name: 'Cloud small round stool There are many styles of text available', quantity: 10, price: 60, selected: true }
])

// Case products data
const caseProducts = ref([
  {
    id: 1,
    name: 'White birch sofa',
    price: 1000,
    color: 'beige',
    size: 'Double seat+Noble Consort seat+Single seat',
    material: 'Fabric + Solid Wood',
    description: 'This white birch sofa is made of high-density sponge and high-quality fabric, providing excellent comfort. Solid wood frame structure is stable, Nordic minimalist design, suitable for various home styles',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop&q=80'
  },
  {
    id: 2,
    name: 'Cloud Small Circle',
    price: null,
    color: 'beige',
    size: 'Double seat+Noble Consort seat+Single seat',
    material: 'Fabric + Solid Wood',
    description: 'This white birch sofa is made of high-density sponge and high-quality fabric, providing excellent comfort. Solid wood frame structure is stable, Nordic minimalist design, suitable for various home styles',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=300&fit=crop&q=80'
  },
  {
    id: 3,
    name: 'All wood small desk',
    price: null,
    color: 'beige',
    size: '120cm in length, 60cm in width, and 45cm in height',
    material: 'ash',
    description: 'This white birch sofa is made of high-density sponge and high-quality fabric, providing excellent comfort. Solid wood frame structure is stable, Nordic minimalist design, suitable for various home styles',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=300&fit=crop&q=80'
  },
  {
    id: 4,
    name: 'desk lamp',
    price: 50,
    color: 'Rice white+gray',
    size: 'Double seat+Noble Consort seat+Single seat',
    material: 'wool',
    description: 'This white birch sofa is made of high-density sponge and high-quality fabric, providing excellent comfort. Solid wood frame structure is stable, Nordic minimalist design, suitable for various home styles',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop&q=80'
  }
])

// Case reviews data
const allReviews = ref([
  {
    id: 1,
    username: 'Username',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1',
    text: 'I really like our newly purchased bedroom furniture set! The gray metal frame is both stylish and has a soft touch. After two months of use (including children jumping off the bed and dogs taking a nap), it still looks brand new. The craftsman style headboard is very elegant, and the black bracket is super sturdy. The assembly is very simple, my husband and I took about 45 minutes. The only minor drawback is that the bed board can be a bit more sturdy, but at this price point, it is definitely the most cost-effective choice we have found. I have already recommended it to my friends!',
    images: []
  },
  {
    id: 2,
    username: 'Username',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user2',
    text: '',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop&q=80',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=200&h=200&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200&h=200&fit=crop&q=80'
    ]
  },
  {
    id: 3,
    username: 'Username',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user3',
    text: 'This industrial style floor lamp is definitely the focus - the black iron structure feels very sturdy and won\'t shake at all. The adjustable lamp arm is perfect for directing light to where it is needed (we use it to read on the sofa). Installation does not require tools and can be completed within 5 minutes. The design of the exposed light bulb is very fashionable, and we paired it with Edison light bulbs to add a sense of style. I only gave it 4.5 stars because the wires were not as long as I had hoped. After 6 months of use, it looks and functions like new. This price is a must-have for those who want to add a bit of personality!',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=200&h=200&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=200&h=200&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=200&h=200&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&h=200&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=200&h=200&fit=crop&q=80'
    ]
  },
  {
    id: 4,
    username: 'Username',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user4',
    text: 'I really like our newly purchased bedroom furniture set! The gray metal frame is both stylish and has a soft touch. After two months of use (including children jumping off the bed and dogs taking a nap), it still looks brand new. The craftsman style headboard is very elegant, and the black bracket is super sturdy. The assembly is very simple, my husband and I took about 45 minutes. The only minor drawback is that the bed board can be a bit more sturdy, but at this price point, it is definitely the most cost-effective choice we have found. I have already recommended it to my friends!',
    images: []
  },
  {
    id: 5,
    username: 'Username',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user5',
    text: 'I really like our newly purchased bedroom furniture set! The gray metal frame is both stylish and has a soft touch. After two months of use (including children jumping off the bed and dogs taking a nap), it still looks brand new. The craftsman style headboard is very elegant, and the black bracket is super sturdy. The assembly is very simple, my husband and I took about 45 minutes. The only minor drawback is that the bed board can be a bit more sturdy, but at this price point, it is definitely the most cost-effective choice we have found. I have already recommended it to my friends!',
    images: [
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=200&h=200&fit=crop&q=80'
    ]
  }
])

const totalReviews = ref(1000)
const displayedReviews = ref(allReviews.value.slice(0, 3))
const hasMoreReviews = ref(true)

const loadMoreReviews = () => {
  const currentLength = displayedReviews.value.length
  const nextBatch = allReviews.value.slice(currentLength, currentLength + 3)
  
  if (nextBatch.length > 0) {
    displayedReviews.value = [...displayedReviews.value, ...nextBatch]
  }
  
  // 如果显示的评论数量达到所有评论数量，隐藏"View more"按钮
  if (displayedReviews.value.length >= allReviews.value.length) {
    hasMoreReviews.value = false
  }
}

// 根据路由参数获取产品信息
const loadProductData = () => {
  const productId = route.params.id
  // TODO: 这里可以根据productId从API或本地数据获取产品信息
  // 暂时使用默认标题
  productTitle.value = 'Warm wooden Nordic kitchen'
}

const increaseQty = () => {
  quantity.value++
}

const decreaseQty = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

onMounted(() => {
  loadProductData()
  
  window.addEventListener('user-web-language-changed', (event: any) => {
    currentLanguage.value = event.detail.locale
    componentKey.value++
    instance?.proxy?.$forceUpdate()
  })
})
</script>

<style scoped>
.case-detail-page {
  background: #F4F4F4;
  min-height: 100vh;
}

/* Breadcrumb Section */
.breadcrumb-section {
  background: #FFFFFF;
}

/* Breadcrumb */
.breadcrumb {
  font-size: 0.875rem;
  background: transparent;
}

.breadcrumb-item a {
  color: #6b7280;
  text-decoration: none;
}

.breadcrumb-item.active {
  color: #333;
}

/* Main Content Container */
.main-content-container {
  padding-left: 79px;
  padding-right: 79px;
}

@media (max-width: 1200px) {
  .main-content-container {
    padding-left: 40px;
    padding-right: 40px;
  }
}

@media (max-width: 768px) {
  .main-content-container {
    padding-left: 16px;
    padding-right: 16px;
  }
}

.main-content-container .row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.main-content-container .row > * {
  padding: 0 !important;
}

@media (max-width: 991px) {
  .main-content-container .row {
    gap: 24px;
  }
}

.col-left {
  flex: 1;
  min-width: 0;
  max-width: 1097px;
}

.col-right {
  flex: 0 0 auto;
  width: 650px;
}

@media (max-width: 1800px) {
  .col-left {
    flex: 1 1 auto;
  }
  
  .col-right {
    flex: 0 0 auto;
    width: 650px;
  }
}

@media (max-width: 991px) {
  .col-left,
  .col-right {
    flex: 1 1 100%;
    width: 100%;
    max-width: 100%;
  }
}

/* Image Gallery */
.image-gallery {
  width: 100%;
  max-width: 1097px;
  margin-bottom: 1rem;
  background: #FFFFFF;
  padding: 0;
  border-radius: 8px;
}

@media (max-width: 1200px) {
  .image-gallery {
    max-width: 100%;
  }
}

.gallery-layout {
  display: flex;
  gap: 6px;
  align-items: flex-start;
  width: 100%;
}

.thumbnail-container {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  height: 647px;
  width: 131px;
}

.thumbnail-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 11px;
}

/* 自定义滚动条样式 */
.thumbnail-list::-webkit-scrollbar {
  width: 6px;
}

.thumbnail-list::-webkit-scrollbar-track {
  background: #F3F4F6;
  border-radius: 3px;
}

.thumbnail-list::-webkit-scrollbar-thumb {
  background: #D1D5DB;
  border-radius: 3px;
}

.thumbnail-list::-webkit-scrollbar-thumb:hover {
  background: #9CA3AF;
}

.thumbnail-item {
  width: 120px;
  height: 81px;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.2s;
  flex-shrink: 0;
}

.thumbnail-item:hover,
.thumbnail-item.active {
  border-color: #00699A;
}

.thumbnail-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.main-image {
  flex: 1;
  max-width: 960px;
  height: 647px;
  border-radius: 4px;
  overflow: hidden;
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .main-image {
    width: 100%;
    height: auto;
    aspect-ratio: 960/647;
  }
  
  .thumbnail-container {
    height: auto;
  }
  
  .thumbnail-list {
    max-height: 400px;
  }
}

@media (max-width: 768px) {
  .gallery-layout {
    flex-direction: column-reverse;
  }
  
  .thumbnail-container {
    flex-direction: row;
    width: 100%;
    gap: 12px;
    height: auto;
  }
  
  .thumbnail-nav-btn {
    width: 40px;
    height: 54px;
  }
  
  .thumbnail-list {
    flex-direction: row;
    width: 100%;
    max-height: none;
    overflow-x: auto;
    overflow-y: hidden;
    gap: 12px;
    flex: 1;
  }
  
  .thumbnail-item {
    width: 80px;
    height: 54px;
  }
  
  .main-image {
    width: 100%;
    height: auto;
    aspect-ratio: 960/647;
  }

  .tab-buttons {
    overflow-x: auto;
    padding: 0 0.5rem;
  }

  .tab-btn {
    padding: 0;
    font-size: 14px;
    white-space: nowrap;
  }

  .tab-btn::after {
    width: 35px;
    height: 3px;
  }

  .product-grid-2col {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .product-card-name {
    font-size: 1.125rem;
  }
}

/* Product Info */
.product-info {
  padding: 1.5rem;
  background: #FFFFFF;
  border-radius: 8px;
  max-width: 650px;
  width: 100%;
}

@media (max-width: 1200px) {
  .product-info {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .product-info {
    padding: 1rem;
  }
}

.product-title {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
  font-size: 36px !important;
  font-weight: 700 !important;
  line-height: 40px !important;
  letter-spacing: 0 !important;
  color: #333333 !important;
  margin-bottom: 16px !important;
  vertical-align: middle;
}

@media (max-width: 768px) {
  .product-title {
    font-size: 28px !important;
    line-height: 32px !important;
  }
}

.rating-section {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.stars {
  color: #FFA500;
  display: flex;
  gap: 8px;
  align-items: center;
}

.stars i {
  font-size: 24px;
  width: 24px;
  height: 24px;
  line-height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rating-score {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
  font-size: 16px !important;
  font-weight: 400 !important;
  line-height: 20px !important;
  letter-spacing: 0 !important;
  color: #333333 !important;
  vertical-align: middle;
}

.view-reviews-link {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #00699A;
  text-decoration: none;
  margin-left: auto;
}

.view-reviews-link:hover {
  text-decoration: underline;
}

.price-designer-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.current-price {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 32px;
  font-weight: 700;
  color: #333333;
}

.designer-info {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #666666;
}

.service-title {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #999999;
  text-align: center;
  margin: 24px 0 16px 0;
}

.service-option {
  margin-bottom: 16px;
}

.option-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
}

.option-checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  margin: 0;
}

.option-checkbox input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.option-checkbox span {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #333333;
}

.option-price {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #333333;
}

.option-details {
  margin-top: 12px;
  padding-left: 26px;
}

.delivery-date {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #FF6B6B;
  margin-bottom: 12px;
}

.materials-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 16px;
}

.materials-table thead th {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #666666;
  text-align: left;
  padding: 8px;
  border-bottom: 1px solid #E5E7EB;
}

.materials-table tbody td {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #333333;
  padding: 8px;
  border-bottom: 1px solid #F3F4F6;
}

.materials-table tbody td:first-child {
  width: 30px;
}

.date-picker input {
  width: 100%;
  padding: 10px;
  border: 1px solid #E5E7EB;
  border-radius: 4px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 14px;
  color: #999999;
}

.total-price-section {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #E5E7EB;
}

.total-title {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #999999;
  text-align: center;
  margin-bottom: 12px;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #666666;
}

.price-row.total-row {
  font-weight: 700;
  color: #333333;
  border-top: 1px solid #E5E7EB;
  padding-top: 12px;
  margin-top: 8px;
}

.action-buttons {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.btn-redesign {
  flex: 1;
  background: #E5E7EB;
  border: none;
  color: #666666;
  padding: 12px;
  border-radius: 4px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-redesign:hover {
  background: #D1D5DB;
}

.btn-add-cart {
  flex: 1;
  background: #00699A;
  border: none;
  color: white;
  padding: 12px;
  border-radius: 4px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-add-cart:hover {
  background: #005580;
}

.btn-buy-now {
  flex: 1;
  background: white;
  border: 2px solid #00699A;
  color: #00699A;
  padding: 12px;
  border-radius: 4px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-buy-now:hover {
  background: #00699A;
  color: white;
}

/* Related Products */
.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #333;
}

.product-card {
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: box-shadow 0.2s;
}

.product-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.product-card img {
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
}

.product-card h5 {
  padding: 1rem;
  margin: 0;
  font-size: 1rem;
}

.product-card .price {
  padding: 0 1rem 1rem;
  color: #00699A;
  font-weight: 600;
  font-size: 1.25rem;
}

/* Design Inspiration */
.design-inspiration p {
  color: #6b7280;
  line-height: 1.6;
}

/* Case Reviews */
.review-item {
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 1rem;
}

.reviewer-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
}

.review-text {
  color: #6b7280;
  margin-bottom: 1rem;
}

.review-images {
  display: flex;
  gap: 0.5rem;
}

.review-images img {
  width: 5rem;
  height: 5rem;
  object-fit: cover;
  border-radius: 0.375rem;
}

/* Case Tabs */
.case-tabs {
  width: 100%;
  max-width: 1097px;
  background: #FFFFFF;
  border-radius: 4px;
}

@media (max-width: 1200px) {
  .case-tabs {
    max-width: 100%;
  }
}

.tab-buttons {
  display: flex;
  gap: 32px;
  background: #FFFFFF;
  padding: 0 16px;
  height: 44px;
  align-items: flex-end;
}

.tab-btn {
  padding: 0;
  padding-bottom: 12px;
  height: auto;
  background: transparent;
  border: none;
  color: #333333;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  position: relative;
}

.tab-btn::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 45px;
  height: 4px;
  background: transparent;
  transition: background 0.2s;
}

.tab-btn:hover {
  color: #00699A;
}

.tab-btn.active {
  color: #00699A;
}

.tab-btn.active::after {
  background: #00699A;
}

.tab-content {
  width: 100%;
  padding: 0;
  background: #F4F4F4;
}

.kiro-tab-pane {
  animation: fadeIn 0.3s;
  background: #F4F4F4;
  padding-top: 16px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Product Grid 2 Columns */
.product-grid-2col {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 0;
  width: 100%;
}

@media (max-width: 768px) {
  .product-grid-2col {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0;
    padding-top: 1rem;
  }
}

.product-card-detail {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: #FFFFFF;
  padding: 2rem;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 540px;
}

@media (max-width: 1200px) {
  .product-card-detail {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .product-card-detail {
    padding: 1.5rem;
    gap: 1rem;
  }
}

.product-card-image {
  width: 100% !important;
  max-width: 476px !important;
  height: 190.4px !important;
  border-radius: 4px !important;
  overflow: hidden !important;
  background: #f3f4f6 !important;
}

.product-card-image img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
}

@media (max-width: 1200px) {
  .product-card-image {
    max-width: 100% !important;
    height: auto !important;
    aspect-ratio: 476 / 190.4 !important;
  }
}

@media (max-width: 768px) {
  .product-card-image {
    aspect-ratio: 16 / 9 !important;
  }
}

.product-card-info {
  display: flex;
  flex-direction: column;
  gap: 8px !important;
  width: 100%;
  max-width: 476px;
}

@media (max-width: 1200px) {
  .product-card-info {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .product-card-info {
    gap: 8px !important;
  }
}

.product-card-name {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
  font-size: 24px !important;
  font-weight: 700 !important;
  color: #333333 !important;
  margin: 0 !important;
  line-height: 28px !important;
  letter-spacing: 0 !important;
}

@media (max-width: 768px) {
  .product-card-name {
    font-size: 20px !important;
    line-height: 24px !important;
  }
}

.product-card-row {
  display: flex;
  gap: 0.5rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 0.875rem;
  line-height: 1.5;
  align-items: baseline;
}

.product-card-row .label {
  color: #9C9C9C !important;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
  font-size: 14px !important;
  font-weight: 400 !important;
  line-height: 18px !important;
  letter-spacing: 0 !important;
  flex-shrink: 0;
}

.product-card-row .value {
  color: #333333 !important;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
  font-size: 14px !important;
  font-weight: 400 !important;
  line-height: 18px !important;
  letter-spacing: 0 !important;
  flex: 1;
}

.product-card-row .value.price {
  color: #8B2C00 !important;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
  font-size: 16px !important;
  font-weight: 700 !important;
  line-height: 20px !important;
  letter-spacing: 0 !important;
}

.product-card-desc {
  color: #333333 !important;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
  font-size: 14px !important;
  line-height: 18px !important;
  letter-spacing: 0 !important;
  margin: 0 !important;
  margin-top: 0 !important;
  padding: 0 !important;
  font-weight: 400 !important;
}

/* Inspiration Content */
.inspiration-content {
  padding: 32px;
  background: #FFFFFF;
  max-width: 1097px;
  border-radius: 4px;
}

@media (max-width: 1200px) {
  .inspiration-content {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .inspiration-content {
    padding: 16px;
  }
}

.inspiration-title {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
  font-size: 24px !important;
  font-weight: 700 !important;
  line-height: 28px !important;
  letter-spacing: 0 !important;
  color: #333333 !important;
  margin: 0 0 16px 0 !important;
  vertical-align: middle;
}

@media (max-width: 768px) {
  .inspiration-title {
    font-size: 20px !important;
    line-height: 24px !important;
  }
}

.inspiration-intro {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
  font-size: 14px !important;
  font-weight: 400 !important;
  line-height: 18px !important;
  letter-spacing: 0 !important;
  color: #333333 !important;
  margin: 0 0 16px 0 !important;
  vertical-align: middle;
}

@media (max-width: 768px) {
  .inspiration-intro {
    margin: 0 0 16px 0 !important;
  }
}

.inspiration-detail {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-row {
  display: flex;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
  font-size: 14px !important;
  font-weight: 400 !important;
  line-height: 18px !important;
  letter-spacing: 0 !important;
}

.detail-row .detail-label {
  color: #9C9C9C !important;
  flex-shrink: 0;
  margin-right: 4px;
}

.detail-row .detail-text {
  color: #333333 !important;
  flex: 1;
}

/* Review List */
.review-content {
  padding: 32px;
  background: #FFFFFF;
  max-width: 1097px;
  border-radius: 4px;
}

@media (max-width: 1200px) {
  .review-content {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .review-content {
    padding: 16px;
  }
}

.review-title {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
  font-size: 24px !important;
  font-weight: 700 !important;
  line-height: 28px !important;
  letter-spacing: 0 !important;
  color: #333333 !important;
  margin: 0 0 16px 0 !important;
  vertical-align: middle;
}

@media (max-width: 768px) {
  .review-title {
    font-size: 20px !important;
    line-height: 24px !important;
    margin: 0 0 16px 0 !important;
  }
}

.review-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.review-item {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 !important;
  margin: 0 !important;
  border: none !important;
  border-bottom: none !important;
}

.review-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.review-avatar {
  width: 24px !important;
  height: 24px !important;
  border-radius: 62.5px !important;
  padding: 10px !important;
  flex-shrink: 0;
  background: #F3F4F6;
}

.review-username {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
  font-size: 16px !important;
  font-weight: 400 !important;
  line-height: 20px !important;
  letter-spacing: 0 !important;
  color: #333333 !important;
}

.review-text {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
  font-size: 14px !important;
  font-weight: 400 !important;
  line-height: 18px !important;
  letter-spacing: 0 !important;
  color: #333333 !important;
  margin: 0 !important;
  vertical-align: middle;
}

.review-images {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.review-images img {
  width: 80px !important;
  height: 80px !important;
  object-fit: cover;
  border-radius: 4px !important;
  cursor: pointer;
  transition: transform 0.2s;
}

.review-images img:hover {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .review-images img {
    width: 70px !important;
    height: 70px !important;
  }
}

.view-more-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  gap: 16px;
}

@media (max-width: 768px) {
  .view-more-container {
    margin-top: 16px;
  }
}

.view-more-line {
  flex: 1;
  height: 1px;
  background: #E5E7EB;
}

.view-more-btn {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
  font-size: 14px !important;
  font-weight: 400 !important;
  line-height: 18px !important;
  letter-spacing: 0 !important;
  color: #00699A !important;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px 16px;
  transition: all 0.2s;
  white-space: nowrap;
  flex-shrink: 0;
  vertical-align: middle;
}

.view-more-btn:hover {
  color: #005580 !important;
  text-decoration: underline;
}
</style>