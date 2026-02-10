<template>
  <div>
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
            <router-link to="/" class="navbar-brand">LOGO</router-link>
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
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import LanguageSwitcher from './LanguageSwitcher.vue'
import UserAvatar from './UserAvatar.vue'
import AboutUsDropdown from './AboutUsDropdown.vue'
import type { I18nPlugin } from '@/plugins/i18n'

const i18n = inject<I18nPlugin>('i18n')
const $t = (key: string) => i18n?.t(key) || key
</script>

<style scoped>
/* Top Navigation */
.top-nav-bar {
  background: #333333;
  color: white;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.btn-register {
  background: #00699A;
  color: white;
  border: none;
  padding: 0.375rem 1rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  transition: background 0.2s;
}

.btn-register:hover {
  background: #005580;
}

.main-header {
  background: white;
  padding: 1rem 0;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.05);
  margin-bottom: 0;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: 700;
  color: #00699A;
  text-decoration: none;
}

.nav-link {
  color: #6b7280;
  text-decoration: none;
  padding: 0.5rem 1rem;
  font-size: 0.9375rem;
  transition: color 0.2s;
}

.nav-link:hover,
.nav-link.active {
  color: #00699A;
}

.search-input {
  width: 18.75rem;
  padding-left: 2.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  font-size: 0.875rem;
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
}

.btn-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e5e7eb;
  color: #6b7280;
  text-decoration: none;
  transition: all 0.2s;
}

.btn-icon:hover {
  background: #f3f4f6;
  color: #00699A;
}
</style>
