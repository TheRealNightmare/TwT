<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>TWT</ion-title>
        <ion-buttons slot="end">
          <!-- Refresh Button -->
          <ion-button @click="refreshPage" fill="clear" :disabled="loading">
            <ion-icon :icon="refreshOutline" slot="icon-only"></ion-icon>
          </ion-button>

          <!-- Logout Button -->
          <ion-button @click="handleLogout" fill="clear" :disabled="isLoading">
            <ion-spinner v-if="isLoading" name="crescent"></ion-spinner>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <!-- News Section -->
      <div class="news-section">
        <ion-card
          class="shadow-lg"
          v-for="article in news"
          :key="article.link"
          button
          @click="openLink(article.link)"
        >
          <ion-img v-if="article.image_url" :src="article.image_url"></ion-img>
          <ion-card-header>
            <ion-card-title>{{ article.title }}</ion-card-title>
            <ion-card-subtitle>{{
              formatDate(article.pubDate)
            }}</ion-card-subtitle>
          </ion-card-header>

          <ion-card-content>
            <p>{{ article.description }}</p>
          </ion-card-content>
        </ion-card>

        <!-- Loading or Empty State for News -->
        <ion-text v-if="loading" class="ion-text-center mt-10">
          Loading latest news...
        </ion-text>
        <ion-text
          v-if="!loading && news.length === 0"
          class="ion-text-center mt-10"
        >
          No news found.
        </ion-text>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { refreshOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonButton,
  IonButtons,
  IonSpinner,
  IonImg,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonText,
} from "@ionic/vue";

// News API setup
const news = ref<any[]>([]);
const loading = ref(true);
const API_KEY = "pub_39162992d09540da909796fa6f4ae26c";

// Fetch latest news
const fetchLatestNews = async () => {
  loading.value = true;
  try {
    const res = await axios.get("https://newsdata.io/api/1/latest", {
      params: { apikey: API_KEY, language: "en" },
    });
    news.value = (res.data.results || []).slice(0, 10); // Fetch the latest 5 news
  } catch (err) {
    console.error("Error fetching news:", err);
  } finally {
    loading.value = false;
  }
};

// Refresh button
const refreshPage = () => {
  fetchLatestNews();
};

// Pull-to-refresh
const onPullToRefresh = async (event: any) => {
  await fetchLatestNews();
  event.detail.complete();
};

// Open link
const openLink = (url: string) => {
  window.open(url, "_blank");
};

// Format date
const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
};

onMounted(() => {
  fetchLatestNews(); // Listen for online/offline events
});
</script>
