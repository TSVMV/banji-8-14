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

      <ol class="roster">
        <li
          v-for="(m, i) in members"
          :key="`${m.name}-${m.role}`"
          class="roster__item"
          v-reveal="(i % 4) * 70"
        >
          <span class="roster__idx" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="roster__name">{{ m.name }}</span>
          <span class="roster__role">{{ m.role }}</span>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.members {
  background: var(--paper);
}

.sec-intro {
  margin-bottom: clamp(30px, 4vw, 48px);
}

/* 名单：编辑式的双栏/多栏列表，靠发丝线分隔，不用卡片 */
.roster {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(272px, 1fr));
  column-gap: clamp(26px, 4vw, 60px);
  border-top: 1px solid var(--line);
}

.roster__item {
  position: relative;
  display: flex;
  align-items: baseline;
  gap: 14px;
  padding: 19px 2px;
  border-bottom: 1px solid var(--line-soft);
  transition: padding-left 0.5s var(--ease);
}

/* 悬停时左侧浮起一道朱砂短线 */
.roster__item::before {
  content: "";
  position: absolute;
  left: 0;
  top: 6px;
  bottom: 6px;
  width: 2px;
  background: var(--cinnabar);
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 0.5s var(--ease);
}

.roster__item:hover {
  padding-left: 16px;
}

.roster__item:hover::before {
  transform: scaleY(1);
}

.roster__idx {
  flex: none;
  font-size: 0.66rem;
  letter-spacing: 0.2em;
  color: var(--cinnabar);
  opacity: 0.75;
}

.roster__name {
  font-family: var(--font-serif);
  font-size: 1.14rem;
  letter-spacing: 0.08em;
  transition: color 0.4s var(--ease);
}

.roster__item:hover .roster__name {
  color: var(--cinnabar-deep);
}

.roster__role {
  margin-left: auto;
  font-size: 0.78rem;
  letter-spacing: 0.16em;
  color: var(--ink-mute);
  white-space: nowrap;
}
</style>
