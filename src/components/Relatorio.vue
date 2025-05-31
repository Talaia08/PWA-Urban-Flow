<!-- filepath: c:\UM 3º\PW\PWA-Urban-Flow\PWA Urban Flow\src\components\Relatorio.vue -->
<template>
  <div class="relatorio-page">
    <div class="top-box">
      <div class="header">
        <div class="logo"></div>
        <h1 class="welcome-message">Relatório</h1>        
      </div>
    </div>
    <!-- Etapa 1: Informações da Ocorrência -->
    <div v-if="etapa === 1" class="etapa">
      <div class="form-group box">
        <label>ID da Ocorrência *</label>
        <input type="text" :value="ocorrencia.id"/>
      </div>
      <div class="form-group box">
        <label>Tipo de Ocorrência *</label>
        <input type="text" :value="ocorrencia.tipo"/>
      </div>
      <div class="form-group box">
        <label>Nome do Perito *</label>
        <input type="text" :value="profileP.name"/>
      </div>
      <div class="form-group box">
        <label>Localização *</label>
        <input type="text" :value="ocorrencia.localizacao"/>
      </div>
      <div class="form-group box">
        <label>Data de Registo da Ocorrência *</label>
        <input type="text" :value="ocorrencia.dataHora"/>
      </div>
      <div class="form-group box">
        <label>Descrição do Utilizador *</label>
        <textarea :value="ocorrencia.descricao"></textarea>
      </div>
      <div class="alert box">
        <p>
          <strong>Atenção</strong> <br>Verifique se os dados acima estão corretos em relação à ocorrência.
          Caso alguma informação esteja incorreta, corrija antes de prosseguir com o relatório.
        </p>
      </div>
      <div class="buttons">
        <button @click="guardarProgresso" class="btn-secondary">Guardar</button>
        <button @click="irParaProximaEtapa" class="btn-secondary1">Seguinte</button>
      </div>
    </div>

    <!-- Etapa 2: Preenchimento do Relatório -->
    <div v-else-if="etapa === 2" class="etapa">
      <div class="form-group box">
        <label>Data Criação do Relatório *</label>
        <input type="date" v-model="relatorio.dataCriacao" />
      </div>
      <div class="form-group box">
        <label>Duração da Resolução *</label>
        <input type="text" v-model="relatorio.duracao" placeholder="A sua resposta" />
      </div>
      <div class="form-group box">
        <label>Descrição da Ocorrência *</label>
        <textarea v-model="relatorio.descricaoOcorrencia" placeholder="A sua resposta"></textarea>
      </div>
      <div class="form-group box">
        <label>Materiais Utilizados *</label>
        <ul class="materiais-list">
            <li v-for="(material, index) in relatorio.materiais" :key="index" class="material-item">
            <span>{{ material.nome }}</span>
            <div class="quantidade-controle">
                <button @click="diminuirQuantidade(index)" class="btn-quantidade">-</button>
                <span>{{ material.quantidade }}</span>
                <button @click="aumentarQuantidade(index)" class="btn-quantidade">+</button>
            </div>
            <button @click="removerMaterial(index)" class="btn-lixo">
                🗑️
            </button>
            </li>
        </ul>
        <div class="adicionar-material">
            <input
            type="text"
            v-model="novoMaterial"
            placeholder="Adicionar novo material"
            class="input-material"
            />
            <button @click="adicionarMaterial" class="btn-adicionar">Adicionar</button>
        </div>
      </div>
      <div class="form-group box">
        <label>Descrição do Procedimento *</label>
        <textarea v-model="relatorio.procedimento" placeholder="A sua resposta"></textarea>
      </div>
      <div class="form-group box">
        <label>Fotos / Vídeos *</label>
        <input type="file" multiple @change="adicionarArquivos" />
      </div>
      <div class="buttons">
        <button @click="voltarEtapaAnterior" class="btn-secondary1">Anterior</button>
        <button @click="guardarProgresso" class="btn-secondary">Guardar</button>
        <button @click="enviarRelatorio" class="btn-primary">Enviar</button>
      </div>
    </div>

    <!-- Footer Menu -->
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
</template>

