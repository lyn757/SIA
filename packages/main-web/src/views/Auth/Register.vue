<template>
  <div class="register-modal-overlay">
    <div class="register-modal" :class="`role-${registerForm.role}`">
      <!-- 固定头部 -->
      <div class="modal-header">
        <button class="close-btn" @click="handleClose">×</button>
        <h2>Create your account</h2>
        <p class="subtitle">Join our platform as a Customer, Designer or Supplier</p>
        
        <!-- 角色选择卡片 -->
        <div class="role-selection">
          <div 
            v-for="role in roleOptions" 
            :key="role.value"
            class="role-card"
            :class="{ active: registerForm.role === role.value }"
            @click="registerForm.role = role.value"
          >
            <div class="role-icon">
              <component :is="role.icon" />
            </div>
            <h3>{{ role.name }}</h3>
            <p>{{ role.desc }}</p>
          </div>
        </div>
      </div>

      <!-- 可滚动表单区域 -->
      <div class="modal-body" :class="{ 'scrollable': needsScroll }">
        <el-form 
          ref="registerFormRef" 
          :model="registerForm" 
          :rules="registerRules"
          label-position="top"
          class="register-form"
        >
          <!-- 基础信息 - 所有角色 -->
          <div class="form-row">
            <el-form-item label="*Email" prop="email" class="form-col">
              <el-input v-model="registerForm.email" placeholder="Enter your email" />
            </el-form-item>
            
            <el-form-item label="*Password" prop="password" class="form-col">
              <el-input v-model="registerForm.password" type="password" placeholder="Enter password" show-password />
            </el-form-item>
          </div>

          <div class="form-row">
            <el-form-item label="*Email verification code" prop="emailCode" class="form-col">
              <div class="code-wrapper">
                <el-input v-model="registerForm.emailCode" placeholder="Enter code" />
                <el-button type="link" :disabled="emailCodeDisabled" @click="sendEmailCode">
                  {{ emailCodeText }}
                </el-button>
              </div>
            </el-form-item>
            
            <el-form-item label="*Confirm password" prop="confirmPassword" class="form-col">
              <el-input v-model="registerForm.confirmPassword" type="password" placeholder="Confirm password" show-password />
            </el-form-item>
          </div>

          <el-form-item label="Phone number" prop="phone">
            <el-input v-model="registerForm.phone" placeholder="Enter phone number" />
          </el-form-item>

          <!-- 设计师专属表单 -->
          <div v-if="registerForm.role === 'designer'" class="role-specific-section designer-section">
            <div class="section-title">Designer Nature</div>
            <el-form-item prop="designerType">
              <el-radio-group v-model="registerForm.designerType">
                <el-radio label="individual">Individual</el-radio>
                <el-radio label="studio">Studio</el-radio>
                <el-radio label="company">Company</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="*Designer / Company Name" prop="designerName">
              <el-input v-model="registerForm.designerName" placeholder="Enter name" />
            </el-form-item>

            <div class="section-title">Specialized Room Types</div>
            <p class="section-desc">Select the room types you specialize in (multiple selections allowed)</p>
            <el-form-item prop="roomTypes">
              <el-checkbox-group v-model="registerForm.roomTypes" class="checkbox-grid">
                <el-checkbox label="living">Living Room</el-checkbox>
                <el-checkbox label="bedroom">Bedroom</el-checkbox>
                <el-checkbox label="kitchen">Kitchen</el-checkbox>
                <el-checkbox label="bathroom">Bathroom</el-checkbox>
                <el-checkbox label="dining">Dining Room</el-checkbox>
                <el-checkbox label="study">Study</el-checkbox>
                <el-checkbox label="balcony">Balcony</el-checkbox>
                <el-checkbox label="entrance">Entrance</el-checkbox>
                <el-checkbox label="kids">Kids Room</el-checkbox>
                <el-checkbox label="storage">Storage</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </div>

          <!-- 供应商专属表单 -->
          <div v-if="registerForm.role === 'supplier'" class="role-specific-section supplier-section">
            <div class="section-title">Company Information</div>
            <div class="form-row">
              <el-form-item label="*Company Name" prop="companyName" class="form-col">
                <el-input v-model="registerForm.companyName" placeholder="Enter company name" />
              </el-form-item>
              
              <el-form-item label="*Contact Person" prop="contactPerson" class="form-col">
                <el-input v-model="registerForm.contactPerson" placeholder="Enter contact person" />
              </el-form-item>
            </div>

            <el-form-item label="*Contact Phone" prop="contactPhone">
              <el-input v-model="registerForm.contactPhone" placeholder="Enter contact phone" />
            </el-form-item>

            <div class="section-title">Company Address</div>
            <div class="form-row">
              <el-form-item label="*Street Address" prop="street" class="form-col">
                <el-input v-model="registerForm.street" placeholder="Enter street address" />
              </el-form-item>
              
              <el-form-item label="Apartment, Suite, Floor, etc" prop="apartment" class="form-col">
                <el-input v-model="registerForm.apartment" placeholder="Optional" />
              </el-form-item>
            </div>

            <div class="form-row">
              <el-form-item label="*City" prop="city" class="form-col">
                <el-input v-model="registerForm.city" placeholder="Enter city" />
              </el-form-item>
              
              <el-form-item label="*State / Province" prop="state" class="form-col">
                <el-input v-model="registerForm.state" placeholder="Enter state" />
              </el-form-item>
            </div>

            <div class="form-row">
              <el-form-item label="*Postal Code" prop="zipCode" class="form-col">
                <el-input v-model="registerForm.zipCode" placeholder="Enter postal code" />
              </el-form-item>
              
              <el-form-item label="*Country" prop="country" class="form-col">
                <el-input v-model="registerForm.country" placeholder="Enter country" />
              </el-form-item>
            </div>

            <div class="section-title">Building Materials Category</div>
            <el-form-item prop="businessCategories">
              <el-checkbox-group v-model="registerForm.businessCategories" class="checkbox-grid">
                <el-checkbox label="tiles">Tiles</el-checkbox>
                <el-checkbox label="flooring">Flooring</el-checkbox>
                <el-checkbox label="bathroom">Bathroom</el-checkbox>
                <el-checkbox label="cabinets">Cabinets</el-checkbox>
                <el-checkbox label="doors">Doors & Windows</el-checkbox>
                <el-checkbox label="paint">Paint</el-checkbox>
                <el-checkbox label="lighting">Lighting</el-checkbox>
                <el-checkbox label="hardware">Hardware</el-checkbox>
                <el-checkbox label="others">Others</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </div>
        </el-form>
      </div>

      <!-- 固定底部 -->
      <div class="modal-footer">
        <el-form-item prop="agreement" class="agreement-item">
          <el-checkbox v-model="registerForm.agreement">
            I agree to the 
            <el-link type="primary" @click="showTerms">Terms of Service</el-link>
            and 
            <el-link type="primary" @click="showPrivacy">Privacy Policy</el-link>
          </el-checkbox>
        </el-form-item>

        <div class="footer-actions">
          <div class="login-link">
            Already have an account? 
            <el-link type="primary" @click="router.push('/login')">Sign in</el-link>
          </div>
          <div class="action-buttons">
            <el-button @click="handleClose">Cancel</el-button>
            <el-button type="primary" :loading="loading" @click="handleRegister">
              Create account
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus'
import { User, Brush, Shop } from '@element-plus/icons-vue'

