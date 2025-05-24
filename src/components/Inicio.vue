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
        <div
          v-for="ocorrencia in ultimasOcorrencias"
          :key="ocorrencia.id"
          class="occurrence-item-link"
        >
          <div class="occurrence-item">
            <div class="occurrence-main">
              <strong>{{ ocorrencia.tipo }}</strong>
              <span class="occurrence-date">{{ ocorrencia.dataHora }}</span>
            </div>
            <span :class="estadoClasse(ocorrencia.estadoOcorrencia)">
              {{ getStatusText(ocorrencia.estadoOcorrencia) }}
            </span>
            <span
              class="arrow"
              :class="{ open: ocorrenciaAberta === ocorrencia.id }"
              @click.stop="toggleOcorrencia(ocorrencia.id)"
              style="cursor: pointer;"
            >›</span>

            <!-- Detalhes da Ocorrência (Expandido) DENTRO do card -->
            <div
              v-if="ocorrenciaAberta === ocorrencia.id"
              class="card-details"
              style="width: 100%;"
            >
              <p><strong>Localização:</strong> {{ ocorrencia.localizacao }}</p>
              <p><strong>Descrição do Utilizador:</strong> {{ ocorrencia.descricao }}</p>
              <div v-if="Array.isArray(ocorrencia.ficheiro) && ocorrencia.ficheiro.length">
                <div class="detalhe-imagens">
                <span class="foto-label"><strong>Foto/Vídeo:</strong></span>
                  <img
                    v-for="(img, idx) in ocorrencia.ficheiro.filter(f => !!f)"
                    :key="idx"
                    :src="img"
                    alt="Foto da ocorrência"
                    class="foto-ocorrencia"
                  />
                </div>
              </div>
              <div v-else-if="ocorrencia.ficheiro">
                <div class="detalhe-imagens">
                <span class="foto-label"><strong>Foto/Vídeo:</strong></span>
                  <img
                    :src="ocorrencia.ficheiro"
                    alt="Foto da ocorrência"
                    class="foto-ocorrencia"
                  />
                </div>
              </div>
              <div v-else>
                <span class="foto-label"><strong>Foto/Vídeo:</strong> Não disponível</span>
              </div>
            </div>
          </div>
        </div>
      </div>

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


      <router-link to="/registar-ocorrencia" class="register-button-link">
        <button class="register-button">Registar Ocorrência</button>
      </router-link>

      <!-- Estrelas + Avalie-nos -->
      
    

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
      ocorrenciaAberta: null,
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

    toggleOcorrencia(id) {
      this.ocorrenciaAberta = this.ocorrenciaAberta === id ? null : id;
    },

    estadoClasse(estado) {
    switch ((estado || '').toLowerCase()) {
      case 'por resolver':
        return 'estado-tag estado-vermelho';
      case 'em andamento':
      case 'em resolução':
        return 'estado-tag estado-amarelo';
      case 'resolvida':
        return 'estado-tag estado-verde';
      default:
        return 'estado-tag';
    }
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
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f6f6f6;
  min-height: 100vh;
  width: 100%;
  padding-bottom: 120px;
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
  position: relative;
  flex-wrap: wrap; /* permite que os detalhes fiquem em baixo */
}

.occurrence-main strong {
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
}

.occurrence-main {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.occurrence-date {
  display: block;
  font-size: 12px;
  color: #888;
  margin-top: 5px;
  margin-bottom: 2px;
}

.estado-tag {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
  margin-left: auto;
  margin-bottom: 2px;
  margin-right: 15px;
  color: #333;
  background: #eee;
  white-space: nowrap;
}

.estado-vermelho {
  background: #ffe5e5;
  color: #d32f2f;
}

.estado-amarelo {
  background: #fff8e1;
  color: #fbc02d;
}

.estado-verde {
  background: #e0f7fa;
  color: #34a853;
}

.arrow {
  margin-left: auto;
  font-size: 20px;
  color: #888;
  transform: rotate(0deg);
  transition: transform 0.3s ease;
}

.arrow.open {
  transform: rotate(90deg);
}

.card-details {
  margin-top: 10px;
  font-size: 14px;
  color: #555;
  width: 100%;
  flex-basis: 100%;
}

.foto-label {
  display: block;
  margin-bottom: 4px;
  text-align: left;
  width: 100%;
}

.detalhe-imagens {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

.foto-ocorrencia {
  display: block;
  max-width: 120px;
  max-height: 90px;
  width: auto;         /* Não força a ocupar 100% do container */
  height: auto;
  margin-bottom: 8px;
  border-radius: 8px;
  object-fit: contain; /* Mostra a imagem inteira, sem cortar */
  background: #f6f6f6; /* Opcional: fundo claro para imagens pequenas */
}

.register-button {
  background-color: #00aaff;
  color: white;
  border: none;
  border-radius: 25px;
  padding: 15px 30px;
  font-size: 1em;
  font-weight: bold;
  margin-bottom: 90px;
  cursor: pointer;
  width: 90%;
  max-width: 400px;
}

.register-button:hover {
  background-color: #0090dd;
}

.register-button-link {
  margin-top: 0px;
  text-decoration: none;
  width: 100%;
  max-width: 400px;
  display: flex;
  justify-content: center;
}

.avaliacao-preview {
  margin-top: 80px;
  margin-bottom: 0px;
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
