<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SiteMap from './SiteMap.vue'
import { load } from './sponsors'

import PartnerCard from '../../../src/partners/components/PartnerCard.vue'
import PageShowcaseListLayout from '@theme/components/PageShowcaseListLayout.vue'
import data from '../../../src/partners/partners.json'
import { Partner } from '../../../src/partners/components/type'

const spotlighted = ref<Partner | null>(null)

onMounted(() => {
  const plat = (data as Partner[]).filter((d) => d.platinum)
  spotlighted.value = plat[Math.floor(Math.random() * plat.length)]
  load()
})

</script>

<template>
  <section id="hero">
    <img id="uwu" alt="Vue.js Kawaii Logo by @icarusgkx" />
    <h1 class="tagline">
      Powering
      <span class="accent">Crypto,</span>
      <br />Even Offline
    </h1>
    <p class="description">
      The first cryptocurrency with truly stable mining costs — designed to serve as functional money, not just a store of value.
    </p>
    <p class="actions">
      <VueMasteryModal />
      <a class="setup" href="/guide/introduction#why-canxium">Why Canxium?</a>
      <a class="get-started" href="/guide/introduction.html">
        Get Started
        <svg
          class="icon"
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          viewBox="0 0 24 24"
        >
          <path
            d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"
          />
        </svg>
      </a>
      <a class="security" href="/guide/validator/prerequisites">
        Launch a Validator
        <svg
          class="icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"
          />
        </svg>
      </a>
    </p>
  </section>

    <section id="problem-solution" class="vt-box-container">
    <div class="problem-section">
      <h2>The Problem</h2>
      <div class="problem-grid">
        <div class="vt-box problem-box">
          <h3>💰 Bitcoin's Instability</h3>
          <p>
            Mining costs tied to market volatility make Bitcoin more of a store of value than a reliable currency.
          </p>
        </div>
        <div class="vt-box problem-box">
          <h3>🏦 Stablecoin Centralization</h3>
          <p>
            Stablecoins offer price stability but come with centralization and custodial risk. They're issued by companies, not mined — undermining decentralized finance.
          </p>
        </div>
      </div>
    </div>
    
    <div class="solution-section">
      <h2>The Canxium Solution</h2>
      <div class="solution-group">
        <h3 class="solution-group-title">Core Technology</h3>
        <div class="solution-grid">
          <div class="vt-box solution-box">
            <h3>🔁 Predictable Issuance</h3>
            <p>
              Rewards calculated based on difficulty, not market volatility. Mining costs are decoupled from price swings, ensuring stable coin production.
            </p>
          </div>
          <div class="vt-box solution-box">
            <h3>⚖️ Fixed Cost per Unit</h3>
            <p>
              Transparent and stable cost to produce each CAU coin, regardless of market conditions — ensuring fairness for miners and price resilience.
            </p>
          </div>
        </div>
      </div>
      
      <div class="solution-group">
        <h3 class="solution-group-title">Global Access & Integration</h3>
        <div class="solution-grid">
          <div class="vt-box solution-box">
            <h3>🌐 Global Accessibility</h3>
            <p>
              Retained Proof of Work (RPoW) allows mining even offline or intermittently — unlocking access for miners in under-connected regions.
            </p>
          </div>
          <div class="vt-box solution-box">
            <h3>🤝 Cross-chain Mining</h3>
            <p>
              Leverages mining power from Bitcoin, Kaspa, Litecoin and other blockchains through inclusive cross-chain mining rewards.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <section id="vision" class="vision-section">
    <div class="vision-content">
      <h2>A Third Path Forward</h2>
      <p class="vision-description">
        We're not trying to replace Bitcoin or compete with stablecoins. Instead, Canxium introduces a third path: 
        <strong>a mineable, decentralized cryptocurrency with stable production costs</strong> — capable of becoming real money.
      </p>
      <p class="vision-link">
        <a href="https://canxium.medium.com/fixing-the-worlds-money-with-stable-mining-the-vision-behind-canxium-3b6fbc3d3020" target="_blank" rel="noopener noreferrer" class="medium-link">
          Read our full vision: "Fixing the World's Money with Stable Mining"
          <svg class="external-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
          </svg>
        </a>
      </p>
      <div class="vision-points">
        <div class="vision-point">
          <span class="vision-icon">🎯</span>
          <div>
            <h3>Our Mission</h3>
            <p>Create the first cryptocurrency that can truly function as everyday money — predictable, fair, and accessible to everyone.</p>
          </div>
        </div>
        <div class="vision-point">
          <span class="vision-icon">🌍</span>
          <div>
            <h3>Our Vision</h3>
            <p>A world where money is earned fairly at stable costs, not printed at will or mined in chaos — built on math, not politics.</p>
          </div>
        </div>
        <div class="vision-point">
          <span class="vision-icon">⚡</span>
          <div>
            <h3>Our Impact</h3>
            <p>Making crypto more accessible, more useful, and more stable — exactly what the world needs from its next generation of money.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section>
    <PageShowcaseListLayout
      spotlightTitle="Partner Spotlight"
    >
      <template #spotlight>
        <PartnerCard v-if="spotlighted" hero :data="spotlighted" />
      </template>
    </PageShowcaseListLayout>
  </section>
  <SiteMap />
  <!-- <NewsLetter /> -->
