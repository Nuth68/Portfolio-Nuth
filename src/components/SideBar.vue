<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { toggleLocale, useI18n } from '../i18n'
import { autoExportCv } from '../state'

const { t, locale } = useI18n()
const isDark = ref(localStorage.getItem('dark') === 'true')
const open = ref(false)
const emit = defineEmits<{ navigate: [page: string] }>()

onMounted(() => {
  document.documentElement.classList.toggle('dark', isDark.value)
})

function toggleSidebar() {
  open.value = !open.value
}

function toggleDark() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('dark', String(isDark.value))
}
function toggleLang() {
  toggleLocale()
}
function goTo(id: string) {
  open.value = false
  emit('navigate', id)
}
function openGithub() {
  open.value = false
  window.open('https://github.com', '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <button class="toggle-btn" @click="toggleSidebar">
    <span class="arrow">{{ open ? '\u276E' : '\u276F' }}</span>
  </button>
  <aside class="sidebar" :class="{ open }">
      <div class="sidebar-item" @click="openGithub">
      <span class="s-icon"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg></span>
      <span class="s-label">{{ t('sidebar_git') }}</span>
    </div>
    <div class="sidebar-item" @click="goTo('contact')">
      <span class="s-icon"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></span>
      <span class="s-label">{{ t('sidebar_mail') }}</span>
    </div>
    <div class="sidebar-item" @click="toggleDark">
      <span class="s-icon">
        <svg v-if="isDark" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
        <svg v-else viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
      </span>
      <span class="s-label">{{ isDark ? t('sidebar_light') : t('sidebar_dark') }}</span>
    </div>
    <div class="sidebar-item" @click="toggleLang">
      <span class="s-icon"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg></span>
      <span class="s-label">{{ t('sidebar_lang') }}</span>
    </div>
    <div class="sidebar-item" @click="autoExportCv = true; goTo('profile')">
      <span class="s-icon"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg></span>
      <span class="s-label">{{ t('sidebar_export') }}</span>
    </div>
    <div class="spacer"></div>
    <div class="divider"></div>
    <div class="sidebar-item" @click="goTo('profile')">
      <span class="s-icon"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg></span>
      <span class="s-label">{{ t('sidebar_profile') }}</span>
    </div>
    <div class="sidebar-item" @click="goTo('settings')">
      <span class="s-icon"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg></span>
      <span class="s-label">{{ t('sidebar_settings') }}</span>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  position: fixed; left: 0; top: 0; bottom: 0; width: 80px;
  background: var(--surface); border-right: 1px solid var(--border);
  display: flex; flex-direction: column; align-items: center;
  padding: 12px 0; gap: 4px; z-index: 90;
  transform: translateX(0); transition: transform 0.3s ease;
  overflow: visible;
  
}
.toggle-btn {
  position: fixed; left: 0; top: 50%; transform: translateY(-50%);
  width: 28px; height: 48px; border: 1px solid var(--border);
  border-left: none; border-radius: 0 8px 8px 0;
  background: var(--surface); color: var(--text3);
  display: none; align-items: center; justify-content: center; z-index: 201;
  transition: left 0.3s ease, color 0.2s;
}
.toggle-btn:has(+ .sidebar.open) { left: 63px; }
.toggle-btn:hover { color: var(--accent); }
.arrow { font-size: 14px; line-height: 1; }
.sidebar-item {
  display: flex; flex-direction: column; align-items: center; gap: 4px;
  width: 64px; padding: 10px 0; border-radius: 10px;
  color: var(--text3); transition: all 0.2s;
}
.sidebar-item:hover, .sidebar-item.active { background: var(--bg); color: var(--accent); }
.s-icon { display: flex; align-items: center; justify-content: center; }
.s-icon svg { width: 20px; height: 20px; }
.s-label { font-family: var(--mono); font-size: 10px; font-weight: 600; letter-spacing: 0.06em; line-height: 1; }
.spacer { flex: 1; }
.divider { width: 36px; height: 1px; background: var(--border); margin: 4px 0; }
@media (max-width: 1024px) {
  .sidebar { z-index: 200; width: 64px; transform: translateX(-100%); border-right: none; top: 15vh; bottom: auto; height: 70vh; padding: 12px 0; gap: 4px; justify-content: center; }
  .sidebar.open { transform: translateX(0); box-shadow: 4px 0 24px rgba(0,0,0,0.15); border-radius: 0 12px 12px 0; }
  .toggle-btn { display: flex; z-index: 201; }
  .sidebar-item { width: 52px; padding: 7px 0; gap: 4px; }
  .s-icon svg { width: 17px; height: 17px; }
  .s-label { font-size: 10px; }
}
@media (max-width: 600px) {
  .sidebar { width: 56px; top: 15vh; bottom: auto; height: 70vh; padding: 12px 0; gap: 4px; justify-content: center; }
  .toggle-btn:has(+ .sidebar.open) { left: 55px; }
  .sidebar-item { width: 44px; padding: 6px 0; gap: 4px; }
  .s-icon svg { width: 15px; height: 15px; }
  .s-label { font-size: 9px; letter-spacing: 0.03em; }
  .divider { width: 28px; }
}
</style>