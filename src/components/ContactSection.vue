<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useI18n } from '../i18n'

const { t } = useI18n()

interface Connection {
  icon: string
  label: string
  url?: string
}

defineProps<{ connections: Connection[] }>()

const form = reactive({ name: '', email: '', message: '' })
const sent = ref(false)

function sendMessage() {
  if (form.name && form.email && form.message) {
    sent.value = true
    form.name = ''
    form.email = ''
    form.message = ''
    setTimeout(() => sent.value = false, 3000)
  }
}
</script>

<template>
  <section class="section contact-section" id="contact">
    <div class="section-header">
      <div class="section-bar"></div>
      <h2 class="section-title">{{ t('contact_title') }}</h2>
    </div>
    <div class="contact-grid">
      <div class="contact-form-card">
        <div class="form-card-header">
          <span>&#128225;</span> {{ t('contact_interface') }}
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">{{ t('contact_name') }}</label>
            <input class="form-input" v-model="form.name" placeholder="John Doe" />
          </div>
          <div class="form-group">
            <label class="form-label">{{ t('contact_email') }}</label>
            <input class="form-input" v-model="form.email" placeholder="john@example.com" type="email" />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">{{ t('contact_message') }}</label>
          <textarea class="form-textarea" v-model="form.message" placeholder="Type your message here..."></textarea>
        </div>
        <button class="submit-btn" @click="sendMessage">
          {{ t('contact_send') }} <span>&rarr;</span>
        </button>
        <div v-if="sent" style="margin-top:12px;font-family:var(--mono);font-size:11px;color:var(--green)">&#10003; Transmission sent successfully.</div>
      </div>

      <div class="contact-sidebar">
        <div class="connections-card">
          <div class="side-card-title">{{ t('contact_connections') }}</div>
          <a class="conn-link" v-for="c in connections" :key="c.label" :href="c.url || '#'" target="_blank" rel="noopener noreferrer">
            <span class="conn-icon" v-html="c.icon"></span>
            <span class="conn-text">{{ c.label }}</span>
          </a>
        </div>
        <div class="system-status-card">
          <div class="side-card-title">{{ t('contact_status') }}</div>
          <div class="sys-row">
            <span class="sys-key">{{ t('contact_network') }}</span>
            <span class="sys-val sys-online">{{ t('contact_online') }}</span>
          </div>
          <div class="sys-row">
            <span class="sys-key">{{ t('contact_encryption') }}</span>
            <span class="sys-val sys-enc">AES-256</span>
          </div>
          <div class="sys-row">
            <span class="sys-key">{{ t('contact_latency') }}</span>
            <span class="sys-val sys-lat">~8ms</span>
          </div>
          <div class="sys-row" style="margin-top:10px;border:none">
            <span class="node-badge">&#9761; {{ t('contact_node') }}</span>
          </div>
          <div class="sys-row">
            <span class="node-badge">&#9650; V8.4 &bull; {{ t('contact_stable') }}</span>
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
.contact-grid { display: grid; grid-template-columns: 1fr 280px; gap: 24px; }
.contact-form-card { background: var(--glass); border: 1px solid var(--border); border-radius: 10px; padding: 24px; backdrop-filter: blur(8px); }
.form-card-header { font-family: var(--mono); font-size: 10px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--text3); margin-bottom: 20px; display: flex; align-items: center; gap: 8px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
.form-group { display: flex; flex-direction: column; gap: 6px; }
.form-label { font-family: var(--mono); font-size: 9px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text3); }
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
  border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 8px;
  transition: background 0.2s, transform 0.1s;
}
.submit-btn:hover { background: #c0392b; transform: translateY(-1px); }
.submit-btn:active { transform: translateY(0); }
.contact-sidebar { display: flex; flex-direction: column; gap: 16px; }
.connections-card, .system-status-card { background: var(--glass); border: 1px solid var(--border); border-radius: 10px; padding: 20px; backdrop-filter: blur(8px); }
.side-card-title { font-family: var(--mono); font-size: 9px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--text3); margin-bottom: 14px; }
.conn-link { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 6px; background: var(--glass); border: 1px solid var(--border); margin-bottom: 8px; cursor: pointer; transition: border-color 0.2s; text-decoration: none; }
.conn-link:last-child { margin-bottom: 0; }
.conn-link:hover { border-color: var(--accent); }
.conn-icon { display: flex; align-items: center; font-size: 14px; color: var(--text3); }
.conn-text { font-family: var(--mono); font-size: 11px; font-weight: 600; color: var(--text2); }
.sys-row { display: flex; align-items: center; justify-content: space-between; padding: 7px 0; border-bottom: 1px solid var(--border); }
.sys-row:last-child { border-bottom: none; }
.sys-key { font-family: var(--mono); font-size: 10px; color: var(--text3); }
.sys-val { font-family: var(--mono); font-size: 10px; font-weight: 600; }
.sys-online { color: var(--green); }
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
}
</style>