</template>

<style scoped>
section {
  padding: 42px 32px;
}

#hero {
  padding: 96px 32px;
  text-align: center;
}

.tagline {
  font-size: 76px;
  line-height: 1.25;
  font-weight: 900;
  letter-spacing: -1.5px;
  max-width: 960px;
  margin: 0px auto;
}

html:not(.dark) .accent,
.dark .tagline {
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.description {
  max-width: 960px;
  line-height: 1.5;
  color: var(--vt-c-text-2);
  transition: color 0.5s;
  font-size: 22px;
  margin: 24px auto 40px;
}

.mission-statement {
  max-width: 720px;
  line-height: 1.6;
  color: var(--vt-c-text-1);
  font-size: 18px;
  font-weight: 500;
  font-style: italic;
  margin: 32px auto 48px;
  padding: 24px;
  background: var(--vt-c-bg-soft);
  border-radius: 12px;
  border-left: 4px solid var(--vt-c-brand);
}

.actions a {
  font-size: 16px;
  display: inline-block;
  background-color: var(--vt-c-bg-mute);
  padding: 8px 18px;
  font-weight: 500;
  border-radius: 8px;
  transition: background-color 0.5s, color 0.5s;
}

.actions .security {
  background: linear-gradient(var(--vt-c-bg-mute), var(--vt-c-bg-mute)) padding-box,
    linear-gradient(45deg, #42d392, #647eff) border-box;
  border: 2px solid transparent;
}

.actions .security:hover {
  background: linear-gradient(var(--vt-c-gray-light-4), var(--vt-c-gray-light-4)) padding-box,
    linear-gradient(45deg, #42d392, #647eff) border-box;
}

.dark .actions .security:hover {
  background: linear-gradient(var(--vt-c-gray-dark-3), var(--vt-c-gray-dark-3)) padding-box,
    linear-gradient(45deg, #42d392, #647eff) border-box;
}

.actions .security .icon {
  width: 12px;
  height: 12px;
  margin-left: 4px;
}

.actions .get-started,
.actions .setup {
  margin-right: 18px;
}

.actions .icon {
  display: inline;
  position: relative;
  top: -1px;
  margin-left: 2px;
  fill: currentColor;
  transition: transform 0.2s;
}

.actions .get-started:hover {
  transition-duration: 0.2s;
}

.actions .get-started:hover .icon {
  transform: translateX(2px);
}

.actions .get-started,
.actions .setup,
.actions .security {
  color: var(--vt-c-text-code);
}

.actions .get-started:hover,
.actions .setup:hover,
.actions .security:hover {
  background-color: var(--vt-c-gray-light-4);
  transition-duration: 0.2s;
}

.dark .actions .get-started:hover,
.dark .actions .setup:hover,
.dark .actions .security:hover {
  background-color: var(--vt-c-gray-dark-3);
}

#special-sponsor {
  border-top: 1px solid var(--vt-c-divider-light);
  border-bottom: 1px solid var(--vt-c-divider-light);
  padding: 12px 24px;
  display: flex;
  align-items: center;
}

#special-sponsor span {
  color: var(--vt-c-text-2);
  font-weight: 500;
  font-size: 13px;
  vertical-align: middle;
  flex: 1;
}

#special-sponsor span:first-child {
  text-align: right;
}

#special-sponsor a {
  display: flex;
  justify-content: center;
  padding: 0 24px;
}

