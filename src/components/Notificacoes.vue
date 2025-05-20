<template>
  <div class="notificacoes-container">
    <!-- Top Box -->
    <div class="top-box">
      <button class="back-button" @click="$router.back()">←</button>
      <div class="header">
          <div class="logo"></div>
          <h1 class="welcome-message">Notificações</h1>        
      </div>
    </div>

    <!-- Lista de Notificações -->
    <div class="notificacao-list">
      <div
        v-for="(notificacao, idx) in notificacoes"
        :key="notificacao.id"
        class="notificacao-item"
        :class="notificacao.estado"
        @touchstart="startSwipe($event, idx)"
        @touchmove="onSwipe($event, idx)"
        @touchend="endSwipe(idx)"
        :style="{ transform: notificacao.offset ? `translateX(${notificacao.offset}px)` : '' }"
      >
        <img :src="notificacao.icon" class="icon" />
        <div>
          <strong>Ocorrência {{ notificacao.id }}</strong>
          <p>{{ notificacao.mensagem }}</p>
        </div>
        <button
          v-if="notificacao.showDelete"
          class="delete-btn"
          @click="apagarNotificacao(idx)"
        >
          Apagar
        </button>
      </div>
    </div>

    <!-- Footer Menu -->
    <div class="footer-menu">
      <router-link to="/" class="menu-item">
        <img src="@/assets/images/HomePageIcon.png" class="menu-icon" />
      </router-link>
      <router-link to="/auditorias" class="menu-item">
        <img src="@/assets/images/ocorrencia.png" class="menu-icon" />
      </router-link>
      <router-link to="/perfil" class="menu-item">
        <img src="@/assets/images/ProfileIconMenu.png" class="menu-icon" />
      </router-link>
      <router-link to="/notificacoes" class="menu-item active">
        <img src="@/assets/images/NotificationIcon.png" class="menu-icon" />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotificacoesView',
  data() {
    return {
      notificacoes: [],
      startX: 0,
      swipingIdx: null,
    };
  },
  mounted() {
    const ocorrencias = JSON.parse(localStorage.getItem('ocorrencias')) || [];

    // Gerar notificações com base no estado das ocorrências
    this.notificacoes = ocorrencias.map((ocorrencia) => {
      let mensagem = '';
      let icon = '';
      let estado = '';

      const estadoNormalizado = ocorrencia.estadoOcorrencia?.toLowerCase();

      if (estadoNormalizado === 'em andamento') {
        mensagem = 'A sua ocorrência está em andamento!';
        icon = require('@/assets/images/andamento.png'); // Caminho corrigido
        estado = 'andamento';
      } else if (estadoNormalizado === 'resolvida') {
        mensagem = 'Informamos que já foi resolvida!';
        icon = require('@/assets/images/resolvida.png'); // Caminho corrigido
        estado = 'resolvida';
      } else if (estadoNormalizado === 'por resolver') {
        mensagem = 'Ocorrencia registada com sucesso!';
        icon = require('@/assets/images/registada.png'); // Caminho corrigido
        estado = 'registada';
      } else {
        mensagem = 'Estado desconhecido para esta ocorrência.';
        icon = require('@/assets/images/star.png'); // Adicione um ícone para estados desconhecidos
        estado = 'desconhecido';
      }

      return {
        id: ocorrencia.id,
        mensagem,
        icon,
        estado,
      };
    });
    this.notificacoes.forEach(n => {
      n.offset = 0;
      n.showDelete = false;
    });
  },

  methods: {
    startSwipe(e, idx) {
      this.startX = e.touches[0].clientX;
      this.swipingIdx = idx;
    },
    onSwipe(e, idx) {
      const deltaX = e.touches[0].clientX - this.startX;
      if (deltaX < -30) { // só arrasta para a esquerda
        this.notificacoes[idx].offset = deltaX;
        if (Math.abs(deltaX) > 80) {
          this.notificacoes[idx].showDelete = true;
          this.notificacoes[idx].offset = -100; // valor fixo para mostrar botão
        } else {
          this.notificacoes[idx].showDelete = false;
        }
      }
    },
    endSwipe(idx) {
      if (!this.notificacoes[idx].showDelete) {
        this.notificacoes[idx].offset = 0;
      }
      this.swipingIdx = null;
    },
    apagarNotificacao(idx) {
      this.notificacoes.splice(idx, 1);
      localStorage.setItem('notificacoes', JSON.stringify(this.notificacoes));
    },
  },
};
</script>

<style scoped>
/* Container Principal */
.notificacoes-container {
  background-color: white;
  color: black;
  padding: 0;
  padding-bottom: 100px;
  min-height: 100vh;
  box-sizing: border-box;
}

/* Botão Voltar */
.back-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  top: 20px;
  left: 20px;
  color: white;
}

/* Top Box */
.top-box {
  width: 101vw;
  height: 160px;
  background: #0C0548 ;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 60px;
}

.top-box .header {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 70px;
}

.top-box .logo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: url('@/assets/images/LogoUFpwa.png') lightgray 50% / cover no-repeat;
  margin-bottom: 10px;
}

.welcome-message {
  font-size: 1.5em;
  color: white;
  margin: 0px 0;
  margin-top: 10px;
}

/* Lista de Notificações */
.notificacao-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
}

.notificacao-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 15px;
  background-color: #f8f8f8;
}

.icon {
  width: 24px;
  margin-top: 5px;
}

/* Estilos por Estado */
.andamento {
  border-left: 5px solid #ff9900;
}

.resolvida {
  border-left: 5px solid #007bff;
}

.registada {
  border-left: 5px solid #ff0077;
}

.notificacao-item {
  position: relative;
  transition: transform 0.2s;
  background: #f8f8f8;
  overflow: hidden;
}

.delete-btn {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: #ff0033;
  color: #fff;
  border: none;
  font-size: 1.2em;
  z-index: 2;
  transition: background 0.2s;
}

/* Footer Menu */
.footer-menu {
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 10px 0;
  background-color: white;
  border-top: 1px solid white;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}

.menu-icon {
  width: 30px;
  height: 30px;
}

.active .menu-icon {
  filter: brightness(1.5);
}
</style>