<template>
  <div class="registo-container">
    <button class="back-button" @click="$router.back()">&#8592;</button>
    <h1 class="title">Registo de Ocorrência</h1>

    <div class="form-group">
      <div class="dropdown">
        <div class="dropdown-input" @click="toggleDropdown">
          <span>{{ tipo || 'Selecionar Tipo de Ocorrência' }}</span>
          <span class="arrow">&#9662;</span>
        </div>
        <ul v-if="dropdownAberto" class="dropdown-menu">
          <li @click="selecionarTipo('Paragens')">Paragens</li>
          <li @click="selecionarTipo('Autocarros')">Autocarros</li>
          <li @click="selecionarTipo('Atrasos')">Atrasos</li>
        </ul>
      </div>

      <input type="text" placeholder="Descrição" class="input" v-model="descricao" />

      <input
        v-if="tipo === 'Atrasos'"
        type="text"
        class="input"
        placeholder="Linha do autocarro"
        v-model="linha"
      />
      <input
        v-if="tipo === 'Atrasos'"
        type="number"
        class="input"
        placeholder="Tempo de atraso (minutos)"
        v-model="tempo"
        min="0"
      />

      <div class="localizacao-input">
        <input
          type="text"
          placeholder="Localização"
          class="input"
          v-model="localizacao"
          readonly
          autocomplete="off"
        />
        <button class="geo-button" @click="obterLocalizacao">📍</button>
      </div>

      <input type="datetime-local" class="input" v-model="dataHora" />
      <input type="file" class="input" @change="handleFicheiro" />
    </div>

    <button class="submit-button" @click="enviarOcorrencia">Enviar Ocorrência</button>

    <div class="footer-menu">
      <router-link to="/" class="menu-item">
        <img src="@/assets/images/HomePageIcon.png" class="menu-icon" alt="Home" />
      </router-link>
      <router-link to="/auditorias" class="menu-item">
        <img src="@/assets/images/OcorrenciaIcon.png" class="menu-icon" alt="Ocorrencias" />
      </router-link>
      <router-link to="/perfil" class="menu-item">
        <img src="@/assets/images/ProfileIconMenu.png" class="menu-icon" alt="Perfil" />
      </router-link>
      <router-link to="/notificacoes" class="menu-item">
        <img src="@/assets/images/NotificationIcon.png" class="menu-icon" alt="Notificações" />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegistoOcorrencia',
  data() {
    return {
      tipo: '',
      descricao: '',
      localizacao: '',
      dataHora: '',
      ficheiroBase64: null,
      dropdownAberto: false,
      linha: '',
      tempo: '',
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownAberto = !this.dropdownAberto; // Alterna entre abrir e fechar o menu
    },
    selecionarTipo(tipo) {
      this.tipo = tipo; // Define o tipo selecionado
      this.dropdownAberto = false; // Fecha o menu suspenso
    },

    handleFicheiro(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.ficheiroBase64 = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    enviarOcorrencia() {

      let localizacaoLimpa = this.localizacao.replace(/(latitude|longitude)\s*:?/gi, '').trim();

      localizacaoLimpa = localizacaoLimpa.replace(/\s*,\s*/g, ',').replace(/,+/g, ',');

      const novaOcorrencia = {
        id: Math.floor(10000 + Math.random() * 90000),
        tipo: this.tipo,
        descricao: this.descricao,
        localizacao: localizacaoLimpa,
        dataHora: this.dataHora,
        estado: 'Enviada',
        estadoOcorrencia: 'Por Resolver',
        ficheiro: this.ficheiroBase64 || null,
      };

      if (this.tipo === 'Atrasos') {
        novaOcorrencia.linha = this.linha;
        novaOcorrencia.tempo = this.tempo;

        const atrasos = JSON.parse(localStorage.getItem('atrasos')) || [];
        atrasos.push({ ...novaOcorrencia });
        localStorage.setItem('atrasos', JSON.stringify(atrasos));
      } else {
        const ocorrencias = JSON.parse(localStorage.getItem('ocorrencias')) || [];
        ocorrencias.push(novaOcorrencia);
        localStorage.setItem('ocorrencias', JSON.stringify(ocorrencias));
      }

      this.$router.push('/');
    },

    obterLocalizacao() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          const lat = pos.coords.latitude.toFixed(6);
          const lng = pos.coords.longitude.toFixed(6);
          this.localizacao = `${lat},${lng}`;
        }, () => {
          alert("Não foi possível obter a localização.");
        });
      } else {
        alert("Geolocalização não suportada neste navegador.");
      }
    }
  }
};
</script>

<style scoped>
.registo-container {
  background-color: white;
  color: black;
  padding: 20px;
  padding-bottom: 100px;
  min-height: 100vh;
  box-sizing: border-box;
}

.dropdown {
  position: relative;
}

.dropdown-input {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
  background-color: white;
  cursor: pointer;
}

.dropdown-input .arrow {
  font-size: 16px;
  color: #666;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 0;
  margin: 5px 0 0;
  z-index: 10;
}

.dropdown-menu li {
  padding: 10px;
  cursor: pointer;
}

.dropdown-menu li:hover {
  background-color: #f0f0f0;
}

.back-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.title {
  font-size: 24px;
  text-align: center;
  margin: 20px 0;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 20px 0;
}

.localizacao-input {
  display: flex;
  gap: 10px;
}

.input {
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
  flex: 1;
}

.geo-button {
  background-color: #0c0548;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0 12px;
  font-size: 18px;
  cursor: pointer;
}

.submit-button {
  background-color: #0c0548;
  color: white;
  padding: 15px;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  width: 100%;
  font-weight: bold;
  cursor: pointer;
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
}

.menu-icon {
  width: 30px;
  height: 30px;
}
</style>
