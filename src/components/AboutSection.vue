<script setup>
import { classInfo } from '../data/site.js'
</script>

<template>
  <section id="about" class="section about">
    <div class="wrap">
      <header class="sec-head" v-reveal>
        <span class="index">01 / 简介</span>
        <h2>我们是谁</h2>
        <span class="en">About the Class</span>
      </header>

      <div class="about__grid">
        <div class="about__aside" v-reveal>
          <img class="about__emblem" :src="classInfo.logo" :alt="`${classInfo.emblem}班徽`" />
          <p class="about__emblem-name">{{ classInfo.emblem }}</p>
          <p class="about__vertical">一群把日子过成故事的人</p>
          <div class="seal" aria-hidden="true">{{ classInfo.seal }}</div>
        </div>

        <div class="about__body">
          <p
            v-for="(para, i) in classInfo.intro"
            :key="i"
            class="about__para"
            :class="{ 'about__para--lead': i === 0 }"
            v-reveal="i * 90"
          >
            {{ para }}
          </p>

          <div class="about__sign" v-reveal="160">
            <span class="about__sign-line" aria-hidden="true"></span>
            <span>{{ classInfo.school }} · {{ classInfo.name }}</span>
          </div>
        </div>
      </div>

      <!-- 数字统计 -->
      <dl class="stats">
        <div
          v-for="(s, i) in classInfo.stats"
          :key="s.label"
          class="stats__item"
          v-reveal="i * 90"
        >
          <dt class="stats__value">{{ s.value }}</dt>
          <dd class="stats__label">{{ s.label }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
.about {
  background: linear-gradient(180deg, var(--paper) 0%, var(--paper-deep) 100%);
}

.about__grid {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: clamp(28px, 6vw, 84px);
  align-items: start;
}

.about__aside {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
  padding-top: 6px;
}

.about__emblem {
  width: clamp(84px, 9vw, 104px);
  height: auto;
}

.about__emblem-name {
  font-family: var(--font-serif);
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: 0.34em;
  text-indent: 0.34em;
  color: var(--ink);
}

.about__vertical {
  writing-mode: vertical-rl;
  font-family: var(--font-serif);
  font-size: 0.92rem;
  letter-spacing: 0.4em;
  color: var(--ink-mute);
}

.about__body {
  max-width: 60ch;
}

.about__para {
  color: var(--ink-soft);
  margin-bottom: 20px;
  font-size: 0.96rem;
  line-height: 1.95;
}

/* 首段首字下沉，杂志感 */
.about__para--lead {
  font-size: 1.02rem;
  color: var(--ink);
}

.about__para--lead::first-letter {
  float: left;
  font-family: var(--font-serif);
  font-size: 2.9rem;
  line-height: 0.86;
  font-weight: 700;
  color: var(--cinnabar);
  margin: 4px 12px 0 0;
}

.about__sign {
  margin-top: 34px;
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 0.8rem;
  letter-spacing: 0.24em;
  color: var(--ink-mute);
}

.about__sign-line {
  width: 44px;
  height: 1px;
  background: var(--cinnabar);
}

/* ---- 统计 ---- */
.stats {
  margin: clamp(52px, 8vw, 92px) 0 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  border-top: 1px solid var(--line);
}

.stats__item {
  padding: 30px 22px 8px;
  border-right: 1px solid var(--line-soft);
}

.stats__item:last-child {
  border-right: none;
}

.stats__value {
  font-family: var(--font-serif);
  font-size: clamp(1.85rem, 3.8vw, 2.6rem);
  font-weight: 700;
  line-height: 1;
  color: var(--ink);
  letter-spacing: 0.02em;
}

.stats__value::after {
  content: "";
  display: block;
  width: 26px;
  height: 3px;
  margin-top: 16px;
  background: var(--cinnabar);
}

.stats__label {
  margin: 0;
  padding-top: 14px;
  font-size: 0.82rem;
  letter-spacing: 0.22em;
  color: var(--ink-mute);
}

@media (max-width: 760px) {
  .about__grid {
    grid-template-columns: 1fr;
  }
  .about__aside {
    flex-direction: row;
    align-items: center;
    gap: 22px;
  }
  .about__vertical {
    writing-mode: horizontal-tb;
    letter-spacing: 0.18em;
  }
  .stats {
    grid-template-columns: repeat(2, 1fr);
  }
  .stats__item:nth-child(2) {
    border-right: none;
  }
  .stats__item:nth-child(1),
  .stats__item:nth-child(2) {
    border-bottom: 1px solid var(--line-soft);
  }
}
</style>
