<template>
  <div class="home">
    <div class="hero">
      <h1 class="hero-title">Bienvenido a Clima Click</h1>
      <p class="hero-sub">Crea tu cuenta y guarda tus lugares favoritos.</p>
    </div>

    <div class="search-bar">
      <input
        v-model="busqueda"
        @keyup.enter="buscarClima"
        type="text"
        placeholder="Buscar ciudad... (ej: Santiago, Valdivia, Osorno)"
        class="search-input"
      />
      <button @click="buscarClima" class="search-btn" :disabled="loadingSearch">
        {{ loadingSearch ? '...' : 'Buscar' }}
      </button>
    </div>

    <div v-if="errorSearch" class="alert-error">{{ errorSearch }}</div>

    <div v-if="resultado" class="result-section">
      <WeatherCard :data="resultado" :showFav="true" />
      <router-link :to="`/clima/${resultado.ciudad}`" class="link-detail">Ver detalle completo →</router-link>
    </div>

    <div class="cities-section">
      <h2 class="section-title">Ciudades destacadas</h2>
      <div class="cities-grid">
        <div
          v-for="ciudad in ciudadesDestacadas"
          :key="ciudad"
          class="city-btn"
          @click="cargarCiudad(ciudad)"
        >
          <span class="city-icon">{{ iconosPorCiudad[ciudad] || '🌍' }}</span>
          {{ ciudad }}
        </div>
      </div>
    </div>

    <div v-if="!isAuthenticated" class="cta-banner">
      <div class="cta-text">
        <strong>¿Quieres guardar tus lugares favoritos?</strong>
        <span>Crea una cuenta o inicia sesión para personalizar tu experiencia.</span>
      </div>
      <div class="cta-btns">
        <router-link to="/login" class="cta-login">Iniciar sesión</router-link>
        <router-link to="/registro" class="cta-reg">Crear cuenta</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getWeatherMock, WEATHER_MOCK } from '../services/authService'
import WeatherCard from '../components/WeatherCard.vue'

export default {
  name: 'Home',
  components: { WeatherCard },
  data() {
    return {
      busqueda: '',
      resultado: null,
      loadingSearch: false,
      errorSearch: null,
      ciudadesDestacadas: ['Santiago', 'Valparaíso', 'Osorno', 'Valdivia'],
      iconosPorCiudad: {
        Santiago: '🇨🇱', 'Valparaíso': '🇨🇱', 'Osorno': '🇨🇱', 'Valdivia': '🇨🇱'
      }
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  methods: {
    async buscarClima() {
      if (!this.busqueda.trim()) return
      this.loadingSearch = true
      this.errorSearch = null
      try {
        this.resultado = await getWeatherMock(this.busqueda.trim())
      } catch {
        this.errorSearch = 'No se pudo obtener el clima.'
      } finally {
        this.loadingSearch = false
      }
    },
    async cargarCiudad(ciudad) {
      this.busqueda = ciudad
      await this.buscarClima()
    }
  }
}
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 36px;
}

.hero {
  max-width: 720px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.hero-title {
  font-size: clamp(2.8rem, 5vw, 4.4rem);
  line-height: 1.03;
  letter-spacing: -0.04em;
}

.accent {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.hero-sub {
  color: var(--text2);
  max-width: 680px;
  font-size: 1rem;
}

.search-bar {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}

.search-input {
  flex: 1;
  min-width: 220px;
  max-width: 500px;
  padding: 16px 18px;
  border-radius: 18px;
  border: 1px solid var(--border);
  background: rgba(255,255,255,0.06);
  color: var(--text);
}

.search-input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 4px rgba(253,224,71,0.12);
}

.search-btn {
  min-width: 140px;
  padding: 16px 22px;
  border-radius: 18px;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  font-weight: 700;
}

.alert-error {
  max-width: 680px;
  padding: 14px 18px;
  border-radius: 18px;
  background: rgba(251,113,133,0.1);
  border: 1px solid rgba(251,113,133,0.25);
  color: var(--error);
}

.result-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.link-detail {
  align-self: flex-start;
  color: var(--primary);
  font-weight: 700;
  transition: color 0.2s ease;
}

.link-detail:hover {
  color: var(--secondary);
}

.cities-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-title {
  font-size: 1.2rem;
  font-weight: 700;
}

.cities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 14px;
}

.city-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px;
  border-radius: 18px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.08);
  color: var(--text);
  transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
}

.city-btn:hover {
  transform: translateY(-2px);
  background: rgba(168,85,247,0.16);
  border-color: rgba(168,85,247,0.28);
}

.city-icon {
  font-size: 1.1rem;
}

.cta-banner {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 18px;
  align-items: center;
  padding: 24px;
  border-radius: 24px;
  background: rgba(20, 14, 35, 0.88);
  border: 1px solid rgba(253,224,71,0.08);
}

.cta-text {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: var(--text2);
}

.cta-login,
.cta-reg {
  padding: 14px 20px;
  border-radius: 18px;
  font-weight: 700;
  transition: background 0.2s ease, opacity 0.2s ease;
}

.cta-login {
  color: var(--text);
  background: rgba(168,85,247,0.16);
}

.cta-reg {
  color: white;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
}

.cta-login:hover {
  background: rgba(168,85,247,0.26);
}

.cta-reg:hover {
  opacity: 0.96;
}

@media (max-width: 760px) {
  .hero-title {
    font-size: 2.6rem;
  }
  .search-bar {
    flex-direction: column;
    align-items: stretch;
  }
  .cta-banner {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
