<template>
  <div class="register-container">
    <div class="language-toggle">
      <LanguageSwitcher />
    </div>

    <div class="register-card">
      <div class="register-header">
        <h1>{{ $t('register.createAccount') }}</h1>
        <button class="close-btn" @click="$router.push('/login')">×</button>
      </div>
      
      <p class="register-subtitle">{{ $t('register.joinPlatform') }}</p>
      
      <!-- 角色选择 - 简化版 -->
      <div class="role-grid">
        <div v-for="role in roleOptions" :key="role.value" 
             :class="['role-card', { active: registerForm.role === role.value }]"
             @click="registerForm.role = role.value">
          <div class="role-icon-wrapper">
            <component :is="role.icon" class="role-icon-svg" />
          </div>
          <div class="role-name">{{ $t(`roles.${role.value}`) }}</div>
          <div class="role-desc">{{ $t(`roles.${role.value}Desc`) }}</div>
        </div>
      </div>

      <!-- 注册表单 - 简化版 -->
      <el-form ref="registerFormRef" :model="registerForm" :rules="registerRules" class="register-form">
        <!-- 基础信息 - 两列布局 -->
        <div class="form-row">
          <el-form-item prop="email" class="form-item-half required-field">
            <el-input 
              v-model="registerForm.email" 
              :placeholder="$t('register.email')" 
              size="large"
            />
          </el-form-item>
          
          <el-form-item prop="password" class="form-item-half required-field">
            <el-input 
              v-model="registerForm.password" 
              type="password" 
              :placeholder="$t('register.password')" 
              size="large" 
              show-password 
            />
          </el-form-item>
        </div>

        <div class="form-row">
          <el-form-item prop="emailCode" class="form-item-half required-field">
            <div class="code-wrapper">
              <el-input 
                v-model="registerForm.emailCode" 
                :placeholder="$t('register.emailCode')" 
                size="large"
              />
              <el-button 
                type="text" 
                :disabled="emailCodeDisabled" 
                @click="sendEmailCode" 
                class="code-link"
              >
                {{ emailCodeText }}
              </el-button>
            </div>
          </el-form-item>

          <el-form-item prop="confirmPassword" class="form-item-half required-field">
            <el-input 
              v-model="registerForm.confirmPassword" 
              type="password" 
              :placeholder="$t('register.confirmPassword')" 
              size="large" 
              show-password 
            />
          </el-form-item>
        </div>

        <el-form-item prop="phone">
          <el-input 
            v-model="registerForm.phone" 
            :placeholder="$t('register.phone')" 
            size="large"
          />
        </el-form-item>

        <!-- 设计师专属表单 - Designer Nature 模块 -->
        <div v-if="registerForm.role === 'designer'" class="designer-specific-section">
          <div class="section-title">Designer Nature</div>
          
          <el-form-item prop="designerType">
            <el-radio-group v-model="registerForm.designerType" size="large">
              <el-radio label="individual">{{ $t('register.individual') }}</el-radio>
              <el-radio label="studio">{{ $t('register.studio') }}</el-radio>
              <el-radio label="company">{{ $t('register.company') }}</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item prop="designerName" class="required-field designer-name-field">
            <el-input 
              v-model="registerForm.designerName" 
              placeholder="Designer / Company Name"
              size="large"
            />
          </el-form-item>
        </div>

        <!-- 设计师专属表单 - Specialized Room Types 模块 -->
        <div v-if="registerForm.role === 'designer'" class="designer-specific-section">
          <div class="section-title">Specialized Room Types</div>
          <div class="section-subtitle">Select the room types you specialize in (multiple selections allowed)</div>
          
          <el-form-item prop="roomTypes">
            <div class="room-types-grid">
              <el-checkbox-group v-model="registerForm.roomTypes">
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
            </div>
          </el-form-item>
        </div>

        <el-form-item prop="agreement" class="agreement-item">
          <el-checkbox v-model="registerForm.agreement">
            {{ $t('register.agreePrefix') }}
            <el-link type="primary" @click="showTerms">{{ $t('register.serviceTerms') }}</el-link>
            {{ $t('common.and') }}
            <el-link type="primary" @click="showPrivacy">{{ $t('register.privacyPolicy') }}</el-link>
          </el-checkbox>
        </el-form-item>

        <div class="login-link">
          {{ $t('register.hasAccount') }}
          <el-link type="primary" @click="$router.push('/login')">{{ $t('register.toLogin') }}</el-link>
        </div>
      </el-form>
      
      <div class="register-footer">
        <el-button size="large" class="cancel-btn" @click="$router.push('/login')">
          {{ $t('common.cancel') }}
        </el-button>
        <el-button type="primary" size="large" :loading="loading" class="register-btn" @click="handleRegister">
          {{ $t('register.createAccount') }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus'
import { User, Brush, Shop } from '@element-plus/icons-vue'
import { registerApi } from '@/api/auth'
import { useRoleStore } from '@/stores/role'
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from '@/components/LanguageSwitcher/index.vue'

const router = useRouter()
const roleStore = useRoleStore()
const { t } = useI18n()

const registerFormRef = ref<FormInstance>()
const loading = ref(false)
const emailCodeDisabled = ref(false)
const countdown = ref(0)

// 角色选项配置（注册时不包含guest和contractor）
const roleOptions = [
  { value: 'user', icon: User },
  { value: 'designer', icon: Brush },
  { value: 'supplier', icon: Shop }
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
  // 设计师专属字段
  designerType: 'individual',
  designerName: '',
  roomTypes: [] as string[],
  // 供应商专属字段
  companyName: '',
  contactPerson: '',
  contactPhone: '',
  companyAddress: '',
  businessScope: '',
  city: '',
  district: '',
  street: '',
  zipCode: '',
  businessCategories: [] as string[],
  introduction: ''
})

