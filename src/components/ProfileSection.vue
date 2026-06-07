<script setup lang="ts">
import { ref, onMounted } from 'vue'
import profileImg from '../assets/DSC_1310.jpg'

const emit = defineEmits<{ navigate: [page: string] }>()

const exporting = ref(false)
const exportError = ref('')
const qrDataUrl = ref('')
const portfolioUrl = ref(typeof window !== 'undefined' ? window.location.origin : '')

onMounted(async () => {
  try {
    const QRCode = (await import('qrcode')).default
    qrDataUrl.value = await QRCode.toDataURL(window.location.origin, {
      width: 120,
      margin: 1,
      color: { dark: '#1a1a1a', light: '#ffffff' },
    })
  } catch {}
})

async function exportPdf() {
  const html2pdf = (await import('html2pdf.js')).default
  exporting.value = true
  exportError.value = ''
  try {
    const el = document.querySelector('.cv-card') as HTMLElement
    if (!el) throw new Error('CV document not found')

    el.classList.add('pdf-export-mode')

    const section = el.closest('.section') as HTMLElement
    const origSectionPad = section?.style.padding
    const origMaxW = el.style.maxWidth
    const origW = el.style.width
    const origH = el.style.height
    const origAspect = el.style.aspectRatio
    const origOverflow = el.style.overflow
    const bodyEl = el.querySelector('.cv-body') as HTMLElement
    const origBodyOverflow = bodyEl?.style.overflow

    if (section) section.style.padding = '0'
    el.style.maxWidth = 'none'
    el.style.width = '793px'
    el.style.height = 'auto'
    el.style.aspectRatio = 'auto'
    el.style.overflow = 'visible'
    if (bodyEl) bodyEl.style.overflow = 'visible'

    await new Promise(r => setTimeout(r, 150))

    const bodyHeight = bodyEl?.scrollHeight || 0
    const headerHeight = el.querySelector('.cv-top')?.scrollHeight || 0
    const totalHeight = headerHeight + bodyHeight + 60

    await html2pdf()
      .set({
        margin: [8, 8, 8, 8],
        filename: 'Vinuth.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 3,
          useCORS: true,
          backgroundColor: '#ffffff',
          width: 793,
          windowHeight: totalHeight,
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: 'css' },
      })
      .from(el)
      .save()

    el.style.maxWidth = origMaxW
    el.style.width = origW
    el.style.height = origH
    el.style.aspectRatio = origAspect
    el.style.overflow = origOverflow
    if (bodyEl) bodyEl.style.overflow = origBodyOverflow || ''
    if (section) section.style.padding = origSectionPad
    el.classList.remove('pdf-export-mode')
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    exportError.value = `Export failed: ${message}`
    console.error('PDF export error:', error)
  } finally {
    exporting.value = false
  }
}
</script>

