<script setup>
import { classInfo } from '../data/site.js'
</script>

<template>
  <!-- 班训横幅：满幅墨色，用来打断米白区块的节奏 -->
  <section class="band" aria-label="班训">
    <div class="band__glow" aria-hidden="true"></div>

    <div class="band__inner">
      <p class="band__label">班 训</p>
      <p class="band__slogan">{{ classInfo.slogan }}</p>
      <span class="band__rule" aria-hidden="true"></span>
      <p class="band__motto">{{ classInfo.motto }}</p>
      <p class="band__year">{{ classInfo.eyebrow }}</p>
    </div>

    <div class="band__seal seal" aria-hidden="true">{{ classInfo.seal }}</div>
  </section>
</template>

<style scoped>
.band {
  position: relative;
  z-index: 1;
  overflow: hidden;
  background: #17140f;
  color: var(--paper);
  padding: clamp(76px, 12vw, 154px) var(--gutter);
  text-align: center;
}

/* 缓慢漂移的墨色晕染，让整块底色不呆板 */
.band__glow {
  position: absolute;
  inset: -10%;
  background:
    radial-gradient(ellipse 52% 58% at 22% 26%, rgba(168, 132, 63, 0.26), transparent 62%),
    radial-gradient(ellipse 48% 52% at 80% 76%, rgba(178, 58, 46, 0.22), transparent 60%);
  animation: bandDrift 20s var(--ease) infinite alternate;
}

.band__glow::after {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.5;
  background-image: repeating-linear-gradient(
    0deg,
    rgba(247, 244, 237, 0.03) 0 1px,
    transparent 1px 4px
  );
}

@keyframes bandDrift {
  to {
    transform: scale(1.14) translateY(-14px);
  }
}

.band__inner {
  position: relative;
  max-width: var(--maxw);
  margin: 0 auto;
}

.band__label {
  font-size: 0.7rem;
  letter-spacing: 0.52em;
  color: var(--cinnabar-on-dark);
  margin-bottom: clamp(22px, 4vw, 38px);
  text-indent: 0.52em;
}

.band__slogan {
  font-family: var(--font-serif);
  font-size: clamp(1.28rem, 3vw, 2.2rem);
  line-height: 1.55;
  letter-spacing: clamp(0.06em, 1vw, 0.2em);
  color: var(--paper);
  text-shadow: 0 2px 46px rgba(0, 0, 0, 0.4);
  text-indent: 0.2em;
}

.band__rule {
  display: block;
  width: 72px;
  height: 1px;
  margin: clamp(28px, 4vw, 40px) auto;
  background: linear-gradient(90deg, transparent, rgba(247, 244, 237, 0.5), transparent);
}

.band__motto {
  font-size: 0.88rem;
  letter-spacing: 0.38em;
  color: rgba(247, 244, 237, 0.74);
  text-indent: 0.38em;
}

.band__year {
  margin-top: 20px;
  font-size: 0.72rem;
  letter-spacing: 0.3em;
  color: rgba(247, 244, 237, 0.42);
  text-indent: 0.3em;
}

.band__seal {
  position: absolute;
  right: clamp(16px, 4vw, 64px);
  bottom: clamp(22px, 5vw, 58px);
  color: #f6e7e3;
}

@media (max-width: 720px) {
  .band__seal {
    position: static;
    margin: 38px auto 0;
  }
}
</style>