// 初始化角色状态
onMounted(() => {
  roleStore.initRole()
  // 如果从 store 获取的角色是 guest，则设置为 user（注册页不支持 guest）
  const storeRole = roleStore.selectedRole
  if (storeRole === 'guest') {
    registerForm.role = 'user'
    roleStore.setRole('user')
  } else {
    registerForm.role = storeRole as 'designer' | 'supplier' | 'contractor' | 'user'
  }
})

// 监听角色变化，同步到表单
watch(() => roleStore.selectedRole, (newRole) => {
  if (newRole === 'guest') {
    registerForm.role = 'user'
  } else {
    registerForm.role = newRole as 'designer' | 'supplier' | 'user'
  }
})

// 监听表单角色变化，同步到 store
watch(() => registerForm.role, (newRole) => {
  roleStore.setRole(newRole)
})

// 邮箱验证码按钮文本
const emailCodeText = computed(() => {
  if (countdown.value > 0) {
    return `${countdown.value}s`
  }
  return t('register.sendCode')
})

// 确认密码验证
const validateConfirmPassword = (rule: any, value: string, callback: any) => {
  if (value !== registerForm.password) {
    callback(new Error(t('validation.passwordNotMatch')))
  } else {
    callback()
  }
}

// 协议验证
const validateAgreement = (rule: any, value: boolean, callback: any) => {
  if (!value) {
    callback(new Error(t('validation.agreementRequired')))
  } else {
    callback()
  }
}

// 表单验证规则
const registerRules: FormRules = {
  email: [
    { required: true, message: () => t('validation.emailRequired'), trigger: 'blur' },
    { type: 'email', message: () => t('validation.emailFormat'), trigger: 'blur' }
  ],
  password: [
    { required: true, message: () => t('validation.passwordRequired'), trigger: 'blur' },
    { min: 6, message: () => t('validation.passwordLength'), trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: () => t('validation.confirmPasswordRequired'), trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: 'blur' }
  ],
  emailCode: [
    { required: true, message: () => t('validation.emailCodeRequired'), trigger: 'blur' }
  ],
  phone: [
    { pattern: /^1[3-9]\d{9}$/, message: () => t('validation.phoneFormat'), trigger: 'blur' }
  ],
  agreement: [
    { validator: validateAgreement, trigger: 'change' }
  ],
  // 设计师专属验证
  designerName: [
    { required: true, message: () => t('validation.designerNameRequired'), trigger: 'blur', validator: (rule: any, value: string, callback: any) => {
      if (registerForm.role === 'designer' && !value) {
        callback(new Error(t('validation.designerNameRequired')))
      } else {
        callback()
      }
    }}
  ],
  // 供应商专属验证
  companyName: [
    { required: true, message: () => t('validation.companyNameRequired'), trigger: 'blur', validator: (rule: any, value: string, callback: any) => {
      if (registerForm.role === 'supplier' && !value) {
        callback(new Error(t('validation.companyNameRequired')))
      } else {
        callback()
      }
    }}
  ],
  contactPerson: [
    { required: true, message: () => t('validation.contactPersonRequired'), trigger: 'blur', validator: (rule: any, value: string, callback: any) => {
      if (registerForm.role === 'supplier' && !value) {
        callback(new Error(t('validation.contactPersonRequired')))
      } else {
        callback()
      }
    }}
  ],
  contactPhone: [
    { required: true, message: () => t('validation.contactPhoneRequired'), trigger: 'blur', validator: (rule: any, value: string, callback: any) => {
      if (registerForm.role === 'supplier' && !value) {
        callback(new Error(t('validation.contactPhoneRequired')))
      } else {
        callback()
      }
    }}
  ]
}

