<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from '../i18n'

const { t } = useI18n()

const svgMail = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>'
const svgGrid = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>'
const svgGithub = '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>'
const svgLinkedin = '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>'
const displayText = ref('')
const fullText = `> system.boot --target=portfolio\n> init profile --user="Prave Vinuth"\n> status: ready_for_internship_opportunities`
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
    <div class="hero-glow"></div>
    <div class="hero-content">
      <div class="hero-badge">
        <span class="badge-dot"></span>
        <span class="badge-text">AVAILABLE // OPEN FOR WORK</span>
      </div>
      <div class="hero-name-wrap">
        <div class="hero-name-glow"></div>
        <div class="hero-lightning left">
          <svg viewBox="0 0 40 120" width="40" height="120"><polyline points="30,0 10,50 28,50 8,120" fill="none" stroke="rgba(214,48,49,0.4)" stroke-width="1.5" stroke-linecap="round"/></svg>
        </div>
        <h1 class="hero-name">Prave<br>Vinuth</h1>
        <div class="hero-lightning right">
          <svg viewBox="0 0 40 120" width="40" height="120"><polyline points="10,0 30,50 12,50 32,120" fill="none" stroke="rgba(214,48,49,0.4)" stroke-width="1.5" stroke-linecap="round"/></svg>
        </div>
      </div>
      <p class="hero-tagline">Full Stack &bull; Frontend &bull; Backend &bull; Intern-Seeking</p>
      <div class="hero-terminal">
        <div class="term-bar">
          <div class="term-dots">
            <div class="td td-r"></div>
            <div class="td td-y"></div>
            <div class="td td-g"></div>
          </div>
          <span class="term-title">bash -- ./intro.sh</span>
          <span class="term-status">RUNNING</span>
        </div>
        <pre class="term-body"><span class="term-prompt">&#36;</span> {{ displayText }}<span class="cursor-blink">&#9610;</span></pre>
      </div>
      <div class="hero-actions">
        <button class="hero-btn hero-btn-primary" @click="scrollTo('contact')"><span class="btn-icon" v-html="svgMail"></span> CONTACT</button>
        <button class="hero-btn hero-btn-secondary" @click="scrollTo('projects')"><span class="btn-icon" v-html="svgGrid"></span> PROJECTS</button>
      </div>
      <div class="hero-social">
        <a href="https://github.com/nuth68" target="_blank" rel="noopener noreferrer" class="social-link" v-html="svgGithub" title="GitHub"></a>
        <a href="https://linkedin.com/in/pravevinuth" target="_blank" rel="noopener noreferrer" class="social-link" v-html="svgLinkedin" title="LinkedIn"></a>
      </div>
      <div class="scroll-indicator">
        <span class="scroll-text">SCROLL</span>
        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 85vh;
  display: flex; align-items: center; justify-content: center;
  padding: 60px 40px;
  border-bottom: 1px solid var(--border);
  position: relative;
  overflow: hidden;
}
.hero-glow {
  position: absolute;
  top: -120px;
  left: 50%;
  transform: translateX(-50%);
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(214,48,49,0.06) 0%, transparent 70%);
  pointer-events: none;
}
.hero-content {
  max-width: 680px; width: 100%;
  display: flex; flex-direction: column; align-items: center; gap: 20px;
  text-align: center;
  position: relative;
  z-index: 1;
}
.hero-badge {
  display: flex; align-items: center; gap: 7px;
  font-family: var(--mono); font-size: 9px; font-weight: 700;
  letter-spacing: 0.15em; text-transform: uppercase;
  color: var(--green);
  background: rgba(0,184,148,0.06);
  padding: 6px 14px; border-radius: 20px;
  border: 1px solid rgba(0,184,148,0.2);
  box-shadow: 0 0 20px rgba(0,184,148,0.06);
}
.badge-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--green);
  box-shadow: 0 0 6px rgba(0,184,148,0.5);
  animation: pulse-dot 2s ease-in-out infinite;
}
@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
.hero-name {
  font-family: var(--mono); font-size: clamp(36px, 8vw, 72px);
  font-weight: 800; line-height: 1.05;
  letter-spacing: 0.04em; text-transform: uppercase;
  color: var(--text); margin: 0;
  text-shadow:
    0 0 4px rgba(214,48,49,0.6),
    0 0 11px rgba(214,48,49,0.4),
    0 0 21px rgba(214,48,49,0.3),
    0 0 42px rgba(214,48,49,0.2),
    0 0 82px rgba(214,48,49,0.1);
  animation: lightning-flicker 4s ease-in-out infinite;
}
@keyframes lightning-flicker {
  0%, 100% { text-shadow:
    0 0 4px rgba(214,48,49,0.6),
    0 0 11px rgba(214,48,49,0.4),
    0 0 21px rgba(214,48,49,0.3),
    0 0 42px rgba(214,48,49,0.2),
    0 0 82px rgba(214,48,49,0.1);
  }
  5% { text-shadow:
    0 0 8px rgba(214,48,49,0.9),
    0 0 22px rgba(214,48,49,0.7),
    0 0 42px rgba(214,48,49,0.5),
    0 0 84px rgba(214,48,49,0.3),
    0 0 120px rgba(214,48,49,0.15);
  }
  6% { text-shadow:
    0 0 4px rgba(214,48,49,0.6),
    0 0 11px rgba(214,48,49,0.4),
    0 0 21px rgba(214,48,49,0.3),
    0 0 42px rgba(214,48,49,0.2),
    0 0 82px rgba(214,48,49,0.1);
  }
  10% { text-shadow:
    0 0 6px rgba(214,48,49,0.8),
    0 0 18px rgba(214,48,49,0.6),
    0 0 35px rgba(214,48,49,0.4),
    0 0 70px rgba(214,48,49,0.2),
    0 0 100px rgba(214,48,49,0.12);
  }
  11% { text-shadow:
    0 0 4px rgba(214,48,49,0.6),
    0 0 11px rgba(214,48,49,0.4),
    0 0 21px rgba(214,48,49,0.3),
    0 0 42px rgba(214,48,49,0.2),
    0 0 82px rgba(214,48,49,0.1);
  }
  92% { text-shadow:
    0 0 4px rgba(214,48,49,0.6),
    0 0 11px rgba(214,48,49,0.4),
    0 0 21px rgba(214,48,49,0.3),
    0 0 42px rgba(214,48,49,0.2),
    0 0 82px rgba(214,48,49,0.1);
  }
  94% { text-shadow:
    0 0 7px rgba(214,48,49,0.9),
    0 0 20px rgba(214,48,49,0.7),
    0 0 40px rgba(214,48,49,0.5),
    0 0 80px rgba(214,48,49,0.3),
    0 0 120px rgba(214,48,49,0.15);
  }
  95% { text-shadow:
    0 0 4px rgba(214,48,49,0.6),
    0 0 11px rgba(214,48,49,0.4),
    0 0 21px rgba(214,48,49,0.3),
    0 0 42px rgba(214,48,49,0.2),
    0 0 82px rgba(214,48,49,0.1);
  }
}
.hero-name br { display: none; }
@media (min-width: 480px) {
  .hero-name br { display: inline; }
}
.hero-name-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 50px;
}
.hero-name-wrap::before,
.hero-name-wrap::after {
  content: '';
  position: absolute;
  width: 4px; height: 4px;
  border-radius: 50%;
  background: var(--accent);
  pointer-events: none;
  box-shadow: 0 0 6px var(--accent), 0 0 12px rgba(214,48,49,0.3);
}
.hero-name-wrap::before {
  top: -10px; right: 20%;
  animation: sparkle 3s ease-in-out infinite;
}
.hero-name-wrap::after {
  bottom: 20%; left: 5%;
  width: 3px; height: 3px;
  animation: sparkle 3s ease-in-out 1.5s infinite;
}
@keyframes sparkle {
  0%, 100% { opacity: 0; transform: scale(0); }
  20% { opacity: 1; transform: scale(1); }
  40% { opacity: 0; transform: scale(0); }
}
.hero-name-glow {
  position: absolute;
  width: 350px; height: 250px;
  background:
    radial-gradient(ellipse at 30% 50%, rgba(214,48,49,0.2) 0%, transparent 60%),
    radial-gradient(ellipse at 70% 50%, rgba(214,48,49,0.12) 0%, transparent 50%);
  pointer-events: none;
  animation: electric-pulse 4s ease-in-out infinite;
  border-radius: 50%;
  filter: blur(4px);
}
@keyframes electric-pulse {
  0%, 100% { opacity: 0.5; transform: scale(1) rotate(0deg); }
  5% { opacity: 0.9; transform: scale(1.04) rotate(0.5deg); }
  6% { opacity: 0.5; transform: scale(1) rotate(0deg); }
  10% { opacity: 0.7; transform: scale(1.02) rotate(-0.3deg); }
  11% { opacity: 0.5; transform: scale(1) rotate(0deg); }
  92% { opacity: 0.5; transform: scale(1) rotate(0deg); }
  94% { opacity: 0.85; transform: scale(1.03) rotate(0.4deg); }
  95% { opacity: 0.5; transform: scale(1) rotate(0deg); }
}
.hero-lightning {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  opacity: 0.5;
  animation: lightning-fade 4s ease-in-out infinite;
}
.hero-lightning.left { left: -10px; }
.hero-lightning.right { right: -10px; }
.hero-lightning svg { display: block; }
@keyframes lightning-fade {
  0%, 100% { opacity: 0.4; }
  5% { opacity: 1; }
  6% { opacity: 0.4; }
  10% { opacity: 0.7; }
  11% { opacity: 0.4; }
  94% { opacity: 0.9; }
  95% { opacity: 0.4; }
}
.hero-name::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 10%;
  width: 80%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  opacity: 0.5;
  box-shadow: 0 0 8px var(--accent), 0 0 20px rgba(214,48,49,0.2);
  animation: underline-pulse 4s ease-in-out infinite;
}
@keyframes underline-pulse {
  0%, 100% { opacity: 0.4; transform: scaleX(1); }
  5% { opacity: 0.8; transform: scaleX(1.05); }
  6% { opacity: 0.4; transform: scaleX(1); }
  94% { opacity: 0.7; transform: scaleX(1.03); }
  95% { opacity: 0.4; transform: scaleX(1); }
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
  box-shadow: 0 4px 20px rgba(0,0,0,0.03);
  transition: box-shadow 0.3s;
}
.hero-terminal:hover {
  box-shadow: 0 4px 30px rgba(214,48,49,0.06);
  border-color: rgba(214,48,49,0.2);
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
  flex: 1;
}
.term-status {
  font-family: var(--mono); font-size: 7px; font-weight: 700;
  letter-spacing: 0.12em; color: var(--green);
  background: rgba(0,184,148,0.08);
  padding: 2px 7px; border-radius: 4px;
}
.term-body {
  font-family: var(--mono); font-size: 13px; line-height: 1.7;
  color: var(--text2); padding: 16px 18px; margin: 0;
  text-align: left; white-space: pre-wrap; word-break: break-word;
  min-height: 80px;
}
.term-prompt {
  color: var(--accent);
  font-weight: 700;
  margin-right: 4px;
}
.cursor-blink {
  animation: blink 0.7s step-end infinite;
  color: var(--text3);
  font-size: 11px;
}
@keyframes blink {
  50% { opacity: 0; }
}
.hero-actions { display: flex; gap: 12px; margin-top: 4px; }
.hero-btn {
  font-family: var(--mono); font-size: 10px; font-weight: 700;
  letter-spacing: 0.12em; text-transform: uppercase;
  padding: 11px 26px; border-radius: 8px;
  transition: all 0.25s; border: 1px solid var(--border);
  display: inline-flex; align-items: center; gap: 7px;
}
.btn-icon { display: flex; }
.hero-btn-primary {
  background: var(--accent); color: #fff; border-color: var(--accent);
  box-shadow: 0 4px 14px rgba(214,48,49,0.2);
}
.hero-btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(214,48,49,0.3);
}
.hero-btn-secondary {
  background: transparent; color: var(--text2);
}
.hero-btn-secondary:hover {
  background: var(--glass); color: var(--text);
  border-color: var(--accent);
  transform: translateY(-1px);
}
.hero-social {
  display: flex; gap: 12px; margin-top: 4px;
}
.social-link {
  display: flex; align-items: center; justify-content: center;
  width: 32px; height: 32px; border-radius: 50%;
  border: 1px solid var(--border);
  color: var(--text3);
  transition: all 0.25s;
}
.social-link:hover {
  color: var(--accent);
  border-color: var(--accent);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(214,48,49,0.1);
}
.scroll-indicator {
  display: flex; flex-direction: column; align-items: center; gap: 4px;
  margin-top: 12px;
  color: var(--text3);
  animation: bounce-down 2s ease-in-out infinite;
}
.scroll-text {
  font-family: var(--mono); font-size: 7px;
  font-weight: 600; letter-spacing: 0.15em;
}
@keyframes bounce-down {
  0%, 100% { transform: translateY(0); opacity: 0.6; }
  50% { transform: translateY(6px); opacity: 1; }
}
@media (max-width: 1024px) {
  .hero { padding: 40px 24px; min-height: 60vh; }
}
@media (max-width: 600px) {
  .hero { padding: 32px 16px; min-height: 50vh; }
  .hero-terminal { max-width: 100%; }
  .term-body { font-size: 11px; padding: 12px 14px; }
  .hero-actions { flex-direction: column; align-items: center; width: 100%; max-width: 320px; }
  .hero-btn { width: 100%; text-align: center; justify-content: center; padding: 12px 20px; font-size: 11px; }
  .hero-glow { width: 300px; height: 300px; }
  .hero-name-wrap { padding: 0 30px; }
  .hero-lightning { display: none; }
  .hero-name::after { bottom: -4px; }
  .hero-name-wrap::before,
  .hero-name-wrap::after { display: none; }
}
</style>
