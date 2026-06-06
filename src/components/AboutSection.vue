<script setup lang="ts">
import { useI18n } from '../i18n'
const { t } = useI18n()
</script>

<template>
  <section class="section" id="about">
    <div class="section-header">
      <div class="section-bar"></div>
      <h2 class="section-title">{{ t('about_title') }}</h2>
    </div>
    <div class="about-card fade-up">
      <div class="about-left">
        <div class="avatar-ring">&#9995;</div>
        <div class="profile-name">Student Developer</div>
        <div class="profile-role">CS @ University</div>
        <div class="profile-loc">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          Phnom Penh, KH
        </div>
        <div class="profile-divider"></div>
        <div class="profile-stats">
          <div class="stat-item">
            <span class="stat-num">3+</span>
            <span class="stat-lbl">Years Code</span>
          </div>
          <div class="stat-item">
            <span class="stat-num">6+</span>
            <span class="stat-lbl">Projects</span>
          </div>
          <div class="stat-item">
            <span class="stat-num">3</span>
            <span class="stat-lbl">Lang</span>
          </div>
        </div>
      </div>
      <div class="about-right">
        <div class="about-text">
          <p>{{ t('about_p1') }}</p>
          <p>{{ t('about_p2') }}</p>
        </div>
        <div class="sys-stats">
          <div class="sys-stat-row">
            <span class="sys-stat-key">INTEREST</span>
            <span class="sys-stat-val">Full-Stack / Distributed Systems</span>
          </div>
          <div class="sys-stat-row">
            <span class="sys-stat-key">SEEKING</span>
            <span class="sys-stat-val">Internship 2026</span>
          </div>
          <div class="sys-stat-row">
            <span class="sys-stat-key">STATUS</span>
            <span class="sys-stat-val sys-stat-green">&#9679; {{ t('about_available') }}</span>
          </div>
          <div class="sys-stat-row">
            <span class="sys-stat-key">MODE</span>
            <span class="sys-stat-val sys-stat-blue">&#9679; {{ t('about_active') }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section { padding: 52px 40px; background: transparent; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.section-header { display: flex; align-items: center; gap: 12px; margin-bottom: 32px; }
.section-bar { width: 4px; height: 22px; background: var(--accent); border-radius: 2px; }
.section-title { font-family: var(--mono); font-size: 13px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--text); }
.about-card {
  background: var(--glass); backdrop-filter: blur(8px); border: 1px solid var(--border); border-radius: 12px;
  padding: 0; display: flex; overflow: hidden;
}
.about-left {
  width: 220px; flex-shrink: 0;
  background: var(--surface2);
  padding: 32px 24px;
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  border-right: 1px solid var(--border);
}
.avatar-ring {
  width: 80px; height: 80px; border-radius: 50%;
  border: 2px solid var(--border); background: var(--bg);
  display: flex; align-items: center; justify-content: center;
  font-size: 32px; margin-bottom: 4px;
}
.profile-name { font-family: var(--mono); font-size: 13px; font-weight: 700; color: var(--text); letter-spacing: 0.04em; }
.profile-role { font-family: var(--mono); font-size: 9px; font-weight: 600; color: var(--text3); letter-spacing: 0.08em; text-transform: uppercase; }
.profile-loc {
  font-family: var(--mono); font-size: 9px; color: var(--text3);
  display: flex; align-items: center; gap: 4px; margin-top: 2px;
}
.profile-divider { width: 32px; height: 1px; background: var(--border); margin: 12px 0; }
.profile-stats { display: flex; gap: 16px; width: 100%; justify-content: center; }
.stat-item { display: flex; flex-direction: column; align-items: center; gap: 2px; }
.stat-num { font-family: var(--mono); font-size: 16px; font-weight: 800; color: var(--accent); }
.stat-lbl { font-family: var(--mono); font-size: 8px; font-weight: 600; color: var(--text3); letter-spacing: 0.06em; text-transform: uppercase; }
.about-right { flex: 1; padding: 32px; display: flex; flex-direction: column; gap: 20px; }
.about-text p { font-size: 13px; color: var(--text2); line-height: 1.75; margin-bottom: 10px; }
.about-text p:last-child { margin-bottom: 0; }
.sys-stats {
  background: var(--bg); border: 1px solid var(--border); border-radius: 8px; padding: 16px 20px;
  display: flex; flex-direction: column; gap: 8px;
}
.sys-stat-row { display: flex; align-items: center; justify-content: space-between; }
.sys-stat-key { font-family: var(--mono); font-size: 9px; font-weight: 700; color: var(--text3); letter-spacing: 0.1em; }
.sys-stat-val { font-family: var(--mono); font-size: 10px; font-weight: 600; color: var(--text2); }
.sys-stat-green { color: var(--green); }
.sys-stat-blue { color: var(--blue); }
@media (max-width: 1024px) {
  .section { padding: 32px 20px; }
  .about-card { flex-direction: column; }
  .about-left { width: 100%; border-right: none; border-bottom: 1px solid var(--border); padding: 24px; }
  .about-right { padding: 24px; }
  .profile-stats { justify-content: center; }
}
@media (max-width: 600px) {
  .section { padding: 24px 16px; }
  .about-left { padding: 20px; }
  .about-right { padding: 20px; }
  .about-text p { font-size: 12px; }
  .sys-stat-row { flex-direction: column; align-items: flex-start; gap: 2px; }
}
</style>