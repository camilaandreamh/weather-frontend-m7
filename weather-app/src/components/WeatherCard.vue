<template>
  <div class="weather-card" :class="{ loading: isLoading }">
    <template v-if="isLoading">
      <div class="skeleton-icon"></div>
      <div class="skeleton-temp"></div>
      <div class="skeleton-desc"></div>
    </template>
    <template v-else-if="data">
      <div class="card-header">
        <div class="city-name">{{ data.ciudad }}</div>
        <button v-if="showFav" class="fav-btn" @click="toggleFav" :title="isFav ? 'Quitar favorito' : 'Agregar favorito'">
          {{ isFav ? '★' : '☆' }}
        </button>
      </div>
      <div class="card-main">
        <span class="weather-icon">{{ data.icono }}</span>
        <span class="temp">{{ formatTemp(data.temp) }}</span>
      </div>
      <div class="card-desc">{{ data.desc }}</div>
      <div class="card-details">
        <div class="detail"><span class="detail-label">Humedad</span><span>{{ data.humedad }}%</span></div>
        <div class="detail"><span class="detail-label">Viento</span><span>{{ data.viento }} km/h</span></div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'WeatherCard',
  props: {
    data: Object,
    isLoading: Boolean,
    showFav: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(['favoritos', 'preferencias', 'isAuthenticated']),
    isFav() {
      return this.data && this.favoritos.includes(this.data.ciudad)
    }
  },
  methods: {
    ...mapMutations(['ADD_FAVORITO', 'REMOVE_FAVORITO']),
    toggleFav() {
      if (!this.isAuthenticated) {
        this.$router.push('/login')
        return
      }
      if (this.isFav) {
        this.REMOVE_FAVORITO(this.data.ciudad)
      } else {
        this.ADD_FAVORITO(this.data.ciudad)
      }
    },
    formatTemp(t) {
      if (this.preferencias.unidad === 'F') {
        return `${Math.round(t * 9/5 + 32)}°F`
      }
      return `${t}°C`
    }
  }
}
</script>

<style scoped>
.weather-card {
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  padding: 24px;
  color: var(--text);
  display: flex;
  flex-direction: column;
  gap: 18px;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

.weather-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 24px 80px rgba(147, 51, 234, 0.18);
  border-color: rgba(168,85,247,0.28);
}

.weather-card.loading {
  min-height: 190px;
  justify-content: center;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.city-name {
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.fav-btn {
  width: 44px;
  height: 44px;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.05);
  color: var(--text);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.05rem;
  transition: background 0.2s ease, transform 0.2s ease;
}

.fav-btn:hover {
  transform: translateY(-1px);
  background: rgba(168,85,247,0.16);
}

.card-main {
  display: flex;
  align-items: center;
  gap: 18px;
}

.weather-icon {
  font-size: 52px;
}

.temp {
  font-size: 44px;
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.card-desc {
  color: var(--text2);
  font-size: 0.98rem;
  line-height: 1.6;
}

.card-details {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.detail {
  padding: 14px;
  border-radius: 18px;
  background: rgba(255,255,255,0.05);
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.detail-label {
  color: var(--text2);
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.skeleton-icon,
.skeleton-temp,
.skeleton-desc {
  border-radius: 18px;
  background: rgba(255,255,255,0.08);
  animation: pulse 1.5s ease-in-out infinite;
}

.skeleton-icon {
  width: 68px;
  height: 68px;
}

.skeleton-temp {
  width: 45%;
  height: 22px;
}

.skeleton-desc {
  width: 70%;
  height: 18px;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.45; }
}
</style>
