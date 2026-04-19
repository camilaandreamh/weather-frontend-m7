<template>
  <div class="clima">
    <button @click="$router.back()" class="btn-back">← Volver</button>

    <div v-if="loading" class="loading-state">
      <div class="sk-big"></div>
      <div class="sk-med"></div>
    </div>

    <div v-else-if="data" class="detail-card">
      <div class="detail-header">
        <div class="detail-icon">{{ data.icono }}</div>
        <div>
          <h1 class="detail-city">{{ data.ciudad }}</h1>
          <p class="detail-desc">{{ data.desc }}</p>
        </div>
        <div class="detail-temp">{{ formatTemp(data.temp) }}</div>
      </div>

      <div class="detail-grid">
        <div class="detail-stat">
          <span class="ds-icon">💧</span>
          <span class="ds-val">{{ data.humedad }}%</span>
          <span class="ds-label">Humedad</span>
        </div>
        <div class="detail-stat">
          <span class="ds-icon">💨</span>
          <span class="ds-val">{{ data.viento }} km/h</span>
          <span class="ds-label">Viento</span>
        </div>
        <div class="detail-stat">
          <span class="ds-icon">🌡️</span>
          <span class="ds-val">{{ formatTemp(data.temp) }}</span>
          <span class="ds-label">Temperatura</span>
        </div>
      </div>

      <div class="fav-action">
        <template v-if="isAuthenticated">
          <button v-if="!isFav" @click="ADD_FAVORITO(data.ciudad)" class="btn-fav-add">★ Agregar a favoritos</button>
          <button v-else @click="REMOVE_FAVORITO(data.ciudad)" class="btn-fav-remove">✕ Quitar de favoritos</button>
        </template>
        <router-link v-else to="/login" class="btn-fav-add">Inicia sesión para guardar</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { getWeatherMock } from '../services/authService'

export default {
  name: 'Clima',
  data() {
    return { data: null, loading: true }
  },
  computed: {
    ...mapGetters(['favoritos', 'preferencias', 'isAuthenticated']),
    isFav() { return this.data && this.favoritos.includes(this.data.ciudad) }
  },
  async mounted() {
    this.data = await getWeatherMock(this.$route.params.ciudad)
    this.loading = false
  },
  methods: {
    ...mapMutations(['ADD_FAVORITO', 'REMOVE_FAVORITO']),
    formatTemp(t) {
      if (this.preferencias.unidad === 'F') return `${Math.round(t * 9/5 + 32)}°F`
      return `${t}°C`
    }
  }
}
</script>

<style scoped>
.clima { display: flex; flex-direction: column; gap: 24px; max-width: 600px; }

.btn-back {
  background: none;
  border: none;
  color: var(--text2);
  font-size: 14px;
  font-weight: 500;
  padding: 0;
  transition: color 0.2s;
  align-self: flex-start;
}
.btn-back:hover { color: var(--text); }

.loading-state { display: flex; flex-direction: column; gap: 12px; }
.sk-big { width: 100%; height: 120px; background: var(--surface); border-radius: var(--radius); animation: pulse 1.4s infinite; }
.sk-med { width: 60%; height: 40px; background: var(--surface); border-radius: var(--radius-sm); animation: pulse 1.4s infinite; }
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }

.detail-card {
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  padding: 36px;
  box-shadow: 0 4px 20px rgba(168, 85, 247, 0.12);
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 20px;
}
.detail-icon { font-size: 64px; }
.detail-city { font-size: 28px; font-weight: 800; color: var(--text); }
.detail-desc { color: var(--text2); font-size: 15px; margin-top: 4px; }
.detail-temp { margin-left: auto; font-family: 'Playfair Display', serif; font-size: 52px; font-weight: 800; color: var(--accent); }

.detail-grid { display: flex; gap: 16px; flex-wrap: wrap; }
.detail-stat {
  flex: 1;
  min-width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 20px;
  background: var(--surface2);
  border-radius: var(--radius-sm);
}
.ds-icon { font-size: 24px; }
.ds-val { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: var(--text); }
.ds-label { font-size: 12px; color: var(--text3); text-transform: uppercase; letter-spacing: 0.5px; }

.fav-action { display: flex; }
.btn-fav-add {
  padding: 12px 24px;
  background: rgba(246,201,14,0.1);
  border: 1.5px solid rgba(240,168,104,0.3);
  border-radius: 30px;
  color: var(--gold);
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  transition: all 0.2s;
}
.btn-fav-add:hover { background: rgba(246,201,14,0.2); }
.btn-fav-remove {
  padding: 12px 24px;
  background: rgba(252,129,129,0.08);
  border: 1.5px solid rgba(224,92,122,0.2);
  border-radius: 30px;
  color: var(--error);
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
}
.btn-fav-remove:hover { background: rgba(252,129,129,0.15); }
</style>
