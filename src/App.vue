<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import SiteNav from './components/SiteNav.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import MottoBand from './components/MottoBand.vue'
import TeacherWords from './components/TeacherWords.vue'
import GallerySection from './components/GallerySection.vue'
import TimelineSection from './components/TimelineSection.vue'
import ClassPact from './components/ClassPact.vue'
import HonorsSection from './components/HonorsSection.vue'
import StudyCorner from './components/StudyCorner.vue'
import MembersSection from './components/MembersSection.vue'
import VoicesWall from './components/VoicesWall.vue'
import AboutSiteSection from './components/AboutSiteSection.vue'
import SiteFooter from './components/SiteFooter.vue'

// 顶部阅读进度
const progress = ref(0)
const onScroll = () => {
  const doc = document.documentElement
  const total = doc.scrollHeight - doc.clientHeight
  progress.value = total > 0 ? Math.min(1, doc.scrollTop / total) : 0
}
onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})
</script>

<template>
  <div class="app">
    <div class="progress" aria-hidden="true">
      <span :style="{ transform: `scaleX(${progress})` }"></span>
    </div>

    <SiteNav />

    <main>
      <HeroSection />
      <AboutSection />
      <MottoBand />
      <TeacherWords />
      <GallerySection />
      <TimelineSection />
      <ClassPact />
      <HonorsSection />
      <StudyCorner />
      <MembersSection />
      <VoicesWall />
      <AboutSiteSection />
    </main>

    <SiteFooter />
  </div>
</template>

<style scoped>
.app {
  position: relative;
}

.progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  z-index: 80;
  background: transparent;
  pointer-events: none;
}

.progress span {
  display: block;
  height: 100%;
  transform-origin: left;
  background: var(--cinnabar);
  transition: transform 0.1s linear;
}
</style>
