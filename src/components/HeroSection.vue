<script setup>
import { classInfo } from '../data/site.js'
</script>

<template>
  <section id="hero" class="hero">
    <!-- 背景大图；未放图时用墨色宣纸底纹兜底 -->
    <div
      v-if="classInfo.heroImage"
      class="hero__bg"
      role="img"
      :aria-label="`${classInfo.school} 校园照片`"
    >
      <img :src="classInfo.heroImage" alt="" aria-hidden="true" loading="eager" />
    </div>
    <div v-else class="hero__bg hero__bg--plain" aria-hidden="true"></div>
    <div class="hero__veil" aria-hidden="true"></div>

    <div class="hero__inner">
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

    <!-- 右侧竖排班训 -->
    <p class="hero__vertical" aria-hidden="true">笃学 · 明辨 · 同心 · 致远</p>

    <!-- 朱砂印章 -->
    <div class="hero__seal seal" aria-hidden="true">
      {{ classInfo.seal }}
    </div>

    <!-- 下滑提示 -->
    <a
      class="hero__scroll"
      href="#about"
      aria-label="向下浏览班级简介"
    >
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
  padding: 120px var(--gutter) 96px;
  overflow: hidden;
  color: var(--paper);
  z-index: 1;
}

.hero__bg {
  position: absolute;
  inset: 0;
  z-index: -2;
}

.hero__bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 42%;
  animation: heroZoom 16s var(--ease) forwards;
}

/* 未放首屏照片时的兜底底纹：墨色宣纸 + 两团晕染 */
.hero__bg--plain {
  background:
    radial-gradient(ellipse 68% 54% at 20% 26%, rgba(168, 132, 63, 0.3), transparent 62%),
    radial-gradient(ellipse 58% 48% at 84% 74%, rgba(178, 58, 46, 0.22), transparent 60%),
    linear-gradient(158deg, #262219 0%, #14110e 52%, #1e1a16 100%);
}

.hero__bg--plain::after {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.75;
  background-image:
    repeating-linear-gradient(0deg, rgba(247, 244, 237, 0.035) 0 1px, transparent 1px 4px),
    repeating-linear-gradient(90deg, rgba(247, 244, 237, 0.022) 0 1px, transparent 1px 5px);
}

@keyframes heroZoom {
  from {
    transform: scale(1.09);
  }
  to {
    transform: scale(1);
  }
}

/* 墨色渐隐遮罩，保证文字可读 */
.hero__veil {
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(180deg, rgba(20, 17, 14, 0.62) 0%, rgba(20, 17, 14, 0.28) 42%, rgba(20, 17, 14, 0.82) 100%),
    linear-gradient(90deg, rgba(20, 17, 14, 0.72) 0%, rgba(20, 17, 14, 0.12) 68%);
}

.hero__inner {
  max-width: var(--maxw);
  width: 100%;
  margin: 0 auto;
  position: relative;
}

.hero__eyebrow {
  font-size: 0.78rem;
  letter-spacing: 0.42em;
  text-transform: uppercase;
  color: rgba(247, 244, 237, 0.78);
  margin-bottom: 22px;
  opacity: 0;
  animation: rise 0.9s var(--ease) 0.15s forwards;
}

.hero__title {
  font-size: clamp(3.4rem, 11vw, 8.6rem);
  line-height: 1;
  letter-spacing: 0.04em;
  font-weight: 700;
  color: var(--paper);
  text-shadow: 0 2px 40px rgba(0, 0, 0, 0.35);
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
  left: 4%;
  right: 6%;
  bottom: -0.12em;
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
  margin-top: 30px;
  font-family: var(--font-serif);
  font-size: clamp(1.05rem, 2.2vw, 1.5rem);
  letter-spacing: 0.16em;
  color: rgba(247, 244, 237, 0.94);
  opacity: 0;
  animation: rise 0.9s var(--ease) 0.5s forwards;
}

.hero__meta {
  margin-top: 34px;
  display: flex;
  align-items: center;
  gap: 18px;
  opacity: 0;
  animation: rise 0.9s var(--ease) 0.68s forwards;
}

.hero__rule {
  width: 54px;
  height: 1px;
  background: rgba(247, 244, 237, 0.5);
}

.hero__motto {
  font-size: 0.82rem;
  letter-spacing: 0.32em;
  color: rgba(247, 244, 237, 0.72);
}

/* 竖排班训 */
.hero__vertical {
  position: absolute;
  top: 50%;
  right: clamp(14px, 3vw, 40px);
  transform: translateY(-50%);
  writing-mode: vertical-rl;
  font-family: var(--font-serif);
  font-size: 0.9rem;
  letter-spacing: 0.5em;
  color: rgba(247, 244, 237, 0.6);
  opacity: 0;
  animation: fadeIn 1.2s var(--ease) 1.1s forwards;
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
  bottom: 26px;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: 0.68rem;
  letter-spacing: 0.3em;
  color: rgba(247, 244, 237, 0.7);
  opacity: 0;
  animation: fadeIn 1s var(--ease) 1.35s forwards;
}

.hero__scroll i {
  width: 1px;
  height: 40px;
  background: linear-gradient(180deg, rgba(247, 244, 237, 0.7), transparent);
  position: relative;
  overflow: hidden;
}

.hero__scroll i::after {
  content: "";
  position: absolute;
  left: 0;
  top: -40px;
  width: 1px;
  height: 40px;
  background: var(--cinnabar);
  animation: scrollDot 2.2s var(--ease) infinite;
}

@keyframes scrollDot {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(80px);
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

@media (max-width: 720px) {
  .hero__vertical {
    display: none;
  }
  .hero__seal {
    top: 96px;
    bottom: auto;
  }
}
</style>
