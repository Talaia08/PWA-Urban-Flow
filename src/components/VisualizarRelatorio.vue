<!-- filepath: c:\UM 3º\PW\PWA-Urban-Flow\PWA Urban Flow\src\components\VisualizarRelatorio.vue -->
<template>
  <div class="relatorio-page">
    <div class="top-box">
      <div class="register-box">
        <div class="header">
          <h1>Relatório OCR {{ relatorio.id }}</h1>
        </div>
      </div>
    </div>

    <div class="etapa">
      <!-- Etapa 1: Perguntas Respondidas -->
      <div class="form-group box">
        <label>ID da Ocorrência *</label>
        <p>{{ ocorrencia.id }}</p>
      </div>
      <div class="form-group box">
        <label>Tipo de Ocorrência *</label>
        <p>{{ ocorrencia.tipo }}</p>
      </div>
      <div class="form-group box">
        <label>Nome do Perito *</label>
        <p>{{ profileP.name }}</p>
      </div>
      <div class="form-group box">
        <label>Localização *</label>
        <p>{{ ocorrencia.localizacao }}</p>
      </div>
      <div class="form-group box">
        <label>Data de Registo da Ocorrência *</label>
        <p>{{ ocorrencia.dataHora }}</p>
      </div>
      <div class="form-group box">
        <label>Descrição do Utilizador *</label>
        <p>{{ ocorrencia.descricao }}</p>
      </div>

      <!-- Etapa 2: Respostas do Perito -->
      <div class="form-group box">
        <label>Data Criação do Relatório *</label>
        <p>{{ relatorio.dataCriacao }}</p>
      </div>
      <div class="form-group box">
        <label>Duração da Resolução *</label>
        <p>{{ relatorio.duracao }}</p>
      </div>
      <div class="form-group box">
        <label>Descrição da Ocorrência *</label>
        <p>{{ relatorio.descricaoOcorrencia }}</p>
      </div>
      <div class="form-group box">
        <label>Materiais Utilizados *</label>
        <ul>
          <li v-for="(material, index) in relatorio.materiais" :key="index">
            {{ material.nome }} ({{ material.quantidade }})
          </li>
        </ul>
      </div>
      <div class="form-group box">
        <label>Descrição do Procedimento *</label>
        <p>{{ relatorio.procedimento }}</p>
      </div>

      <!-- Botões -->
      <div class="buttons">
        <button @click="exportarPDF" class="btn-primary">Exportar PDF</button>
        <button @click="voltar" class="btn-secondary">Fechar</button>
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
import jsPDF from "jspdf";

export default {
  name: "VisualizarRelatorio",
  data() {
    return {
      relatorio: {}, // Dados do relatório carregados do localStorage
      profileP: {}, // Dados do perfil do perito
      ocorrencia: {}, // Dados da ocorrência
    };
  },
  mounted() {
    const id = this.$route.params.id; // Obtém o ID da rota
    const relatorios = JSON.parse(localStorage.getItem("relatorios")) || [];
    const ocorrencias = JSON.parse(localStorage.getItem("ocorrencias")) || [];
    const profileData = JSON.parse(localStorage.getItem("profileP")) || {};

    this.relatorio = relatorios.find((r) => r.id === parseInt(id)) || {};
    this.ocorrencia = ocorrencias.find((o) => o.id === parseInt(id)) || {};
    this.profileP = profileData;

    if (!this.relatorio.id) {
        alert('Relatório não encontrado para esta ocorrência.');
        this.$router.push('/auditoria-perito'); // Redireciona se o relatório não for encontrado
    }
  },
  methods: {
    exportarPDF() {
      const doc = new jsPDF();
      doc.text(`Relatório OCR ${this.relatorio.id}`, 10, 10);
      doc.text(`ID da Ocorrência: ${this.relatorio.id}`, 10, 20);
      doc.text(`Tipo de Ocorrência: ${this.ocorrencia.tipo}`, 10, 30);
      doc.text(`Nome do Perito: ${this.profileP.name}`, 10, 40);
      doc.text(`Localização: ${this.ocorrencia.localizacao}`, 10, 50);
      doc.text(`Data de Registo: ${this.ocorrencia.dataHora}`, 10, 60);
      doc.text(`Descrição do Utilizador: ${this.ocorrencia.descricao}`, 10, 70);
      doc.text(`Data Criação do Relatório: ${this.relatorio.dataCriacao}`, 10, 80);
      doc.text(`Duração da Resolução: ${this.relatorio.duracao}`, 10, 90);
      doc.text(`Descrição da Ocorrência: ${this.relatorio.descricaoOcorrencia}`, 10, 100);
      doc.text("Materiais Utilizados:", 10, 110);
      this.relatorio.materiais.forEach((material, index) => {
        doc.text(`${material.nome} (${material.quantidade})`, 10, 120 + index * 10);
      });
      doc.text(`Descrição do Procedimento: ${this.relatorio.procedimento}`, 10, 150);
      doc.save(`Relatorio_OCR_${this.relatorio.id}.pdf`);
    },
    voltar() {
      this.$router.push("/auditoria-perito");
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
  width: 100%;
  height: 160px;
  background: linear-gradient(180deg, rgba(38, 57, 103, 0.80) 5.5%, #0C0548 48.11%);
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 20px;
  padding-top: 20px;
}

.register-box {
  background: white;
  padding: 0px 5px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  text-align: center;
  margin-top: 20px;
  width: 90%;
}

.etapa {
  margin-top: 20px;
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

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  font-weight: bold;
}

.form-group p {
  margin: 0;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.btn-primary {
  background-color: #0c0548;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-secondary {
  background-color: #f4f4f4;
  color: black;
  border: 1px solid #ccc;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
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