#special-sponsor img {
  height: 42px;
  margin: -6px 0;
}

.dark #special-sponsor img {
  filter: grayscale(1) invert(1);
}

#highlights {
  max-width: 1280px;
  margin: 0px auto;
  color: var(--vt-c-text-2);
}

#highlights h2 {
  font-weight: 600;
  font-size: 20px;
  letter-spacing: -0.4px;
  color: var(--vt-c-text-1);
  transition: color 0.5s;
  margin-bottom: 0.75em;
}

#highlights p {
  font-weight: 400;
  font-size: 15px;
}

#highlights .vt-box {
  background-color: transparent;
}

/* Problem-Solution Section */
#problem-solution {
  max-width: 1280px;
  margin: 0px auto;
  color: var(--vt-c-text-2);
}

.problem-section,
.solution-section {
  margin-bottom: 4rem;
}

.problem-section h2,
.solution-section h2 {
  font-weight: 700;
  font-size: 32px;
  letter-spacing: -0.8px;
  color: var(--vt-c-text-1);
  text-align: center;
  margin-bottom: 2rem;
}

.problem-grid,
.solution-grid {
  display: grid;
  gap: 2rem;
}

.problem-grid {
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
}

.solution-grid {
  grid-template-columns: repeat(2, 1fr);
}

.solution-group {
  margin-bottom: 3rem;
}

.solution-group-title {
  font-weight: 600;
  font-size: 20px;
  color: var(--vt-c-text-1);
  text-align: center;
  margin-bottom: 1.5rem;
  opacity: 0.8;
}

