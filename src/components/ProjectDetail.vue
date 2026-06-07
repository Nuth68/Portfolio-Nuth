<script setup lang="ts">
import { useI18n } from '../i18n'
const { t } = useI18n()

interface Project {
  name: string
  icon: string
  status: string
  desc: string
  tags: string[]
  role: string
  duration: string
  features: string[]
  challenge: string
  highlights: string[]
  links: { github: string; demo: string }
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
        <div class="detail-icon" v-html="project.icon"></div>
        <div class="detail-header-info">
          <h1 class="detail-name">{{ project.name }}</h1>
          <div class="detail-meta">
            <span class="status-badge" :class="`status-${project.status.toLowerCase()}`">&#9679; {{ project.status }}</span>
            <span class="meta-item">
              <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              {{ project.role }}
            </span>
            <span class="meta-item">
              <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              {{ project.duration }}
            </span>
          </div>
        </div>
      </div>

      <div class="detail-body">
        <div class="detail-main">
          <div class="detail-sec">
            <div class="detail-sec-title">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              Overview
            </div>
            <p class="detail-desc">{{ project.desc }}</p>
          </div>

          <div class="detail-sec">
            <div class="detail-sec-title">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/></svg>
              Key Features
            </div>
            <div class="features-list">
              <div class="feature-item" v-for="(f, i) in project.features" :key="i">
                <span class="feature-check">
                  <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
                {{ f }}
              </div>
            </div>
          </div>

          <div class="detail-sec challenge-sec">
            <div class="detail-sec-title">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              Challenge
            </div>
            <p class="detail-desc challenge-text">{{ project.challenge }}</p>
          </div>

          <div class="detail-sec">
            <div class="detail-sec-title">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              Technical Highlights
            </div>
            <div class="features-list">
              <div class="feature-item" v-for="(h, i) in project.highlights" :key="i">
                <span class="feature-check highlight-dot">
                  <svg viewBox="0 0 24 24" width="8" height="8" fill="currentColor"><circle cx="12" cy="12" r="6"/></svg>
                </span>
                {{ h }}
              </div>
            </div>
          </div>
        </div>

        <div class="detail-side">
          <div class="detail-sec">
            <div class="detail-sec-title">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
              {{ t('projects_tech', 'TECHNOLOGY STACK') }}
            </div>
            <div class="detail-tags">
              <span class="tag" v-for="tag in project.tags" :key="tag">{{ tag }}</span>
            </div>
          </div>

