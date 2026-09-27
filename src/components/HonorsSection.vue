<script setup>
import { honors, honorsImage, classInfo } from '../data/site.js'
</script>

<template>
  <section id="honors" class="section honors">
    <div class="wrap">
      <header class="sec-head" v-reveal>
        <span class="index">06 / 荣誉</span>
        <h2>荣誉墙</h2>
        <span class="en">Honours</span>
      </header>

      <div class="honors__grid">
        <!-- 奖项列表 -->
        <ol class="list">
          <li
            v-for="(h, i) in honors"
            :key="i"
            class="list__row"
            v-reveal="(i % 4) * 70"
          >
            <span class="list__year">{{ h.year }}</span>
            <span class="list__mark" aria-hidden="true"></span>
            <span class="list__main">
              <b class="list__title">{{ h.title }}</b>
              <em class="list__org">{{ h.org }}</em>
            </span>
          </li>
        </ol>

        <!-- 侧栏装饰 -->
        <aside class="side" v-reveal="120">
          <figure class="side__fig">
            <img
              v-if="honorsImage"
              :src="honorsImage"
              alt="木桌上的奖牌与红色奖状绶带"
              loading="lazy"
            />
            <div v-else class="ph side__ph">
              <span class="ph__hint">待补充照片<em>奖状 / 奖牌</em></span>
            </div>
          </figure>
          <p class="side__note">
            这些奖状贴满了教室后墙，也贴满了我们共同的某个下午。
          </p>
          <div class="seal" aria-hidden="true">{{ classInfo.seal }}</div>
        </aside>
      </div>
    </div>
  </section>
</template>

<style scoped>
.honors {
  background: var(--paper);
}

.honors__grid {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: clamp(32px, 6vw, 80px);
  align-items: start;
}

/* ---- 列表 ---- */
.list {
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--line);
}

.list__row {
  display: grid;
  grid-template-columns: 72px 18px 1fr;
  gap: 18px;
  align-items: center;
  padding: 22px 8px;
  border-bottom: 1px solid var(--line-soft);
  transition: background 0.45s var(--ease), padding-left 0.45s var(--ease);
}

.list__row:hover {
  background: var(--cinnabar-wash);
  padding-left: 20px;
}

.list__year {
  font-family: var(--font-serif);
  font-size: 1rem;
  letter-spacing: 0.06em;
  color: var(--cinnabar);
}

.list__mark {
  width: 8px;
  height: 8px;
  background: var(--ink);
  transform: rotate(45deg);
  transition: background 0.4s var(--ease);
}

.list__row:hover .list__mark {
  background: var(--cinnabar);
}

.list__main {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.list__title {
  font-family: var(--font-serif);
  font-size: clamp(1.02rem, 2vw, 1.2rem);
  font-weight: 600;
  letter-spacing: 0.03em;
}

.list__org {
  font-style: normal;
  font-size: 0.78rem;
  letter-spacing: 0.16em;
  color: var(--ink-mute);
}

/* ---- 侧栏 ---- */
.side {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
  position: sticky;
  top: 100px;
}

.side__fig {
  margin: 0;
  width: 100%;
  border-radius: 3px;
  overflow: hidden;
  box-shadow: var(--shadow-soft);
}

.side__fig img {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  filter: saturate(0.92);
  transition: transform 1s var(--ease);
}

/* 装饰图占位框与照片保持同比例 */
.side__ph {
  aspect-ratio: 1 / 1;
}

.side__fig:hover img {
  transform: scale(1.05);
}

.side__note {
  font-size: 0.86rem;
  line-height: 1.9;
  color: var(--ink-soft);
  text-align: center;
}

@media (max-width: 820px) {
  .honors__grid {
    grid-template-columns: 1fr;
  }
  .side {
    position: static;
    max-width: 320px;
    margin: 0 auto;
  }
}
</style>
