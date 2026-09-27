<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { gallery } from '../data/site.js'

/* 只有「已放图」的照片才参与灯箱浏览，留空的占位格不参与 */
const filled = computed(() => gallery.filter((g) => g.src))

/* gallery 下标 -> filled 下标 的映射 */
const filledIndexMap = computed(() => {
  const map = {}
  let k = 0
  gallery.forEach((g, i) => {
    if (g.src) map[i] = k++
  })
  return map
})

const current = ref(-1)
const isOpen = computed(() => current.value >= 0)

const open = (i) => {
  const k = filledIndexMap.value[i]
  if (k === undefined) return
  current.value = k
}
const close = () => {
  current.value = -1
}
const step = (dir) => {
  const n = filled.value.length
  if (!n) return
  current.value = (current.value + dir + n) % n
}

const onKey = (e) => {
  if (!isOpen.value) return
  if (e.key === 'Escape') close()
  else if (e.key === 'ArrowRight') step(1)
  else if (e.key === 'ArrowLeft') step(-1)
}

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))

/* 让照片墙错落有致：6 张刚好铺满三栏，不留空洞 */
const sizeClass = (i) => {
  const map = ['card--wide', '', 'card--tall', 'card--wide', '', '']
  return map[i % map.length]
}
</script>

<template>
  <section id="gallery" class="section gallery">
    <div class="wrap">
      <header class="sec-head" v-reveal>
        <span class="index">02 / 风采</span>
        <h2>班级风采</h2>
        <span class="en">Moments</span>
      </header>

      <p class="sec-intro" v-reveal>
        这些照片大多来自同学随手拍的手机相册，没有摆拍，却刚好留下了最好的样子。
        点击任意照片可以放大查看。
      </p>

      <div class="grid">
        <figure
          v-for="(item, i) in gallery"
          :key="i"
          class="card"
          :class="sizeClass(i)"
          v-reveal="(i % 3) * 80"
        >
          <button v-if="item.src" class="card__btn" type="button" @click="open(i)">
            <img :src="item.src" :alt="item.alt" loading="lazy" />
            <span class="card__cap">{{ item.caption }}</span>
            <span class="card__plus" aria-hidden="true">＋</span>
          </button>

          <!-- 照片未到位：显示占位框，并标注这里将来放哪张 -->
          <div v-else class="ph card__ph">
            <span class="ph__hint">待补充照片<em>{{ item.caption }}</em></span>
          </div>
        </figure>
      </div>
    </div>

    <!-- 轻量灯箱 -->
    <transition name="lb">
      <div
        v-if="isOpen"
        class="lb"
        role="dialog"
        aria-modal="true"
        :aria-label="`照片查看器：${filled[current].caption}`"
        @click.self="close"
      >
        <button class="lb__close" type="button" aria-label="关闭" @click="close">×</button>

        <button
          class="lb__nav lb__nav--prev"
          type="button"
          aria-label="上一张"
          @click="step(-1)"
        >
          ‹
        </button>

        <figure class="lb__stage">
          <img :src="filled[current].src" :alt="filled[current].alt" />
          <figcaption>
            <span class="lb__idx">{{ String(current + 1).padStart(2, '0') }} / {{ String(filled.length).padStart(2, '0') }}</span>
            {{ filled[current].caption }}
          </figcaption>
        </figure>

        <button
          class="lb__nav lb__nav--next"
          type="button"
          aria-label="下一张"
          @click="step(1)"
        >
          ›
        </button>
      </div>
    </transition>
  </section>
</template>

<style scoped>
.gallery {
  background: var(--paper);
}

.sec-intro {
  margin-bottom: 40px;
}

/* ---- 照片墙网格 ---- */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 210px;
  /* dense：照片数量变化时自动回填空位，避免出现大块空洞 */
  grid-auto-flow: dense;
  gap: 14px;
}

.card {
  margin: 0;
  position: relative;
  overflow: hidden;
  border-radius: 3px;
  background: var(--paper-deep);
}

.card--wide {
  grid-column: span 2;
}

.card--tall {
  grid-row: span 2;
}

.card__ph {
  position: absolute;
  inset: 0;
}

.card__btn {
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;
  border: none;
  background: none;
  cursor: zoom-in;
  position: relative;
}

