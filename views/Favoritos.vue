<template>
  <div class="favoritos">
    <div class="page-header">
      <h1>Mis Favoritos</h1>
      <p class="page-sub">Tus ciudades guardadas, {{ usuario.nombre.split(' ')[0] }}</p>
    </div>

    <div class="add-section">
      <input
        v-model="nuevaCiudad"
        @keyup.enter="agregarCiudad"
        type="text"
        placeholder="Agregar ciudad... (ej: Santiago, osorno)"
        class="add-input"
      />
      <button @click="agregarCiudad" class="add-btn">+ Agregar</button>
    </div>

    <div v-if="favoritos.length === 0" class="empty-state">
      <div class="empty-icon">☆</div>
      <p>Todavía no tienes ciudades favoritas.</p>
      <p class="empty-hint">Busca una ciudad en el inicio y presiónala ★</p>
    </div>

    <div v-else class="cards-grid">
      <div v-for="ciudad in favoritos" :key="ciudad" class="fav-item">
        <div v-if="loadingCiudades[ciudad]" class="weather-card loading-card">
          <div class="sk-icon"></div>
          <div class="sk-text"></div>
        </div>
        <div v-else-if="climaData[ciudad]" class="weather-card">
          <div class="card-top">
            <div class="city-info">
              <span class="card-icon">{{ climaData[ciudad].icono }}</span>
              <div>
                <div class="card-city">{{ ciudad }}</div>
                <div class="card-desc">{{ climaData[ciudad].desc }}</div>
              </div>
            </div>
            <span class="card-temp">{{ formatTemp(climaData[ciudad].temp) }}</span>
          </div>
          <div class="card-actions">
            <router-link :to="`/clima/${ciudad}`" class="btn-detail">Ver detalle</router-link>
            <button @click="quitarFavorito(ciudad)" class="btn-remove">✕ Quitar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { getWeatherMock } from '../services/authService'

export default {
  name: 'Favoritos',
  data() {
    return {
      climaData: {},
      loadingCiudades: {},
      nuevaCiudad: ''
    }
  },
  computed: {
    ...mapGetters(['favoritos', 'usuario', 'preferencias'])
  },
  async mounted() {
    for (const ciudad of this.favoritos) {
      await this.cargarClima(ciudad)
    }
  },
  watch: {
    favoritos(nuevas, viejas) {
      const added = nuevas.filter(c => !viejas.includes(c))
      added.forEach(c => this.cargarClima(c))
    }
  },
  methods: {
    ...mapMutations(['ADD_FAVORITO', 'REMOVE_FAVORITO']),
    async cargarClima(ciudad) {
      if (this.climaData[ciudad]) return
      this.loadingCiudades = { ...this.loadingCiudades, [ciudad]: true }
      const data = await getWeatherMock(ciudad)
      this.climaData = { ...this.climaData, [ciudad]: data }
      const l = { ...this.loadingCiudades }
      delete l[ciudad]
      this.loadingCiudades = l
    },
    quitarFavorito(ciudad) {
      this.REMOVE_FAVORITO(ciudad)
      const d = { ...this.climaData }
      delete d[ciudad]
      this.climaData = d
    },
    agregarCiudad() {
      const c = this.nuevaCiudad.trim()
      if (!c) return
      this.ADD_FAVORITO(c)
      this.nuevaCiudad = ''
    },
    formatTemp(t) {
      if (this.preferencias.unidad === 'F') return `${Math.round(t * 9/5 + 32)}°F`
      return `${t}°C`
    }
  }
}
</script>

<style scoped>
.favoritos { display: flex; flex-direction: column; gap: 32px; }

.page-header h1 { font-size: 32px; font-weight: 800; color: var(--text); margin-bottom: 6px; }
.page-sub { color: var(--text2); font-size: 15px; }

.add-section { display: flex; gap: 12px; }
.add-input {
  flex: 1;
  padding: 12px 16px;
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: 30px;
  color: var(--text);
  font-size: 14px;
  font-family: 'Nunito', sans-serif;
  outline: none;
  transition: border-color 0.2s;
}
.add-input:focus { border-color: var(--accent); }
.add-input::placeholder { color: var(--text3); }
.add-btn {
  padding: 12px 22px;
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: 30px;
  color: var(--accent);
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s;
}
.add-btn:hover { border-color: var(--accent); background: rgba(168,85,247,0.12); }

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: var(--text2);
}
.empty-icon { font-size: 48px; margin-bottom: 12px; color: var(--gold); }
.empty-hint { font-size: 13px; color: var(--text3); margin-top: 4px; }

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.weather-card {
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  padding: 20px;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 10px rgba(168, 85, 247, 0.08);
}
.weather-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(168, 85, 247, 0.14); }

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.city-info { display: flex; align-items: center; gap: 12px; }
.card-icon { font-size: 32px; }
.card-city { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 16px; }
.card-desc { color: var(--text2); font-size: 13px; }
.card-temp { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 800; color: var(--accent); }

.card-actions { display: flex; gap: 8px; }
.btn-detail {
  flex: 1;
  padding: 8px;
  text-align: center;
  background: rgba(168,85,247,0.12);
  border: 1px solid rgba(168,85,247,0.2);
  border-radius: 8px;
  color: var(--accent);
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s;
}
.btn-detail:hover { background: rgba(168,85,247,0.22); }
.btn-remove {
  padding: 8px 14px;
  background: rgba(252,129,129,0.08);
  border: 1px solid rgba(252,129,129,0.2);
  border-radius: 8px;
  color: var(--error);
  font-size: 13px;
  transition: all 0.2s;
}
.btn-remove:hover { background: rgba(252,129,129,0.15); }

.loading-card { min-height: 110px; }
.sk-icon { width: 40px; height: 40px; border-radius: 50%; background: var(--surface2); margin-bottom: 12px; animation: pulse 1.4s infinite; }
.sk-text { width: 120px; height: 18px; background: var(--surface2); border-radius: 6px; animation: pulse 1.4s infinite; }
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
</style>
