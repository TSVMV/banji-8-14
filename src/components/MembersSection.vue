<script setup>
import { members } from '../data/site.js'
</script>

<template>
  <section id="members" class="section members">
    <div class="wrap">
      <header class="sec-head" v-reveal>
        <span class="index">08 / 班委</span>
        <h2>班委成员</h2>
        <span class="en">Committee</span>
      </header>

      <p class="sec-intro" v-reveal>
        一个班能转起来，从来不是靠一个人。下面是这一届班委和各科课代表。
      </p>

      <ul class="roster">
        <li
          v-for="(m, i) in members"
          :key="m.role"
          class="roster__item"
          v-reveal="(i % 4) * 60"
        >
          <span class="roster__role">{{ m.role }}</span>
          <p class="roster__names">
            <span v-for="(n, j) in m.names" :key="n" class="roster__name"
              >{{ n }}<i v-if="j < m.names.length - 1" class="roster__dot" aria-hidden="true">·</i></span
            >
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.members {
  background: var(--paper);
}

.sec-intro {
  margin-bottom: clamp(28px, 4vw, 44px);
}

.roster {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(238px, 1fr));
  gap: 1px;
  background: var(--line-soft);
  border: 1px solid var(--line-soft);
}

.roster__item {
  position: relative;
  background: var(--paper-card);
  padding: 20px 22px 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: background 0.45s var(--ease);
}

/* 悬停时左上浮起一道朱砂短线 */
.roster__item::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 2px;
  height: 0;
  background: var(--cinnabar);
  transition: height 0.55s var(--ease);
}

.roster__item:hover {
  background: var(--paper);
}

.roster__item:hover::before {
  height: 100%;
}

.roster__role {
  font-size: 0.7rem;
  letter-spacing: 0.24em;
  color: var(--cinnabar);
}

.roster__names {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 4px 0;
  font-family: var(--font-serif);
  font-size: 1.02rem;
  letter-spacing: 0.06em;
  line-height: 1.7;
}

.roster__name {
  white-space: nowrap;
}

.roster__dot {
  margin: 0 8px;
  font-style: normal;
  color: var(--line);
}
</style>