<template>
  <div class="perfil">
    <div class="page-header">
      <div class="avatar">{{ iniciales }}</div>
      <div>
        <h1>{{ usuario.nombre }}</h1>
        <p class="page-sub">{{ usuario.email }}</p>
      </div>
    </div>

    <div class="sections">
      <div class="section-card">
        <h2>Preferencias de clima</h2>
        <p class="section-desc">Personaliza cómo se muestra la información.</p>

        <div class="pref-group">
          <div class="pref-label">Unidad de temperatura</div>
          <div class="toggle-row">
            <button
              class="toggle-btn"
              :class="{ active: preferencias.unidad === 'C' }"
              @click="cambiarUnidad('C')"
            >°C Celsius</button>
            <button
              class="toggle-btn"
              :class="{ active: preferencias.unidad === 'F' }"
              @click="cambiarUnidad('F')"
            >°F Fahrenheit</button>
          </div>
        </div>

        <div class="preview-box">
          <span class="prev-icon">🌡️</span>
          <div>
            <div class="prev-label">Ejemplo con tu unidad actual</div>
            <div class="prev-temp">{{ ejemploTemp }}</div>
          </div>
        </div>
      </div>

      <div class="section-card">
        <h2>Resumen de cuenta</h2>
        <div class="stat-row">
          <div class="stat">
            <span class="stat-value">{{ favoritos.length }}</span>
            <span class="stat-label">Ciudades favoritas</span>
          </div>
          <div class="stat">
            <span class="stat-value">{{ preferencias.unidad }}</span>
            <span class="stat-label">Unidad activa</span>
          </div>
        </div>

        <button class="btn-logout-full" @click="handleLogout">
          Cerrar sesión
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'Perfil',
  computed: {
    ...mapGetters(['usuario', 'preferencias', 'favoritos']),
    iniciales() {
      return this.usuario.nombre.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase()
    },
    ejemploTemp() {
      const base = 22
      if (this.preferencias.unidad === 'F') return `${Math.round(base * 9/5 + 32)}°F`
      return `${base}°C`
    }
  },
  methods: {
    ...mapActions(['logout']),
    ...mapMutations(['UPDATE_PREFERENCIAS']),
    cambiarUnidad(unidad) {
      this.UPDATE_PREFERENCIAS({ unidad })
    },
    async handleLogout() {
      await this.logout()
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.perfil {
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 980px;
  width: 100%;
}

.page-header {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 26px 28px;
  border-radius: 26px;
  background: rgba(168,85,247,0.1);
  border: 1px solid rgba(253,224,71,0.12);
}

.avatar {
  width: 72px;
  height: 72px;
  border-radius: 24px;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: #0a0a0a;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1.25rem;
}

.page-header h1 {
  font-size: clamp(1.8rem, 2.4vw, 2.4rem);
  margin-bottom: 6px;
}

.page-sub {
  color: var(--text2);
  font-size: 0.98rem;
}

.sections {
  display: grid;
  gap: 24px;
}

.section-card {
  padding: 28px;
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(10px);
  border-radius: 28px;
  border: 1px solid rgba(253,224,71,0.08);
  box-shadow: 0 24px 60px rgba(147,51,234,0.12);
}

.section-card h2 {
  font-size: 1.2rem;
  margin-bottom: 8px;
}

.section-desc {
  color: var(--text2);
  margin-bottom: 22px;
  max-width: 600px;
}

.pref-group {
  display: grid;
  gap: 18px;
}

.pref-label {
  color: var(--text2);
  font-size: 0.95rem;
  font-weight: 600;
}

.toggle-row {
  display: flex;
  gap: 16px;
}

.toggle-btn {
  flex: 1;
  padding: 16px 18px;
  border-radius: 20px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  color: var(--text);
  font-weight: 700;
  transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
}

.toggle-btn:hover {
  background: rgba(253,224,71,0.12);
}

.toggle-btn.active {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  border-color: rgba(253,224,71,0.25);
  color: #0a0a0a;
}

.preview-box {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 20px;
  border-radius: 22px;
  background: rgba(168,85,247,0.12);
  border: 1px solid rgba(253,224,71,0.12);
}

.prev-icon {
  width: 58px;
  height: 58px;
  display: grid;
  place-items: center;
  border-radius: 18px;
  background: rgba(253,224,71,0.18);
  font-size: 1.45rem;
}

.prev-label {
  color: var(--text2);
  margin-bottom: 6px;
}

.prev-temp {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 800;
  color: var(--primary);
}

.stat-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  margin: 22px 0;
}

.stat {
  padding: 18px;
  border-radius: 22px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(253,224,71,0.1);
}

.stat-value {
  display: block;
  font-size: 2rem;
  font-weight: 800;
  color: var(--text);
}

.stat-label {
  color: var(--text2);
  margin-top: 8px;
  display: block;
}

.btn-logout-full {
  padding: 14px 24px;
  border-radius: 22px;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: #0a0a0a;
  font-weight: 700;
  border: none;
  box-shadow: 0 16px 30px rgba(168,85,247,0.16);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn-logout-full:hover {
  transform: translateY(-1px);
  box-shadow: 0 18px 36px rgba(168,85,247,0.22);
}

@media (max-width: 780px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .toggle-row,
  .stat-row {
    grid-template-columns: 1fr;
  }
}
</style>
