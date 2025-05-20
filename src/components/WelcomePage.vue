<!-- filepath: c:\UM 3º\PW\PWA-Urban-Flow\PWA Urban Flow\src\components\WelcomePage.vue -->
<template>
  <div id="app" class="welcome-container">
    <div class="icon-container">
        <div class="user-icon">
            <img src="@/assets/images/user-icon1.png" alt="User Icon" />
        </div>
      <div class="decorations">
        <img src="@/assets/images/resolvida.png" class="resolvida1">
        <img src="@/assets/images/resolvida.png" class="resolvida2">
        <img src="@/assets/images/resolvida.png" class="resolvida3">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
    </div>
    <h1 class="welcome-message">Bem Vindo à Nossa App!</h1>
    <p class="redirect-message">
      A tua conta está pronta para ser utilizada,<br> vamos redirecionar-te para a página<br> principal em poucos segundos.
    </p>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: "WelcomePage",
  setup() {
    const router = useRouter();

    onMounted(() => {
      setTimeout(() => {
        // Verifica o tipo de usuário no localStorage
        const userType = localStorage.getItem('userType'); // 'perito' ou 'cliente'
        if (userType === 'perito') {
          router.push('/inicio-peritos'); // Redireciona para a página dos peritos
        } else {
          router.push('/inicio'); // Redireciona para a página dos clientes
        }
      }, 5000); // Redireciona após 5 segundos
    });
  },
};
</script>

<style scoped>
.welcome-container {
  background-color: white;
  color: #0c0548;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  padding-bottom: 100px;
  box-sizing: border-box;
}

.icon-container {
  position: relative;
  margin-bottom: 20px;
}

.user-icon img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid #0c0548;
  background-image: url('../assets/images/Ellipse.png');
}

.ellipse img {
    width: 147px;
    height: 147px;
    flex-shrink: 0;
    border-radius: 147px;
    border: 1px solid #000;
    background: url('../assets/images/user-icon1.png') lightgray 50% / cover no-repeat;
}

.decorations .dot {
  width: 10px;
  height: 10px;
  background-color: #0c0548;
  border-radius: 50%;
  position: absolute;
}

.decoration .resolvida1{
    width: 24.912px;
    height: 37px;
    flex-shrink: 0;
    aspect-ratio: 24.91/37.00
}

.decoration .resolvida2{
    width: 24.965px;
    height: 36.993px;
    transform: rotate(-19.977deg);
    flex-shrink: 0;
    aspect-ratio: 24.96/36.99;
    background: url('../assets/images/user-icon1.png') lightgray 50% / cover no-repeat;
}

.decoration .resolvida3{
    width: 24.965px;
    height: 36.993px;
    transform: rotate(19.977deg);
    flex-shrink: 0;
    aspect-ratio: 24.96/36.99;
}

.decorations .dot:nth-child(1) {
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
}

.decorations .dot:nth-child(2) {
  top: 50%;
  left: -20px;
  transform: translateY(-50%);
}

.decorations .dot:nth-child(3) {
  top: 50%;
  right: -20px;
  transform: translateY(-50%);
}

.decorations .dot:nth-child(4) {
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
}

.decorations .dot:nth-child(5) {
  top: -10px;
  right: -10px;
}

.welcome-message {
    weight: 352px;
    height: 40px;
    color: var(--Color-Blackl, #1E1D1D);
    font-family: Raleway;
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: 126%; /* 40.32px */
    letter-spacing: -0.64px;
}

.redirect-message {
    width: 327px;
    color: var(--Color-Blackl, #1E1D1D);
    text-align: center;
    font-family: Raleway;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}
</style>