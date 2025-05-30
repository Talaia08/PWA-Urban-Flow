import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      console.log('App ready.')
    },
    registered () {
      console.log('Service worker registrado.')
    },
    updated () {
      console.log('Novo conteúdo disponível; recarregando...')
      window.location.reload(true)
    },
    offline () {
      console.log('Sem ligação à internet.')
    },
    error (error) {
      console.error('Erro ao registar service worker:', error)
    }
  })
}