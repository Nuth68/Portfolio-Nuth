<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvas = ref<HTMLCanvasElement | null>(null)
let animId = 0

onMounted(() => {
  const c = canvas.value!
  const ctx = c.getContext('2d')!
  let drops: number[] = []
  const chars = '01'

  function resize() {
    c.width = window.innerWidth
    c.height = window.innerHeight
    const cols = Math.floor(c.width / 14)
    drops = Array.from({ length: cols }, () => Math.floor(Math.random() * -c.height / 14))
  }

  function draw() {
    const dark = document.documentElement.classList.contains('dark')
    ctx.fillStyle = dark ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.15)'
    ctx.fillRect(0, 0, c.width, c.height)

    const green = dark ? 'rgba(0, 255, 65, ' : 'rgba(0, 184, 148, '
    const red = dark ? 'rgba(255, 50, 50, ' : 'rgba(214, 48, 49, '
    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)] || '0'
      let y = drops[i]
      if (y === undefined) { drops[i] = 0; y = 0 }
      const x = i * 14
      const py = y * 14
      const isHead = Math.random() > 0.98
      ctx.font = 'bold 14px JetBrains Mono, monospace'
      if (isHead) {
        ctx.fillStyle = red + '0.9)'
      } else {
        const opacity = Math.max(0.2, 0.55 - (py / c.height) * 0.3)
        ctx.fillStyle = green + opacity + ')'
      }
      ctx.fillText(char, x, py)
      drops[i] = y + 1
      if (drops[i]! * 14 > c.height && Math.random() > 0.975) drops[i] = 0
    }
    animId = requestAnimationFrame(draw)
  }

  resize()
  draw()
  window.addEventListener('resize', resize)
  onBeforeUnmount(() => {
    cancelAnimationFrame(animId)
    window.removeEventListener('resize', resize)
  })
})
</script>

<template>
  <canvas ref="canvas" class="matrix-rain"></canvas>
</template>

<style scoped>
.matrix-rain {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  pointer-events: none;
}
</style>
