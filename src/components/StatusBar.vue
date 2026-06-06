<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const time = ref('')
const date = ref('')
const temp = ref('--')
const isDark = ref(document.documentElement.classList.contains('dark'))
let timeTimer: ReturnType<typeof setInterval>

const svgSun = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
const svgMoon = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>'

function updateTime() {
  const d = new Date()
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
  const h = String(d.getHours()).padStart(2, '0')
  const m = String(d.getMinutes()).padStart(2, '0')
  time.value = `${h}:${m}`
  date.value = `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}`
}

async function fetchTemp() {
  try {
    const r = await fetch('https://api.open-meteo.com/v1/forecast?latitude=11.56&longitude=104.87&current_weather=true')
    const data = await r.json()
    temp.value = Math.round(data.current_weather.temperature) + '\u00B0C'
  } catch {
    temp.value = '--\u00B0C'
  }
}

function toggleDark() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('dark', String(isDark.value))
}

onMounted(() => {
  updateTime()
  fetchTemp()
  timeTimer = setInterval(updateTime, 10000)
  setInterval(fetchTemp, 300000)
})
onBeforeUnmount(() => clearInterval(timeTimer))
</script>

<template>
  <div class="status-bar">
    <div class="status-left">
    </div>
    <div class="status-center">
      <span class="status-time">{{ time }}</span>
      <span class="status-sep">&#8226;</span>
      <span class="status-date">{{ date }}</span>
    </div>
    <div class="status-right">
      <span class="status-temp">{{ temp }}</span>
      <span class="status-loc">Phnom Penh</span>
      <button class="status-dark-btn" @click="toggleDark" :title="isDark ? 'Light mode' : 'Dark mode'">
        <span class="dark-icon" v-html="isDark ? svgSun : svgMoon"></span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.status-bar {
  position: fixed; top: 0; left: var(--sidebar-w); right: 0; height: 28px;
  z-index: 99;
  display: flex; align-items: center; justify-content: space-between;
  gap: 8px;
  padding: 0 16px;
  background: var(--surface2);
  border-bottom: 1px solid var(--border);
  user-select: none;
  -webkit-user-select: none;
}
.status-left { display: flex; align-items: center; gap: 10px; }
.status-brand {
  font-family: var(--mono); font-size: 10px; font-weight: 700;
  letter-spacing: 0.15em; color: var(--text3);
}
.status-center {
  display: flex; align-items: center; gap: 8px;
  font-family: var(--mono); font-size: 11px; font-weight: 600;
  color: var(--text);
}
.status-sep { color: var(--text3); font-size: 8px; }
.status-right {
  display: flex; align-items: center; gap: 12px;
}
.status-temp {
  font-family: var(--mono); font-size: 11px; font-weight: 600;
  color: var(--text);
}
.status-loc {
  font-family: var(--mono); font-size: 8px; font-weight: 700;
  letter-spacing: 0.08em; color: var(--text3);
  background: var(--bg); padding: 2px 6px; border-radius: 3px;
  border: 1px solid var(--border); white-space: nowrap;
}
.status-dark-btn {
  background: none; border: none; cursor: pointer;
  font-size: 13px; line-height: 1;
  color: var(--text3); padding: 2px;
  display: flex; align-items: center; justify-content: center;
  transition: color 0.2s;
  border-radius: 4px;
}
.status-dark-btn:hover { color: var(--accent); background: var(--bg); }
.dark-icon { display: flex; }
@media (max-width: 600px) {
  .status-bar { padding: 0 10px; height: 24px; }
  .status-brand { font-size: 8px; }
  .status-center { font-size: 9px; gap: 4px; }
  .status-date { display: none; }
  .status-temp { font-size: 9px; }
  .status-loc { font-size: 7px; }
}
</style>
