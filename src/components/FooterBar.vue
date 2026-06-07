<script setup lang="ts">
import { useI18n } from '../i18n'
const { t } = useI18n()

const emit = defineEmits<{ navigate: [page: string] }>()

const socialLinks = [
  { icon: '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>', label: 'GitHub', url: 'https://github.com/nuth68' },
  { icon: '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>', label: 'LinkedIn', url: 'https://linkedin.com/in/pravevinuth' },
  { icon: '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>', label: 'Telegram', url: 'https://t.me/yourusername' },
  { icon: '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M24 11.7c0-6.45-5.37-11.7-12-11.7S0 5.25 0 11.7c0 5.8 3.94 10.7 9.3 12l.1.02.07.04c.06.03.1.04.17.06l.08.02c.05.02.1.04.15.05l.1.03c.06.02.12.04.18.05l.1.02c.12.03.25.06.38.08l.08.02c.2.03.4.06.61.08l.14.02c.62.06 1.27.08 1.93.08.66 0 1.3-.03 1.93-.08l.14-.02c.2-.02.4-.05.6-.08l.1-.02c.12-.02.24-.05.36-.07l.1-.03c.06-.02.12-.04.18-.06l.1-.03c.05-.01.1-.03.15-.05l.08-.02c.07-.02.12-.04.17-.06l.07-.04c5.36-1.3 9.3-6.2 9.3-12zM12 3.9c.78 0 1.56.12 2.3.36l.1.04v.04c.75.24 1.44.58 2.06 1.02l.02.02c.35.24.68.52.98.82l.3.3c.18.18.34.38.5.58l.1.14c.16.2.3.4.44.62l.08.12c.13.22.25.45.36.68l.04.1c.04.08.06.16.1.24.1.23.18.46.26.7l.02.1c.07.24.12.48.16.72l.02.14c.04.25.06.5.06.76 0 .26-.02.5-.06.76l-.02.14c-.04.24-.1.48-.16.72l-.02.1c-.07.24-.16.47-.26.7-.04.08-.06.16-.1.24l-.04.1c-.1.23-.22.46-.36.68l-.08.12c-.13.22-.28.42-.44.62l-.1.14c-.16.2-.32.4-.5.58l-.3.3c-.3.3-.63.58-.98.82l-.02.02c-.62.44-1.3.78-2.06 1.02l-.1.04v.04c-.74.24-1.52.36-2.3.36s-1.56-.12-2.3-.36l-.1-.04v-.04c-.75-.24-1.44-.58-2.06-1.02l-.02-.02c-.35-.24-.68-.52-.98-.82l-.3-.3c-.18-.18-.34-.38-.5-.58l-.1-.14c-.16-.2-.3-.4-.44-.62l-.08-.12c-.13-.22-.25-.45-.36-.68l-.04-.1c-.04-.08-.06-.16-.1-.24-.1-.23-.18-.46-.26-.7l-.02-.1c-.07-.24-.12-.48-.16-.72l-.02-.14c-.04-.25-.06-.5-.06-.76 0-.26.02-.5.06-.76l.02-.14c.04-.24.1-.48.16-.72l.02-.1c.07-.24.16-.47.26-.7.04-.08.06-.16.1-.24l.04-.1c.1-.23.22-.46.36-.68l.08-.12c.13-.22.28-.42.44-.62l.1-.14c.16-.2.32-.4.5-.58l.3-.3c.3-.3.63-.58.98-.82l.02-.02c.62-.44 1.3-.78 2.06-1.02l.1-.04v.04c.74.24 1.52.36 2.3.36z"/></svg>', label: 'Website', url: 'https://pravevinuth.portfolio' },
]
</script>

<template>
  <footer>
    <div class="footer-top">
      <div class="footer-col">
        <div class="footer-col-title">{{ t('footer_nav') }}</div>
        <a class="footer-link" @click="emit('navigate', 'home')">{{ t('nav_home') }}</a>
        <a class="footer-link" @click="emit('navigate', 'projects')">{{ t('nav_projects') }}</a>
        <a class="footer-link" @click="emit('navigate', 'skills')">{{ t('nav_skills') }}</a>
        <a class="footer-link" @click="emit('navigate', 'about')">{{ t('nav_about') }}</a>
        <a class="footer-link" @click="emit('navigate', 'contact')">{{ t('nav_contact') }}</a>
      </div>
      <div class="footer-col">
        <div class="footer-col-title">{{ t('footer_links') }}</div>
        <a class="footer-link" href="https://github.com/nuth68" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a class="footer-link" href="https://linkedin.com/in/pravevinuth" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a class="footer-link" href="mailto:pravevinuth888@gmail.com">{{ t('footer_email') }}</a>
        <a class="footer-link" @click="emit('navigate', 'profile')">{{ t('footer_cv') }}</a>
      </div>
      <div class="footer-col">
        <div class="footer-col-title">{{ t('footer_status') }}</div>
        <div class="footer-info">
          <span class="status-dot"></span>
          {{ t('footer_available') }}
        </div>
        <div class="footer-info">Phnom Penh, Cambodia</div>
        <div class="footer-info">pravevinuth888@gmail.com</div>
        <div class="footer-info">+855 89 357 087</div>
      </div>
    </div>
    <div class="footer-divider"></div>
    <div class="footer-bottom">
      <div class="footer-social">
        <a v-for="s in socialLinks" :key="s.label" :href="s.url" target="_blank" rel="noopener noreferrer" class="social-icon" :title="s.label" v-html="s.icon"></a>
      </div>
      <div class="footer-copy">&copy; 2026 Prave Vinuth &mdash; DEV_OS v8.4 ALL_SYSTEMS_GO</div>
      <div class="footer-tech">Built with Vue 3 &bull; TypeScript &bull; Vite</div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  margin-left: 0; margin-bottom: var(--nav-h);
  background: var(--surface);
  border-top: 1px solid var(--border);
  padding: 28px 40px 18px calc(var(--sidebar-w) + 40px);
}
.footer-top {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 24px;
}
.footer-col {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.footer-col-title {
  font-family: var(--mono);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text3);
  margin-bottom: 6px;
}
.footer-link {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--text2);
  text-decoration: none;
 
  transition: color 0.2s;
  background: none;
  border: none;
  text-align: left;
  padding: 2px 0;
}
.footer-link:hover { color: var(--accent); }
.footer-info {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--text2);
  display: flex;
  align-items: center;
  gap: 6px;
}
.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--green);
  flex-shrink: 0;
}
.footer-divider {
  height: 1px;
  background: var(--border);
  margin: 18px 0 14px;
}
.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.footer-social {
  display: flex;
  gap: 10px;
}
.social-icon {
  display: flex;
  align-items: center;
  color: var(--text3);
  transition: color 0.2s;
}
.social-icon:hover { color: var(--accent); }
.footer-copy {
  font-family: var(--mono);
  font-size: 9px;
  font-weight: 500;
  color: var(--text3);
  letter-spacing: 0.06em;
}
.footer-tech {
  font-family: var(--mono);
  font-size: 8px;
  color: var(--text3);
  letter-spacing: 0.06em;
}
@media (max-width: 1024px) {
  footer { padding: 24px 20px 14px; }
  .footer-top { gap: 16px; }
}
@media (max-width: 600px) {
  footer { padding: 20px 16px 14px; }
  .footer-top { grid-template-columns: 1fr; gap: 16px; }
  .footer-bottom { flex-direction: column; gap: 8px; text-align: center; }
  .footer-copy { font-size: 8px; }
  .footer-tech { font-size: 7px; }
}
</style>
