<template>
  <div class="ocorrencias-page">
    <!-- Top Box -->
    <div class="top-box">
      <div class="header">
          <div class="logo"></div>
          <h1 class="welcome-message">Ocorrências</h1>        
      </div>
    </div>

    <!-- Lista de Ocorrências -->
    <div class="ocorrencias-list">
      <div
        v-for="ocorrencia in ocorrencias"
        :key="ocorrencia.id"
        class="ocorrencia-card"
      >
        <!-- Cabeçalho da Ocorrência -->
        <div class="card-header" @click="toggleOcorrencia(ocorrencia.id)">
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
            >
              ›
            </span>
          </div>
        </div>

        <!-- Detalhes da Ocorrência (Expandido) -->
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

    <!-- Modal de Imagens -->
    <div v-if="mostrarModal" class="modal-overlay" @click.self="fecharModal">
      <div class="modal-content">
        <button class="modal-arrow left" @click="imagemAnterior">‹</button>
        <img :src="imagemAtual" class="modal-image" alt="Imagem da Ocorrência" />
        <button class="modal-arrow right" @click="proximaImagem">›</button>
        <button class="modal-close" @click="fecharModal">×</button>
      </div>
    </div>

    <!-- Footer Menu -->
    <div class="footer-menu">
      <router-link to="/" class="menu-item">
        <img src="@/assets/images/HomePageIcon.png" class="menu-icon" alt="Home" />
      </router-link>
      <router-link to="/auditorias" class="menu-item active">
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
</template>

<script>
export default {
  name: 'OcorrenciasPage',
  data() {
    return {
      ocorrencias: [], // Lista de ocorrências
      ocorrenciaAberta: null, // ID da ocorrência atualmente aberta
      mostrarModal: false, // Controle do modal
      indiceImagemAtual: 0, // Índice da imagem atual no modal
      imagensAtuais: [],
    };
  },
  computed: {
    imagemAtual() {
      return this.imagensAtuais[this.indiceImagemAtual];
    },
  },
  methods: {
    toggleOcorrencia(id) {
      // Alterna o estado da ocorrência aberta
      this.ocorrenciaAberta = this.ocorrenciaAberta === id ? null : id;
    },
    abrirModal(indiceOcorrencia) {
      // Abre o modal com as imagens da ocorrência
      this.imagensAtuais = this.ocorrencias[indiceOcorrencia].ficheiro || [];
      this.indiceImagemAtual = 0;
      this.mostrarModal = true;
    },
    fecharModal() {
      // Fecha o modal
      this.mostrarModal = false;
      this.imagensAtuais = [];
      this.indiceImagemAtual = 0;
    },
    proximaImagem() {
      // Navega para a próxima imagem
      if (this.indiceImagemAtual < this.imagensAtuais.length - 1) {
        this.indiceImagemAtual++;
      }
    },
    imagemAnterior() {
      // Navega para a imagem anterior
      if (this.indiceImagemAtual > 0) {
        this.indiceImagemAtual--;
      }
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
  mounted() {
    // Carrega as ocorrências do Local Storage
    const armazenadas = JSON.parse(localStorage.getItem('ocorrencias')) || [];
    this.ocorrencias = armazenadas;
  },
};
</script>

<style scoped>
/* Página de Ocorrências */
.ocorrencias-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f6f6f6;
  min-height: 100vh;
  padding-bottom: 80px;
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

.arrow-icon {
  width: 24px;
  height: 24px;
}

.register-link {
  text-decoration: none;
}

/* Lista de Ocorrências */
.ocorrencias-list {
  width: 100%;
  max-width: 400px;
  padding: 20px 1px;
}

.ocorrencia-card {
  background-color: white;
  border-radius: 12px;
  margin-bottom: 15px;
  padding: 15px 20px;
  text-decoration: none;
  color: #0c0548;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card-header {
  cursor: pointer;
}

.card-content {
  display: flex;
  align-items: center;
  gap: 15px;
}

.occurrence-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
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

.btn-open {
  background-color: #0c0548;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-open:hover {
  background-color: #1c0b80;
}

/* Footer */
.footer-menu {
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 400px;
  padding: 10px 0;
  background-color: white;
  border-top: 1px solid #ccc;
  position: fixed;
  bottom: 0;
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

.footer-menu .active .menu-icon {
  filter: brightness(1.5);
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 90%;
  max-height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-image {
  max-width: 100%;
  max-height: 100%;
  border-radius: 10px;
}

.modal-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 30px;
  color: white;
  cursor: pointer;
  z-index: 1001;
}

.modal-arrow.left {
  left: 10px;
}

.modal-arrow.right {
  right: 10px;
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 30px;
  color: white;
  cursor: pointer;
  z-index: 1001;
}
</style>