// 发送邮箱验证码
const sendEmailCode = async () => {
  if (!registerForm.email) {
    ElMessage.warning(t('validation.emailRequired'))
    return
  }
  
  try {
    ElMessage.success(t('register.codeSent'))
    
    // 开始倒计时
    emailCodeDisabled.value = true
    countdown.value = 60
    
    const timer = setInterval(() => {
      countdown.value--
      
      if (countdown.value <= 0) {
        clearInterval(timer)
        emailCodeDisabled.value = false
      }
    }, 1000)
    
  } catch (error: any) {
    ElMessage.error(error.message || t('register.codeSendFailed'))
  }
}

// 显示服务条款
const showTerms = () => {
  ElMessageBox.alert(t('register.termsContent'), t('register.serviceTerms'), {
    confirmButtonText: t('common.confirm')
  })
}

// 显示隐私政策
const showPrivacy = () => {
  ElMessageBox.alert(t('register.privacyContent'), t('register.privacyPolicy'), {
    confirmButtonText: t('common.confirm')
  })
}

// 处理注册
const handleRegister = async () => {
  if (!registerFormRef.value) return
  
  try {
    await registerFormRef.value.validate()
    loading.value = true
    
    await registerApi(registerForm)
    
    ElMessage.success(t('register.success'))
    router.push('/login')
    
  } catch (error: any) {
    ElMessage.error(error.message || t('register.failed'))
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
* {
  letter-spacing: 0;
}

.register-container {
  min-height: 100vh;
  background: #f5f7fa;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 20px;
  position: relative;
  letter-spacing: 0;
}

.language-toggle {
  position: absolute;
  top: 24px;
  right: 24px;
  z-index: 10;
}

.register-card {
  width: 100%;
  max-width: 60rem;
  background: white;
  border-radius: 8px;
  padding: 40px 50px 50px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
  position: relative;
}

.register-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
  position: relative;
}

.register-header h1 {
  font-size: 24px;
  font-weight: 600;
  color: #102129;
  margin: 0;
  text-align: center;
}

.close-btn {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 24px;
  color: #909399;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  line-height: 1;
  transition: color 0.2s;
}

.close-btn:hover {
  color: #606266;
}

.register-subtitle {
  color: #909399;
  font-size: 13px;
  margin-top: 3%;
  margin-bottom: 2%;
  text-align: center;
}

.role-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.role-card {
  padding: 1rem;
  border: 1px solid #E5E6EB;
  border-radius: 0.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.25s ease;
  background: white;
  min-height: 7.875rem;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
}

@media (max-width: 768px) {
  .role-grid {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
}

.role-card:hover {
  border-color: #00699A;
  background: #f0f8fb;
}

.role-card.active {
  border-color: #00699A;
  background: #e6f4f9;
}

.role-card.active .role-name {
  color: #00699A;
}

.role-card.active .role-desc {
  color: #00699A;
}

.role-icon-wrapper {
  width: 1.5rem;
  height: 1.5rem;
  margin: 0 auto 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.role-icon-svg {
  width: 100%;
  height: 100%;
  color: #00699A;
}

.role-name {
  font-size: 0.875rem;
  font-weight: 700;
  color: #102129;
  margin-bottom: 8px;
  line-height: 18px;
}

.role-desc {
  font-size: 13px;
  color: #909399;
  line-height: 18px;
}

.form-row {
  display: flex;
  gap: 16px;
  margin-bottom: 0;
}

.form-item-half {
  flex: 1;
  margin-bottom: 16px;
}

.register-form :deep(.el-form-item) {
  margin-bottom: 6px;
}

.register-form :deep(.el-input__wrapper) {
  border-radius: 4px;
  box-shadow: 0 0 0 1px #E5E6EB inset;
  padding: 1px 15px;
  background-color: white;
}

.register-form :deep(.el-input__inner) {
  font-size: 14px;
  color: #102129;
  height: 38px;
  line-height: 38px;
}

.register-form :deep(.el-input__inner::placeholder) {
  color: #c0c4cc;
  font-size: 13px;
}

/* 隐藏 Element Plus 默认的灰色星号 */
.register-form :deep(.el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label::before) {
  display: none;
}

.register-form :deep(.el-form-item.is-required .el-form-item__label::before) {
  display: none;
}

/* 为必填输入框添加红色星号标记 */
.register-form :deep(.required-field .el-input__wrapper::before) {
  content: '*';
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #f56c6c;
  font-size: 14px;
  z-index: 1;
  pointer-events: none;
}

.register-form :deep(.required-field .el-input__inner) {
  padding-left: 4px;
}

.register-form :deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #c0c4cc inset;
}

.register-form :deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px #00699A inset;
}

.code-wrapper {
  position: relative;
  width: 100%;
}

.code-wrapper :deep(.el-input) {
  width: 100%;
}

.code-wrapper :deep(.el-input__inner) {
  padding-right: 120px;
}

.code-link {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 13px;
  padding: 0;
  height: auto;
  color: #00699A;
  white-space: nowrap;
  z-index: 2;
  font-weight: 400;
}

.code-link:hover {
  color: #008bb8;
  text-decoration: underline;
}

.code-link:disabled {
  color: #c0c4cc;
  cursor: not-allowed;
  text-decoration: none;
}

.agreement-item {
  margin-top: 12px;
  margin-bottom: 10px;
}

.agreement-item :deep(.el-checkbox__label) {
  font-size: 12px;
  color: #102129;
  line-height: 1.6;
}

.agreement-item :deep(.el-link) {
  font-size: 12px;
  vertical-align: baseline;
  color: #00699A;
}

.agreement-item :deep(.el-link:hover) {
  color: #008bb8;
}

.login-link {
  color: #102129;
  font-size: 13px;
  margin-bottom: 20px;
}

.login-link :deep(.el-link) {
  font-size: 13px;
  color: #00699A;
}

.login-link :deep(.el-link:hover) {
  color: #008bb8;
}

.register-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0;
  margin-top: 28px;
  padding-top: 20px;
  border-top: 1px solid #E5E6EB;
}

