<script setup>
import { timeline, timelineImage } from '../data/site.js'
</script>

<template>
  <section id="timeline" class="section timeline">
    <div class="wrap">
      <header class="sec-head" v-reveal>
        <span class="index">04 / 纪事</span>
        <h2>班级大事记</h2>
        <span class="en">Chronicle</span>
      </header>

      <div class="tl__top">
        <p class="tl__lead" v-reveal>
          三年不长，但足够把一些普通的下午，变成日后反复想起的日子。
        </p>
        <figure class="tl__deco" v-reveal="120">
          <img
            v-if="timelineImage"
            :src="timelineImage"
            alt="教学楼走廊里的荣誉墙与奖状"
            loading="lazy"
          />
          <div v-else class="ph tl__ph">
            <span class="ph__hint">待补充照片<em>班级活动留影</em></span>
          </div>
        </figure>
      </div>

      <ol class="tl">
        <li
          v-for="(item, i) in timeline"
          :key="i"
          class="tl__row"
          :class="{ 'tl__row--right': i % 2 === 1 }"
          v-reveal
        >
          <div class="tl__node" aria-hidden="true"></div>

          <article class="tl__card">
            <p class="tl__date">{{ item.date }}</p>
            <h3 class="tl__title">{{ item.title }}</h3>
            <p class="tl__text">{{ item.text }}</p>
          </article>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.timeline {
  background: linear-gradient(180deg, var(--paper-deep) 0%, var(--paper) 100%);
}

.tl__top {
  display: grid;
  grid-template-columns: 1fr minmax(240px, 420px);
  gap: clamp(28px, 5vw, 64px);
  align-items: center;
  margin-bottom: clamp(48px, 8vw, 88px);
}

.tl__lead {
  font-family: var(--font-serif);
  font-size: clamp(1.02rem, 1.9vw, 1.26rem);
  line-height: 1.9;
  color: var(--ink);
  max-width: 24ch;
}

.tl__deco {
  margin: 0;
  position: relative;
  border-radius: 3px;
  overflow: hidden;
}

.tl__deco img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  filter: saturate(0.9);
  transition: transform 1s var(--ease);
}

/* 装饰图占位框与照片保持同比例 */
.tl__ph {
  aspect-ratio: 4 / 3;
}

.tl__deco:hover img {
  transform: scale(1.04);
}

/* 装饰图外描边，像裱起来的照片 */
.tl__deco::after {
  content: "";
  position: absolute;
  inset: 10px;
  border: 1px solid rgba(247, 244, 237, 0.55);
  pointer-events: none;
}

/* ---- 时间线 ---- */
.tl {
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;
}

/* 中轴细线 */
.tl::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 1px;
  background: var(--line);
  transform: translateX(-50%);
}

.tl__row {
  position: relative;
  width: 50%;
  padding-right: 46px;
  margin-bottom: clamp(34px, 5vw, 58px);
  text-align: right;
}

.tl__row--right {
  margin-left: 50%;
  padding-right: 0;
  padding-left: 46px;
  text-align: left;
}

/* 节点 */
.tl__node {
  position: absolute;
  top: 8px;
  right: -6px;
  width: 11px;
  height: 11px;
  background: var(--paper);
  border: 2px solid var(--cinnabar);
  transform: rotate(45deg);
  transition: background 0.4s var(--ease), transform 0.4s var(--ease);
}

.tl__row--right .tl__node {
  right: auto;
  left: -6px;
}

.tl__row:hover .tl__node {
  background: var(--cinnabar);
  transform: rotate(45deg) scale(1.25);
}

.tl__card {
  display: inline-block;
  text-align: inherit;
}

.tl__date {
  font-family: var(--font-sans);
  font-size: 0.72rem;
  letter-spacing: 0.3em;
  color: var(--cinnabar);
  margin-bottom: 8px;
}

.tl__title {
  font-size: clamp(1.04rem, 1.9vw, 1.26rem);
  margin-bottom: 10px;
}

.tl__text {
  color: var(--ink-soft);
  font-size: 0.96rem;
  line-height: 1.95;
  max-width: 40ch;
}

.tl__row--right .tl__card {
  margin-left: 0;
}

/* ---- 移动端：单轨靠左 ---- */
@media (max-width: 760px) {
  .tl__top {
    grid-template-columns: 1fr;
  }
  .tl::before {
    left: 8px;
    transform: none;
  }
  .tl__row,
  .tl__row--right {
    width: 100%;
    margin-left: 0;
    padding-left: 36px;
    padding-right: 0;
    text-align: left;
  }
  .tl__node,
  .tl__row--right .tl__node {
    left: 3px;
    right: auto;
  }
  .tl__text {
    max-width: none;
  }
}
</style>
