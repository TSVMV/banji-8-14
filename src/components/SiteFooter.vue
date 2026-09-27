<script setup>
import { contact, classInfo, navItems } from '../data/site.js'

const toTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer id="contact" class="foot">
    <div class="wrap foot__inner">
      <div class="foot__lead">
        <p class="foot__kicker">把话写在这里</p>
        <h2 class="foot__title">愿我们<span>一起长大</span></h2>
        <p class="foot__desc">
          如果你也是{{ classInfo.name }}的人，欢迎常回来看看；如果你是路过的人，也谢谢你读到这里。
        </p>
      </div>

      <dl class="foot__info">
        <div v-if="contact.address" class="foot__item">
          <dt>地址</dt>
          <dd>{{ contact.address }}</dd>
        </div>
        <div v-if="contact.email" class="foot__item">
          <dt>邮箱</dt>
          <dd><a :href="`mailto:${contact.email}`">{{ contact.email }}</a></dd>
        </div>
        <div v-if="contact.wechat" class="foot__item">
          <dt>{{ contact.wechatLabel || '公众号' }}</dt>
          <dd>{{ contact.wechat }}</dd>
        </div>
      </dl>

      <div class="foot__bar">
        <p class="foot__copy">© {{ new Date().getFullYear() }} {{ classInfo.name }} · {{ classInfo.school }}</p>

        <p v-if="contact.developer" class="foot__dev">
          设计与开发 <b>{{ contact.developer }}</b>
        </p>

        <p class="foot__note">{{ contact.note }}</p>

        <nav class="foot__nav" aria-label="页脚导航">
          <a
            v-for="item in navItems"
            :key="item.id"
            :href="`#${item.id}`"
          >{{ item.label }}</a>
        </nav>

        <button class="foot__top" type="button" @click="toTop">
          <span aria-hidden="true">↑</span> 回到顶部
        </button>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.foot {
  position: relative;
  z-index: 1;
  background: #17140f;
  color: rgba(247, 244, 237, 0.82);
  padding: clamp(60px, 9vw, 110px) var(--gutter) 40px;
  overflow: hidden;
}

/* 墨色底上一抹朱砂光晕 */
.foot::before {
  content: "";
  position: absolute;
  top: -140px;
  right: -120px;
  width: 420px;
  height: 420px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(178, 58, 46, 0.28), transparent 68%);
  pointer-events: none;
}

.foot__inner {
  position: relative;
  max-width: var(--maxw);
  margin: 0 auto;
}

.foot__lead {
  max-width: 34ch;
}

.foot__kicker {
  font-size: 0.74rem;
  letter-spacing: 0.34em;
  color: var(--cinnabar-on-dark);
  margin-bottom: 16px;
}

.foot__title {
  color: var(--paper);
  font-size: clamp(2rem, 5vw, 3.4rem);
  line-height: 1.15;
}

.foot__title span {
  display: inline-block;
  margin-left: 0.2em;
  position: relative;
}

.foot__title span::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0.04em;
  height: 0.1em;
  background: var(--cinnabar);
  opacity: 0.85;
}

.foot__desc {
  margin-top: 22px;
  font-size: 0.98rem;
  line-height: 1.95;
  color: rgba(247, 244, 237, 0.66);
}

.foot__info {
  margin: clamp(40px, 6vw, 64px) 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 26px;
  padding: 32px 0;
  border-top: 1px solid rgba(247, 244, 237, 0.14);
  border-bottom: 1px solid rgba(247, 244, 237, 0.14);
}

.foot__item dt {
  font-size: 0.72rem;
  letter-spacing: 0.26em;
  color: rgba(247, 244, 237, 0.5);
  margin-bottom: 10px;
}

.foot__item dd {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.8;
  color: rgba(247, 244, 237, 0.9);
}

.foot__item a {
  border-bottom: 1px solid rgba(178, 58, 46, 0.6);
  transition: color 0.3s var(--ease);
}

.foot__item a:hover {
  color: var(--cinnabar);
}

.foot__bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px 28px;
  font-size: 0.82rem;
  color: rgba(247, 244, 237, 0.55);
}

.foot__copy {
  letter-spacing: 0.06em;
}

.foot__note {
  flex: 1 1 260px;
}

/* 开发者署名 */
.foot__dev {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: baseline;
  gap: 10px;
  padding: 5px 14px;
  border: 1px solid rgba(247, 244, 237, 0.18);
  border-radius: 40px;
  letter-spacing: 0.14em;
  font-size: 0.74rem;
}

.foot__dev b {
  font-family: var(--font-serif);
  font-weight: 600;
  font-size: 0.86rem;
  letter-spacing: 0.2em;
  color: #d9705f;
}

.foot__nav {
  display: flex;
  gap: 18px;
}

.foot__nav a {
  letter-spacing: 0.1em;
  transition: color 0.3s var(--ease);
}

.foot__nav a:hover {
  color: var(--paper);
}

.foot__top {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 18px;
  background: none;
  border: 1px solid rgba(247, 244, 237, 0.28);
  border-radius: 40px;
  color: rgba(247, 244, 237, 0.85);
  font-size: 0.82rem;
  letter-spacing: 0.12em;
  cursor: pointer;
  transition: background 0.35s var(--ease), border-color 0.35s var(--ease),
    transform 0.35s var(--ease);
}

.foot__top:hover {
  background: var(--cinnabar);
  border-color: var(--cinnabar);
  color: #fff;
  transform: translateY(-2px);
}

@media (max-width: 760px) {
  .foot__info {
    grid-template-columns: 1fr;
    gap: 22px;
  }
  .foot__top {
    margin-left: 0;
  }
}
</style>