.problem-box {
  background: linear-gradient(135deg, #fef3f2, #fef2f2);
  border: 1px solid #fecaca;
  border-radius: 12px;
}

.solution-box {
  background: linear-gradient(135deg, #f0fdf4, #f0fdfa);
  border: 1px solid #86efac;
  border-radius: 12px;
}

.dark .problem-box {
  background: linear-gradient(135deg, #431a1a, #3f1f1f);
  border: 1px solid #7f1d1d;
}

.dark .solution-box {
  background: linear-gradient(135deg, #1a2e1a, #1f3f2e);
  border: 1px solid #166534;
}

.problem-box h3,
.solution-box h3 {
  font-weight: 600;
  font-size: 18px;
  color: var(--vt-c-text-1);
  margin-bottom: 0.75em;
}

.problem-box p,
.solution-box p {
  font-weight: 400;
  font-size: 15px;
  line-height: 1.6;
}

/* Vision Section */
.vision-section {
  padding: 64px 32px;
  background: var(--vt-c-bg-soft);
  margin: 4rem 0;
}

.vision-content {
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
}

.vision-section h2 {
  font-weight: 700;
  font-size: 36px;
  letter-spacing: -0.8px;
  color: var(--vt-c-text-1);
  margin-bottom: 1.5rem;
}

.vision-description {
  font-size: 20px;
  line-height: 1.6;
  color: var(--vt-c-text-2);
  margin-bottom: 3rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.vision-description strong {
  color: var(--vt-c-text-1);
  font-weight: 600;
}

.vision-link {
  margin: 2rem auto 3rem;
  text-align: center;
}

.medium-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 18px;
  font-weight: 500;
  color: var(--vt-c-brand);
  text-decoration: none;
  padding: 12px 24px;
  border: 2px solid var(--vt-c-brand);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.medium-link:hover {
  background-color: var(--vt-c-brand);
  color: white;
  transform: translateY(-2px);
}

.external-icon {
  fill: currentColor;
  transition: transform 0.2s ease;
}

.medium-link:hover .external-icon {
  transform: translate(2px, -2px);
}

.vision-points {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  margin-top: 3rem;
}

.vision-point {
  display: flex;
  align-items: flex-start;
  text-align: left;
  gap: 1rem;
}

.vision-icon {
  font-size: 2rem;
  flex-shrink: 0;
  margin-top: 0.25rem;
}

.vision-point h3 {
  font-weight: 600;
  font-size: 20px;
  color: var(--vt-c-text-1);
  margin-bottom: 0.5rem;
}

.vision-point p {
  font-size: 16px;
  line-height: 1.6;
  color: var(--vt-c-text-2);
}

#sponsors {
  max-width: 900px;
  margin: 0px auto;
}

#sponsors h2 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 1em;
}

#sponsors .sponsor-container {
  margin-bottom: 3em;
}

@media (max-width: 960px) {
  .tagline {
    font-size: 64px;
    letter-spacing: -0.5px;
  }
  .description {
    font-size: 18px;
    margin-bottom: 48px;
  }
  .mission-statement {
    font-size: 16px;
    margin: 24px auto 36px;
    padding: 20px;
  }
  .problem-grid {
    grid-template-columns: 1fr;
  }
  .solution-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .vision-section h2 {
    font-size: 28px;
  }
  .vision-description {
    font-size: 18px;
  }
  .medium-link {
    font-size: 16px;
    padding: 10px 20px;
  }
}

@media (max-width: 794px) {
  .tagline {
    font-size: 48px;
    letter-spacing: -0.5px;
  }
  .actions .security {
    margin-top: 18px;
  }
  .problem-section h2,
  .solution-section h2 {
    font-size: 24px;
  }
  .solution-grid {
    grid-template-columns: 1fr;
  }
  .vision-points {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

@media (max-width: 576px) {
  #hero {
    padding: 56px 32px;
  }
  .description {
    font-size: 16px;
    margin: 18px 0 30px;
  }
  .mission-statement {
    font-size: 14px;
    margin: 16px auto 24px;
    padding: 16px;
  }
  #special-sponsor {
    flex-direction: column;
  }
  #special-sponsor img {
    height: 36px;
    margin: 8px 0;
  }
  #special-sponsor span {
    text-align: center !important;
  }
  #highlights h3 {
    margin-bottom: 0.6em;
  }
  #highlights .vt-box {
    padding: 20px 36px;
  }
  .actions a {
    margin: 18px 0;
  }
  .actions .security {
    margin-top: 0;
  }
  .vision-section {
    padding: 48px 24px;
  }
  .vision-section h2 {
    font-size: 24px;
  }
  .vision-description {
    font-size: 16px;
  }
  .medium-link {
    font-size: 14px;
    padding: 8px 16px;
  }
  .problem-section h2,
  .solution-section h2 {
    font-size: 20px;
  }
}

@media (max-width: 370px) {
  .tagline {
    font-size: 36px;
  }
}

#uwu {
  display: none;
}

.uwu #uwu {
  display: block;
  width: 100%;
  max-width: 720px;
  margin: -120px auto -20px;
  aspect-ratio: 192 / 108;
  content: url(/logo-uwu.png);
}

@media (max-width: 576px) {
  .uwu #uwu {
    margin: -60px auto -10px;
  }
}
</style>
