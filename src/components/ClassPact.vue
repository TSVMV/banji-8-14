<script setup>
import { classPact, classInfo } from '../data/site.js'
</script>

<template>
  <section id="pact" class="section pact">
    <div class="pact__glow" aria-hidden="true"></div>

    <div class="wrap">
      <header class="sec-head pact__head" v-reveal>
        <span class="index">05 / 公约</span>
        <h2>我们的约定</h2>
        <span class="en">Our Agreement</span>
      </header>

      <p class="pact__lead" v-reveal>{{ classPact.lead }}</p>

      <ol class="rules">
        <li
          v-for="(r, i) in classPact.rules"
          :key="i"
          class="rules__item"
          v-reveal="(i % 4) * 60"
        >
          <span class="rules__no">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="rules__text">{{ r }}</span>
        </li>
      </ol>

      <div class="pact__sign" v-reveal>
        <span class="pact__sign-line" aria-hidden="true"></span>
        <span class="pact__sign-text">{{ classPact.sign }}</span>
        <span class="seal pact__seal" aria-hidden="true">{{ classInfo.seal }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pact {
  position: relative;
  overflow: hidden;
  background: #17140f;
  color: rgba(247, 244, 237, 0.86);
}

.pact__glow {
  position: absolute;
  inset: -8%;
  background: radial-gradient(ellipse 54% 58% at 78% 18%, rgba(178, 58, 46, 0.2), transparent 62%);
  animation: pactDrift 22s var(--ease) infinite alternate;
}

@keyframes pactDrift {
  to {
    transform: scale(1.12) translateY(16px);
  }
}

.pact .wrap {
  position: relative;
}

/* 深色底上重定义分隔线 */
.pact__head {
  border-bottom-color: rgba(247, 244, 237, 0.18);
}

.pact__head h2 {
  color: var(--paper);
}

.pact__head .en {
  color: rgba(247, 244, 237, 0.45);
}

.pact__head .index {
  color: var(--cinnabar-on-dark);
}

.pact__lead {
  max-width: 62ch;
  margin-bottom: clamp(34px, 5vw, 56px);
  font-size: 1.02rem;
  line-height: 2;
  color: rgba(247, 244, 237, 0.66);
}

/* ---- 条款 ---- */
.rules {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: clamp(30px, 6vw, 84px);
}

.rules__item {
  display: flex;
  align-items: baseline;
  gap: 18px;
  padding: 20px 0;
  border-bottom: 1px solid rgba(247, 244, 237, 0.11);
  transition: border-color 0.5s var(--ease);
}

.rules__item:hover {
  border-bottom-color: rgba(217, 112, 95, 0.55);
}

.rules__no {
  flex: none;
  font-family: var(--font-serif);
  font-size: 0.82rem;
  letter-spacing: 0.14em;
  color: var(--cinnabar-on-dark);
}

.rules__text {
  font-family: var(--font-serif);
  font-size: clamp(0.95rem, 1.6vw, 1.05rem);
  line-height: 1.95;
  letter-spacing: 0.03em;
  color: rgba(247, 244, 237, 0.92);
}

/* ---- 落款 ---- */
.pact__sign {
  margin-top: clamp(44px, 7vw, 72px);
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.pact__sign-line {
  width: 56px;
  height: 1px;
  background: rgba(247, 244, 237, 0.4);
}

.pact__sign-text {
  font-size: 0.82rem;
  letter-spacing: 0.24em;
  color: rgba(247, 244, 237, 0.6);
}

.pact__seal {
  margin-left: auto;
  color: #f6e7e3;
  background: rgba(178, 58, 46, 0.14);
}

@media (max-width: 720px) {
  .rules {
    grid-template-columns: 1fr;
  }
  .pact__seal {
    margin-left: 0;
  }
}
</style>