<template>
  <section class="section" id="profile">
    <div class="section-header">
      <button class="back-btn" @click="emit('navigate', 'home')">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <div class="section-bar"></div>
      <h2 class="section-title">CV / Resume</h2>
      <button class="export-btn" :class="{ loading: exporting }" @click="exportPdf" :disabled="exporting">
        <svg v-if="!exporting" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        <span>{{ exporting ? 'Generating…' : 'Export PDF' }}</span>
      </button>
    </div>

    <div v-if="exportError" class="error-bar">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <span>{{ exportError }}</span>
      <button class="error-close" @click="exportError = ''">✕</button>
    </div>

    <!-- CV CARD -->
    <div class="cv-card">

      <!-- TOP: photo + name + tagline -->
      <div class="cv-top">
        <div class="cv-photo">
          <img :src="profileImg" alt="Profile photo" class="profile-img" />
        </div>
        <h1 class="cv-name">Prave Vinuth</h1>
        <div class="cv-tagline">
          <span>Software Engineering Intern</span>
          <span class="pipe">|</span>
          <span>Phnom Penh, Cambodia</span>
          <span class="pipe">|</span>
          <span>pravevinuth888@gmail.com</span>
          <span class="pipe">|</span>
          <span>+855 89 357 087</span>
        </div>
      </div>

      <!-- BODY: sidebar + main -->
      <div class="cv-body">

        <!-- LEFT SIDEBAR -->
        <aside class="cv-sidebar">

          <div class="cv-sec">
            <div class="cv-sec-title">
              <span class="diamond">◇</span> Details <span class="diamond">◇</span>
            </div>
            <p class="detail-line">
              <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
              Institute of Technology, Phnom Penh
            </p>
            <p class="detail-line mt">
              <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              pravevinuth888@gmail.com
            </p>
            <p class="detail-line">
              <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              +855 89 357 087
            </p>
            <p class="detail-line">
              <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
              github.com/nuth68
            </p>
            <p class="detail-line">
              <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              linkedin.com/in/pravevinuth
            </p>
            <p class="detail-line">
              <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              t.me/yourusername
            </p>
          </div>

          <div class="cv-sec">
            <div class="cv-sec-title">
              <span class="diamond">◇</span> Skills <span class="diamond">◇</span>
            </div>
            <div class="skill-item"><svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> Java &amp; Spring Boot</div>
            <div class="skill-item"><svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5"/><line x1="12" y1="22" x2="12" y2="15.5"/><polyline points="22 8.5 12 15.5 2 8.5"/></svg> Vue / TypeScript</div>
            <div class="skill-item"><svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg> Node.js / NestJS</div>
            <div class="skill-item"><svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg> SQL / MySQL / PostgreSQL</div>
            <div class="skill-item"><svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg> Docker / Git / Jenkins</div>
            <div class="skill-item"><svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg> Flutter / Dart</div>
            <div class="skill-item"><svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg> HTML / CSS / Tailwind</div>
            <div class="skill-item"><svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg> Linux &amp; Bash</div>
            <div class="skill-item"><svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg> Computer Networking</div>
          </div>

          <div class="cv-sec">
            <div class="cv-sec-title">
              <span class="diamond">◇</span> Languages <span class="diamond">◇</span>
            </div>
            <div class="skill-item"><svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg> Khmer — Native</div>
            <div class="skill-item"><svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg> English — Intermediate</div>
          </div>

          <div class="cv-sec">
            <div class="cv-sec-title">
              <span class="diamond">◇</span> Interests <span class="diamond">◇</span>
            </div>
            <div class="skill-item"><svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg> Full-stack development</div>
            <div class="skill-item"><svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> Backend Development</div>
            <div class="skill-item"><svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5"/><line x1="12" y1="22" x2="12" y2="15.5"/><polyline points="22 8.5 12 15.5 2 8.5"/></svg> Frontend Development</div>
          </div>

          <div v-if="qrDataUrl" class="cv-sec cv-qr-sec">
            <div class="cv-sec-title">
              <span class="diamond">◇</span> Portfolio <span class="diamond">◇</span>
            </div>
            <img :src="qrDataUrl" alt="Portfolio QR code" class="qr-img" />
            <div class="qr-url">{{ portfolioUrl }}</div>
          </div>

        </aside>

        <!-- RIGHT MAIN -->
        <main class="cv-main">

          <div class="cv-sec">
            <div class="main-sec-title">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
              Profile
            </div>
            <p class="profile-text">
              A motivated fourth-year Computer Science student seeking a software engineering internship. Passionate about full-stack development with experience building responsive frontends (Vue, TypeScript) and scalable backends (NestJS, Spring Boot, PostgreSQL). Quick to learn new tools and eager to apply strong problem-solving skills in a professional team environment.
            </p>
          </div>

          <div class="cv-sec">
            <div class="main-sec-title">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
              </svg>
              Projects &amp; Experience
            </div>

            <div class="exp-entry">
              <div class="exp-row">
                <div class="exp-dot"></div>
                <div class="exp-content">
                  <div class="exp-title">Vegetable Khmer — Full-stack E-commerce Platform</div>
                  <div class="exp-period">2025 · Academic project (Year 4, Sem II)</div>
                  <p class="exp-desc">Built a full-stack vegetable e-commerce platform with Vue, CSS, and NestJS. Features a user frontend with product browsing and ordering. Deployed on DigitalOcean via Jenkins CI/CD pipeline using Docker and MySQL.</p>
                </div>
              </div>
            </div>
            <div class="exp-entry">
              <div class="exp-row">
                <div class="exp-dot"></div>
                <div class="exp-content">
                  <div class="exp-title">Men's Fashion Clone — Flutter Mobile App</div>
                  <div class="exp-period">2025 · Academic project (Year 4, Sem II)</div>
                  <p class="exp-desc">Developed a mobile application clone using Flutter and Dart. Focused on UI replication, screen navigation, and state management for a men's fashion shopping experience.</p>
                </div>
              </div>
            </div>
            <div class="exp-entry">
              <div class="exp-row">
                <div class="exp-dot"></div>
                <div class="exp-content">
                  <div class="exp-title">Internet Programming Project — Vue Dashboard</div>
                  <div class="exp-period">2025 · Academic project (Year 4, Sem I)</div>
                  <p class="exp-desc">Built a full-stack web application using Vue, TypeScript, and Tailwind CSS for the Internet Programming course. Implemented dynamic components, state management, and responsive UI with modern frontend tooling.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="cv-sec">
            <div class="main-sec-title">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
              Education
            </div>

            <div class="exp-entry">
              <div class="exp-row">
                <div class="exp-dot"></div>
                <div class="exp-content">
                  <div class="exp-title">B.Sc. Computer Science — Institute of Technology, Phnom Penh</div>
                  <div class="exp-period">2023 – Present · Expected graduation 2027</div>
                  <p class="exp-desc">Focus on distributed systems, algorithms, and full-stack development. Coursework: Operating Systems, Databases, Computer Networks, Software Engineering.</p>
                </div>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ── Section wrapper ── */
