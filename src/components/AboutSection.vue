<script setup lang="ts">
import { useI18n } from '../i18n'
import profileImg from '../assets/DSC_1310.jpg'

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
        <div class="profile-photo-ring">
          <img :src="profileImg" alt="Profile" class="about-photo" />
        </div>
        <div class="profile-name">Prave Vinuth</div>
        <div class="profile-role">CS @ Institute of Technology</div>
        <div class="profile-loc">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          Phnom Penh, Cambodia
        </div>
        <div class="tag-row">
          <span class="tag-badge">Full-Stack</span>
          <span class="tag-badge">Frontend</span>
          <span class="tag-badge">Backend</span>
        </div>
        <div class="profile-divider"></div>
        <div class="profile-stats">
          <div class="stat-item">
            <span class="stat-num">4+</span>
            <span class="stat-lbl">Years Code</span>
          </div>
          <div class="stat-item">
            <span class="stat-num">4+</span>
            <span class="stat-lbl">Projects</span>
          </div>
          <div class="stat-item">
            <span class="stat-num">2</span>
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
          <div class="sys-header">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            SYSTEM INFO
          </div>
          <div class="sys-stat-row">
            <span class="sys-stat-key">INTEREST</span>
            <span class="sys-stat-val">Full-Stack / Frontend / Backend</span>
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
.section { padding: 52px 40px; background: transparent; border-top: 1px solid var(--border); }
.section-header { display: flex; align-items: center; gap: 12px; margin-bottom: 32px; }
.section-bar { width: 4px; height: 22px; background: var(--accent); border-radius: 2px; }
.section-title { font-family: var(--mono); font-size: 13px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--text); }
.about-card {
  background: var(--glass); backdrop-filter: blur(8px);
  border: 1px solid var(--border); border-radius: 14px;
  padding: 0; display: flex; overflow: hidden;
  box-shadow: 0 4px 24px rgba(0,0,0,0.04);
}
.about-left {
  width: 230px; flex-shrink: 0;
  background: var(--surface2);
  padding: 28px 20px 24px;
  display: flex; flex-direction: column; align-items: center; gap: 6px;
  border-right: 1px solid var(--border);
}
.profile-photo-ring {
  width: 88px; height: 88px; border-radius: 50%;
  border: 2px solid var(--accent);
  overflow: hidden; margin-bottom: 10px;
  box-shadow: 0 0 0 3px var(--surface2), 0 0 0 5px var(--border);
}
.about-photo {
  width: 100%; height: 100%;
  object-fit: cover; object-position: center;
  display: block;
}
.profile-name { font-family: var(--mono); font-size: 14px; font-weight: 700; color: var(--text); letter-spacing: 0.04em; }
.profile-role { font-family: var(--mono); font-size: 9px; font-weight: 600; color: var(--text3); letter-spacing: 0.1em; text-transform: uppercase; }
.profile-loc {
  font-family: var(--mono); font-size: 9px; color: var(--text3);
  display: flex; align-items: center; gap: 4px; margin-top: 2px;
}
.tag-row {
  display: flex; flex-wrap: wrap; gap: 4px; justify-content: center;
  margin-top: 8px;
}
.tag-badge {
  font-family: var(--mono); font-size: 7px; font-weight: 700;
  letter-spacing: 0.08em; text-transform: uppercase;
  background: var(--bg); border: 1px solid var(--border);
  color: var(--text3); padding: 2px 7px; border-radius: 4px;
}
.profile-divider { width: 40px; height: 1px; background: var(--border); margin: 10px 0; }
.profile-stats { display: flex; gap: 20px; width: 100%; justify-content: center; }
.stat-item { display: flex; flex-direction: column; align-items: center; gap: 2px; }
.stat-num { font-family: var(--mono); font-size: 18px; font-weight: 800; color: var(--accent); }
.stat-lbl { font-family: var(--mono); font-size: 7px; font-weight: 600; color: var(--text3); letter-spacing: 0.08em; text-transform: uppercase; }
.about-right { flex: 1; padding: 28px 32px; display: flex; flex-direction: column; gap: 20px; }
.about-text p { font-size: 13px; color: var(--text2); line-height: 1.8; margin-bottom: 10px; }
.about-text p:last-child { margin-bottom: 0; }
.sys-stats {
  background: var(--bg); border: 1px solid var(--border); border-radius: 10px;
  padding: 16px 20px; display: flex; flex-direction: column; gap: 8px;
}
.sys-header {
  display: flex; align-items: center; gap: 6px;
  font-family: var(--mono); font-size: 9px; font-weight: 700;
  letter-spacing: 0.15em; color: var(--text3);
  padding-bottom: 8px; margin-bottom: 4px;
  border-bottom: 1px solid var(--border);
}
.sys-header svg { stroke: var(--text3); }
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
