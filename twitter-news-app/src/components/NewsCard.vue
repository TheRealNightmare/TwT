<template>
  <div
    class="relative bg-gray-100 rounded-lg pb-8 overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-72 m-2 cursor-pointer"
    @click="openLink"
  >
    <!-- Background image -->
    <img
      v-if="article.image_url"
      :src="article.image_url"
      alt="News Image"
      class="absolute inset-0 w-full h-full object-cover"
    />

    <!-- Overlay gradient -->
    <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>

    <!-- Content overlay -->
    <div class="absolute bottom-0 p-5 flex flex-col text-white">
      <h3 class="text-lg font-bold line-clamp-2 mb-1">{{ article.title }}</h3>
      <p class="text-gray-200 text-sm mb-2">{{ formattedDate }}</p>
      <p class="text-gray-100 text-sm line-clamp-3 mb-3">{{ article.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

interface Article {
  title: string
  description: string
  link: string
  pubDate: string
  image_url?: string
}

const props = defineProps<{
  article: Article
}>()

const formattedDate = computed(() => {
  const d = new Date(props.article.pubDate)
  return d.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
})

const openLink = () => {
  window.open(props.article.link, '_blank')
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>
