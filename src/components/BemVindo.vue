<template>
  <div id="app" class="welcome-container">
    <div class="welcome-screen">
      <div class="profile-icon"></div>
      <p class="welcome-message">Bem Vindo à Nossa App!</p>
      <p class="account-ready-message">A tua conta está pronta para ser utilizada, vamos redirecionar-te para a página principal em poucos segundos.</p>
    </div>
    <div class="navigation-dots">
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </div>
  </div>
</template>

<script>
import '../assets/css/style.css'; // Importando o CSS global

export default {
  name: 'BemVindo',
}
</script>

<style scoped>
.welcome-container {
  background-color: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Alinha os elementos ao longo do eixo principal */
}

.welcome-screen {
  text-align: center;
  flex-grow: 1; /* Faz com que a tela de boas-vindas ocupe o espaço disponível */
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.profile-icon {
  width: 147px;
  height: 147px;
  flex-shrink: 0;
  border-radius: 147px;
  background: url('@/assets/images/profile-icon.png') lightgray 50% / cover no-repeat;
  margin: 0 auto; /* Centraliza a imagem */
}

.welcome-message {
  font-size: 1.5em;
}

.account-ready-message {
  font-size: 1em;
}

.navigation-dots {
  display: flex;
  justify-content: center;
  margin-bottom: 20px; /* Ajusta a margem inferior conforme necessário */
}

.dot {
  height: 10px;
  width: 10px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  margin: 0 5px;
}
</style>