<template>
  <ion-page class="bg-gray-50">
    <ion-header>
      <ion-toolbar class="bg-white shadow">
        <ion-title class="text-lg font-semibold">Latest News</ion-title>

        <!-- Refresh Button -->
        <ion-buttons slot="end">
          <ion-button
            @click="refreshPage"
            :disabled="loading"
            class="bg-blue-500 text-white hover:bg-blue-600 px-3 py-1 rounded"
          >
            Refresh
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <!-- Fullscreen ion-content -->
    <ion-content fullscreen class="ion-padding pb-32">
      <div v-if="loading" class="text-center text-gray-500 mt-10">
        Loading latest news...
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <NewsCard v-for="article in news" :key="article.link" :article="article" />
      </div>

      <div v-if="news.length === 0 && !loading" class="text-center text-gray-500 mt-10">
        No news found.
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import NewsCard from '@/components/NewsCard.vue'

const news = ref<any[]>([])
const loading = ref(true)

const API_KEY = 'pub_a010e4fa9f8d4234860ee713cbe71e41'

const fetchLatestNews = async () => {
  loading.value = true
  try {
    const res = await axios.get('https://newsdata.io/api/1/latest', {
      params: { apikey: API_KEY, language: 'en' },
    })
    // Limit to 7 latest news
    news.value = (res.data.results || [])
  } catch (err) {
    console.error('Error fetching news:', err)
  } finally {
    loading.value = false
  }
}

// Refresh button handler
const refreshPage = () => {
  fetchLatestNews()
}

onMounted(fetchLatestNews)
</script>
