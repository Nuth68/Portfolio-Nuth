<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from '../i18n'

const { t } = useI18n()
defineProps<{ links: string[] }>()
const emit = defineEmits<{ navigate: [id: string] }>()

const navKeys: Record<string, string> = {
  HOME: 'nav_home',
  PROJECTS: 'nav_projects',
  SKILLS: 'nav_skills',
  ABOUT: 'nav_about',
  CONTACT: 'nav_contact',
}

const icons: Record<string, string> = {
  HOME: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>',
  PROJECTS: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>',
  SKILLS: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
  ABOUT: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  CONTACT: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
}

const activeIndex = ref(0)
const hidden = ref(false)

function onClick(i: number, id: string) {
  activeIndex.value = i
  emit('navigate', id)
}

function onScroll() {
  if (window.scrollY > 80) hidden.value = true
}
function onScrollEnd() {
  hidden.value = false
}
onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('scrollend', onScrollEnd, { passive: true })
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('scrollend', onScrollEnd)
})
</script>

<template>
  <nav :class="{ hidden }">
    <a v-for="(link, i) in links" :key="link" class="nav-link" :class="{ active: activeIndex === i }" @click="onClick(i, link.toLowerCase())">
      <span class="nav-icon" v-html="icons[link]"></span>
      <span class="nav-label">{{ t(navKeys[link] || link) }}</span>
    </a>
  </nav>
</template>

<style scoped>
nav {
  position: fixed; bottom: 16px; left: 50%; transform: translateX(-50%);
  transition: transform 0.3s ease, opacity 0.3s ease;
  z-index: 100;
  display: flex; align-items: center; gap: 4px;
  padding: 6px 12px;
  background: var(--nav-bg);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid var(--nav-border);
  border-radius: 34px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
}
.nav-link {
  display: flex; flex-direction: column; align-items: center; gap: 2px;
  font-family: var(--mono); font-size: 10px; font-weight: 600;
  letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--nav-text); text-decoration: none;
  padding: 8px 14px; border-radius: 8px;
  transition: all 0.2s ease;
}
.nav-link:hover { color: var(--accent); background: var(--bg); }
.nav-link.active { color: var(--accent); background: var(--bg); }
.nav-link.active .nav-icon svg { stroke: var(--accent); stroke-width: 2.5; }
.nav-icon { display: flex; line-height: 1; }
.nav-label { line-height: 1; white-space: nowrap; }
.hidden { transform: translateX(-50%) translateY(80px); opacity: 0; }
@media (max-width: 1024px) {
  nav { gap: 2px; padding: 5px 10px; border-radius: 30px; bottom: 12px; }
  .nav-link { padding: 6px 10px; }
  .nav-link .nav-icon svg { width: 20px; height: 20px; }
  .nav-label { font-size: 9px; }
}
@media (max-width: 600px) {
  nav { gap: 2px; padding: 4px 8px; border-radius: 26px; bottom: 8px; }
  .nav-link { padding: 5px 8px; }
  .nav-link .nav-icon svg { width: 18px; height: 18px; }
  .nav-label { font-size: 7px; letter-spacing: 0.04em; }
}
</style>