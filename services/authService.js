const USERS = [
  {
    id: 1,
    nombre: 'Camila Molina',
    email: 'camila@skater.com',
    password: 'skate',
    preferencias: { unidad: 'C', tema: 'dark' },
    favoritos: ['Santiago', 'Valdivia', 'Arica']
  },
  {
    id: 2,
    nombre: 'Andrea Molina',
    email: 'andrea@skater.com',
    password: 'Ollie',
    preferencias: { unidad: 'F', tema: 'dark' },
    favoritos: ['Santiago', 'Valparaíso']
  }
]

export function loginMock(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = USERS.find(u => u.email === email && u.password === password)
      if (user) {
        const { password: _, ...safeUser } = user
        resolve(safeUser)
      } else {
        reject(new Error('Usuario o contraseña incorrectos'))
      }
    }, 600)
  })
}

export function registerMock(nombre, email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const exists = USERS.find(u => u.email === email)
      if (exists) {
        reject(new Error('El email ya está registrado'))
        return
      }
      const newUser = {
        id: USERS.length + 1,
        nombre,
        email,
        password,
        preferencias: { unidad: 'C', tema: 'dark' },
        favoritos: []
      }
      USERS.push(newUser)
      const { password: _, ...safeUser } = newUser
      resolve(safeUser)
    }, 600)
  })
}

export const WEATHER_MOCK = {
  Santiago: { temp: 22, desc: 'Soleado', humedad: 45, viento: 12, icono: '☀️' },
  Valparaíso: { temp: 18, desc: 'Nublado costero', humedad: 72, viento: 20, icono: '☁️' },
  Antofagasta: { temp: 20, desc: 'Soleado', humedad: 60, viento: 14, icono: '☀️' },
  Iquique: { temp: 21, desc: 'Nublado matinal', humedad: 78, viento: 16, icono: '🌥️' },
  Copiapó: { temp: 25, desc: 'Despejado', humedad: 30, viento: 12, icono: '☀️' },
  Rancagua: { temp: 23, desc: 'Soleado', humedad: 50, viento: 11, icono: '🌤️' },
  Talca: { temp: 20, desc: 'Cielo despejado', humedad: 55, viento: 13, icono: '☀️' },
  Concepción: { temp: 16, desc: 'Lluvia ligera', humedad: 85, viento: 22, icono: '🌧️' },
  Temuco: { temp: 14, desc: 'Lluvioso', humedad: 90, viento: 18, icono: '🌧️' },
  Valdivia: { temp: 13, desc: 'Lluvia constante', humedad: 92, viento: 20, icono: '🌧️' },
  Osorno: { temp: 12, desc: 'Nublado con lluvias', humedad: 88, viento: 17, icono: '🌦️' },
  Coyhaique: { temp: 8, desc: 'Frío y nublado', humedad: 70, viento: 15, icono: '☁️' },
  Arica: { temp: 24, desc: 'Soleado', humedad: 65, viento: 10, icono: '☀️' },
  Chillán: { temp: 18, desc: 'Parcialmente nublado', humedad: 60, viento: 14, icono: '⛅' }
}

export function getWeatherMock(ciudad) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = WEATHER_MOCK[ciudad] || {
        temp: Math.floor(Math.random() * 30),
        desc: 'Variable',
        humedad: Math.floor(Math.random() * 60) + 30,
        viento: Math.floor(Math.random() * 20) + 5,
        icono: '🌡️'
      }
      resolve({ ciudad, ...data })
    }, 400)
  })
}