.cancel-btn {
  min-width: 100px;
  height: 40px;
  border: 1px solid #E5E6EB;
  color: #102129;
  border-radius: 4px;
  font-size: 14px;
  background: white;
  margin-right: 12px;
}

.cancel-btn:hover {
  color: #00699A;
  border-color: #b3dce8;
  background: #e6f4f9;
}

.register-btn {
  min-width: 140px;
  height: 40px;
  background: #333333;
  border-color: #333333;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  color: white;
  margin-left: 0;
}

.register-btn:hover {
  background: #4d4d4d;
  border-color: #4d4d4d;
}

.designer-specific-section {
  background: #f5f7fa;
  padding: 14px;
  border-radius: 6px;
  margin: 20px 0;
  border: 1px solid #E5E6EB;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: #102129;
  margin-bottom: 6px;
  letter-spacing: 0;
}

.designer-name-field {
  margin-bottom: 0;
}

.section-subtitle {
  font-size: 13px;
  color: #909399;
  margin-top: 1rem;
  margin-bottom: 0;
  line-height: 18px;
  letter-spacing: 0;
}

.designer-specific-section :deep(.el-radio-group) {
  display: flex;
  gap: 24px;
}

.designer-specific-section :deep(.el-radio) {
  margin-right: 0;
}

.designer-specific-section :deep(.el-radio__label) {
  font-size: 14px;
  color: #102129;
  padding-left: 8px;
  letter-spacing: 0;
}

.designer-specific-section :deep(.el-radio__input.is-checked .el-radio__inner) {
  background-color: #00699A;
  border-color: #00699A;
}

.designer-specific-section :deep(.el-radio__input.is-checked + .el-radio__label) {
  color: #102129;
}

.room-types-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem 12px;
  margin-top: 1rem;
}

.room-types-grid :deep(.el-checkbox-group) {
  display: contents;
}

.room-types-grid :deep(.el-checkbox) {
  margin-right: 0;
}

.room-types-grid :deep(.el-checkbox__label) {
  font-size: 13px;
  color: #102129;
  padding-left: 8px;
  letter-spacing: 0;
}

.room-types-grid :deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background-color: #00699A;
  border-color: #00699A;
}

.room-types-grid :deep(.el-checkbox__input.is-checked + .el-checkbox__label) {
  color: #102129;
}

@media (max-width: 768px) {
  .register-card {
    padding: 32px 24px;
  }

  .role-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  
  .role-name {
    line-height: 18px;
  }
  
  .role-desc {
    line-height: 18px;
  }
  
  .form-row {
    flex-direction: column;
    gap: 0;
  }
  
  .register-footer {
    flex-direction: column-reverse;
  }
  
  .cancel-btn,
  .register-btn {
    width: 100%;
  }
  
  .cancel-btn {
    margin-right: 0;
    margin-top: 12px;
  }
  
  .register-btn {
    margin-left: 0;
  }
  
  .room-types-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .designer-specific-section :deep(.el-radio-group) {
    flex-direction: column;
    gap: 12px;
  }
}

/* 特殊处理：3个角色卡片均匀分布 */
.role-card:nth-child(4) {
  display: none;
}
</style>