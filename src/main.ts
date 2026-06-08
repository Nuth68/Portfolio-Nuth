import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

const dot = document.createElement('div')
dot.className = 'cursor-dot'
document.body.appendChild(dot)

const glow = document.createElement('div')
glow.className = 'cursor-glow'
document.body.appendChild(glow)

let mx = window.innerWidth / 2, my = window.innerHeight / 2
let cx = mx, cy = my
let gx = mx, gy = my

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY })

function frame() {
  cx += (mx - cx) * 0.2
  cy += (my - cy) * 0.2
  gx += (mx - gx) * 0.06
  gy += (my - gy) * 0.06
  dot.style.transform = `translate(${cx}px, ${cy}px)`
  glow.style.transform = `translate(${gx}px, ${gy}px)`
  requestAnimationFrame(frame)
}
frame()

let hovered = false
document.addEventListener('mouseover', e => {
  const target = e.target as Element | null
  if (target?.closest('a, button, input, textarea, select, label, summary')) {
    dot.classList.add('hover')
    hovered = true
  }
})
document.addEventListener('mouseout', e => {
  const related = e.relatedTarget as Element | null
  if (hovered && (!e.relatedTarget || !related?.closest('a, button, input, textarea, select, label, summary'))) {
    dot.classList.remove('hover')
    hovered = false
  }
})

createApp(App).mount('#app')
