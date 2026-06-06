<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from '../i18n'

const { t } = useI18n()

const svgMail = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>'
const svgGrid = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>'
const displayText = ref('')
const fullText = `> system.boot --target=portfolio\n> init profile --user="Student Developer"\n> status: ready_for_internship_opportunities`
const idx = ref(0)

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  setInterval(() => {
    if (idx.value < fullText.length) {
      displayText.value = fullText.slice(0, idx.value + 1)
      idx.value++
    } else {
      displayText.value = ''
      idx.value = 0
    }
  }, 30)
})
</script>

<template>
  <section class="hero" id="home">
    <div class="hero-content">
      <div class="hero-badge">
        <span class="badge-dot"></span>
        <span class="badge-text">AVAILABLE // OPEN FOR WORK</span>
      </div>
      <h1 class="hero-name">Student<br>Developer</h1>
      <p class="hero-tagline">Full Stack &bull; Distributed Systems &bull; Intern-Seeking</p>
      <div class="hero-terminal">
        <div class="term-bar">
          <div class="term-dots">
            <div class="td td-r"></div>
            <div class="td td-y"></div>
            <div class="td td-g"></div>
          </div>
          <span class="term-title">bash -- ./intro.sh</span>
        </div>
        <pre class="term-body">{{ displayText }}<span class="cursor-blink">&#9610;</span></pre>
      </div>
      <div class="hero-actions">
        <button class="hero-btn hero-btn-primary" @click="scrollTo('contact')"><span class="btn-icon" v-html="svgMail"></span> CONTACT</button>
        <button class="hero-btn hero-btn-secondary" @click="scrollTo('projects')"><span class="btn-icon" v-html="svgGrid"></span> PROJECTS</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 80vh;
  display: flex; align-items: center; justify-content: center;
  padding: 60px 40px;
  border-bottom: 1px solid var(--border);
  position: relative;
  overflow: hidden;
}
.hero-content {
  max-width: 680px; width: 100%;
  display: flex; flex-direction: column; align-items: center; gap: 24px;
  text-align: center;
}
.hero-badge {
  display: flex; align-items: center; gap: 6px;
  font-family: var(--mono); font-size: 9px; font-weight: 700;
  letter-spacing: 0.15em; text-transform: uppercase;
  color: var(--text3);
  background: var(--glass); padding: 5px 12px; border-radius: 20px;
  border: 1px solid var(--border);
}
.badge-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); }
.hero-name {
  font-family: var(--mono); font-size: clamp(36px, 8vw, 72px);
  font-weight: 800; line-height: 1.05;
  letter-spacing: 0.04em; text-transform: uppercase;
  color: var(--text); margin: 0;
}
.hero-tagline {
  font-family: var(--sans); font-size: clamp(13px, 2vw, 16px);
  color: var(--text2); line-height: 1.5;
  margin: 0;
}
.hero-terminal {
  width: 100%; max-width: 560px;
  border: 1px solid var(--border); border-radius: 10px;
  overflow: hidden;
  background: var(--surface2);
}
.term-bar {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 14px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
}
.term-dots { display: flex; gap: 5px; }
.td { width: 10px; height: 10px; border-radius: 50%; }
.td-r { background: #ff5f57; }
.td-y { background: #febc2e; }
.td-g { background: #28c840; }
.term-title {
  font-family: var(--mono); font-size: 10px; color: var(--text3);
}
.term-body {
  font-family: var(--mono); font-size: 13px; line-height: 1.7;
  color: var(--text2); padding: 16px 18px; margin: 0;
  text-align: left; white-space: pre-wrap; word-break: break-word;
  min-height: 80px;
}
.hero-actions { display: flex; gap: 12px; margin-top: 8px; }
.hero-btn {
  font-family: var(--mono); font-size: 10px; font-weight: 700;
  letter-spacing: 0.12em; text-transform: uppercase;
  padding: 10px 24px; border-radius: 8px; cursor: pointer;
  transition: all 0.2s; border: 1px solid var(--border);
  display: inline-flex; align-items: center; gap: 6px;
}
.btn-icon { display: flex; }
.hero-btn-primary {
  background: var(--accent); color: #fff; border-color: var(--accent);
}
.hero-btn-primary:hover { opacity: 0.85; }
.hero-btn-secondary {
  background: transparent; color: var(--text2);
}
.hero-btn-secondary:hover { background: var(--glass); color: var(--text); border-color: var(--border2); }
@media (max-width: 1024px) {
  .hero { padding: 40px 24px; min-height: 60vh; }
}
@media (max-width: 600px) {
  .hero { padding: 32px 16px; min-height: 50vh; }
  .hero-terminal { max-width: 100%; }
  .term-body { font-size: 11px; padding: 12px 14px; }
  .hero-actions { flex-direction: column; align-items: center; width: 100%; max-width: 320px; }
  .hero-btn { width: 100%; text-align: center; justify-content: center; padding: 12px 20px; font-size: 11px; }
}
</style>
