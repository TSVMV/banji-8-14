<script setup>
import { members } from '../data/site.js'
</script>

<template>
  <section id="members" class="section members">
    <div class="wrap">
      <header class="sec-head" v-reveal>
        <span class="index">05 / 班委</span>
        <h2>班委成员</h2>
        <span class="en">The Committee</span>
      </header>

      <p class="sec-intro" v-reveal>
        他们不一定最会说话，但班里的事，总有人默默记着、张罗着。
      </p>

      <ul class="roster">
        <li
          v-for="(m, i) in members"
          :key="m.name"
          class="member"
          v-reveal="i * 80"
        >
          <figure class="member__fig">
            <img v-if="m.avatar" :src="m.avatar" :alt="`${m.name} 的照片`" loading="lazy" />
            <!-- 照片未到位：用姓氏首字占位 -->
            <div v-else class="ph member__ph" aria-hidden="true">
              <span class="ph__initial">{{ m.name.charAt(0) }}</span>
            </div>
          </figure>
          <div class="member__body">
            <h3 class="member__name">{{ m.name }}</h3>
            <p class="member__role">{{ m.role }}</p>
            <p class="member__note">{{ m.note }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.members {
  background: linear-gradient(180deg, var(--paper) 0%, var(--paper-deep) 100%);
}

.sec-intro {
  margin-bottom: 44px;
}

.roster {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: clamp(18px, 2.6vw, 30px);
}

.member {
  display: flex;
  flex-direction: column;
}

.member__fig {
  margin: 0;
  position: relative;
  overflow: hidden;
  border-radius: 3px;
  background: var(--paper-deep);
  box-shadow: var(--shadow-soft);
}

.member__fig img {
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  filter: grayscale(0.28) contrast(1.03);
  transition: transform 1s var(--ease), filter 0.7s var(--ease);
}

/* 头像占位框与照片保持同比例 */
.member__ph {
  aspect-ratio: 3 / 4;
}

.member:hover .member__fig img {
  transform: scale(1.05);
  filter: grayscale(0) contrast(1.05);
}

/* 头像上一道朱砂顶边 */
.member__fig::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: var(--cinnabar);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.6s var(--ease);
}

.member:hover .member__fig::after {
  transform: scaleX(1);
}

.member__body {
  padding: 18px 4px 0;
}

.member__name {
  font-size: 1.35rem;
  letter-spacing: 0.06em;
}

.member__role {
  margin-top: 6px;
  font-size: 0.78rem;
  letter-spacing: 0.24em;
  color: var(--cinnabar);
}

.member__note {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--line-soft);
  font-size: 0.88rem;
  line-height: 1.85;
  color: var(--ink-mute);
}

@media (max-width: 900px) {
  .roster {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 460px) {
  .roster {
    grid-template-columns: 1fr;
  }
  .member {
    flex-direction: row;
    gap: 18px;
    align-items: center;
  }
  .member__fig {
    flex: 0 0 40%;
  }
  .member__body {
    padding-top: 0;
  }
}
</style>
