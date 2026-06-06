<script setup lang="ts">
import { ref } from 'vue'
import MatrixRain from './components/MatrixRain.vue'
import StatusBar from './components/StatusBar.vue'
import NavBar from './components/NavBar.vue'
import SideBar from './components/SideBar.vue'
import ScrollReveal from './components/ScrollReveal.vue'
import HeroSection from './components/HeroSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import AboutSection from './components/AboutSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ContactSection from './components/ContactSection.vue'
import SettingsSection from './components/SettingsSection.vue'
import ProfileSection from './components/ProfileSection.vue'
import ProjectDetail from './components/ProjectDetail.vue'
import FooterBar from './components/FooterBar.vue'

const navLinks = ['HOME', 'PROJECTS', 'SKILLS', 'ABOUT', 'CONTACT']
const page = ref('home')
const selectedProject = ref<any>(null)

const projects = [
  { name: 'NEURALSYNC V2', icon: '⚙', status: 'ACTIVE', desc: 'Distributed training platform for large-scale language models. Optimized for high-throughput data parallelization across multi-node clusters.', tags: ['K8S', 'ML', 'PYTHON'] },
  { name: 'CYPHERGUARD', icon: '🛡', status: 'SECURE', desc: 'Zero-trust security mesh implementation for microservices architecture. Features automated mTLS rotation and granular identity-based access control.', tags: ['RUST', 'ZERO-TRUST', 'GRPC'] },
  { name: 'EDGEPULSE', icon: '📡', status: 'PENDING', desc: 'Low-latency event streaming engine optimized for resource-constrained IoT devices. Utilizes WebAssembly for high-performance edge processing.', tags: ['ZIG', 'WASM', 'MQTT'] },
  { name: 'VORTEX OS', icon: '☁', status: 'ACTIVE', desc: 'A custom micro-kernel written in C for educational purposes. Implements preemptive multitasking, basic VFS, and a Unix-like shell interface.', tags: ['C', 'ASM', 'BARE-METAL'] },
  { name: 'DATASTREAMER', icon: '📊', status: 'STABLE', desc: 'Real-time data visualization dashboard for complex financial instruments. Leverages WebSockets and Canvas API for 60fps rendering of live ticks.', tags: ['VUE', 'REDIS', 'NODE'] },
  { name: 'OMNISEARCH', icon: '🌐', status: 'BETA', desc: 'Semantic search engine utilizing vector embeddings. Built with ElasticSearch and sentence-transformers for deep contextual document retrieval.', tags: ['FAISS', 'FASTAPI', 'PYTHON'] },
]

const languages = [
  { name: 'Java', pct: 88 },
  { name: 'Python', pct: 82 },
  { name: 'TypeScript', pct: 75 },
  { name: 'C++', pct: 60 },
]

const frameworks = ['React', 'Node.js', 'Spring Boot', 'Express', 'TailwindCSS', 'Next.js', 'Vue']
const tools = ['Docker', 'Git', 'Linux', 'Kubernetes', 'AWS', 'Jenkins']
const databases = ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL']

const connections = [
  { icon: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>', label: 'GitHub', url: 'https://github.com' },
  { icon: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>', label: 'LinkedIn', url: 'https://linkedin.com' },
  { icon: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>', label: 'Facebook', url: 'https://facebook.com' },
  { icon: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>', label: 'Telegram', url: 'https://t.me' },
]

function goToPage(p: string) {
  const id = p.toLowerCase()
  if (id === 'settings' || id === 'profile' || id === 'project') {
    page.value = id
  } else {
    page.value = 'home'
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 50)
  }
}
function viewProject(p: any) {
  selectedProject.value = p
  page.value = 'project'
}
</script>

<template>
  <MatrixRain />
  <StatusBar />
  <NavBar :links="navLinks" @navigate="goToPage" />
  <SideBar @navigate="goToPage" />
  <main class="main" :class="{ 'main-settings': page === 'settings' }">
    <template v-if="page === 'home'">
      <ScrollReveal><HeroSection /></ScrollReveal>
      <ScrollReveal><ProjectsSection :projects="projects" @select="viewProject" /></ScrollReveal>
      <ScrollReveal><AboutSection /></ScrollReveal>
      <ScrollReveal><SkillsSection
        :languages="languages"
        :frameworks="frameworks"
        :tools="tools"
        :databases="databases"
      /></ScrollReveal>
      <ScrollReveal><ContactSection :connections="connections" /></ScrollReveal>
    </template>
    <SettingsSection v-else-if="page === 'settings'" />
    <ProfileSection v-else-if="page === 'profile'" />
    <ProjectDetail v-else-if="page === 'project' && selectedProject" :project="selectedProject" @back="goToPage('projects')" />
  </main>
  <FooterBar v-if="page === 'home'" />
</template>

<style scoped>
.main {
  margin-bottom: var(--nav-h);
  margin-left: var(--sidebar-w);
  padding-top: 28px;
  min-height: calc(100vh - var(--nav-h));
}
.main-settings {
  margin-bottom: 0;
}
@media (max-width: 1024px) {
  .main { margin-left: 0; }
}
@media (max-width: 600px) {
  .main { padding-top: 24px; }
}
</style>