          <div class="detail-sec">
            <div class="detail-sec-title">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              Links
            </div>
            <div class="links-list">
              <a :href="project.links.github" target="_blank" rel="noopener noreferrer" class="link-item">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                Source Code
              </a>
              <a :href="project.links.demo" target="_blank" rel="noopener noreferrer" class="link-item">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                Live Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section { padding: 40px; }
.detail-nav { margin-bottom: 24px; }
.back-btn {
  font-family: var(--mono); font-size: 10px; font-weight: 700; letter-spacing: 0.12em;
  text-transform: uppercase; color: var(--text3); background: none; border: 1px solid var(--border);
  border-radius: 6px; padding: 8px 14px; display: flex; align-items: center; gap: 6px;
  transition: all 0.2s;
}
.back-btn:hover { color: var(--accent); border-color: var(--accent); }
.detail-card {
  background: var(--glass); backdrop-filter: blur(8px); border: 1px solid var(--border);
  border-radius: 14px; padding: 32px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.04);
  position: relative; overflow: hidden;
}
.detail-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--accent), transparent);
  opacity: 0.6;
}
.detail-header {
  display: flex; align-items: center; gap: 20px;
  margin-bottom: 28px; padding-bottom: 24px;
  border-bottom: 1px solid var(--border);
  position: relative;
}
.detail-header::after {
  content: '';
  position: absolute;
  bottom: -1px; left: 0;
  width: 60px; height: 2px;
  background: var(--accent);
  border-radius: 1px;
}
.detail-icon {
  width: 64px; height: 64px; border-radius: 16px;
  background: var(--bg);
  border: 1px solid var(--border);
  display: flex; align-items: center; justify-content: center;
  font-size: 28px; flex-shrink: 0;
  color: var(--accent);
}
.detail-icon svg { stroke: var(--accent); }
.detail-header-info { flex: 1; }
.detail-name { font-family: var(--mono); font-size: 20px; font-weight: 800; color: var(--text); margin: 0 0 10px; letter-spacing: 0.04em; }
.detail-meta { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.status-badge { font-family: var(--mono); font-size: 9px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 4px 10px; border-radius: 20px; display: inline-flex; align-items: center; gap: 4px; }
.status-active { background: rgba(0,184,148,0.12); color: var(--green); }
.status-secure { background: rgba(9,132,227,0.12); color: var(--blue); }
.status-pending { background: rgba(253,203,110,0.15); color: #d4910a; }
.status-stable { background: rgba(108,92,231,0.12); color: var(--purple); }
.status-beta { background: rgba(214,48,49,0.1); color: var(--accent); }
.status-deployed { background: rgba(0,184,148,0.12); color: var(--green); }
.status-mobile { background: rgba(9,132,227,0.12); color: var(--blue); }
.status-vue { background: rgba(108,92,231,0.12); color: var(--purple); }
.status-done { background: rgba(0,184,148,0.12); color: var(--green); }
.meta-item {
  font-family: var(--mono); font-size: 9px; font-weight: 600; color: var(--text3);
  display: inline-flex; align-items: center; gap: 4px;
}
.detail-body { display: grid; grid-template-columns: 1fr 220px; gap: 32px; }
.detail-main { display: flex; flex-direction: column; gap: 24px; }
.detail-side { display: flex; flex-direction: column; gap: 24px; }
.detail-sec-title {
  display: flex; align-items: center; gap: 6px;
  font-family: var(--mono); font-size: 9px; font-weight: 700; letter-spacing: 0.15em;
  text-transform: uppercase; color: var(--accent); margin-bottom: 12px;
  padding-bottom: 6px; border-bottom: 1px solid var(--border);
}
.detail-sec-title svg { stroke: var(--accent); }
.detail-desc {
  font-size: 13px; color: var(--text2); line-height: 1.8; margin: 0;
  padding-left: 12px; border-left: 2px solid var(--border);
  transition: border-color 0.2s;
}
.detail-desc:hover { border-left-color: var(--accent); }
.challenge-sec { background: rgba(214,48,49,0.03); border-radius: 8px; padding: 16px; margin-top: 4px; }
.challenge-sec .detail-sec-title { margin-bottom: 10px; }
.challenge-text {
  padding-left: 0; border-left: none;
  font-size: 12px; line-height: 1.9;
  background: transparent; border-radius: 0;
  padding: 0;
}
.challenge-text:hover { border-left-color: transparent; }
.features-list { display: flex; flex-direction: column; gap: 6px; }
.feature-item {
  display: flex; align-items: center; gap: 8px;
  font-family: var(--mono); font-size: 10px; color: var(--text2); padding: 4px 0;
}
.feature-check {
  display: flex; align-items: center; color: var(--green); flex-shrink: 0;
}
.highlight-dot { color: var(--accent); }
.detail-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.tag {
  font-family: var(--mono); font-size: 9px; font-weight: 600; letter-spacing: 0.08em;
  text-transform: uppercase; background: var(--bg); color: var(--text3);
  padding: 4px 10px; border-radius: 6px; border: 1px solid var(--border);
  transition: all 0.2s;
}
.tag:hover { border-color: var(--accent); color: var(--accent); background: rgba(214,48,49,0.04); }
.links-list { display: flex; flex-direction: column; gap: 6px; }
.link-item {
  display: flex; align-items: center; gap: 6px; padding: 8px 10px;
  font-family: var(--mono); font-size: 10px; font-weight: 600; color: var(--text2);
  text-decoration: none; border: 1px solid var(--border); border-radius: 6px;
  transition: all 0.2s; background: var(--bg);
}
.link-item svg { fill: var(--text2); stroke: var(--text2); flex-shrink: 0; }
.link-item:hover { border-color: var(--accent); color: var(--accent); }
.link-item:hover svg { fill: var(--accent); stroke: var(--accent); }
@media (max-width: 1024px) {
  .section { padding: 24px 20px; }
  .detail-body { grid-template-columns: 1fr; }
}
@media (max-width: 600px) {
  .section { padding: 16px; }
  .detail-card { padding: 20px; }
  .detail-header { flex-direction: column; text-align: center; }
  .detail-meta { justify-content: center; }
}
</style>
