<script setup>
import { computed } from 'vue'
import { classInfo } from '../data/site.js'

// 首屏照片墙：3 行，每行 6 张，左右缓慢错向漂移
const ROWS = 3
const PER_ROW = 6

const wallRows = computed(() => {
  const src = classInfo.heroWall
  const rows = []
  for (let r = 0; r < ROWS; r++) {
    const items = []
    for (let i = 0; i < PER_ROW; i++) {
      // 错开取图，避免每行重复
      items.push(src[(r * 2 + i) % src.length])
    }
    // 复制一份，配合 translateX(-50%) 实现无缝循环
    rows.push([...items, ...items])
  }
  return rows
})
</script>

<template>
  <section id="hero" class="hero">
    <!-- 照片墙背景 -->
    <div class="wall" aria-hidden="true">
      <div
        v-for="(row, r) in wallRows"
        :key="r"
        class="wall__row"
        :class="r % 2 === 1 ? 'wall__row--rev' : ''"
        :style="{ '--dur': `${64 + r * 10}s` }"
      >
        <img
          v-for="(src, i) in row"
          :key="i"
          :src="src"
          alt=""
          :loading="r === 0 ? 'eager' : 'lazy'"
          decoding="async"
        />
      </div>
    </div>

    <div class="hero__veil" aria-hidden="true"></div>

    <div class="hero__inner">
      <img class="hero__logo" :src="classInfo.logo" :alt="`${classInfo.name}班徽`" />

      <p class="hero__eyebrow">{{ classInfo.eyebrow }}</p>

      <h1 class="hero__title">
        <span>{{ classInfo.name }}</span>
      </h1>

      <p class="hero__slogan">{{ classInfo.slogan }}</p>

      <div class="hero__meta">
        <span class="hero__rule" aria-hidden="true"></span>
        <p class="hero__motto">{{ classInfo.motto }}</p>
      </div>
    </div>

    <!-- 朱砂印章 -->
    <div class="hero__seal seal" aria-hidden="true">{{ classInfo.seal }}</div>

    <!-- 下滑提示 -->
    <a class="hero__scroll" href="#about" aria-label="向下浏览班级简介">
      <span>向下浏览</span>
      <i aria-hidden="true"></i>
    </a>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  padding: 108px var(--gutter) 88px;
  overflow: hidden;
  color: var(--paper);
  background: #14110e;
  z-index: 1;
}

/* ---------- 照片墙 ---------- */
.wall {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: -2;
}

.wall__row {
  flex: 1;
  display: flex;
  gap: 8px;
  width: max-content;
  animation: wallSlide var(--dur) linear infinite;
}

.wall__row--rev {
  animation-direction: reverse;
}

.wall__row img {
  width: clamp(180px, 20vw, 300px);
  height: 100%;
  object-fit: cover;
  flex: none;
  filter: saturate(0.82) contrast(1.02);
}

@keyframes wallSlide {
  to {
    transform: translateX(-50%);
  }
}

/* 墨色渐隐遮罩，保证文字可读 */
.hero__veil {
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(ellipse 76% 68% at 26% 48%, rgba(16, 13, 11, 0.9), rgba(16, 13, 11, 0.42) 68%),
    linear-gradient(180deg, rgba(16, 13, 11, 0.78) 0%, rgba(16, 13, 11, 0.3) 40%, rgba(16, 13, 11, 0.86) 100%);
}

/* ---------- 文字 ---------- */
.hero__inner {
  max-width: var(--maxw);
  width: 100%;
  margin: 0 auto;
  position: relative;
}

.hero__logo {
  width: clamp(58px, 6.4vw, 82px);
  height: auto;
  margin-bottom: 20px;
  opacity: 0;
  animation: rise 0.9s var(--ease) 0.1s forwards;
  filter: drop-shadow(0 6px 22px rgba(0, 0, 0, 0.5));
}

.hero__eyebrow {
  font-size: 0.7rem;
  letter-spacing: 0.36em;
  color: rgba(247, 244, 237, 0.76);
  margin-bottom: 16px;
  opacity: 0;
  animation: rise 0.9s var(--ease) 0.18s forwards;
}

.hero__title {
  font-size: clamp(2.3rem, 6.4vw, 4.6rem);
  line-height: 1.06;
  letter-spacing: 0.04em;
  font-weight: 700;
  color: var(--paper);
  text-shadow: 0 2px 40px rgba(0, 0, 0, 0.4);
  opacity: 0;
  animation: rise 1s var(--ease) 0.3s forwards;
}

.hero__title span {
  position: relative;
  display: inline-block;
}

/* 标题下一道朱砂墨线 */
.hero__title span::after {
  content: "";
  position: absolute;
  left: 3%;
  right: 5%;
  bottom: -0.14em;
  height: 3px;
  background: var(--cinnabar);
  transform: scaleX(0);
  transform-origin: left;
  animation: lineGrow 1.1s var(--ease) 0.9s forwards;
}

@keyframes lineGrow {
  to {
    transform: scaleX(1);
  }
}

.hero__slogan {
  margin-top: 24px;
  font-family: var(--font-serif);
  font-size: clamp(0.92rem, 1.7vw, 1.16rem);
  letter-spacing: 0.14em;
  color: rgba(247, 244, 237, 0.92);
  opacity: 0;
  animation: rise 0.9s var(--ease) 0.5s forwards;
}

.hero__meta {
  margin-top: 26px;
  display: flex;
  align-items: center;
  gap: 16px;
  opacity: 0;
  animation: rise 0.9s var(--ease) 0.68s forwards;
}

.hero__rule {
  width: 46px;
  height: 1px;
  background: rgba(247, 244, 237, 0.5);
}

.hero__motto {
  font-size: 0.74rem;
  letter-spacing: 0.26em;
  color: rgba(247, 244, 237, 0.72);
}

.hero__seal {
  position: absolute;
  right: clamp(16px, 3.5vw, 52px);
  bottom: clamp(26px, 6vh, 76px);
  border-color: var(--cinnabar);
  color: #f4e3df;
  opacity: 0;
  animation: fadeIn 1s var(--ease) 1.25s forwards;
}

/* 下滑提示 */
.hero__scroll {
  position: absolute;
  left: var(--gutter);
  bottom: 22px;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: 0.64rem;
  letter-spacing: 0.28em;
  color: rgba(247, 244, 237, 0.68);
  opacity: 0;
  animation: fadeIn 1s var(--ease) 1.35s forwards;
}

.hero__scroll i {
  width: 1px;
  height: 36px;
  background: linear-gradient(180deg, rgba(247, 244, 237, 0.7), transparent);
  position: relative;
  overflow: hidden;
}

.hero__scroll i::after {
  content: "";
  position: absolute;
  left: 0;
  top: -36px;
  width: 1px;
  height: 36px;
  background: var(--cinnabar);
  animation: scrollDot 2.2s var(--ease) infinite;
}

@keyframes scrollDot {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(72px);
  }
}

@keyframes rise {
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

/* 尊重「减少动态」偏好 */
@media (prefers-reduced-motion: reduce) {
  .wall__row {
    animation: none;
  }
}

@media (max-width: 720px) {
  .hero__seal {
    top: 92px;
    bottom: auto;
  }
  .wall__row img {
    width: 150px;
  }
}
</style>