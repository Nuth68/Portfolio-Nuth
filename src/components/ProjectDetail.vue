<script setup lang="ts">
import { useI18n } from '../i18n'
const { t } = useI18n()

interface Project {
  name: string
  icon: string
  status: string
  desc: string
  tags: string[]
}

defineProps<{ project: Project }>()
const emit = defineEmits<{ back: [] }>()
</script>

<template>
  <section class="section">
    <div class="detail-nav">
      <button class="back-btn" @click="emit('back')">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
        {{ t('projects_back') }}
      </button>
    </div>
    <div class="detail-card">
      <div class="detail-header">
        <div class="detail-icon">{{ project.icon }}</div>
        <div class="detail-header-info">
          <h1 class="detail-name">{{ project.name }}</h1>
          <span class="status-badge" :class="`status-${project.status.toLowerCase()}`">&#9679; {{ project.status }}</span>
        </div>
      </div>
      <p class="detail-desc">{{ project.desc }}</p>
      <div class="detail-section">
        <h3 class="detail-section-title">{{ t('projects_tech', 'TECHNOLOGY STACK') }}</h3>
        <div class="detail-tags">
          <span class="tag" v-for="tag in project.tags" :key="tag">{{ tag }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section { padding: 40px; max-width: 800px; margin: 0 auto; }
.detail-nav { margin-bottom: 24px; }
.back-btn {
  font-family: var(--mono); font-size: 10px; font-weight: 700; letter-spacing: 0.12em;
  text-transform: uppercase; color: var(--text3); background: none; border: 1px solid var(--border);
  border-radius: 6px; padding: 8px 14px; cursor: pointer; display: flex; align-items: center; gap: 6px;
  transition: all 0.2s;
}
.back-btn:hover { color: var(--accent); border-color: var(--accent); }
.detail-card {
  background: var(--glass); backdrop-filter: blur(8px); border: 1px solid var(--border);
  border-radius: 12px; padding: 32px;
}
.detail-header { display: flex; align-items: center; gap: 20px; margin-bottom: 24px; }
.detail-icon {
  width: 56px; height: 56px; border-radius: 12px; background: var(--bg);
  display: flex; align-items: center; justify-content: center; font-size: 26px; flex-shrink: 0;
}
.detail-header-info { flex: 1; }
.detail-name { font-family: var(--mono); font-size: 22px; font-weight: 800; color: var(--text); margin: 0 0 6px; letter-spacing: 0.04em; }
.status-badge { font-family: var(--mono); font-size: 9px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 3px 8px; border-radius: 20px; display: inline-block; }
.status-active { background: rgba(0,184,148,0.12); color: var(--green); }
.status-secure { background: rgba(9,132,227,0.12); color: var(--blue); }
.status-pending { background: rgba(253,203,110,0.15); color: #d4910a; }
.status-stable { background: rgba(108,92,231,0.12); color: var(--purple); }
.status-beta { background: rgba(214,48,49,0.1); color: var(--accent); }
.detail-desc { font-size: 14px; color: var(--text2); line-height: 1.8; margin-bottom: 28px; }
.detail-section { margin-bottom: 24px; }
.detail-section:last-child { margin-bottom: 0; }
.detail-section-title {
  font-family: var(--mono); font-size: 10px; font-weight: 700; letter-spacing: 0.15em;
  text-transform: uppercase; color: var(--text3); margin: 0 0 12px;
}
.detail-tags { display: flex; flex-wrap: wrap; gap: 8px; }
.tag {
  font-family: var(--mono); font-size: 10px; font-weight: 600; letter-spacing: 0.08em;
  text-transform: uppercase; background: var(--bg); color: var(--text3);
  padding: 5px 12px; border-radius: 6px; border: 1px solid var(--border);
}
@media (max-width: 1024px) {
  .section { padding: 24px 20px; }
}
@media (max-width: 600px) {
  .section { padding: 16px; }
  .detail-card { padding: 20px; }
  .detail-header { flex-direction: column; text-align: center; }
}
</style>
