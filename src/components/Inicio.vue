<template>
  <div class="app"> 
    <div class="home-container">
      <div class="top-box">
        <div class="header">
          <div class="logo"></div>
          <h1 class="welcome-message">Urban Flow</h1>        
        </div>
      </div>

      <div class="occurrences-list" v-if="ultimasOcorrencias.length > 0">
        <router-link
          v-for="ocorrencia in ultimasOcorrencias"
          :key="ocorrencia.id"
          :to="`/ocorrencia/${ocorrencia.id}`"
          class="occurrence-item-link"
        >
          <div class="occurrence-item">
            <div class="occurrence-icon">
              <img
                :src="getIcon(ocorrencia.estadoOcorrencia)"
                alt="Estado"
                class="status-icon"
              />
            </div>
            <div class="occurrence-info">
              <strong>Ocorrência {{ ocorrencia.id }}</strong>
              <div class="occurrence-status-container">
                <span>{{ getStatusText(ocorrencia.estadoOcorrencia) }}</span>
              </div>
            </div>
            <div class="occurrence-arrow">
              <span class="arrow">›</span>
            </div>
          </div>
        </router-link>
      </div>

      <router-link to="/registar-ocorrencia" class="register-button-link">
        <button class="register-button">Registar Ocorrência</button>
      </router-link>

      <!-- Estrelas + Avalie-nos -->
      <div
        v-if="!avaliacaoFeita"
        class="avaliacao-preview"
        @click="$router.push('/avaliacao')"
      >
        <div class="stars">
          <img src="@/assets/images/star.png" alt="Star" class="star-icon" />
          <img src="@/assets/images/star.png" alt="Star" class="star-icon" />
          <img src="@/assets/images/star.png" alt="Star" class="star-icon" />
        </div>
        <p class="avaliar-texto">Avalie-nos</p>
      </div>
    

    <div class="footer-menu">
      <router-link to="/" class="menu-item active">
        <img src="@/assets/images/HomePageIcon.png" class="menu-icon" alt="Home" />
      </router-link>
      <router-link to="/auditorias" class="menu-item">
        <img src="@/assets/images/ocorrencia.png" class="menu-icon" alt="Ocorrencias" />
      </router-link>
      <router-link to="/perfil" class="menu-item">
        <img src="@/assets/images/ProfileIconMenu.png" class="menu-icon" alt="Perfil" />
      </router-link>
      <router-link to="/notificacoes" class="menu-item">
        <img src="@/assets/images/NotificationIcon.png" class="menu-icon" alt="Notificacoes" />
      </router-link>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'InicioPage',
  data() {
    return {
      ocorrencias: [],
      profile: {},
      nomeUtilizador: '',
      avaliacaoFeita: false,
    };
  },
  mounted() {
    const armazenadas = JSON.parse(localStorage.getItem('ocorrencias')) || [];
    this.ocorrencias = armazenadas.map((ocorrencia) => ({
      ...ocorrencia,
      estadoOcorrencia: ocorrencia.estadoOcorrencia || 'Por Resolver', // Garante que o estado esteja definido
    }));

    const userInfo = JSON.parse(localStorage.getItem('profile'));
      if (userInfo && userInfo.name) {
        this.profile = userInfo;
      }

    this.avaliacaoFeita = localStorage.getItem('avaliacaoFeita') === 'true';  
  },

  computed: {
    ultimasOcorrencias() {
      return this.ocorrencias.slice(-4).reverse(); // Pega as últimas 4 e inverte a ordem
    },
  },

  methods: {
    criarOcorrencia() {
      const ocorrencias = JSON.parse(localStorage.getItem('ocorrencias')) || [];
      const novaOcorrencia = {
        id: ocorrencias.length + 1,
        estado: 'Pendente', // Define o estado inicial como Pendente
        descricao: 'Nova ocorrência criada pelo cliente',
      };
      ocorrencias.push(novaOcorrencia);
      localStorage.setItem('ocorrencias', JSON.stringify(ocorrencias));
      this.ocorrencias = ocorrencias; // Atualiza a lista local
      alert('Ocorrência criada com sucesso!');
    },

    getIcon(estado) {
      switch (estado) {
        case 'Por Resolver':
          return require('@/assets/images/registada.png'); // Ícone para "Por Resolver"
        case 'Em andamento':
          return require ('@/assets/images/andamento.png'); // Ícone para "Em andamento"
        case 'Resolvida':
          return require ('@/assets/images/resolvida.png'); // Ícone para "Resolvida"
        default:
          return '@/assets/images/star.png'; // Ícone padrão
      }
    },
    getStatusText(estado) {
      switch (estado) {
        case 'Por Resolver':
          return 'Por Resolver!';
        case 'Em andamento':
          return 'Em Resolução';
        case 'Resolvida':
          return 'Resolvida';
        default:
          return 'Estado desconhecido';
      }
    },
  },
};
</script>

<style scoped>
.home-container {
  background:#ffffff ;
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content:space-between;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 20px;
}

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

.occurrences-list {
  width: 100%;
  max-width: 400px;
  margin-bottom: 20px;
  margin-top: 30px;
}

.occurrence-item-link {
  text-decoration: none;
}

.occurrence-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  color: black;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc;
}

.occurrence-icon {
  width: 32px;
  height: 32px;
  min-width: 32px;
  min-height: 32px;
  max-width: 32px;
  max-height: 32px;
  object-fit: contain;
  display: block;
}

.status-icon {
  width: 32px;
  height: 32px;
  min-width: 32px;
  min-height: 32px;
  max-width: 32px;
  max-height: 32px;
  object-fit: contain;
  display: block;
}

.occurrence-info {
  flex-grow: 1;
  text-align: left;
}

.occurrence-info strong {
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
}

.occurrence-status-container {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: #666;
}

.occurrence-arrow {
  font-size: 18px;
  color: #888;
}


.pending {
  background-color: red;
}

.resolving {
  background-color: yellow;
}

.enviada {
  background-color: green;
}

.register-button {
  background-color: #00aaff;
  color: white;
  border: none;
  border-radius: 25px;
  padding: 15px 30px;
  font-size: 1em;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 70px;
  cursor: pointer;
  width: 90%;
  max-width: 400px;
}

.register-button:hover {
  background-color: #0090dd;
}

.register-button-link {
  margin-top: auto;
  text-decoration: none;
  width: 100%;
  max-width: 400px;
  display: flex;
  justify-content: center;
}

.avaliacao-preview {
  margin-top: 10px;
  margin-bottom: 20px;
  text-align: center;
  cursor: pointer;
}

.stars {
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-bottom: 5px;
}

.star-icon {
  width: 20px;
  height: 20px;
}

.avaliar-texto {
  font-size: 14px;
  color: #0C0548;
}

.footer-menu {
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 400px;
  padding: 10px 0;
  background-color: white;
  border-top: 1px solid white;
  position: fixed;
  bottom: 0;
  z-index: 1000;
}

.footer-menu .menu-item {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer-menu .menu-icon {
  width: 30px;
  height: 30px;
}

.footer-menu .menu-item.active .menu-icon {
  filter: brightness(1.5);
}


</style>
