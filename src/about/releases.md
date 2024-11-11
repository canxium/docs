---
outline: deep
---

<script setup>
import { ref, onMounted } from 'vue'

const version = ref()

onMounted(async () => {
  const res = await fetch('https://api.github.com/repos/canxium/go-canxium/releases/latest')
  version.value = (await res.json()).name
})
</script>

# Releases {#releases}

<p v-if="version">
The current latest stable version of go-canxium is <strong>{{ version }}</strong>.
</p>
<p v-else>
Checking latest version...
</p>

A full changelog of past releases is available on [GitHub](https://github.com/canxium/go-canxium/releases).

## Release Cycle {#release-cycle}

Canxium does not have a fixed release cycle.

- Patch releases are released as needed.

- Minor releases always contain new features, with a typical time frame of 3~6 months in between. Minor releases always go through a beta pre-release phase.

- Major releases will be announced ahead of time, and will go through an early discussion phase and alpha / beta pre-release phases.