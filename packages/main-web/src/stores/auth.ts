import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { RouteLocationNormalized } from 'vue-router'
import { loginApi, getUserInfoApi } from '@/api/auth'
import { asyncRoutes } from '@/router'
import router from '@/router'
import { broadcastToMicroApps } from '@/utils/wujie'
import { AUTH_CONFIG } from '@/config/auth'

export interface UserInfo {
  id: string
  username: string
  email: string
  roles: string[]
  avatar?: string
}

export interface LoginForm {
  username: string
  password: string
  role: 'designer' | 'supplier' | 'user' | 'guest'
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string>(localStorage.getItem('token') || '')
  const userInfo = ref<UserInfo | null>(null)
  const permissions = ref<string[]>([])
  const lastActiveRole = ref<string>(localStorage.getItem('lastActiveRole') || '')
  const tokenExpireTime = ref<number>(Number(localStorage.getItem('tokenExpireTime')) || 0)

  // 会话保持时间（从配置文件读取）
  const SESSION_DURATION = AUTH_CONFIG.SESSION_DURATION

  // 计算属性
  const isAuthenticated = computed(() => !!token.value && !!userInfo.value)
  const userRoles = computed(() => userInfo.value?.roles || [])
  const isTokenValid = computed(() => {
    if (!token.value || !tokenExpireTime.value) return false
    return Date.now() < tokenExpireTime.value
  })

  // 初始化认证状态
  const initializeAuth = async () => {
    // 检查token是否过期
    if (token.value && !isTokenValid.value) {
      console.log('Token已过期，清除认证信息')
      logout(false) // 不跳转到登录页
      return false
    }

    if (token.value) {
      try {
        // 尝试从localStorage恢复用户信息
        const savedUserInfo = localStorage.getItem('userInfo')
        if (savedUserInfo) {
          userInfo.value = JSON.parse(savedUserInfo)
        }

        await generateRoutes()
        return true
      } catch (error) {
        console.error('初始化认证失败:', error)
        logout(false)
        return false
      }
    }
    return false
  }

  // 游客自动登录
  const guestAutoLogin = async () => {
    try {
      // 检查是否已有游客ID（复用之前的游客身份）
      let guestId = localStorage.getItem('guestId')

      if (!guestId) {
        // 首次访问，生成新的游客账号
        guestId = AUTH_CONFIG.GUEST_CONFIG.USERNAME_PREFIX + Math.random().toString(36).substr(2, 9)
        localStorage.setItem('guestId', guestId)
        console.log('首次访问，生成新游客ID:', guestId)
      } else {
        console.log('复用已有游客ID:', guestId)
      }

      const guestToken = AUTH_CONFIG.GUEST_CONFIG.TOKEN_PREFIX + Date.now()

      const guestUserInfo: UserInfo = {
        id: guestId,
        username: guestId,
        email: guestId + '@guest.com',
        roles: ['guest'],
        avatar: ''
      }

      token.value = guestToken
      userInfo.value = guestUserInfo

      // 设置token过期时间
      const expireTime = Date.now() + SESSION_DURATION
      tokenExpireTime.value = expireTime

      localStorage.setItem('token', guestToken)
      localStorage.setItem('userInfo', JSON.stringify(guestUserInfo))
      localStorage.setItem('tokenExpireTime', expireTime.toString())
      localStorage.setItem('lastActiveRole', AUTH_CONFIG.GUEST_CONFIG.DEFAULT_ROLE)

      // 生成动态路由
      await generateRoutes()

      console.log('游客自动登录成功:', guestUserInfo)

      return true
    } catch (error) {
      console.error('游客自动登录失败:', error)
      return false
    }
  }

