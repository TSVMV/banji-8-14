<script setup>
import { voices } from '../data/site.js'
</script>

<template>
  <section id="voices" class="section voices">
    <div class="wrap">
      <header class="sec-head" v-reveal>
        <span class="index">09 / 寄语</span>
        <h2>同窗寄语</h2>
        <span class="en">Voices</span>
      </header>

      <p class="sec-intro" v-reveal>
        每人写一句话，长短不限。这些字都是他们自己敲的，没有改过。
      </p>

      <ul class="wall">
        <li
          v-for="(v, i) in voices"
          :key="v.name"
          class="voice"
          v-reveal="(i % 4) * 60"
        >
          <p class="voice__text">{{ v.text }}</p>
          <span class="voice__name">{{ v.name }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.voices {
  position: relative;
  background: var(--paper);
}

/* 淡朱砂晕染，与相邻区块拉开层次 */
.voices::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 12% 8%, rgba(178, 58, 46, 0.05), transparent 38%),
    radial-gradient(circle at 88% 92%, rgba(168, 132, 63, 0.06), transparent 40%);
}

.voices .wrap {
  position: relative;
}

.sec-intro {
  margin-bottom: clamp(30px, 4.5vw, 50px);
}

.wall {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.voice {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 22px;
  min-height: 168px;
  padding: 26px 24px 22px;
  background: var(--paper-card);
  border: 1px solid var(--line-soft);
  transition: transform 0.5s var(--ease), box-shadow 0.5s var(--ease),
    border-color 0.5s var(--ease);
}

.voice:hover {
  transform: translateY(-4px);
  border-color: rgba(178, 58, 46, 0.28);
  box-shadow: var(--shadow-soft);
}

/* 左上朱砂引号 */
.voice::before {
  content: "\201C";
  position: absolute;
  left: 16px;
  top: 4px;
  font-family: var(--font-serif);
  font-size: 3rem;
  line-height: 1;
  color: var(--cinnabar);
  opacity: 0.18;
  pointer-events: none;
}

.voice__text {
  position: relative;
  margin: 0;
  padding-top: 12px;
  font-size: 0.96rem;
  line-height: 2.05;
  color: var(--ink-soft);
}

.voice__name {
  align-self: flex-end;
  font-family: var(--font-serif);
  font-size: 0.86rem;
  letter-spacing: 0.16em;
  color: var(--ink-mute);
}

.voice__name::before {
  content: "—— ";
  color: var(--cinnabar);
}

@media (max-width: 900px) {
  .wall {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .wall {
    grid-template-columns: 1fr;
  }
  .voice {
    min-height: 0;
  }
}
</style>