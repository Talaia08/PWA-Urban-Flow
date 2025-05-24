<!-- filepath: c:\UM 3º\PW\PWA-Urban-Flow\PWA Urban Flow\src\components\Login.vue -->
<template>
  <div id="app" class="login-container">
    <div class="header">
      <div class="logo">
        <img src="@/assets/images/LogoUFpwa.png" alt="logo" class="logo-icon" />
      </div>
      <h1 class="welcome-message">Urban Flow</h1>
    </div>
    <button class="google-login" @click="loginComGoogle">
      <img src="@/assets/images/google-icon.png" alt="Google Icon" class="google-icon" />
      Sign up with Google
    </button>
    <div class="dots-container">
      <span class="dot" @click="goToPage('/')"></span>
      <span class="dot active" @click="goToPage('/login')"></span>
    </div>
  </div>
</template>

<script>
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { initializeApp } from 'firebase/app'

// 🔧 Configurações da Firebase (podes importar se já tiveres em firebase.js)
const firebaseConfig = {
  apiKey: "AIzaSyA-J0hw-UwaIqSsdM4TLxCgKivRWIgE4d4",
  authDomain: "urban-flow-e470a.firebaseapp.com",
  projectId: "urban-flow-e470a",
  storageBucket: "urban-flow-e470a.firebasestorage.app",
  messagingSenderId: "491051191298",
  appId: "1:491051191298:web:0656cc4a526d6590596b1b",
  measurementId: "G-77S9FFR2QY"
};

// Iniciar Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export default {
  name: 'LoginPage',
  methods: {
    async loginComGoogle() {
      try {
        const resultado = await signInWithPopup(auth, provider)
        const utilizador = resultado.user
        const email = utilizador.email

        // Guardar no localStorage
        localStorage.setItem('email', email)

        // Listas de emails
        const emailsPeritos = ['josetalaia47@gmail.com', 'perito2@gmail.com']
        const emailsClientes = ['hugotalaia@gmail.com', 'cliente2@gmail.com']

        // Verifica o tipo
        if (emailsPeritos.includes(email)) {
          localStorage.setItem('userType', 'perito')
        } else if (emailsClientes.includes(email)) {
          localStorage.setItem('userType', 'cliente')
        } else {
          alert('Este email não está autorizado.')
        }
        this.$router.push('/')
      } catch (erro) {
        console.error("Erro ao fazer login:", erro)
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  background-color: #0c0548;
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.google-login {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: #0c0548;
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
}

.google-icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.dots-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.dot {
  width: 10px;
  height: 10px;
  background-color: white;
  border-radius: 50%;
  margin: 0 5px;
  opacity: 0.5;
  cursor: pointer;
}

.dot.active {
  opacity: 1;
}
</style>