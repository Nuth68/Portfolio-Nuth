<script setup lang="ts">
import { useI18n } from '../i18n'
const { t } = useI18n()

interface Lang { name: string; pct: number; icon: string }
interface Item { name: string; pct: number; icon: string }

defineProps<{
  languages: Lang[]
  frameworks: Item[]
  tools: Item[]
  databases: Item[]
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
        <div class="skill-card-title">{{ t('skills_languages') }}</div>
        <div class="chip-row">
          <div class="lang-item" v-for="lang in languages" :key="lang.name">
            <span class="lang-icon" v-html="lang.icon"></span>
            <span class="lang-name">{{ lang.name }}</span>
            <div class="lang-bar">
              <div class="lang-fill" :style="{ width: lang.pct + '%' }"></div>
            </div>
            <span class="lang-pct">{{ lang.pct }}%</span>
          </div>
        </div>
      </div>
      <div class="skill-card fade-up" style="animation-delay:0.07s">
        <div class="skill-card-title">{{ t('skills_frameworks') }}</div>
        <div class="chip-row">
          <div class="lang-item" v-for="f in frameworks" :key="f.name">
            <span class="lang-icon" v-html="f.icon"></span>
            <span class="lang-name">{{ f.name }}</span>
            <div class="lang-bar">
              <div class="lang-fill" :style="{ width: f.pct + '%' }"></div>
            </div>
            <span class="lang-pct">{{ f.pct }}%</span>
          </div>
        </div>
      </div>
      <div class="skill-card fade-up" style="animation-delay:0.12s">
        <div class="skill-card-title">Tools &amp; DevOps</div>
        <div class="chip-row">
          <div class="lang-item" v-for="tool in tools" :key="tool.name">
            <span class="lang-icon" v-html="tool.icon"></span>
            <span class="lang-name">{{ tool.name }}</span>
            <div class="lang-bar">
              <div class="lang-fill" :style="{ width: tool.pct + '%' }"></div>
            </div>
            <span class="lang-pct">{{ tool.pct }}%</span>
          </div>
        </div>
      </div>
      <div class="skill-card fade-up" style="animation-delay:0.17s">
        <div class="skill-card-title">{{ t('skills_databases') }}</div>
        <div class="chip-row">
          <div class="lang-item" v-for="db in databases" :key="db.name">
            <span class="lang-icon" v-html="db.icon"></span>
            <span class="lang-name">{{ db.name }}</span>
            <div class="lang-bar">
              <div class="lang-fill" :style="{ width: db.pct + '%' }"></div>
            </div>
            <span class="lang-pct">{{ db.pct }}%</span>
          </div>
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
.lang-item { display: flex; align-items: center; gap: 8px; width: 100%; padding: 4px 0; }
.lang-icon { display: flex; align-items: center; color: var(--accent); }
.lang-icon svg { stroke: var(--accent); }
.lang-name { font-family: var(--mono); font-size: 11px; font-weight: 600; color: var(--text); min-width: 70px; }
.lang-bar { flex: 1; height: 6px; background: var(--bg); border-radius: 3px; overflow: hidden; }
.lang-fill { height: 100%; background: var(--accent); border-radius: 3px; transition: width 0.6s ease; }
.lang-pct { font-family: var(--mono); font-size: 9px; color: var(--text3); min-width: 28px; text-align: right; }
.db-list { list-style: none; }
.db-list li { display: flex; align-items: center; gap: 8px; font-family: var(--mono); font-size: 11px; color: var(--text2); padding: 6px 0; border-bottom: 1px solid var(--border); }
.db-list li:last-child { border-bottom: none; }
.db-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); }
@media (max-width: 1024px) {
  .section { padding: 32px 20px; }
}
@media (max-width: 600px) {
  .section { padding: 24px 16px; }
  .skills-grid { grid-template-columns: 1fr; }
}
</style>
