<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from '../i18n'
import { autoExportCv } from '../state'
const { t } = useI18n()

const exporting = ref(false)
const qrDataUrl = ref('')
const portfolioUrl = ref(window.location.origin)

onMounted(async () => {
  const QRCode = (await import('qrcode')).default
  qrDataUrl.value = await QRCode.toDataURL(window.location.origin, {
    width: 140,
    margin: 1,
    color: { dark: '#0077b6', light: '#ffffff' },
  })
})

async function exportPdf() {
  const html2pdf = (await import('html2pdf.js')).default
  exporting.value = true
  const el = document.querySelector('.cv-card') as HTMLElement
  if (!el) { exporting.value = false; return }
  const section = el.closest('.section') as HTMLElement
  const origSectionPad = section?.style.padding
  const origMaxW = el.style.maxWidth
  const origW = el.style.width
  if (section) section.style.padding = '0'
  el.style.maxWidth = 'none'
  el.style.width = '1190px'
  await html2pdf()
    .set({
      margin: 0,
      filename: 'CV_Student_Developer.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff', width: 1190 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
    })
    .from(el)
    .save()
  el.style.maxWidth = origMaxW
  el.style.width = origW
  if (section) section.style.padding = origSectionPad
  exporting.value = false
}

onMounted(() => {
  if (autoExportCv.value) {
    autoExportCv.value = false
    setTimeout(() => exportPdf(), 300)
  }
})
</script>

