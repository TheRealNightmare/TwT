<template>
  <ion-page class="bg-gray-50">
    <!-- Header -->
    <ion-header>
      <ion-toolbar class="bg-white shadow">
        <ion-title>Latest News</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="refreshPage" :disabled="loading">
            Refresh
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <!-- Scrollable content -->
    <ion-content fullscreen class="ion-padding" :style="{ paddingBottom: '4rem' }">
      <ion-refresher slot="fixed" @ionRefresh="onPullToRefresh">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <!-- Loading -->
      <ion-text v-if="loading" class="ion-text-center mt-10 block text-gray-500">
        Loading latest news...
      </ion-text>

      <!-- News Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ion-card
          v-for="article in news"
          :key="article.link"
          button
          @click="openLink(article.link)"
          class="shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <ion-img v-if="article.image_url" :src="article.image_url"></ion-img>

          <ion-card-header>
            <ion-card-title class="text-lg font-bold line-clamp-2">{{ article.title }}</ion-card-title>
            <ion-card-subtitle class="text-gray-500 text-sm">{{ formatDate(article.pubDate) }}</ion-card-subtitle>
          </ion-card-header>

          <ion-card-content class="text-gray-700 line-clamp-3">
            {{ article.description }}
          </ion-card-content>
        </ion-card>
      </div>

      <!-- Empty State -->
      <ion-text v-if="!loading && news.length === 0" class="ion-text-center mt-10 block text-gray-500">
        No news found.
      </ion-text>
    </ion-content>

    <!-- Optional Footer for extra spacing -->
    <ion-footer>
      <ion-toolbar>
        <div class="h-16"></div>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { IonRefresherCustomEvent } from '@ionic/vue'

const news = ref<any[]>([])
const loading = ref(true)
const API_KEY = 'pub_a010e4fa9f8d4234860ee713cbe71e41'

// Fetch latest news
const fetchLatestNews = async () => {
  loading.value = true
  try {
    const res = await axios.get('https://newsdata.io/api/1/latest', {
      params: { apikey: API_KEY, language: 'en' },
    })
    news.value = (res.data.results || []).slice(0, 10)
  } catch (err) {
    console.error('Error fetching news:', err)
  } finally {
    loading.value = false
  }
}

// Refresh button
const refreshPage = () => {
  fetchLatestNews()
}

// Pull-to-refresh
const onPullToRefresh = async (event: IonRefresherCustomEvent) => {
  await fetchLatestNews()
  event.detail.complete()
}

// Open link
const openLink = (url: string) => {
  window.open(url, '_blank')
}

// Format date
const formatDate = (dateStr: string) => {
  const d = new Date(dateStr)
  return d.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
}

onMounted(fetchLatestNews)
</script>

<style scoped>
/* Limit title and description lines */
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
