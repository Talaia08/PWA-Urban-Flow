<template>
  <div class="app"> 
    <div class="home-container">
      <div class="top-box">
        <div class="header">
          <div class="logo"></div>
          <h1 class="welcome-message">Ocorrências</h1>        
        </div>
      </div>

      <div class="ocorrencias-list">
        <div
          v-for="ocorrencia in ocorrenciasPendentes"
          :key="ocorrencia.id"
          class="ocorrencia-card"
        >
          <!-- Cabeçalho da Ocorrência -->
          <div class="card-header" @click="toggleOcorrencia(ocorrencia.id)">
            <div class="card-content"> 
              <div class="card-main">         
              <span>Ocorrência {{ ocorrencia.id }}</span>
              <span class="occurrence-date">{{ ocorrencia.dataHora }}</span>
              </div>
              <span :class="estadoClasse(ocorrencia.estadoOcorrencia)" class="estado-tag">
                {{ getStatusText(ocorrencia.estadoOcorrencia) }}
              </span>
              <span class="arrow" :class="{ open: ocorrenciaAberta === ocorrencia.id }">›</span> 
              </div>             
          </div>

          <!-- Detalhes da Ocorrência (Expandido) -->
          <div v-if="ocorrenciaAberta === ocorrencia.id" class="card-details">
            <p><strong>Descrição do Utilizador:</strong> {{ ocorrencia.descricao }}</p>

            <div class="acoes">
              <div v-if="ocorrencia.estadoOcorrencia === 'Por Resolver'">
                <button
                  class="btn-primary"
                  @click="$router.push(`/auditoria/${ocorrencia.id}`)"
                >
                  Abrir Auditoria
                </button>
                <button
                  class="btn-primary"
                  @click="$router.push(`/relatorio/${ocorrencia.id}`)"
                >
                  Criar Relatório
                </button>
              </div>

              <div v-else-if="ocorrencia.estadoOcorrencia === 'Em andamento'">
                <button
                  class="btn-primary"
                  @click="$router.push(`/auditoria/${ocorrencia.id}`)"
                >
                  Abrir Auditoria
                </button>
                <button
                  class="btn-primary"
                  @click="$router.push(`/relatorio/${ocorrencia.id}`)"
                >
                  Criar Relatório
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    

    <div class="footer-menu">
      <router-link to="/inicio-peritos" class="menu-item active">
        <img src="@/assets/images/HomePageIcon.png" class="menu-icon" alt="Home" />
      </router-link>
      <router-link to="/auditoria-perito" class="menu-item">
        <img src="@/assets/images/OcorrenciaIcon.png" class="menu-icon" alt="Ocorrencias" />
      </router-link>
      <router-link to="/perfil-perito" class="menu-item">
        <img src="@/assets/images/ProfileIconMenu.png" class="menu-icon" alt="Perfil" />
      </router-link>
      <router-link to="/notificacoes-perito" class="menu-item">
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
      profileP: {},
      nomeUtilizador: '',
      ocorrenciaAberta: null,
    };
  },
  mounted() {
    mounted() {
      const auditorias = JSON.parse(localStorage.getItem('auditorias')) || [];
      const userEmail = localStorage.getItem('email');

      // Só mostra auditorias atribuídas ao perito autenticado (por email)
      this.ocorrencias = auditorias
        .filter(a => {
          if (!a.profileP) return false;
          if (typeof a.profileP === 'string') return a.profileP === userEmail;
          if (Array.isArray(a.profileP)) return a.profileP.includes(userEmail);
          return false;
        })
        .map((auditoria) => ({
          ...auditoria,
          estadoOcorrencia: auditoria.estadoOcorrencia || 'Por Resolver',
          descricao: auditoria.descricao,
          dataHora: auditoria.dataHora,
          id: auditoria.idOcorrencia // para manter compatibilidade com o resto do código
        }));

      // Carrega o perfil do perito autenticado
      const peritos = JSON.parse(localStorage.getItem('profileP')) || [];
      const userInfo = Array.isArray(peritos)
        ? peritos.find(p => p.email === userEmail)
        : peritos;
      if (userInfo && userInfo.name) {
        this.profileP = userInfo;
      }
    },
  },

  computed: {
    ocorrenciasPendentes() {
      return this.ocorrencias.filter(
        (ocorrencia) =>
          ocorrencia.estadoOcorrencia === 'Por Resolver' ||
          ocorrencia.estadoOcorrencia === 'Em andamento'
      );
    },

    ocorrenciasOrdenadas() {
      const ordem = { 'Por Resolver': 0, 'Em andamento': 1, 'Resolvida': 2 }
      return [...this.ocorrencias].sort((a, b) => ordem[a.estadoOcorrencia] - ordem[b.estadoOcorrencia])
    },
  },

  methods: {
    alterarEstado(ocorrencia, novoEstado) {
      ocorrencia.estadoOcorrencia = novoEstado;

      // Atualiza o localStorage
      const ocorrencias = JSON.parse(localStorage.getItem('ocorrencias')) || [];
      const index = ocorrencias.findIndex((o) => o.id === ocorrencia.id);
      if (index !== -1) {
        ocorrencias[index] = ocorrencia;
      } else {
        ocorrencias.push(ocorrencia);
      }
      localStorage.setItem('ocorrencias', JSON.stringify(ocorrencias));

      // Atualiza a lista local
      this.ocorrencias = [...ocorrencias];
    },
    toggleOcorrencia(id) {
      this.ocorrenciaAberta = this.ocorrenciaAberta === id ? null : id;
    },
    estadoClasse(estadoOcorrencia) {
      if (estadoOcorrencia === 'Por Resolver') return 'estado-vermelho';
      if (estadoOcorrencia === 'Em andamento') return 'estado-amarelo';
      return '';
    },

    abrirRelatorio(id) {
      // Recupera os relatórios do localStorage
      const relatorios = JSON.parse(localStorage.getItem('relatorios')) || [];

      // Encontra o relatório associado ao ID da ocorrência
      const relatorio = relatorios.find((r) => r.id === id);

      if (relatorio) {
        // Exibe o relatório (você pode redirecionar para uma página de visualização ou exibir em um modal)
        alert(`Relatório da Ocorrência ${id}:\n\n` +
          `Data de Criação: ${relatorio.dataCriacao}\n` +
          `Duração: ${relatorio.duracao}\n` +
          `Descrição: ${relatorio.descricaoOcorrencia}\n` +
          `Materiais: ${relatorio.materiais.map((m) => `${m.nome} (${m.quantidade})`).join(', ')}\n` +
          `Procedimento: ${relatorio.procedimento}`);
      } else {
        alert('Relatório não encontrado para esta ocorrência.');
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
  padding-bottom: 100px;
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

.arrow-icon {
  width: 24px;
  height: 24px;
}

.register-link {
  text-decoration: none;
}

.summary-content {
  display: inline-block;
  background: white;
  color: #0c0548;
  padding: 8px 20px;
  font-weight: bold;
  margin-top: 5px;
  margin-bottom: 5px;
}

.ocorrencias-list {
  width: 100%;
  max-width: 400px;
  padding: 20px 0px;
}

.ocorrencia-card {
  background-color: white;
  border-radius: 12px;
  margin-bottom: 15px;
  padding: 15px 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.card-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%
}

.card-main {
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
  margin-left: 10px;
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

.card-details {
  margin-top: 10px;
  font-size: 14px;
  color: #333;
}

.acoes {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 12px;
}

.btn-primary {
  background-color: #0C0548;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-bottom: 5px;
}

.btn-primary:hover {
  background-color: #0C0548;
}

.arrow {
  font-size: 20px;
  color: #888;
  transform: rotate(0deg);
  transition: transform 0.3s ease;
}

.arrow.open {
  transform: rotate(90deg);
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
