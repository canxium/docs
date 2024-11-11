<script setup lang="ts">
import PageHero from '@theme/components/PageHero.vue'

defineProps<{ title?: string }>()
</script>

<template>
  <PageHero>
    <template #title>{{ title || 'Canxium Partners' }}</template>
    <template #lead>

    </template>
  </PageHero>
</template>