const router = useRouter()
const registerFormRef = ref<FormInstance>()
const loading = ref(false)
const emailCodeDisabled = ref(false)
const countdown = ref(0)

// 角色选项
const roleOptions = [
  { value: 'user', icon: User, name: 'Customer', desc: 'Browse products and order' },
  { value: 'designer', icon: Brush, name: 'Designer', desc: 'Upload and sell your designs' },
  { value: 'supplier', icon: Shop, name: 'Supplier', desc: 'Offer products on our marketplace' }
]

// 注册表单
const registerForm = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  emailCode: '',
  phone: '',
  agreement: false,
  role: 'user' as 'designer' | 'supplier' | 'user',
  // 设计师字段
  designerType: 'individual',
  designerName: '',
  roomTypes: [] as string[],
  // 供应商字段
  companyName: '',
  contactPerson: '',
  contactPhone: '',
  street: '',
  apartment: '',
  city: '',
  state: '',
  zipCode: '',
  country: '',
  businessCategories: [] as string[]
})

// 判断是否需要滚动
const needsScroll = computed(() => {
  return registerForm.role === 'supplier'
})

// 邮箱验证码按钮文本
const emailCodeText = computed(() => {
  if (countdown.value > 0) {
    return `${countdown.value}s后可重新发送`
  }
  return 'Send verification code'
})