  // 登录
  const login = async (loginForm: LoginForm) => {
    try {
      // 模拟登录API调用
      const response = {
        data: {
          token: 'mock-token-' + Date.now(),
          userInfo: {
            id: '1',
            username: loginForm.username,
            email: loginForm.username + '@example.com',
            roles: [loginForm.role],
            avatar: ''
          }
        }
      }

      const { token: newToken, userInfo: newUserInfo } = response.data

      token.value = newToken
      userInfo.value = newUserInfo

      // 设置token过期时间
      const expireTime = Date.now() + SESSION_DURATION
      tokenExpireTime.value = expireTime

      localStorage.setItem('token', newToken)
      localStorage.setItem('userInfo', JSON.stringify(newUserInfo))
      localStorage.setItem('tokenExpireTime', expireTime.toString())

      // 注册用户登录时，清除游客ID（表示已转为正式用户）
      localStorage.removeItem('guestId')

      // 保存当前角色为最后活跃角色
      const roleMap: Record<string, string> = {
        'designer': 'designer',
        'supplier': 'supplier',
        'contractor': 'contractor',
        'user': 'user',
        'guest': 'user'
      }
      lastActiveRole.value = roleMap[loginForm.role] || 'user'
      localStorage.setItem('lastActiveRole', lastActiveRole.value)

      // 生成动态路由
      await generateRoutes()

      // 广播登录状态给子应用
      broadcastLoginStatus(true, newUserInfo)

      return response
    } catch (error) {
      console.error('登录失败:', error)
      throw error
    }
  }

  // 获取用户信息
  const getUserInfo = async () => {
    try {
      const response = await getUserInfoApi()
      userInfo.value = response.data
      localStorage.setItem('userInfo', JSON.stringify(response.data))
      return response
    } catch (error) {
      console.error('获取用户信息失败:', error)
      throw error
    }
  }

  // 登出
  const logout = (redirect = true) => {
    token.value = ''
    userInfo.value = null
    permissions.value = []
    tokenExpireTime.value = 0

    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    localStorage.removeItem('tokenExpireTime')
    // 保留lastActiveRole和guestId，用于下次访问
    // 注意：不清除guestId，以便游客下次访问时复用同一身份

    // 清除动态路由
    clearRoutes()

    // 广播登出状态给子应用
    broadcastLoginStatus(false, null)

    if (redirect) {
      router.push('/login')
    }
  }

  // 更新最后活跃角色
  const updateLastActiveRole = (role: string) => {
    lastActiveRole.value = role
    localStorage.setItem('lastActiveRole', role)
  }

  // 获取最后活跃角色对应的路由路径
  const getLastActiveRoutePath = () => {
    const role = lastActiveRole.value
    if (!role) return AUTH_CONFIG.ROLE_PATH_MAP.user

    return AUTH_CONFIG.ROLE_PATH_MAP[role] || AUTH_CONFIG.ROLE_PATH_MAP.user
  }

  // 生成动态路由
  const generateRoutes = async () => {
    const accessedRoutes = filterAsyncRoutes(asyncRoutes, userRoles.value)

    // 动态添加路由
    accessedRoutes.forEach(route => {
      router.addRoute(route)
    })

    return accessedRoutes
  }

  // 过滤权限路由
  const filterAsyncRoutes = (routes: any[], roles: string[]) => {
    const res: any[] = []

    routes.forEach(route => {
      const tmp = { ...route }
      if (hasPermission(roles, tmp)) {
        if (tmp.children) {
          tmp.children = filterAsyncRoutes(tmp.children, roles)
        }
        res.push(tmp)
      }
    })

    return res
  }

  // 检查权限
  const hasPermission = (roles: string[], route: any) => {
    if (route.meta && route.meta.roles) {
      return roles.some(role => route.meta.roles.includes(role))
    }
    return true
  }

  // 检查路由权限
  const hasRoutePermission = (route: RouteLocationNormalized) => {
    if (route.meta?.roles) {
      return userRoles.value.some(role => route.meta!.roles!.includes(role))
    }
    return true
  }

  // 清除路由
  const clearRoutes = () => {
    // 移除动态添加的路由
    asyncRoutes.forEach(route => {
      if (router.hasRoute(route.name as string)) {
        router.removeRoute(route.name as string)
      }
    })
  }

  // 广播登录状态给子应用
  const broadcastLoginStatus = (isLoggedIn: boolean, user: UserInfo | null) => {
    const loginData = {
      type: 'LOGIN_STATUS_CHANGE',
      payload: {
        isLoggedIn,
        user,
        token: token.value
      }
    }

    broadcastToMicroApps(loginData)
  }

  return {
    token,
    userInfo,
    permissions,
    isAuthenticated,
    userRoles,
    isTokenValid,
    lastActiveRole,
    SESSION_DURATION,
    initializeAuth,
    guestAutoLogin,
    login,
    getUserInfo,
    logout,
    generateRoutes,
    hasPermission: hasRoutePermission,
    updateLastActiveRole,
    getLastActiveRoutePath
  }
})