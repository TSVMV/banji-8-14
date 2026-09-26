<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { navItems, classInfo } from '../data/site.js'

const scrolled = ref(false)
const open = ref(false)
const active = ref('hero')

const onScroll = () => {
  scrolled.value = window.scrollY > 40
}

let spy = null

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })

  // 滚动监听当前所在区块
  spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) active.value = e.target.id
      })
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  )
  navItems.forEach((n) => {
    const el = document.getElementById(n.id)
    if (el) spy.observe(el)
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  if (spy) spy.disconnect()
})

const go = (id) => {
  open.value = false
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <header
    class="nav"
    :class="{ 'nav--solid': scrolled, 'nav--open': open, 'nav--ghost': !scrolled && !open }"
  >
    <div class="nav__inner">
      <a class="brand" href="#hero" @click.prevent="go('hero')">
        <span class="brand__mark">三</span>
        <span class="brand__text">
          <b>{{ classInfo.name }}</b>
          <em>{{ classInfo.school }}</em>
        </span>
      </a>

      <nav class="nav__links" aria-label="主导航">
        <a
          v-for="item in navItems"
          :key="item.id"
          :href="`#${item.id}`"
          :class="{ on: active === item.id }"
          @click.prevent="go(item.id)"
        >
          {{ item.label }}
        </a>
      </nav>

      <button
        class="nav__toggle"
        :aria-expanded="open"
        aria-label="打开导航菜单"
        @click="open = !open"
      >
        <span></span><span></span><span></span>
      </button>
    </div>

    <!-- 移动端抽屉 -->
    <transition name="drawer">
      <nav v-if="open" class="drawer" aria-label="移动端导航">
        <a
          v-for="(item, i) in navItems"
          :key="item.id"
          :href="`#${item.id}`"
          :style="{ transitionDelay: `${i * 40}ms` }"
          @click.prevent="go(item.id)"
        >
          <span class="drawer__idx">{{ String(i + 1).padStart(2, '0') }}</span>
          {{ item.label }}
        </a>
      </nav>
    </transition>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 60;
  transition: background 0.4s var(--ease), box-shadow 0.4s var(--ease),
    border-color 0.4s var(--ease);
  border-bottom: 1px solid transparent;
}

.nav--solid {
  background: rgba(247, 244, 237, 0.9);
  backdrop-filter: saturate(1.2) blur(8px);
  border-bottom-color: var(--line-soft);
}

/* 未滚动时导航叠在墨色首屏上，改用浅色文字并垫一层墨色渐变，保证可读 */
.nav--ghost {
  background: linear-gradient(180deg, rgba(16, 13, 11, 0.55) 0%, rgba(16, 13, 11, 0) 100%);
}

.nav--ghost .brand__mark {
  border-color: rgba(247, 244, 237, 0.55);
  color: var(--paper);
  background: rgba(247, 244, 237, 0.08);
}

.nav--ghost .brand__text b {
  color: var(--paper);
}

.nav--ghost .brand__text em {
  color: rgba(247, 244, 237, 0.62);
}

.nav--ghost .nav__links a {
  color: rgba(247, 244, 237, 0.84);
}

.nav--ghost .nav__links a:hover,
.nav--ghost .nav__links a.on {
  color: var(--paper);
}

.nav--ghost .nav__toggle {
  border-color: rgba(247, 244, 237, 0.5);
}

.nav--ghost .nav__toggle span {
  background: var(--paper);
}

.nav__inner {
  max-width: var(--maxw);
  margin: 0 auto;
  padding: 14px var(--gutter);
  display: flex;
  align-items: center;
  gap: 24px;
}

/* --- 品牌 --- */
.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-right: auto;
}

.brand__mark {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border: 1.5px solid var(--cinnabar);
  border-radius: 5px;
  color: var(--cinnabar);
  background: var(--cinnabar-wash);
  font-family: var(--font-serif);
  font-weight: 700;
  font-size: 1.15rem;
  transform: rotate(-3deg);
  transition: transform 0.5s var(--ease);
}

.brand:hover .brand__mark {
  transform: rotate(3deg) scale(1.05);
}

.brand__text {
  display: flex;
  flex-direction: column;
  line-height: 1.25;
}

.brand__text b {
  font-family: var(--font-serif);
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: 0.06em;
}

.brand__text em {
  font-style: normal;
  font-size: 0.68rem;
  letter-spacing: 0.22em;
  color: var(--ink-mute);
}

/* --- 链接 --- */
.nav__links {
  display: flex;
  align-items: center;
  gap: 26px;
}

.nav__links a {
  position: relative;
  font-size: 0.9rem;
  letter-spacing: 0.08em;
  color: var(--ink-soft);
  padding: 6px 2px;
  transition: color 0.3s var(--ease);
}

.nav__links a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  height: 1.5px;
  width: 0;
  background: var(--cinnabar);
  transition: width 0.4s var(--ease);
}

.nav__links a:hover,
.nav__links a.on {
  color: var(--ink);
}

.nav__links a:hover::after,
.nav__links a.on::after {
  width: 100%;
}

/* --- 汉堡 --- */
.nav__toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 42px;
  height: 42px;
  padding: 0 9px;
  background: none;
  border: 1px solid var(--line);
  border-radius: 6px;
  cursor: pointer;
}

.nav__toggle span {
  display: block;
  height: 1.6px;
  background: var(--ink);
  transition: transform 0.35s var(--ease), opacity 0.3s var(--ease);
}

.nav--open .nav__toggle span:nth-child(1) {
  transform: translateY(6.6px) rotate(45deg);
}
.nav--open .nav__toggle span:nth-child(2) {
  opacity: 0;
}
.nav--open .nav__toggle span:nth-child(3) {
  transform: translateY(-6.6px) rotate(-45deg);
}

/* --- 抽屉 --- */
.drawer {
  display: none;
}

@media (max-width: 860px) {
  .nav__links {
    display: none;
  }
  .nav__toggle {
    display: flex;
  }
  .nav--open {
    background: var(--paper);
  }
  .drawer {
    display: flex;
    flex-direction: column;
    padding: 8px var(--gutter) 28px;
    background: var(--paper);
    border-bottom: 1px solid var(--line);
  }
  .drawer a {
    display: flex;
    align-items: baseline;
    gap: 14px;
    padding: 15px 4px;
    border-bottom: 1px solid var(--line-soft);
    font-family: var(--font-serif);
    font-size: 1.15rem;
  }
  .drawer__idx {
    font-family: var(--font-sans);
    font-size: 0.68rem;
    letter-spacing: 0.2em;
    color: var(--cinnabar);
  }
}

.drawer-enter-active {
  transition: opacity 0.35s var(--ease), transform 0.4s var(--ease);
}
.drawer-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