<script>
export default {
  name: 'RelatorioPage',
  data() {
    return {
      etapa: 1, // Controla a etapa atual (1 ou 2)
      ocorrencia: {}, // Dados da ocorrência carregados do localStorage
      profileP: {},
      relatorio: {
        dataCriacao: '',
        duracao: '',
        descricaoOcorrencia: '',
        materiais: '',
        procedimento: '',
        arquivos: [],
      },
    };
  },
  mounted() {
    // Carrega os dados da ocorrência com base no ID da rota
    const id = this.$route.params.id;
    const armazenadas = JSON.parse(localStorage.getItem('ocorrencias')) || [];
    this.ocorrencia = armazenadas.find((o) => o.id === parseInt(id)) || {};

    // Carrega os dados do perfil do perito do localStorage
    const profileData = JSON.parse(localStorage.getItem('profileP')) || {};
    this.profileP = profileData;

    // Carrega o relatório salvo, se existir
    const relatorios = JSON.parse(localStorage.getItem('relatorios')) || [];
    const relatorioSalvo = relatorios.find((r) => r.id === parseInt(id));
    if (relatorioSalvo) {
      this.relatorio = { ...relatorioSalvo };
    }
  },
  methods: {
    irParaProximaEtapa() {
      this.etapa = 2;
    },
    voltarEtapaAnterior() {
      this.etapa = 1;
    },
    guardarProgresso() {
      // Recupera os relatórios existentes do localStorage
      const relatorios = JSON.parse(localStorage.getItem('relatorios')) || [];

      // Verifica se já existe um relatório para a ocorrência atual
      const index = relatorios.findIndex((r) => r.id === this.ocorrencia.id);

      const novoRelatorio = {
        id: this.ocorrencia.id, // Associa o relatório à ocorrência pelo ID
        dataCriacao: this.relatorio.dataCriacao,
        duracao: this.relatorio.duracao,
        descricaoOcorrencia: this.relatorio.descricaoOcorrencia,
        materiais: this.relatorio.materiais,
        procedimento: this.relatorio.procedimento,
        arquivos: this.relatorio.arquivos,
      };

      if (index !== -1) {
        // Atualiza o relatório existente
        relatorios[index] = novoRelatorio;
      } else {
        // Adiciona um novo relatório
        relatorios.push(novoRelatorio);
      }

      // Salva a lista atualizada no localStorage
      localStorage.setItem('relatorios', JSON.stringify(relatorios));

      // Atualiza o estado da ocorrência para "Em andamento"
      const ocorrencias = JSON.parse(localStorage.getItem('ocorrencias')) || [];
      const ocorrenciaIndex = ocorrencias.findIndex((o) => o.id === this.ocorrencia.id);
      if (ocorrenciaIndex !== -1) {
        ocorrencias[ocorrenciaIndex].estadoOcorrencia = 'Em andamento';
        localStorage.setItem('ocorrencias', JSON.stringify(ocorrencias));
      }

      // Exibe uma mensagem de sucesso
      alert('Progresso guardado com sucesso!');
    },
    adicionarArquivos(event) {
      this.relatorio.arquivos = Array.from(event.target.files);
    },
    enviarRelatorio() {
      // Recupera os relatórios existentes do localStorage
      const relatorios = JSON.parse(localStorage.getItem('relatorios')) || [];

      // Adiciona o novo relatório à lista
      const novoRelatorio = {
        id: this.ocorrencia.id, // Associa o relatório à ocorrência pelo ID
        dataCriacao: this.relatorio.dataCriacao,
        duracao: this.relatorio.duracao,
        descricaoOcorrencia: this.relatorio.descricaoOcorrencia,
        materiais: this.relatorio.materiais,
        procedimento: this.relatorio.procedimento,
        arquivos: this.relatorio.arquivos,
      };

      const index = relatorios.findIndex((r) => r.id === this.ocorrencia.id);
      if (index !== -1) {
        // Atualiza o relatório existente
        relatorios[index] = novoRelatorio;
      } else {
        // Adiciona um novo relatório
        relatorios.push(novoRelatorio);
      }

      // Salva a lista atualizada no localStorage
      localStorage.setItem('relatorios', JSON.stringify(relatorios));

      const auditorias = JSON.parse(localStorage.getItem('auditorias')) || [];
      const auditoriaIdx = auditorias.findIndex(a => String(a.idOcorrencia) === String(this.ocorrencia.id));
      if (auditoriaIdx !== -1) {
        auditorias[auditoriaIdx].relatorioPerito = {
          dataCriacao: this.relatorio.dataCriacao,
          duracao: this.relatorio.duracao,
          descricaoOcorrencia: this.relatorio.descricaoOcorrencia,
          materiais: this.relatorio.materiais,
          procedimento: this.relatorio.procedimento,
          arquivos: this.relatorio.arquivos,
          perito: this.profileP.name
        };
        // Atualiza o estado se quiseres
        auditorias[auditoriaIdx].estadoOcorrencia = "resolvido";
        localStorage.setItem('auditorias', JSON.stringify(auditorias));
      }

      // Atualiza o estado da ocorrência para "Resolvida"
      const ocorrencias = JSON.parse(localStorage.getItem('ocorrencias')) || [];
      const ocorrenciaIndex = ocorrencias.findIndex((o) => o.id === this.ocorrencia.id);
      if (ocorrenciaIndex !== -1) {
        ocorrencias[ocorrenciaIndex].estadoOcorrencia = 'Resolvida';
        localStorage.setItem('ocorrencias', JSON.stringify(ocorrencias));
      }

      // Exibe uma mensagem de sucesso
      alert('Relatório enviado com sucesso!');

      // Redireciona para a página inicial ou outra página, se necessário
      this.$router.push('/inicio-peritos');
    },
    aumentarQuantidade(index) {
      this.relatorio.materiais[index].quantidade++;
    },
    diminuirQuantidade(index) {
      if (this.relatorio.materiais[index].quantidade > 1) {
        this.relatorio.materiais[index].quantidade--;
      }
    },
    removerMaterial(index) {
      this.relatorio.materiais.splice(index, 1);
    },
    adicionarMaterial() {
      if (this.novoMaterial.trim() !== '') {
        this.relatorio.materiais.push({ nome: this.novoMaterial, quantidade: 1 });
        this.novoMaterial = '';
      }
    },
  },
};
</script>

