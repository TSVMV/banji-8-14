<script setup>
import { studyMethods, bookList } from '../data/site.js'
</script>

<template>
  <section id="study" class="section study">
    <div class="wrap">
      <header class="sec-head" v-reveal>
        <span class="index">07 / 学苑</span>
        <h2>学习园地</h2>
        <span class="en">Study Corner</span>
      </header>

      <p class="sec-intro" v-reveal>
        这些方法不新鲜，但是真的有用。挑一条今天就能试的，先做三天。
      </p>

      <!-- 学科方法 -->
      <ul class="methods">
        <li
          v-for="(m, i) in studyMethods"
          :key="m.subject"
          class="methods__item"
          v-reveal="(i % 3) * 70"
        >
          <span class="methods__subject">{{ m.subject }}</span>
          <p class="methods__tip">{{ m.tip }}</p>
        </li>
      </ul>

      <!-- 推荐书单 -->
      <div class="books" v-reveal>
        <div class="books__head">
          <h3>教室图书角 · 推荐书单</h3>
          <span class="books__note">借阅请找生活委员登记</span>
        </div>

        <ul class="books__list">
          <li v-for="b in bookList" :key="b.title" class="books__row">
            <span class="books__tag">{{ b.tag }}</span>
            <b class="books__title">{{ b.title }}</b>
            <span class="books__desc">{{ b.note }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.study {
  background: var(--paper-deep);
}

.sec-intro {
  margin-bottom: clamp(32px, 4.5vw, 52px);
}

/* ---- 学科方法 ---- */
.methods {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--line-soft);
  border: 1px solid var(--line-soft);
}

.methods__item {
  background: var(--paper-card);
  padding: 26px 26px 28px;
  display: flex;
  flex-direction: column;
  gap: 13px;
  position: relative;
  transition: background 0.45s var(--ease);
}

.methods__item::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 2px;
  background: var(--cinnabar);
  transition: width 0.6s var(--ease);
}

.methods__item:hover {
  background: var(--paper);
}

.methods__item:hover::before {
  width: 100%;
}

.methods__subject {
  font-family: var(--font-serif);
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.14em;
}

.methods__tip {
  margin: 0;
  font-size: 0.95rem;
  line-height: 2;
  color: var(--ink-soft);
}

/* ---- 书单 ---- */
.books {
  margin-top: clamp(48px, 7vw, 80px);
}

.books__head {
  display: flex;
  align-items: baseline;
  gap: 20px;
  flex-wrap: wrap;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--line);
}

.books__head h3 {
  font-family: var(--font-serif);
  font-size: clamp(1.02rem, 1.9vw, 1.24rem);
  letter-spacing: 0.06em;
}

.books__note {
  margin-left: auto;
  font-size: 0.76rem;
  letter-spacing: 0.2em;
  color: var(--ink-mute);
}

.books__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: clamp(30px, 6vw, 84px);
}

.books__row {
  display: flex;
  align-items: baseline;
  gap: 14px;
  padding: 17px 2px;
  border-bottom: 1px solid var(--line-soft);
  transition: padding-left 0.45s var(--ease);
}

.books__row:hover {
  padding-left: 12px;
}

.books__tag {
  flex: none;
  min-width: 3.2em;
  text-align: center;
  padding: 2px 7px;
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  color: var(--cinnabar);
  border: 1px solid var(--cinnabar-wash);
  background: var(--cinnabar-wash);
  border-radius: 2px;
}

.books__title {
  font-family: var(--font-serif);
  font-size: 1.04rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  white-space: nowrap;
}

.books__desc {
  margin-left: auto;
  font-size: 0.83rem;
  color: var(--ink-mute);
  text-align: right;
}

@media (max-width: 900px) {
  .methods {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .methods {
    grid-template-columns: 1fr;
  }
  .books__list {
    grid-template-columns: 1fr;
  }
  .books__desc {
    margin-left: 0;
    flex-basis: 100%;
    text-align: left;
  }
  .books__row {
    flex-wrap: wrap;
  }
}
</style>