.section {
  padding: 0;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 813px;
  padding: 0 10px;
}

.back-btn {
  background: none;
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 6px 8px;
 
  color: var(--text2);
  display: flex;
  align-items: center;
  transition: all 0.2s;
  flex-shrink: 0;
}
.back-btn:hover { color: var(--accent); border-color: var(--accent); }
.section-bar {
  width: 4px;
  height: 22px;
  background: var(--accent);
  border-radius: 2px;
}

.section-title {
  font-family: var(--mono);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text);
  margin-right: auto;
}

/* ── Export button ── */
.export-btn {
  font-family: var(--mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text);
  background: transparent;
  border: 1px solid var(--text);
  border-radius: 4px;
  padding: 7px 14px;
 
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
}
.export-btn:hover { background: var(--text); color: var(--bg); }
.export-btn.loading { opacity: 0.5; cursor: wait; }

/* ── Error bar ── */
.error-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #fee;
  border: 1px solid #fcc;
  border-radius: 4px;
  padding: 10px 14px;
  margin-bottom: 16px;
  color: #c33;
  font-size: 12px;
  font-family: var(--mono);
}
.error-close {
  background: none;
  border: none;
  color: #c33;
 
  font-size: 14px;
  padding: 0;
  margin-left: auto;
}

/* ── CV card ── */
.cv-card {
  width: 793px;
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: 0 2px 24px rgba(0,0,0,0.08);
  margin: 20px auto;
  aspect-ratio: 210 / 297;
  height: 1123px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: var(--sans);
  color: var(--text);
}

.cv-card.pdf-export-mode {
  aspect-ratio: auto;
  height: auto;
  overflow: visible;
}
.cv-card.pdf-export-mode .cv-body {
  overflow: visible;
}

