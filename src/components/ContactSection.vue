<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useI18n } from '../i18n'
import emailjs from '@emailjs/browser'

const { t } = useI18n()

const EMAILJS_PUBLIC_KEY = 'lTwQO_-_i8yoTXuvm'
const EMAILJS_SERVICE_ID = 'service_gjbfsxb'
const EMAILJS_TEMPLATE_ID = 'template_w3m50bk'

interface Connection {
  icon: string
  label: string
  url?: string
}

defineProps<{ connections: Connection[] }>()

const form = reactive({ name: '', email: '', message: '' })
const sent = ref(false)
const sending = ref(false)
const error = ref('')
const latency = ref('~8ms')
const online = ref(true)

function measureLatency() {
  const start = performance.now()
  fetch('https://www.google.com/favicon.ico', { mode: 'no-cors', cache: 'no-store' })
    .then(() => {
      latency.value = `${Math.round(performance.now() - start)}ms`
      online.value = true
    })
    .catch(() => {
      online.value = false
    })
}

measureLatency()
setInterval(measureLatency, 30000)

async function sendMessage() {
  if (!form.name || !form.email || !form.message) return
  sending.value = true
  error.value = ''
  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      from_name: form.name,
      from_email: form.email,
      message: form.message,
      to_email: 'pravevinuth888@gmail.com',
    }, EMAILJS_PUBLIC_KEY)
    sent.value = true
    form.name = ''
    form.email = ''
    form.message = ''
    setTimeout(() => sent.value = false, 3000)
  } catch (e) {
    error.value = 'Failed to send. Try again later.'
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <section class="section contact-section" id="contact">
    <div class="section-header">
      <div class="section-bar"></div>
      <h2 class="section-title">{{ t('contact_title') }}</h2>
      <div class="header-code">
        <span class="code-tag">POST</span>
        <span class="code-path">/api/v1/message</span>
      </div>
    </div>
    <div class="contact-grid">
      <div class="contact-form-card">
        <div class="form-card-header">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/></svg>
          {{ t('contact_interface') }}
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">
              <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              {{ t('contact_name') }}
            </label>
            <input class="form-input" v-model="form.name" placeholder="Enter your name" />
          </div>
          <div class="form-group">
            <label class="form-label">
              <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              {{ t('contact_email') }}
            </label>
            <input class="form-input" v-model="form.email" placeholder="Enter your email" type="email" />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">
            <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
            {{ t('contact_message') }}
          </label>
          <textarea class="form-textarea" v-model="form.message" placeholder="Type your message here..."></textarea>
        </div>
        <button class="submit-btn" :disabled="sending" @click="sendMessage">
          <svg v-if="!sending" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          <span v-if="sending">Sending...</span>
          <span v-else>{{ t('contact_send') }}</span>
        </button>
        <div v-if="error" class="error-msg">{{ error }}</div>
        <div v-if="sent" class="sent-msg">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          &#10003; Transmission sent successfully.
        </div>
      </div>

      <div class="contact-sidebar">
        <div class="connections-card">
          <div class="side-card-title">
            <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            {{ t('contact_connections') }}
          </div>
          <a class="conn-link" v-for="c in connections" :key="c.label" :href="c.url || '#'" target="_blank" rel="noopener noreferrer">
            <span class="conn-icon" v-html="c.icon"></span>
            <span class="conn-text">{{ c.label }}</span>
          </a>
        </div>
        <div class="system-status-card">
          <div class="side-card-title">
            <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            {{ t('contact_status') }}
          </div>
          <div class="sys-row">
            <span class="sys-key">
              <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              {{ t('contact_network') }}
            </span>
            <span class="sys-val" :class="online ? 'sys-online' : 'sys-offline'">&#9679; {{ online ? t('contact_online') : 'OFFLINE' }}</span>
          </div>
          <div class="sys-row">
            <span class="sys-key">
              <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
              {{ t('contact_encryption') }}
            </span>
            <span class="sys-val sys-enc">AES-256</span>
          </div>
          <div class="sys-row">
            <span class="sys-key">
              <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              {{ t('contact_latency') }}
            </span>
            <span class="sys-val sys-lat">{{ latency }}</span>
          </div>
          <div class="sys-row" style="margin-top:10px;border:none">
            <span class="node-badge">&#9761; {{ t('contact_node') }}</span>
          </div>
          <div class="sys-row">
            <span class="node-badge">&#9650; {{ t('contact_stable') }}</span>
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
.header-code {
  margin-left: auto;
  display: flex; align-items: center; gap: 6px;
  font-family: var(--mono); font-size: 8px;
  background: var(--bg); border: 1px solid var(--border);
  border-radius: 4px; padding: 4px 8px;
}
.code-tag {
  font-weight: 700; letter-spacing: 0.06em;
  color: var(--accent);
}
.code-path {
  color: var(--text3); letter-spacing: 0.04em;
}
.contact-grid { display: grid; grid-template-columns: 1fr 280px; gap: 24px; }
.contact-form-card { background: var(--glass); border: 1px solid var(--border); border-radius: 10px; padding: 24px; backdrop-filter: blur(8px); }
.form-card-header { font-family: var(--mono); font-size: 10px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--text3); margin-bottom: 20px; display: flex; align-items: center; gap: 8px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
.form-group { display: flex; flex-direction: column; gap: 6px; }
.form-label { font-family: var(--mono); font-size: 9px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text3); display: flex; align-items: center; gap: 5px; }
.form-label svg { stroke: var(--text3); }
.form-input, .form-textarea {
  font-family: var(--mono); font-size: 12px; background: var(--surface); border: 1px solid var(--border);
  border-radius: 6px; padding: 10px 13px; color: var(--text); outline: none; transition: border-color 0.2s; width: 100%;
  resize: none;
}
.form-input::placeholder, .form-textarea::placeholder { color: var(--text3); }
.form-input:focus, .form-textarea:focus { border-color: var(--accent); }
.form-textarea { height: 100px; margin-bottom: 0; }
.submit-btn {
  margin-top: 16px; background: var(--accent); color: #fff;
  font-family: var(--mono); font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase;
  border: none; padding: 12px 24px; border-radius: 6px; display: flex; align-items: center; gap: 8px;
  transition: background 0.2s, transform 0.1s;
}
.submit-btn:hover { background: #c0392b; transform: translateY(-1px); }
.submit-btn:active { transform: translateY(0); }
.submit-btn:disabled { opacity: 0.5; cursor: wait; }
.submit-btn svg { stroke: currentColor; }
.error-msg {
  margin-top: 12px;
  font-family: var(--mono);
  font-size: 11px;
  color: var(--accent);
}
.sent-msg {
  margin-top: 12px;
  font-family: var(--mono);
  font-size: 11px;
  color: var(--green);
  display: flex;
  align-items: center;
  gap: 6px;
}
.sent-msg svg { stroke: var(--green); }
.contact-sidebar { display: flex; flex-direction: column; gap: 16px; }
.connections-card, .system-status-card { background: var(--glass); border: 1px solid var(--border); border-radius: 10px; padding: 20px; backdrop-filter: blur(8px); }
.side-card-title { font-family: var(--mono); font-size: 9px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--text3); margin-bottom: 14px; display: flex; align-items: center; gap: 6px; }
.side-card-title svg { stroke: var(--text3); }
.conn-link { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 6px; background: var(--glass); border: 1px solid var(--border); margin-bottom: 8px; transition: border-color 0.2s; text-decoration: none; }
.conn-link:last-child { margin-bottom: 0; }
.conn-link:hover { border-color: var(--accent); }
.conn-icon { display: flex; align-items: center; font-size: 14px; color: var(--accent); }
.conn-icon svg { fill: var(--accent); }
.conn-text { font-family: var(--mono); font-size: 11px; font-weight: 600; color: var(--text2); transition: color 0.2s; }
.conn-link:hover .conn-text { color: var(--text); }
.sys-row { display: flex; align-items: center; justify-content: space-between; padding: 7px 0; border-bottom: 1px solid var(--border); }
.sys-row:last-child { border-bottom: none; }
.sys-key { font-family: var(--mono); font-size: 10px; color: var(--text3); display: flex; align-items: center; gap: 5px; }
.sys-key svg { stroke: var(--text3); }
.sys-val { font-family: var(--mono); font-size: 10px; font-weight: 600; }
.sys-online { color: var(--green); }
.sys-offline { color: var(--accent); }
.sys-enc { color: var(--blue); }
.sys-lat { color: var(--text2); }
.node-badge { font-family: var(--mono); font-size: 9px; background: var(--bg); border: 1px solid var(--border); color: var(--text3); padding: 2px 7px; border-radius: 4px; }
@media (max-width: 1024px) {
  .section { padding: 32px 20px; }
  .contact-grid { grid-template-columns: 1fr; }
}
@media (max-width: 600px) {
  .section { padding: 24px 16px; }
  .section-title { font-size: 11px; }
  .form-row { grid-template-columns: 1fr; }
  .contact-form-card { padding: 16px; }
  .submit-btn { width: 100%; justify-content: center; }
  .connections-card, .system-status-card { padding: 14px; }
  .conn-link { padding: 8px 10px; }
  .conn-text { font-size: 10px; }
}
</style>
