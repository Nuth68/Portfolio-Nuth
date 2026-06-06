<script setup lang="ts">
import { useI18n } from '../i18n'
const { t } = useI18n()

interface Lang { name: string; pct: number }

defineProps<{
  languages: Lang[]
  frameworks: string[]
  tools: string[]
  databases: string[]
}>()
</script>

<template>
  <section class="section" id="skills">
    <div class="section-header">
      <div class="section-bar"></div>
      <h2 class="section-title">{{ t('skills_title') }}</h2>
    </div>
    <div class="skills-grid">
      <div class="skill-card fade-up">
        <div class="skill-card-title"><span class="skill-icon">💻</span> {{ t('skills_languages') }}</div>
        <div class="chip-row">
          <span class="chip" v-for="lang in languages" :key="lang.name">{{ lang.name }}</span>
        </div>
      </div>
      <div class="skill-card fade-up" style="animation-delay:0.07s">
        <div class="skill-card-title"><span class="skill-icon">⚙</span> {{ t('skills_frameworks') }}</div>
        <div class="chip-row">
          <span class="chip" v-for="f in frameworks" :key="f">{{ f }}</span>
        </div>
      </div>
      <div class="skill-card fade-up" style="animation-delay:0.12s">
        <div class="skill-card-title"><span class="skill-icon">🔧</span> {{ t('skills_tools') }}</div>
        <div class="chip-row">
          <span class="chip" v-for="tool in tools" :key="tool">{{ tool }}</span>
        </div>
      </div>
      <div class="skill-card fade-up" style="animation-delay:0.17s">
        <div class="skill-card-title"><span class="skill-icon">🗄</span> {{ t('skills_databases') }}</div>
        <div class="chip-row">
          <span class="chip" v-for="db in databases" :key="db">{{ db }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section { padding: 52px 40px; }
.section-header { display: flex; align-items: center; gap: 12px; margin-bottom: 32px; }
.section-bar { width: 4px; height: 22px; background: var(--accent); border-radius: 2px; }
.section-title { font-family: var(--mono); font-size: 13px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--text); }
.skills-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.skill-card { background: var(--glass); backdrop-filter: blur(8px); border: 1px solid var(--border); border-radius: 10px; padding: 22px; }
.skill-card-title { display: flex; align-items: center; gap: 8px; font-family: var(--mono); font-size: 10px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--text3); margin-bottom: 18px; }
.skill-icon { font-size: 14px; }
.chip-row { display: flex; flex-wrap: wrap; gap: 8px; }
.chip { font-family: var(--mono); font-size: 10px; font-weight: 600; letter-spacing: 0.06em; background: var(--bg); border: 1px solid var(--border); color: var(--text2); padding: 5px 11px; border-radius: 6px; }
.db-list { list-style: none; }
.db-list li { display: flex; align-items: center; gap: 8px; font-family: var(--mono); font-size: 11px; color: var(--text2); padding: 6px 0; border-bottom: 1px solid var(--border); }
.db-list li:last-child { border-bottom: none; }
.db-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); }
@media (max-width: 1024px) {
  .section { padding: 32px 20px; }
}
@media (max-width: 600px) {
  .section { padding: 24px 16px; }
}
</style>