.card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.9s var(--ease), filter 0.6s var(--ease);
  filter: saturate(0.92) contrast(1.02);
}

.card:hover img {
  transform: scale(1.06);
  filter: saturate(1.05) contrast(1.04);
}

/* 说明条：hover 从底部升起 */
.card__cap {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 34px 18px 16px;
  text-align: left;
  font-family: var(--font-serif);
  font-size: 0.95rem;
  letter-spacing: 0.06em;
  color: #fff;
  background: linear-gradient(180deg, transparent, rgba(18, 15, 12, 0.82));
  transform: translateY(102%);
  transition: transform 0.55s var(--ease);
}

.card:hover .card__cap,
.card__btn:focus-visible .card__cap {
  transform: translateY(0);
}

.card__plus {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: rgba(247, 244, 237, 0.9);
  color: var(--ink);
  font-size: 0.9rem;
  opacity: 0;
  transform: scale(0.7);
  transition: opacity 0.4s var(--ease), transform 0.4s var(--ease);
}

.card:hover .card__plus,
.card__btn:focus-visible .card__plus {
  opacity: 1;
  transform: scale(1);
}

/* ---- 灯箱 ---- */
.lb {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  grid-template-columns: 64px 1fr 64px;
  align-items: center;
  gap: 8px;
  padding: clamp(16px, 5vh, 60px) clamp(8px, 3vw, 40px);
  background: rgba(16, 13, 11, 0.94);
  backdrop-filter: blur(3px);
}

.lb__stage {
  margin: 0;
  text-align: center;
  max-height: 88vh;
}

.lb__stage img {
  max-width: 100%;
  max-height: 78vh;
  width: auto;
  margin: 0 auto;
  border-radius: 3px;
  box-shadow: 0 30px 80px -30px rgba(0, 0, 0, 0.8);
}

.lb__stage figcaption {
  margin-top: 18px;
  font-family: var(--font-serif);
  font-size: 1rem;
  letter-spacing: 0.1em;
  color: rgba(247, 244, 237, 0.9);
}

.lb__idx {
  display: inline-block;
  margin-right: 14px;
  font-family: var(--font-sans);
  font-size: 0.7rem;
  letter-spacing: 0.24em;
  color: var(--cinnabar-on-dark);
}

.lb__close {
  position: absolute;
  top: 18px;
  right: 22px;
  width: 44px;
  height: 44px;
  border: 1px solid rgba(247, 244, 237, 0.28);
  border-radius: 50%;
  background: none;
  color: var(--paper);
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  transition: background 0.3s var(--ease), border-color 0.3s var(--ease);
}

.lb__close:hover {
  background: var(--cinnabar);
  border-color: var(--cinnabar);
}

.lb__nav {
  width: 54px;
  height: 54px;
  border: 1px solid rgba(247, 244, 237, 0.24);
  border-radius: 50%;
  background: none;
  color: var(--paper);
  font-size: 1.9rem;
  line-height: 1;
  cursor: pointer;
  justify-self: center;
  transition: background 0.3s var(--ease), border-color 0.3s var(--ease),
    transform 0.3s var(--ease);
}

.lb__nav:hover {
  background: rgba(178, 58, 46, 0.9);
  border-color: transparent;
}

.lb__nav--prev:hover {
  transform: translateX(-3px);
}
.lb__nav--next:hover {
  transform: translateX(3px);
}

.lb-enter-active,
.lb-leave-active {
  transition: opacity 0.35s var(--ease);
}
.lb-enter-from,
.lb-leave-to {
  opacity: 0;
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 190px;
  }
  .card--wide {
    grid-column: span 2;
  }
  .card--tall {
    grid-row: span 1;
  }
  .lb {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
  }
  .lb__nav {
    position: absolute;
    bottom: 24px;
  }
  .lb__nav--prev {
    left: 24px;
  }
  .lb__nav--next {
    right: 24px;
  }
  .lb__stage img {
    max-height: 66vh;
  }
}

@media (max-width: 560px) {
  .grid {
    grid-template-columns: 1fr;
    grid-auto-rows: 230px;
  }
  .card--wide {
    grid-column: span 1;
  }
}
</style>
