# WeatherApp — Módulo 7

App de clima con sistema de usuarios, autenticación y estado global con Vuex.

## Sistema de usuarios

Cada usuario almacena:
- `nombre` y `email`
- `preferencias`: unidad de temperatura (`C` o `F`)
- `favoritos`: array de ciudades guardadas

La autenticación es simulada (mock). Los datos del usuario logueado se persisten en `localStorage` vía Vuex.

## Rutas

| Ruta | Acceso | Descripción |
|------|--------|-------------|
| `/` | Público | Home con buscador de clima |
| `/login` | Público | Formulario de inicio de sesión |
| `/registro` | Público | Formulario de creación de cuenta |
| `/clima/:ciudad` | Público | Detalle del clima de una ciudad |
| `/favoritos` | **Privado** | Lista de ciudades favoritas del usuario |
| `/perfil` | **Privado** | Preferencias del usuario y cierre de sesión |

Las rutas privadas redirigen a `/login` si el usuario no está autenticado (guard en Vue Router).

## Cuentas de prueba
```
Email: camila@skater.com   Contraseña: skate
Email: andrea@skater.com  Contraseña: Ollie
```

## Instalación y uso

```bash
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173)

## Stack

- Vue 3
- Vue Router 4
- Vuex 4
- Vite
- Autenticación mock (sin backend)

## Repositorio

[https://github.com/tu-usuario/weather-app-m7](https://github.com/tu-usuario/weather-app-m7)
