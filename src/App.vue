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
  {
    name: 'VEGETABLE KHMER', icon: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C8 2 4 5 4 10c0 5 3 8 8 12 5-4 8-7 8-12 0-5-4-8-8-8z"/><circle cx="12" cy="10" r="3"/></svg>', status: 'DEPLOYED',
    desc: 'Full-stack vegetable e-commerce platform built with Vue, CSS, NestJS, and MySQL. Features user frontend with product browsing and ordering. Deployed on DigitalOcean via Jenkins CI/CD pipeline using Docker.',
    tags: ['VUE', 'NESTJS', 'DOCKER'],
    role: 'Full-Stack Developer',
    duration: '2025 (Sem II)',
    features: ['Product browsing & ordering', 'User authentication & roles', 'Admin product dashboard', 'CI/CD auto-deployment', 'Responsive mobile-first design', 'MySQL database schema', 'RESTful API endpoints'],
    challenge: 'Integrating a CI/CD pipeline with Jenkins and Docker was new. Debugging Docker networking between NestJS and MySQL containers required deep dive into container orchestration.',
    highlights: ['Vue 3 Composition API for SPA', 'NestJS modular backend architecture', 'JWT-based auth with guards', 'Jenkins pipeline with Docker Compose', 'DigitalOcean droplet deployment'],
    links: { github: '#', demo: '#' }
  },
  {
    name: 'MEN FASHION CLONE', icon: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M7 7V5a2 2 0 012-2h6a2 2 0 012 2v2"/><path d="M12 7v14"/><path d="M3 14h18"/></svg>', status: 'MOBILE',
    desc: 'Mobile application clone built with Flutter and Dart. Focused on UI replication, screen navigation, and state management for a men\'s fashion shopping experience.',
    tags: ['FLUTTER', 'DART', 'MOBILE'],
    role: 'Mobile Developer',
    duration: '2025 (Sem II)',
    features: ['Pixel-perfect UI replication', 'Multi-screen navigation flow', 'State management with Provider', 'Product catalog with categories', 'Shopping cart system', 'Smooth page transitions', 'Asset & image management'],
    challenge: 'Replicating the exact UI required careful measurement of padding, fonts, and spacing. Managing state across multiple screens without a backend was tricky — used Provider for local state.',
    highlights: ['Flutter Widget tree architecture', 'Provider state management pattern', 'Custom theme & styling constants', 'Hero animations for transitions', 'Responsive layout for multiple screen sizes'],
    links: { github: '#', demo: '#' }
  },
  {
    name: 'IP PROJECT DASHBOARD', icon: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="4"/><rect x="14" y="10" width="7" height="11"/><rect x="3" y="14" width="7" height="7"/></svg>', status: 'VUE',
    desc: 'Full-stack web application using Vue, TypeScript, and Tailwind CSS for Internet Programming course. Dynamic components, state management, and responsive UI.',
    tags: ['VUE', 'TYPESCRIPT', 'TAILWIND'],
    role: 'Frontend Developer',
    duration: '2025 (Sem I)',
    features: ['Dynamic component rendering', 'Reactive state management', 'Tailwind utility-first styling', 'API data fetching & display', 'Dark/light theme toggle', 'Responsive grid layout', 'Form validation'],
    challenge: 'Learning TypeScript with Vue was a steep curve. Managing complex reactive state across multiple child components required careful planning of the component hierarchy.',
    highlights: ['Vue 3 script setup syntax', 'TypeScript interfaces for type safety', 'Tailwind CSS responsive breakpoints', 'Composition API for logic reuse', 'Axios for HTTP integration'],
    links: { github: '#', demo: '#' }
  },
  {
    name: 'WEB DASHBOARD', icon: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>', status: 'DONE',
    desc: 'Responsive web dashboard using HTML, CSS, and JavaScript. Clean UI layout, cross-browser compatibility, and interactive elements with vanilla JS.',
    tags: ['HTML', 'CSS', 'JS'],
    role: 'Frontend Developer',
    duration: '2024 (Sem I)',
    features: ['Custom CSS grid dashboard layout', 'Interactive charts & graphs', 'Cross-browser compatibility', 'Mobile-responsive breakpoints', 'CSS custom properties theming', 'Vanilla JS DOM manipulation', 'Accessible semantic HTML'],
    challenge: 'Building charts from scratch with vanilla JS (no library) required understanding SVG path math and coordinate systems. Ensuring consistent rendering across Chrome, Firefox, and Safari.',
    highlights: ['CSS Grid for complex layouts', 'SVG-based chart components', 'CSS custom properties for theming', 'Event delegation pattern', 'Local storage for user preferences'],
    links: { github: '#', demo: '#' }
  },
]