<template>
  <section class="section" id="profile">
    <div class="section-header">
      <div class="section-bar"></div>
      <h2 class="section-title">CV / Resume</h2>
      <button class="print-btn" :class="{ loading: exporting }" @click="exportPdf" :disabled="exporting">
        <svg v-if="!exporting" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        <span v-if="exporting">Generating...</span>
        <span v-else>Export CV</span>
      </button>
    </div>
    <div class="cv-card">
      <div class="cv-header">
        <div class="cv-avatar">&#9995;</div>
        <div class="cv-header-info">
          <h1 class="cv-name">Student Developer</h1>
          <div class="cv-title">Full Stack Developer &bull; Distributed Systems</div>
          <div class="cv-contact-row">
            <span class="cv-contact-item">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              student@dev.os
            </span>
            <span class="cv-contact-item">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Phnom Penh, Cambodia
            </span>
            <span class="cv-contact-item">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
              github.com/student-dev
            </span>
          </div>
        </div>
      </div>

      <div class="cv-body">
        <div class="cv-section">
          <h2 class="cv-section-title">Professional Summary</h2>
          <p class="cv-text">{{ t('about_p1') }}</p>
          <p class="cv-text">{{ t('about_p2') }}</p>
        </div>

        <div class="cv-side-layout">
          <div class="cv-main">
            <div class="cv-section">
              <h2 class="cv-section-title">Education</h2>
              <div class="cv-entry">
                <div class="cv-entry-head">
                  <span class="cv-entry-title">B.Sc. Computer Science</span>
                  <span class="cv-entry-date">2023 - Present</span>
                </div>
                <div class="cv-entry-sub">Institute of Technology, Phnom Penh</div>
                <ul class="cv-entry-list">
                  <li>Focus on distributed systems, algorithms, and full-stack development</li>
                  <li>GPA: 3.8 / 4.0</li>
                </ul>
              </div>
            </div>

            <div class="cv-section">
              <h2 class="cv-section-title">Projects</h2>
              <div class="cv-entry">
                <div class="cv-entry-head">
                  <span class="cv-entry-title">NEURALSYNC V2</span>
                  <span class="cv-entry-date">2025</span>
                </div>
                <div class="cv-entry-sub">Distributed ML training platform</div>
                <ul class="cv-entry-list">
                  <li>Built a distributed training platform for large-scale language models</li>
                  <li>Optimized for high-throughput data parallelization across multi-node clusters</li>
                </ul>
              </div>
              <div class="cv-entry">
                <div class="cv-entry-head">
                  <span class="cv-entry-title">CYPHERGUARD</span>
                  <span class="cv-entry-date">2025</span>
                </div>
                <div class="cv-entry-sub">Zero-trust security mesh</div>
                <ul class="cv-entry-list">
                  <li>Implemented mTLS rotation and identity-based access control</li>
                  <li>Designed for microservices architecture</li>
                </ul>
              </div>
              <div class="cv-entry">
                <div class="cv-entry-head">
                  <span class="cv-entry-title">VORTEX OS</span>
                  <span class="cv-entry-date">2024</span>
                </div>
                <div class="cv-entry-sub">Custom micro-kernel</div>
                <ul class="cv-entry-list">
                  <li>Wrote a micro-kernel in C with preemptive multitasking and VFS</li>
                  <li>Implemented a Unix-like shell interface</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="cv-sidebar">
            <div class="cv-section">
              <h2 class="cv-section-title">Skills</h2>
              <div class="cv-skills-group">
                <span class="cv-skills-label">Languages</span>
                <div class="cv-skills-tags">
                  <span class="cv-tag">Java</span>
                  <span class="cv-tag">Python</span>
                  <span class="cv-tag">TypeScript</span>
                  <span class="cv-tag">C++</span>
                </div>
              </div>
              <div class="cv-skills-group">
                <span class="cv-skills-label">Frameworks</span>
                <div class="cv-skills-tags">
                  <span class="cv-tag">React</span>
                  <span class="cv-tag">Node.js</span>
                  <span class="cv-tag">Spring Boot</span>
                  <span class="cv-tag">Vue</span>
                </div>
              </div>
              <div class="cv-skills-group">
                <span class="cv-skills-label">Tools</span>
                <div class="cv-skills-tags">
                  <span class="cv-tag">Docker</span>
                  <span class="cv-tag">Kubernetes</span>
                  <span class="cv-tag">Git</span>
                  <span class="cv-tag">Linux</span>
                </div>
              </div>
            </div>

            <div class="cv-section">
              <h2 class="cv-section-title">Languages</h2>
              <div class="cv-lang-row">
                <span class="cv-lang-name">Khmer</span>
                <span class="cv-lang-level">Native</span>
              </div>
              <div class="cv-lang-row">
                <span class="cv-lang-name">English</span>
                <span class="cv-lang-level">Fluent</span>
              </div>
            </div>

            <div class="cv-section">
              <h2 class="cv-section-title">Interests</h2>
              <div class="cv-skills-tags">
                <span class="cv-tag">Open Source</span>
                <span class="cv-tag">System Design</span>
                <span class="cv-tag">AI / ML</span>
              </div>
            </div>
            <div class="cv-section cv-qr-section">
              <h2 class="cv-section-title">Portfolio</h2>
              <img v-if="qrDataUrl" :src="qrDataUrl" alt="QR Code" class="cv-qr" />
              <div class="cv-qr-url">{{ portfolioUrl }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cv-card { --ocean: #0077b6; }
.section { padding: 52px 40px; background: transparent; min-height: 80vh; }
.section-header { display: flex; align-items: center; gap: 12px; margin-bottom: 32px; }
.section-bar { width: 4px; height: 22px; background: var(--accent); border-radius: 2px; }
.section-title { font-family: var(--mono); font-size: 13px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--text); margin-right: auto; }
.print-btn {
  font-family: var(--mono); font-size: 10px; font-weight: 700; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--ocean); background: transparent;
  border: 1px solid var(--ocean); border-radius: 6px; padding: 8px 16px;
  cursor: pointer; display: flex; align-items: center; gap: 6px;
  transition: all 0.2s;
}
.print-btn:hover { background: var(--ocean); color: #fff; }
.print-btn.loading { opacity: 0.6; cursor: wait; }
.cv-card {
  background: var(--surface); border: 1px solid var(--border); border-radius: 12px;
  overflow: hidden; max-width: 860px; margin: 0 auto; box-shadow: 0 4px 24px rgba(0,0,0,0.06);
}
.cv-header {
  display: flex; align-items: center; gap: 24px;
  padding: 36px; background: var(--surface2);
  border-bottom: 2px solid var(--ocean);
}
.cv-avatar {
  width: 88px; height: 88px; border-radius: 50%;
  border: 3px solid var(--ocean); background: var(--bg);
  display: flex; align-items: center; justify-content: center;
  font-size: 36px; flex-shrink: 0;
}
.cv-header-info { flex: 1; }
.cv-name { font-family: var(--mono); font-size: 26px; font-weight: 800; color: var(--text); letter-spacing: 0.02em; margin: 0; }
.cv-title { font-size: 13px; color: var(--ocean); margin-top: 4px; font-weight: 600; }
.cv-contact-row { display: flex; flex-wrap: wrap; gap: 16px; margin-top: 10px; }
.cv-contact-item {
  font-family: var(--mono); font-size: 10px; color: var(--text3);
  display: flex; align-items: center; gap: 4px;
}
.cv-body { padding: 36px; }
.cv-section { margin-bottom: 28px; }
.cv-section:last-child { margin-bottom: 0; }
.cv-section-title {
  font-family: var(--mono); font-size: 11px; font-weight: 700;
  letter-spacing: 0.15em; text-transform: uppercase;
  color: var(--ocean); margin: 0 0 14px; padding-bottom: 6px;
  border-bottom: 1px solid var(--border);
}
.cv-text { font-size: 13px; color: var(--text2); line-height: 1.75; margin: 0 0 8px; }
.cv-text:last-child { margin-bottom: 0; }
.cv-side-layout { display: grid; grid-template-columns: 1fr 240px; gap: 32px; }
.cv-entry { margin-bottom: 18px; }
.cv-entry:last-child { margin-bottom: 0; }
.cv-entry-head { display: flex; justify-content: space-between; align-items: baseline; }
.cv-entry-title { font-family: var(--mono); font-size: 12px; font-weight: 700; color: var(--text); }
.cv-entry-date { font-family: var(--mono); font-size: 9px; color: var(--text3); flex-shrink: 0; }
.cv-entry-sub { font-size: 11px; color: var(--text2); margin-top: 2px; }
.cv-entry-list { margin: 6px 0 0; padding-left: 18px; }
.cv-entry-list li { font-size: 12px; color: var(--text2); line-height: 1.6; margin-bottom: 2px; }
.cv-skills-group { margin-bottom: 12px; }
.cv-skills-label { font-family: var(--mono); font-size: 9px; font-weight: 700; color: var(--text3); letter-spacing: 0.08em; text-transform: uppercase; display: block; margin-bottom: 4px; }
.cv-skills-tags { display: flex; flex-wrap: wrap; gap: 4px; }
.cv-tag {
  font-family: var(--mono); font-size: 9px; font-weight: 600;
  background: var(--bg); border: 1px solid var(--border); color: var(--text2);
  padding: 3px 8px; border-radius: 4px;
}
.cv-lang-row { display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid var(--border); }
.cv-lang-row:last-child { border-bottom: none; }
.cv-lang-name { font-family: var(--mono); font-size: 11px; font-weight: 600; color: var(--text); }
.cv-lang-level { font-family: var(--mono); font-size: 9px; color: var(--text3); }
.cv-qr-section { text-align: center; }
.cv-qr { width: 120px; height: 120px; display: block; margin: 0 auto; border-radius: 4px; }
.cv-qr-url { font-family: var(--mono); font-size: 8px; color: var(--text3); margin-top: 6px; word-break: break-all; }
@media (max-width: 1024px) {
  .section { padding: 32px 20px; }
  .cv-side-layout { grid-template-columns: 1fr; gap: 24px; }
  .cv-body { padding: 24px; }
}
@media (max-width: 600px) {
  .section { padding: 24px 16px; }
  .cv-header { flex-direction: column; text-align: center; padding: 24px; }
  .cv-contact-row { justify-content: center; }
  .cv-body { padding: 20px; }
  .cv-entry-head { flex-direction: column; }
}
</style>