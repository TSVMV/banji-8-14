<script setup>
import { aboutSite } from '../data/site.js'
</script>

<template>
  <section id="about-site" class="section aboutsite">
    <div class="wrap aboutsite__grid">
      <div class="aboutsite__lead" v-reveal>
        <span class="kicker">06 / 关于</span>
        <h2>{{ aboutSite.title }}</h2>
        <p v-for="(p, i) in aboutSite.paragraphs" :key="i">{{ p }}</p>

        <a
          v-if="aboutSite.repo"
          class="aboutsite__link"
          :href="aboutSite.repo"
          target="_blank"
          rel="noopener"
        >
          查看源码仓库 <span aria-hidden="true">↗</span>
        </a>
      </div>

      <dl class="facts" v-reveal="140">
        <div v-for="f in aboutSite.facts" :key="f.k" class="facts__row">
          <dt>{{ f.k }}</dt>
          <dd :class="{ 'facts__dev': f.hl }">{{ f.v }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
.aboutsite {
  background: var(--paper-deep);
}

.aboutsite__grid {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: clamp(34px, 6vw, 90px);
  align-items: start;
  padding-top: clamp(34px, 5vw, 60px);
  border-top: 1px solid var(--line);
}

.kicker {
  font-size: 0.72rem;
  letter-spacing: 0.38em;
  color: var(--cinnabar);
}

.aboutsite__lead h2 {
  font-size: clamp(1.7rem, 3.6vw, 2.55rem);
  margin: 14px 0 24px;
}

.aboutsite__lead p {
  max-width: 46ch;
  margin-bottom: 16px;
  color: var(--ink-soft);
  line-height: 2;
}

.aboutsite__link {
  display: inline-block;
  margin-top: 12px;
  padding-bottom: 3px;
  font-size: 0.86rem;
  letter-spacing: 0.12em;
  border-bottom: 1px solid var(--cinnabar);
  transition: color 0.35s var(--ease), letter-spacing 0.35s var(--ease);
}

.aboutsite__link:hover {
  color: var(--cinnabar);
  letter-spacing: 0.18em;
}

/* 右侧信息表：发丝线一行一行，像书的版权页 */
.facts {
  margin: 0;
  border-top: 1px solid var(--line);
}

.facts__row {
  display: flex;
  align-items: baseline;
  gap: 20px;
  padding: 16px 0;
  border-bottom: 1px solid var(--line-soft);
}

.facts__row dt {
  flex: 0 0 7.6em;
  font-size: 0.73rem;
  letter-spacing: 0.22em;
  color: var(--ink-mute);
}

.facts__row dd {
  margin: 0;
  font-family: var(--font-serif);
  font-size: 1.02rem;
  letter-spacing: 0.06em;
}

.facts__dev {
  color: var(--cinnabar);
  font-weight: 600;
  letter-spacing: 0.14em;
}

@media (max-width: 860px) {
  .aboutsite__grid {
    grid-template-columns: 1fr;
  }
}
</style>