/* ── Top header ── */
.cv-top {
  text-align: center;
  padding: 28px 32px 22px;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
  position: relative;
}
.cv-top::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  opacity: 0.4;
}

.cv-photo {
  width: 105px;
  height: 105px;
  border-radius: 50%;
  border: 3px solid var(--accent);
  margin: 0 auto 18px;
  overflow: hidden;
  box-shadow: 0 0 0 4px var(--surface), 0 0 0 5px var(--border);
}
.profile-img {
  width: 105px;
  height: 105px;
  object-fit: cover;
  object-position: center;
}
.profile-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  object-position: center;
}

.cv-name {
  font-family: var(--mono);
  font-size: 26px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--text);
  margin: 0;
  position: relative;
  display: inline-block;
}
.cv-name::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 2px;
  background: var(--accent);
  border-radius: 1px;
}

.cv-tagline {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 6px 0;
  margin-top: 14px;
  font-family: var(--mono);
  font-size: 11px;
  color: var(--text2);
  letter-spacing: 0.02em;
}
.pipe {
  margin: 0 8px;
  color: var(--text3);
}

/* ── Body layout ── */
.cv-body {
  display: grid;
  grid-template-columns: 190px 1fr;
  flex: 1;
  overflow-y: auto;
}

/* ── Sidebar ── */
.cv-sidebar {
  padding: 18px 14px;
  border-right: 1px solid var(--border);
  background: var(--surface2);
}

.cv-sec {
  margin-bottom: 18px;
}
.cv-sec:last-child { margin-bottom: 0; }

.cv-sec-title {
  font-family: var(--mono);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  text-align: center;
  margin-bottom: 12px;
  padding-bottom: 6px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.diamond {
  font-size: 6px;
  color: var(--accent);
  opacity: 0.5;
}

.detail-line {
  font-family: var(--sans);
  font-size: 11px;
  color: var(--text2);
  line-height: 1.7;
  display: flex;
  align-items: center;
  gap: 6px;
}
.detail-line svg { flex-shrink: 0; stroke: var(--accent); opacity: 0.7; }
.detail-line.mt { margin-top: 6px; }

.skill-item {
  font-family: var(--sans);
  font-size: 11px;
  color: var(--text);
  padding: 5px 0 5px 8px;
  border-left: 2px solid transparent;
  border-bottom: 0.5px solid var(--border);
  line-height: 1.4;
  transition: border-color 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
}
.skill-item svg { flex-shrink: 0; stroke: var(--accent); opacity: 0.7; }
.skill-item:last-child { border-bottom: none; }
.skill-item:hover { border-left-color: var(--accent); }

/* ── QR section ── */
.cv-qr-sec { text-align: center; }
.qr-img {
  width: 90px;
  height: 90px;
  display: block;
  margin: 0 auto 6px;
  border-radius: 4px;
  border: 1px solid var(--border);
  padding: 4px;
}
.qr-url {
  font-family: var(--mono);
  font-size: 8px;
  color: var(--text3);
  word-break: break-all;
}
.portfolio-links {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 8px;
}
.portfolio-link {
  font-family: var(--mono);
  font-size: 9px;
  color: var(--accent);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: opacity 0.2s;
}
.portfolio-link:hover { opacity: 0.7; }
.portfolio-link svg { stroke: var(--accent); }

/* ── Main column ── */
.cv-main {
  padding: 18px 20px;
}

.main-sec-title {
  font-family: var(--mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
  padding-bottom: 8px;
  border-bottom: 2px solid var(--accent);
}
.main-sec-title svg {
  stroke: var(--accent);
}

.profile-text {
  font-family: var(--sans);
  font-size: 11px;
  color: var(--text2);
  line-height: 1.85;
  text-align: justify;
}

/* ── Experience entries ── */
.exp-entry { margin-bottom: 14px; }
.exp-entry:last-child { margin-bottom: 0; }

.exp-row {
  display: flex;
  gap: 12px;
  position: relative;
}
.exp-entry:not(:last-child) .exp-row::before {
  content: '';
  position: absolute;
  left: 3.5px;
  top: 12px;
  bottom: -14px;
  width: 1px;
  background: var(--border);
}

.exp-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  flex-shrink: 0;
  margin-top: 5px;
  position: relative;
  z-index: 1;
}

.exp-content { flex: 1; }

.exp-title {
  font-family: var(--sans);
  font-size: 12px;
  font-weight: 700;
  color: var(--text);
  letter-spacing: 0.01em;
}

.exp-period {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--text3);
  font-style: italic;
  margin: 2px 0 5px;
}

