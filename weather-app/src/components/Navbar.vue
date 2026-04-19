<template>
  <nav class="navbar">
    <router-link to="/" class="brand">
      <span class="brand-name">Clima Click</span>
    </router-link>

    <div class="nav-links">
      <router-link to="/" class="nav-link">Inicio</router-link>
      <template v-if="isAuthenticated">
        <router-link to="/favoritos" class="nav-link">Favoritos</router-link>
        <router-link to="/perfil" class="nav-link">Perfil</router-link>
      </template>
    </div>

    <div class="nav-auth">
      <template v-if="isAuthenticated">
        <span class="user-chip">
          <span class="user-dot"></span>
          {{ usuario.nombre.split(' ')[0] }}
        </span>
        <button class="btn-logout" @click="handleLogout">Salir</button>
      </template>
      <template v-else>
        <router-link to="/login" class="btn-login">Iniciar sesión</router-link>
        <router-link to="/registro" class="btn-register">Registrarse</router-link>
      </template>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Navbar',
  computed: {
    ...mapGetters(['isAuthenticated', 'usuario'])
  },
  methods: {
    ...mapActions(['logout']),
    async handleLogout() {
      await this.logout()
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 18px;
  z-index: 10;

  margin: 16px auto;
  max-width: 1100px;
  width: calc(100% - 32px);

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  padding: 16px 20px;
  border-radius: 24px;
  background: rgba(20, 14, 35, 0.92);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(253,224,71,0.08);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--text);
  font-weight: 700;
}

.brand-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 14px;
  background: rgba(253,224,71,0.18);
  color: var(--primary);
  font-size: 1.1rem;
}

.brand-name {
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--text);
}

.nav-links {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.nav-link {
  color: var(--text2);
  padding: 10px 14px;
  border-radius: 14px;
  transition: all 0.2s ease;
}

.nav-link:hover {
  background: rgba(168,85,247,0.16);
  color: var(--text);
}

.nav-auth {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.btn-login,
.btn-logout {
  min-width: 120px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  border-radius: 14px;
  color: var(--text2);
  background: rgba(255,255,255,0.04);
  transition: background 0.2s ease, color 0.2s ease;
}

.btn-login:hover,
.btn-logout:hover {
  background: rgba(255,255,255,0.1);
  color: var(--text);
}

.btn-register {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 18px;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  font-weight: 700;
}

.user-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 16px;
  background: rgba(168,85,247,0.18);
  color: var(--text);
  font-size: 0.95rem;
}

.user-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
}

@media (max-width: 760px) {
  .navbar {
    flex-direction: column;
    align-items: stretch;
  }
  .nav-links {
    justify-content: center;
  }
  .nav-auth {
    justify-content: center;
  }
}
</style>