<style scoped>
.relatorio-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #CECDDA;
    min-height: 100vh;
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

.obrigatorio {
  color: #d93025;
  font-size: 12px;
}

.etapa {
  background: #CECDDA;
  padding: 20px;
  border-radius: 10px;
  
}

.box {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 15px;
  margin-bottom: 15px;
}

.box label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
}

.box input,
.box textarea {
  width: 100%;
  border: none;
  border-bottom: 1px solid #ccc;
  padding: 5px 0;
  font-size: 14px;
  color: #666;
  background: transparent;
}

.box input:focus,
.box textarea:focus {
  outline: none;
  border-bottom: 1px solid #4285F4;
}

textarea {
  resize: none;
}

.alert {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 15px;
  margin-bottom: 15px;
}

.buttons {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.buttons button {
  flex: 1; /* Garante que todos os botões tenham o mesmo tamanho */
  text-align: center;
}

.btn-primary {
  background-color: #0c0548;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
}

.btn-secondary {
  background-color: #60A7F7;
  color: #ffffff;
  border: 1px solid #ccc;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
}

.btn-secondary1 {
  background-color: #ffffff;
  color: #666;
  border: 1px solid #ccc;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #1c0b80;
}

.btn-secondary:hover {
  background-color: #e0e0e0;
}

.materiais-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.material-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px;
  background: white;
  border-radius: 8px;
  position: relative;
}

.quantidade-controle {
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 5px;
}

.btn-quantidade {
  background-color: #f4f4f4;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  justify-content: right;
  align-items: right;
}

.btn-quantidade:hover {
  background-color: #e0e0e0;
}

.btn-lixo {
  margin-left: 10px;  
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #d93025;
}

.btn-lixo:hover {
  color: #a00;
}

.adicionar-material {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

.input-material {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn-adicionar {
  background-color: #0c0548;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-adicionar:hover {
  background-color: #1c0b80;
}

/* Footer */
.footer-menu {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  max-width: 400px;
  padding: 10px 0;
  background-color: white;
  border-top: 1px solid #ccc;
  position: fixed;
  bottom: 0;
  left: 50%; /* Centraliza horizontalmente */
  transform: translateX(-50%); /* Ajusta o alinhamento para o centro */
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

.footer-menu .active .menu-icon {
  filter: brightness(1.5);
}
</style>