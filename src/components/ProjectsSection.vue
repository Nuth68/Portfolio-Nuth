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

defineProps<{ projects: Project[] }>()
const emit = defineEmits<{ select: [project: Project] }>()
</script>

<template>
  <section class="section" id="projects">
    <div class="section-header">
      <div class="section-bar"></div>
      <h2 class="section-title">{{ t('projects_title') }}</h2>
    </div>
    <div class="projects-grid">
      <div class="project-card fade-up" v-for="(p, i) in projects" :key="p.name" :style="`animation-delay:${i*0.07}s`" @click="emit('select', p)">
        <div class="card-top">
          <div class="card-icon">{{ p.icon }}</div>
          <span class="status-badge" :class="`status-${p.status.toLowerCase()}`">&#9679; {{ p.status }}</span>
        </div>
        <div class="card-name">{{ p.name }}</div>
        <div class="card-desc">{{ p.desc }}</div>
        <div class="card-tags">
          <span class="tag" v-for="tag in p.tags" :key="tag">{{ tag }}</span>
        </div>
      </div>
      <a class="see-more-card fade-up" href="https://github.com" target="_blank" rel="noopener noreferrer" style="animation-delay:0.42s">
        <div class="see-more-icon">+</div>
        <div class="see-more-label">See All Projects</div>
        <div class="see-more-arrow">&rarr;</div>
      </a>
    </div>
  </section>
</template>

<style scoped>
.section { padding: 52px 40px; }
.section-header { display: flex; align-items: center; gap: 12px; margin-bottom: 32px; }
.section-bar { width: 4px; height: 22px; background: var(--accent); border-radius: 2px; }
.section-title { font-family: var(--mono); font-size: 13px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--text); }
.projects-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
@media (max-width: 1024px) {
  .projects-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .card-desc { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
  .see-more-card { min-height: auto; padding: 16px; }
  .see-more-icon { width: 40px; height: 40px; font-size: 20px; }
  .see-more-label { font-size: 10px; }
}
@media (max-width: 600px) {
  .section { padding: 24px 16px; }
  .projects-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
  .project-card { padding: 14px; }
  .card-top { gap: 8px; }
  .status-badge { font-size: 8px; padding: 2px 6px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 60%; }
}
.project-card {
  background: var(--glass); backdrop-filter: blur(8px); border: 1px solid var(--border); border-radius: 10px;
  padding: 20px; transition: all 0.2s; cursor: pointer; position: relative; overflow: hidden;
  display: flex; flex-direction: column;
}
.project-card::before { content: ''; position: absolute; inset: 0; opacity: 0; background: linear-gradient(135deg, rgba(214,48,49,0.04), transparent); transition: opacity 0.3s; }
.project-card:hover { border-color: var(--border2); box-shadow: 0 4px 20px rgba(0,0,0,0.07); transform: translateY(-2px); }
.project-card:hover::before { opacity: 1; }
.card-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 14px; }
.card-icon { width: 38px; height: 38px; border-radius: 8px; background: var(--bg); display: flex; align-items: center; justify-content: center; font-size: 18px; }
.status-badge { font-family: var(--mono); font-size: 9px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 3px 8px; border-radius: 20px; }
.status-active { background: rgba(0,184,148,0.12); color: var(--green); }
.status-secure { background: rgba(9,132,227,0.12); color: var(--blue); }
.status-pending { background: rgba(253,203,110,0.15); color: #d4910a; }
.status-stable { background: rgba(108,92,231,0.12); color: var(--purple); }
.status-beta { background: rgba(214,48,49,0.1); color: var(--accent); }
.card-name { font-family: var(--mono); font-size: 12px; font-weight: 700; letter-spacing: 0.08em; color: var(--text); margin-bottom: 8px; }
.card-desc { font-size: 12px; color: var(--text2); line-height: 1.6; margin-bottom: 14px; flex: 1; }
.card-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.tag { font-family: var(--mono); font-size: 9px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; background: var(--bg); color: var(--text3); padding: 3px 8px; border-radius: 4px; border: 1px solid var(--border); }
.see-more-card {
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;
  background: var(--glass); backdrop-filter: blur(8px); border: 1px dashed var(--border);
  border-radius: 10px; padding: 20px; cursor: pointer; text-decoration: none;
  transition: all 0.2s; min-height: 200px;
}
.see-more-card:hover { border-color: var(--accent); background: var(--surface2); }
.see-more-icon {
  width: 48px; height: 48px; border-radius: 50%; border: 2px solid var(--border2);
  display: flex; align-items: center; justify-content: center;
  font-size: 24px; color: var(--text3); transition: all 0.2s;
  font-family: var(--mono); font-weight: 300;
}
.see-more-card:hover .see-more-icon { border-color: var(--accent); color: var(--accent); }
.see-more-label { font-family: var(--mono); font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text3); }
.see-more-arrow { font-size: 18px; color: var(--text3); transition: transform 0.2s; }
.see-more-card:hover .see-more-arrow { transform: translateX(4px); color: var(--accent); }
@media (max-width: 1024px) {
  .section { padding: 32px 20px; }
}
</style>
