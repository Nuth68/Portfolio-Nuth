<script setup lang="ts">
import { useI18n } from '../i18n'
const { t } = useI18n()
</script>

<template>
  <footer>
    <div class="footer-links">
      <a>{{ t('footer_curriculum') }}</a>
      <a>{{ t('footer_github') }}</a>
      <a>{{ t('footer_status') }}</a>
    </div>
    <div class="footer-copy">&copy; 2026 DEV_OS ALL_SYSTEMS_GO</div>
  </footer>
</template>

<style scoped>
footer {
  margin-left: 0; margin-bottom: var(--nav-h);
  background: var(--surface);
  border-top: 1px solid var(--border);
  padding: 14px 40px 14px calc(var(--sidebar-w) + 40px);
  display: flex; align-items: center; justify-content: space-between;
}
.footer-links { display: flex; gap: 24px; }
.footer-links a {
  font-family: var(--mono); font-size: 9px; font-weight: 600;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--text3); text-decoration: none; cursor: pointer;
  transition: color 0.2s;
}
.footer-links a:hover { color: var(--accent); }
.footer-copy {
  font-family: var(--mono); font-size: 9px; font-weight: 500;
  color: var(--text3); letter-spacing: 0.08em;
  white-space: nowrap;
}
@media (max-width: 1024px) {
  footer { padding: 12px 20px; }
}
@media (max-width: 600px) {
  footer { flex-direction: column; align-items: flex-start; padding: 10px 16px; gap: 8px; }
  .footer-links { gap: 14px; }
  .footer-copy { font-size: 8px; }
}
</style>
