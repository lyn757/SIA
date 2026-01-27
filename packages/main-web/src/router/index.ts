import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Layout from '@/components/Layout/index.vue'

// 公共路由（无需权限）
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Auth/Login.vue'),
    meta: {
      allowGuest: true,
      title: 'login.title'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Auth/Register.vue'),
    meta: {
      allowGuest: true,
      title: 'register.title'
    }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard/index.vue'),
        meta: {
          title: 'dashboard.title',
          icon: 'dashboard'
        }
      }
    ]
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('@/views/MicroApps/UserApp.vue'),
    meta: {
      title: 'user.title',
      roles: ['user', 'guest'],
      microApp: 'user-web',
      fullscreen: true,
      allowGuest: true // 允许游客访问
    }
  }
]

// 权限路由（需要权限验证）
export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/guest',
    name: 'Guest',
    component: Layout,
    meta: {
      title: 'guest.title',
      allowGuest: true
    },
    children: [
      {
        path: '',
        name: 'GuestDashboard',
        component: () => import('@/views/Guest/index.vue'),
        meta: {
          title: 'guest.dashboard',
          allowGuest: true
        }
      }
    ]
  },
  {
    path: '/designer',
    name: 'Designer',
    component: Layout,
    meta: {
      title: 'designer.title',
      roles: ['designer']
    },
    children: [
      {
        path: '',
        name: 'DesignerApp',
        component: () => import('@/views/MicroApps/DesignerApp.vue'),
        meta: {
          title: 'designer.app',
          microApp: 'designer-web'
        }
      }
    ]
  },
  {
    path: '/supplier',
    name: 'Supplier',
    component: Layout,
    meta: {
      title: 'supplier.title',
      roles: ['supplier']
    },
    children: [
      {
        path: '',
        name: 'SupplierApp',
        component: () => import('@/views/MicroApps/SupplierApp.vue'),
        meta: {
          title: 'supplier.app',
          microApp: 'supplier-web'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes
})

// 路由守卫
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  console.log('路由守卫:', {
    to: to.path,
    isAuthenticated: authStore.isAuthenticated,
    isTokenValid: authStore.isTokenValid,
    userRoles: authStore.userRoles,
    routeMeta: to.meta
  })

  // 如果访问根路径，根据认证状态进行重定向
  if (to.path === '/' || to.path === '/dashboard') {
    // 检查是否有有效的token
    if (authStore.token && authStore.isTokenValid) {
      // 已登录且token有效，跳转到上次活跃的角色页面
      const targetPath = authStore.getLastActiveRoutePath()
      console.log('已登录用户，跳转到上次角色页面:', targetPath)
      next(targetPath)
      return
    } else if (authStore.token && !authStore.isTokenValid) {
      // token过期，清除认证信息，跳转到主应用登录页
      console.log('Token已过期，跳转到登录页')
      authStore.logout(false)
      next('/login')
      return
    } else {
      // 未登录用户，以游客身份进入C端首页
      console.log('未登录用户，以游客身份进入C端首页')
      await authStore.guestAutoLogin()
      next('/user')
      return
    }
  }

  // 如果访问登录或注册页面，允许通过
  if (to.path === '/login' || to.path === '/register') {
    next()
    return
  }

  // 如果访问C端用户页面
  if (to.path.startsWith('/user')) {
    // 检查是否有有效的token
    if (!authStore.token) {
      // 没有token，以游客身份进入
      console.log('访问C端，以游客身份进入')
      await authStore.guestAutoLogin()
    } else if (!authStore.isTokenValid) {
      // token过期，清除并以游客身份进入
      console.log('Token过期，以游客身份重新进入C端')
      authStore.logout(false)
      await authStore.guestAutoLogin()
    }
    next()
    return
  }

  // 访问其他受保护的路由（designer/supplier/contractor）
  if (!authStore.isAuthenticated || !authStore.isTokenValid) {
    // 未登录或token过期，跳转到登录页
    console.log('访问受保护路由，需要登录')
    authStore.logout(false)
    next('/login')
    return
  }

  // 检查权限路由
  if (!authStore.hasPermission(to)) {
    console.warn('权限检查失败:', {
      path: to.path,
      userRoles: authStore.userRoles,
      requiredRoles: to.meta?.roles
    })

    // 跳转到用户有权限的默认页面
    const targetPath = authStore.getLastActiveRoutePath()
    next(targetPath)
    return
  }

  // 更新最后活跃角色（根据当前访问的路径）
  if (to.path.startsWith('/designer')) {
    authStore.updateLastActiveRole('designer')
  } else if (to.path.startsWith('/supplier')) {
    authStore.updateLastActiveRole('supplier')
  } else if (to.path.startsWith('/user')) {
    authStore.updateLastActiveRole('user')
  }

  next()
})

export default router