// 表单验证规则
const registerRules: FormRules = {
  email: [
    { required: true, message: 'Please enter email', trigger: 'blur' },
    { type: 'email', message: 'Invalid email format', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Please enter password', trigger: 'blur' },
    { min: 6, message: 'Password must be at least 6 characters', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: 'Please confirm password', trigger: 'blur' },
    { 
      validator: (_rule: any, value: string, callback: any) => {
        if (value !== registerForm.password) {
          callback(new Error('Passwords do not match'))
        } else {
          callback()
        }
      }, 
      trigger: 'blur' 
    }
  ],
  emailCode: [
    { required: true, message: 'Please enter verification code', trigger: 'blur' }
  ],
  agreement: [
    { 
      validator: (_rule: any, value: boolean, callback: any) => {
        if (!value) {
          callback(new Error('Please agree to the terms'))
        } else {
          callback()
        }
      }, 
      trigger: 'change' 
    }
  ]
}

// 发送邮箱验证码
const sendEmailCode = async () => {
  if (!registerForm.email) {
    ElMessage.warning('Please enter email first')
    return
  }
  
  ElMessage.success('Verification code sent')
  emailCodeDisabled.value = true
  countdown.value = 60
  
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
      emailCodeDisabled.value = false
    }
  }, 1000)
}

// 显示服务条款
const showTerms = () => {
  ElMessageBox.alert('Terms of Service content...', 'Terms of Service', {
    confirmButtonText: 'OK'
  })
}

// 显示隐私政策
const showPrivacy = () => {
  ElMessageBox.alert('Privacy Policy content...', 'Privacy Policy', {
    confirmButtonText: 'OK'
  })
}

// 关闭模态框
const handleClose = () => {
  router.push('/login')
}

// 处理注册
const handleRegister = async () => {
  if (!registerFormRef.value) return
  
  try {
    await registerFormRef.value.validate()
    loading.value = true
    
    // 调用注册 API
    ElMessage.success('Registration successful!')
    router.push('/login')
    
  } catch (error: any) {
    ElMessage.error(error.message || 'Registration failed')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

.register-modal {
  width: 100%;
  max-width: 1000px;
  max-height: 90vh;
  background: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
}

/* 固定头部 */
.modal-header {
  padding: 30px 40px 20px;
  border-bottom: 1px solid #e5e7eb;
  flex-shrink: 0;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  font-size: 28px;
  color: #666;
  cursor: pointer;
  line-height: 1;
  padding: 0;
}

.close-btn:hover {
  color: #333;
}

.modal-header h2 {
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
  text-align: center;
}

.subtitle {
  color: #999;
  font-size: 14px;
  text-align: center;
  margin: 0 0 32px 0;
}

/* 角色选择 */
.role-selection {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.role-card {
  padding: 24px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  background: white;
}

.role-card:hover {
  border-color: #91d5ff;
  background: #f0f9ff;
}

.role-card.active {
  border-color: #1890ff;
  background: #e6f7ff;
}

.role-icon {
  font-size: 48px;
  color: #1890ff;
  margin-bottom: 12px;
}

.role-card h3 {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
}

.role-card p {
  font-size: 13px;
  color: #999;
  margin: 0;
}

/* 可滚动表单区域 */
.modal-body {
  padding: 24px 40px;
  flex: 1;
  min-height: 0;
}

.modal-body.scrollable {
  overflow-y: auto;
  max-height: calc(90vh - 400px);
}

.register-form {
  max-width: 100%;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-col {
  margin-bottom: 0 !important;
}

.code-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.code-wrapper .el-input {
  flex: 1;
}

/* 角色专属表单区域 */
.role-specific-section {
  margin-top: 24px;
  padding: 0;
  background: transparent;
  border-radius: 0;
}

.designer-section {
  background: transparent;
}

.supplier-section {
  background: #f0f9ff;
  padding: 20px;
  border-radius: 8px;
}

.section-title {
  font-size: 16px;
  font-weight: 700;
  color: #333;
  margin: 0 0 16px 0;
}

.section-desc {
  font-size: 13px;
  color: #999;
  margin: -8px 0 12px 0;
}

.checkbox-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px 16px;
}

.checkbox-grid :deep(.el-checkbox) {
  margin-right: 0;
}

.checkbox-grid :deep(.el-checkbox__label) {
  font-size: 14px;
  color: #666;
}

/* 固定底部 */
.modal-footer {
  padding: 20px 40px;
  border-top: 1px solid #e5e7eb;
  flex-shrink: 0;
}

.agreement-item {
  margin-bottom: 16px;
}

.footer-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.login-link {
  color: #666;
  font-size: 14px;
}

.action-buttons {
  display: flex;
  gap: 12px;
}

/* 响应式 */
@media (max-width: 768px) {
  .register-modal {
    max-width: 100%;
    max-height: 100vh;
    border-radius: 0;
  }
  
  .modal-header,
  .modal-body,
  .modal-footer {
    padding-left: 20px;
    padding-right: 20px;
  }
  
  .role-selection {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .checkbox-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .footer-actions {
    flex-direction: column;
    gap: 12px;
  }
  
  .action-buttons {
    width: 100%;
  }
  
  .action-buttons .el-button {
    flex: 1;
  }
}
</style>