const languages = [
  { name: 'Java', pct: 85, icon: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>' },
  { name: 'TypeScript', pct: 80, icon: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5"/><line x1="12" y1="22" x2="12" y2="15.5"/><polyline points="22 8.5 12 15.5 2 8.5"/></svg>' },
  { name: 'Python', pct: 70, icon: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>' },
  { name: 'Dart', pct: 65, icon: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>' },
  { name: 'SQL', pct: 75, icon: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>' },
]

const frameworks = [
  { name: 'Vue', icon: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5"/><line x1="12" y1="22" x2="12" y2="15.5"/><polyline points="22 8.5 12 15.5 2 8.5"/></svg>', pct: 85 },
  { name: 'Node.js', icon: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>', pct: 80 },
  { name: 'NestJS', icon: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>', pct: 75 },
  { name: 'Spring Boot', icon: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>', pct: 70 },
  { name: 'Flutter', icon: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>', pct: 65 },
  { name: 'TailwindCSS', icon: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>', pct: 78 },
]
const tools = [
  { name: 'Docker', icon: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h.01"/><path d="M15 9h.01"/><path d="M9 15h.01"/><path d="M15 15h.01"/></svg>', pct: 82 },
  { name: 'Git', icon: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>', pct: 88 },
  { name: 'Jenkins', icon: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>', pct: 65 },
  { name: 'Linux', icon: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>', pct: 75 },
  { name: 'DigitalOcean', icon: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M16 8l-8 8"/><path d="M8 8h8v8"/></svg>', pct: 60 },
  { name: 'Bash', icon: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>', pct: 72 },
]
const databases = [
  { name: 'PostgreSQL', icon: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>', pct: 78 },
  { name: 'MySQL', icon: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>', pct: 75 },
  { name: 'SQL', icon: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>', pct: 80 },
]

const connections = [
  { icon: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>', label: 'GitHub', url: 'https://github.com/nuth68' },
  { icon: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>', label: 'LinkedIn', url: 'https://www.linkedin.com/in/prave-vinuth-a75b213b7' },
  { icon: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>', label: 'Telegram', url: 'https://t.me/PrAvEvInUtH' },
  { icon: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M24 11.7c0-6.45-5.37-11.7-12-11.7S0 5.25 0 11.7c0 5.8 3.94 10.7 9.3 12l.1.02.07.04c.06.03.1.04.17.06l.08.02c.05.02.1.04.15.05l.1.03c.06.02.12.04.18.05l.1.02c.12.03.25.06.38.08l.08.02c.2.03.4.06.61.08l.14.02c.62.06 1.27.08 1.93.08.66 0 1.3-.03 1.93-.08l.14-.02c.2-.02.4-.05.6-.08l.1-.02c.12-.02.24-.05.36-.07l.1-.03c.06-.02.12-.04.18-.06l.1-.03c.05-.01.1-.03.15-.05l.08-.02c.07-.02.12-.04.17-.06l.07-.04c5.36-1.3 9.3-6.2 9.3-12zM12 3.9c.78 0 1.56.12 2.3.36l.1.04v.04c.75.24 1.44.58 2.06 1.02l.02.02c.35.24.68.52.98.82l.3.3c.18.18.34.38.5.58l.1.14c.16.2.3.4.44.62l.08.12c.13.22.25.45.36.68l.04.1c.04.08.06.16.1.24.1.23.18.46.26.7l.02.1c.07.24.12.48.16.72l.02.14c.04.25.06.5.06.76 0 .26-.02.5-.06.76l-.02.14c-.04.24-.1.48-.16.72l-.02.1c-.07.24-.16.47-.26.7-.04.08-.06.16-.1.24l-.04.1c-.1.23-.22.46-.36.68l-.08.12c-.13.22-.28.42-.44.62l-.1.14c-.16.2-.32.4-.5.58l-.3.3c-.3.3-.63.58-.98.82l-.02.02c-.62.44-1.3.78-2.06 1.02l-.1.04v.04c-.74.24-1.52.36-2.3.36z"/></svg>', label: 'Website', url: 'https://pravevinuth.portfolio' },
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
    <SettingsSection v-else-if="page === 'settings'" @navigate="goToPage" />
    <ProfileSection v-else-if="page === 'profile'" @navigate="goToPage" />
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
