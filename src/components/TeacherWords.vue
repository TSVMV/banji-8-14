<script setup>
import { teachers } from '../data/site.js'
</script>

<template>
  <section id="teachers" class="section teachers">
    <div class="wrap">
      <header class="sec-head" v-reveal>
        <span class="index">02 / 师者</span>
        <h2>师者寄语</h2>
        <span class="en">Words from Teachers</span>
      </header>

      <p class="sec-intro" v-reveal>
        站在讲台上的他们，看我们的时间比看自己家孩子还长。这些话，是他们想对我们说的。
      </p>

      <!-- 班主任：单独放大 -->
      <figure class="head" v-reveal="70">
        <div class="head__side">
          <span class="head__role">{{ teachers.head.role }}</span>
          <span class="head__line" aria-hidden="true"></span>
          <span class="head__who">{{ teachers.head.subject }}<br />{{ teachers.head.name }}</span>
        </div>
        <blockquote class="head__word">{{ teachers.head.word }}</blockquote>
      </figure>

      <!-- 任课老师 -->
      <ul class="tlist">
        <li
          v-for="(t, i) in teachers.list"
          :key="t.subject"
          class="tlist__item"
          v-reveal="(i % 3) * 70"
        >
          <div class="tlist__top">
            <span class="tlist__subject">{{ t.subject }}</span>
            <span class="tlist__name">{{ t.name }}</span>
          </div>
          <p class="tlist__word">{{ t.word }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.teachers {
  background: linear-gradient(180deg, var(--paper) 0%, var(--paper-deep) 100%);
}

.sec-intro {
  margin-bottom: clamp(34px, 5vw, 54px);
}

/* ---- 班主任 ---- */
.head {
  margin: 0 0 clamp(44px, 7vw, 76px);
  display: grid;
  grid-template-columns: 132px 1fr;
  gap: clamp(24px, 4vw, 52px);
  align-items: stretch;
  padding-bottom: clamp(34px, 5vw, 52px);
  border-bottom: 1px solid var(--line);
}

.head__side {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  padding-left: 18px;
  border-left: 2px solid var(--cinnabar);
}

.head__role {
  font-size: 0.72rem;
  letter-spacing: 0.3em;
  color: var(--cinnabar);
}

.head__line {
  width: 34px;
  height: 1px;
  background: var(--line);
}

.head__who {
  font-family: var(--font-serif);
  font-size: 1.05rem;
  line-height: 1.95;
  letter-spacing: 0.12em;
  color: var(--ink);
}

.head__word {
  margin: 0;
  font-family: var(--font-serif);
  font-size: clamp(1.05rem, 2.5vw, 1.5rem);
  line-height: 2.1;
  letter-spacing: 0.03em;
  color: var(--ink);
  text-indent: 2em;
  position: relative;
}

/* 引号装饰 */
.head__word::before {
  content: "\201C";
  position: absolute;
  left: -0.5em;
  top: -0.35em;
  font-family: var(--font-serif);
  font-size: 4.6rem;
  line-height: 1;
  color: var(--cinnabar);
  opacity: 0.16;
  pointer-events: none;
}

/* ---- 任课老师 ---- */
.tlist {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--line-soft);
  border: 1px solid var(--line-soft);
}

.tlist__item {
  background: var(--paper-card);
  padding: 24px 24px 26px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: background 0.45s var(--ease);
}

.tlist__item:hover {
  background: var(--paper);
}

.tlist__top {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.tlist__subject {
  font-family: var(--font-serif);
  font-size: 1.08rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: var(--cinnabar);
}

.tlist__name {
  font-size: 0.76rem;
  letter-spacing: 0.18em;
  color: var(--ink-mute);
}

.tlist__word {
  margin: 0;
  font-size: 0.95rem;
  line-height: 2;
  color: var(--ink-soft);
}

@media (max-width: 900px) {
  .tlist {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .head {
    grid-template-columns: 1fr;
    gap: 22px;
  }
  .head__side {
    flex-direction: row;
    align-items: center;
    gap: 16px;
    padding-left: 14px;
  }
  .head__line {
    display: none;
  }
  .head__who br {
    display: none;
  }
  .tlist {
    grid-template-columns: 1fr;
  }
}
</style>