import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

/**
 * v-reveal 指令：滚动进入视口时淡入上移
 * 用法：<div v-reveal> 或 <div v-reveal="120">（延迟 120ms，用于错落出现）
 * 基于 IntersectionObserver，不依赖任何动画库，尊重 prefers-reduced-motion。
 */
const reduce =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const observer =
  typeof IntersectionObserver !== 'undefined'
    ? new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-in')
              obs.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
      )
    : null

const app = createApp(App)

app.directive('reveal', {
  mounted(el, binding) {
    if (reduce || !observer) {
      el.classList.add('reveal', 'is-in')
      return
    }
    el.classList.add('reveal')
    const delay = Number(binding.value) || 0
    if (delay) el.style.transitionDelay = `${delay}ms`
    observer.observe(el)
  },
  unmounted(el) {
    if (observer) observer.unobserve(el)
  },
})

app.mount('#app')