.exp-desc {
  font-family: var(--sans);
  font-size: 11px;
  color: var(--text2);
  line-height: 1.7;
}

/* ── PDF export overrides ── */
.cv-card.pdf-export-mode,
.cv-card.pdf-export-mode * {
  background-color: #ffffff !important;
}
.cv-card.pdf-export-mode .cv-sidebar {
  background-color: #ffffff !important;
}
.cv-card.pdf-export-mode .cv-name { color: #1a1d23 !important; }
.cv-card.pdf-export-mode .cv-tagline { color: #5a6070 !important; }
.cv-card.pdf-export-mode .cv-sec-title { color: #8c94a3 !important; }
.cv-card.pdf-export-mode .main-sec-title { color: #d63031 !important; }
.cv-card.pdf-export-mode .exp-title { color: #1a1d23 !important; }
.cv-card.pdf-export-mode .exp-period { color: #8c94a3 !important; }
.cv-card.pdf-export-mode .exp-desc,
.cv-card.pdf-export-mode .profile-text,
.cv-card.pdf-export-mode .detail-line,
.cv-card.pdf-export-mode .skill-item { color: #5a6070 !important; }
.cv-card.pdf-export-mode .exp-dot {
  background: #d63031 !important;
}
.cv-card.pdf-export-mode .cv-name::after {
  background: #d63031 !important;
}
.cv-card.pdf-export-mode .cv-top::after {
  background: linear-gradient(90deg, transparent, #d63031, transparent) !important;
}
.cv-card.pdf-export-mode .main-sec-title {
  border-bottom-color: #d63031 !important;
}
.cv-card.pdf-export-mode .main-sec-title svg {
  stroke: #d63031 !important;
}
.cv-card.pdf-export-mode .skill-item:hover {
  border-left-color: #d63031 !important;
}

/* ── Responsive ── */
@media (max-width: 860px) {
  .cv-card {
    width: 100%;
    height: auto;
    aspect-ratio: auto;
  }
}

@media (max-width: 600px) {
  .section-header {
    max-width: 100%;
    padding: 0 10px;
    flex-wrap: wrap;
    gap: 8px;
  }
  .section-title { font-size: 11px; }
  .export-btn { padding: 5px 10px; font-size: 9px; }
  .cv-card { width: 100%; height: auto; aspect-ratio: auto; margin: 10px auto; }
  .cv-body { grid-template-columns: 1fr; }
  .cv-sidebar { border-right: none; border-bottom: 1px solid var(--border); padding: 14px 12px; }
  .cv-main { padding: 14px 12px; }
  .cv-top { padding: 20px 16px 18px; }
  .cv-name { font-size: 20px; }
  .cv-tagline { font-size: 10px; gap: 4px 0; }
  .cv-tagline .pipe { margin: 0 4px; }
  .cv-photo { width: 80px; height: 80px; }
  .profile-img { width: 80px; height: 80px; }
  .exp-title { font-size: 11px; }
  .exp-period { font-size: 10px; }
  .detail-line, .skill-item { font-size: 10px; }
  .main-sec-title { font-size: 9px; }
  .profile-text { font-size: 10px; }
}
</style>
