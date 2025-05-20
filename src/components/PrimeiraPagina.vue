<!-- filepath: c:\UM 3º\PW\PWA-Urban-Flow\PWA Urban Flow\src\components\PrimeiraPagina.vue -->
<template>
    <div id="app" class="primeira-container">
        <div class="header">
            <div class="logo">
                <img src="@/assets/images/LogoUFpwa.png" alt="logo" class="logo-icon">
            </div>
            <h1 class="welcome-message">Urban flow</h1>
        </div>
        <div class="dots-container">
            <span class="dot active" @click="goToPage('/')"></span>
            <span class="dot" @click="goToPage('login')"></span>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: "PrimeiraPagina",
  setup() {
    const router = useRouter();

    const goToPage = (path) => {
      router.push(path);
    };

    return { goToPage };
  },
};
</script>

<style scoped>
.primeira-container {
  background-color: #0c0548; /* Fundo azul escuro */
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-icon {
  width: 150px; /* Ajuste o tamanho do logo */
  height: auto;
  margin-bottom: 20px;
}

.welcome-message {
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
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
}

.dot:nth-child(2) {
  opacity: 1; /* Destaque o ponto do meio */
}

.dot.active {
  opacity: 1;
}
</style>