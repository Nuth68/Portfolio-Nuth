<script setup lang="ts">
import { ref, onMounted } from 'vue'

const el = ref<HTMLElement | null>(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        el.value?.classList.add('visible')
        observer.disconnect()
      }
    },
    { threshold: 0.1 }
  )
  if (el.value) observer.observe(el.value)
})
</script>

<template>
  <div ref="el" class="reveal"><slot /></div>
</template>

<style scoped>
.reveal {
  opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal.visible {
  opacity: 1; transform: translateY(0);
}
</style>
