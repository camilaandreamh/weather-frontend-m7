<template>
  <div class="auth-page">
    <div class="auth-card">
      <div class="auth-logo">⛅</div>
      <h1 class="auth-title">Bienvenido</h1>
      <p class="auth-sub">Inicia sesión para acceder a tus favoritos</p>

      <div v-if="errorAuth" class="alert-error">
        <span>⚠</span> {{ errorAuth }}
      </div>

      <div class="hint-box">
        <p class="hint-title">Cuentas de prueba</p>
        <div class="hint-row"><span>camila@skater.com</span><span class="hint-pass">skate</span></div>
        <div class="hint-row"><span>andrea@skater.com</span><span class="hint-pass">Ollie</span></div>
      </div>

      <form class="auth-form" @submit.prevent="handleLogin">
        <div class="field">
          <label>Email</label>
          <input v-model="form.email" type="email" placeholder="tu@email.com" required />
        </div>
        <div class="field">
          <label>Contraseña</label>
          <input v-model="form.password" type="password" placeholder="••••••••" required />
        </div>
        <button type="submit" class="btn-submit" :disabled="loadingAuth">
          <span v-if="loadingAuth" class="spinner"></span>
          {{ loadingAuth ? 'Verificando...' : 'Iniciar sesión' }}
        </button>
      </form>

      <p class="auth-footer">
        ¿No tienes cuenta?
        <router-link to="/registro">Regístrate gratis</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      form: { email: '', password: '' }
    }
  },
  computed: {
    ...mapGetters(['loadingAuth', 'errorAuth', 'isAuthenticated'])
  },
  mounted() {
    if (this.isAuthenticated) this.$router.push('/')
  },
  methods: {
    ...mapActions(['login']),
    async handleLogin() {
      const ok = await this.login(this.form)
      if (ok) {
        const redirect = this.$route.query.redirect || '/'
        this.$router.push(redirect)
      }
    }
  }
}
</script>

<style scoped>
.auth-page {
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
}

.auth-card {
  width: min(520px, 100%);
  background: rgba(20, 14, 35, 0.92);
  backdrop-filter: blur(18px);
  border-radius: 28px;
  padding: 40px 36px;
  border: 1px solid rgba(253,224,71,0.08);
  box-shadow: 0 24px 80px rgba(147, 51, 234, 0.16);
}

.auth-logo {
  width: 56px;
  height: 56px;
  display: grid;
  place-items: center;
  border-radius: 18px;
  background: rgba(253,224,71,0.16);
  color: var(--primary);
  font-size: 1.8rem;
  margin-bottom: 22px;
}

.auth-title {
  font-size: 2rem;
  margin-bottom: 10px;
}

.auth-sub {
  color: var(--text2);
  margin-bottom: 24px;
}

.alert-error {
  margin-bottom: 20px;
  padding: 14px 16px;
  border-radius: 18px;
  background: rgba(251,113,133,0.12);
  border: 1px solid rgba(251,113,133,0.25);
  color: var(--error);
}

.hint-box {
  margin-bottom: 22px;
  padding: 16px 18px;
  border-radius: 18px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
}

.hint-title {
  font-weight: 700;
  margin-bottom: 10px;
}

.hint-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
  color: var(--text2);
}

.hint-pass {
  color: var(--text);
  font-weight: 600;
}

.auth-form {
  display: grid;
  gap: 18px;
}

.field label {
  display: block;
  margin-bottom: 8px;
  color: var(--text2);
  font-size: 0.95rem;
}

input {
  width: 100%;
  padding: 14px 16px;
  border-radius: 16px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  color: var(--text);
}

input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 4px rgba(253,224,71,0.12);
}

.btn-submit {
  width: 100%;
  padding: 16px 20px;
  border-radius: 18px;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  font-weight: 700;
  transition: transform 0.2s ease;
}

.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-1px);
}

.spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.5);
  border-top-color: white;
  border-radius: 50%;
  margin-right: 8px;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.auth-footer {
  margin-top: 18px;
  color: var(--text2);
}

a {
  color: var(--primary);
}
</style>
