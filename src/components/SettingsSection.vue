<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n, toggleLocale } from '../i18n'

const { t, locale } = useI18n()
const isDark = ref(localStorage.getItem('dark') === 'true')

onMounted(() => {
  document.documentElement.classList.toggle('dark', isDark.value)
})

function toggleDark() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('dark', String(isDark.value))
}
function toggleLang() {
  toggleLocale()
}
function printPdf() { window.print() }
</script>

<template>
  <section class="section" id="settings">
    <div class="section-header">
      <div class="section-bar"></div>
      <h2 class="section-title">{{ t('settings_title') }}</h2>
    </div>
    <div class="settings-grid">
      <div class="setting-card" @click="toggleDark">
        <div class="setting-icon">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
        </div>
        <div class="setting-info">
          <div class="setting-name">{{ t('settings_theme') }}</div>
          <div class="setting-value">{{ isDark ? 'Dark Mode' : 'Light Mode' }}</div>
        </div>
        <div class="setting-toggle">
          <div class="toggle-track" :class="{ active: isDark }">
            <div class="toggle-thumb"></div>
          </div>
        </div>
      </div>

      <div class="setting-card" @click="toggleLang">
        <div class="setting-icon">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
          </svg>
        </div>
        <div class="setting-info">
          <div class="setting-name">{{ t('settings_lang') }}</div>
          <div class="setting-value">{{ locale === 'EN' ? 'English' : 'ភាសាខ្មែរ' }}</div>
        </div>
        <div class="setting-badge">{{ locale }}</div>
      </div>

      <div class="setting-card" @click="printPdf">
        <div class="setting-icon">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
        </div>
        <div class="setting-info">
          <div class="setting-name">{{ t('settings_export') }}</div>
          <div class="setting-value">PDF</div>
        </div>
        <div class="setting-action">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
      </div>

      <div class="setting-card info-card">
        <div class="setting-icon">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
        </div>
        <div class="setting-info">
          <div class="setting-name">{{ t('settings_about') }}</div>
          <div class="setting-value">DEV_OS Portfolio</div>
        </div>
        <div class="setting-meta">
          <div class="meta-row"><span class="meta-key">{{ t('settings_version') }}</span><span class="meta-val">{{ t('settings_v') }}</span></div>
          <div class="meta-row"><span class="meta-key">{{ t('settings_build') }}</span><span class="meta-val">{{ t('settings_b') }}</span></div>
          <div class="meta-row"><span class="meta-key">{{ t('settings_engine') }}</span><span class="meta-val">{{ t('settings_e') }}</span></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section { padding: 52px 40px; background: transparent; border-top: 1px solid var(--border); }
.section-header { display: flex; align-items: center; gap: 12px; margin-bottom: 32px; }
.section-bar { width: 4px; height: 22px; background: var(--accent); border-radius: 2px; }
.section-title { font-family: var(--mono); font-size: 13px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--text); }
.settings-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.setting-card {
  background: var(--glass); backdrop-filter: blur(8px); border: 1px solid var(--border); border-radius: 10px;
  padding: 20px; cursor: pointer; transition: all 0.2s;
  display: flex; align-items: center; gap: 14px;
}
.setting-card:hover { border-color: var(--border2); }
.info-card { cursor: default; }
.setting-icon {
  width: 42px; height: 42px; border-radius: 10px;
  background: var(--bg); border: 1px solid var(--border);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  color: var(--text3);
}
.setting-info { flex: 1; min-width: 0; }
.setting-name { font-family: var(--mono); font-size: 11px; font-weight: 700; color: var(--text); letter-spacing: 0.06em; }
.setting-value { font-family: var(--mono); font-size: 9px; color: var(--text3); margin-top: 2px; }
.setting-toggle { flex-shrink: 0; }
.toggle-track {
  width: 40px; height: 22px; border-radius: 11px;
  background: var(--border2); position: relative; transition: background 0.2s;
}
.toggle-track.active { background: var(--accent); }
.toggle-thumb {
  width: 18px; height: 18px; border-radius: 50%;
  background: #fff; position: absolute; top: 2px; left: 2px;
  transition: transform 0.2s;
}
.toggle-track.active .toggle-thumb { transform: translateX(18px); }
.setting-badge {
  font-family: var(--mono); font-size: 10px; font-weight: 700;
  padding: 4px 10px; border-radius: 6px;
  background: var(--accent); color: #fff; flex-shrink: 0;
}
.setting-action { color: var(--text3); flex-shrink: 0; }
.setting-meta {
  display: flex; flex-direction: column; gap: 4px; flex-shrink: 0;
  padding-left: 14px; border-left: 1px solid var(--border);
}
.meta-row { display: flex; gap: 8px; align-items: center; }
.meta-key { font-family: var(--mono); font-size: 8px; font-weight: 700; color: var(--text3); letter-spacing: 0.08em; text-transform: uppercase; }
.meta-val { font-family: var(--mono); font-size: 9px; font-weight: 600; color: var(--text2); }
@media (max-width: 1024px) {
  .section { padding: 32px 20px; }
  .settings-grid { grid-template-columns: 1fr; }
}
@media (max-width: 600px) {
  .section { padding: 24px 16px; }
  .setting-card { padding: 16px; gap: 12px; }
  .info-card { flex-wrap: wrap; }
  .setting-meta { padding-left: 0; border-left: none; padding-top: 10px; border-top: 1px solid var(--border); width: 100%; }
}
</style>