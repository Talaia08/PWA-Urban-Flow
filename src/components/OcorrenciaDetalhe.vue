<template>
  <div class="detalhe-container">
    <button class="back-button" @click="$router.back()">&#8592;</button>
    <h1 class="title">Detalhes da Ocorrência</h1>

    <div v-if="ocorrencia" class="details">
      <p><strong>ID:</strong> {{ ocorrencia.id }}</p>
      <p><strong>Descrição:</strong> {{ ocorrencia.descricao }}</p>
      <p><strong>Localização:</strong> {{ ocorrencia.localizacao }}</p>
      <p><strong>Data e Hora:</strong> {{ ocorrencia.dataHora }}</p>
      <p><strong>Estado:</strong> {{ ocorrencia.estado }}</p>

      <div class="ficheiro-section">
        <button class="ficheiro-button" @click="verFicheiro">
          Visualizar Ficheiro
        </button>
        <p v-if="ficheiroInexistente" class="ficheiro-alerta">Sem ficheiro disponível.</p>
        <!-- Apresentação condicional baseada no tipo -->
        <div v-if="mostrarImagem">
          <template v-if="ficheiroTipo === 'imagem'">
            <img :src="ocorrencia.ficheiro" class="imagem-anexo" />
          </template>
          <template v-else-if="ficheiroTipo === 'pdf'">
            <iframe :src="ocorrencia.ficheiro" class="ficheiro-frame" frameborder="0"></iframe>
          </template>
          <template v-else>
            <a :href="ocorrencia.ficheiro" target="_blank">Abrir ficheiro</a>
          </template>
        </div>
      </div>
    </div>

    <div v-else class="not-found">
      Ocorrência não encontrada.
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      ocorrencia: null,
      mostrarImagem: false,
      ficheiroInexistente: false,
      ficheiroTipo: null
    };
  },
  mounted() {
    const id = this.$route.params.id;
    const ocorrencias = JSON.parse(localStorage.getItem('ocorrencias')) || [];
    this.ocorrencia = ocorrencias.find((o) => String(o.id) === id);

    if (!this.ocorrencia) {
      console.error('Ocorrência não encontrada.');
    }
  },
  methods: {
    verFicheiro() {
      if (this.ocorrencia?.ficheiro) {
        this.ficheiroInexistente = false;
        this.mostrarImagem = true;

        // Detectar tipo de ficheiro
        const tipo = this.ocorrencia.ficheiro.split(';')[0];
        if (tipo.includes('image')) {
          this.ficheiroTipo = 'imagem';
        } else if (tipo.includes('pdf')) {
          this.ficheiroTipo = 'pdf';
        } else {
          this.ficheiroTipo = 'outro';
        }
      } else {
        this.mostrarImagem = false;
        this.ficheiroInexistente = true;
      }
    }
  }
};
</script>

<style scoped>
.detalhe-container {
  background-color: white;
  color: black;
  padding: 20px;
  min-height: 100vh;
}

.back-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.title {
  font-size: 24px;
  margin: 20px 0;
}

.details p {
  font-size: 18px;
  margin: 10px 0;
}

.not-found {
  font-size: 18px;
  color: red;
}

.ficheiro-section {
  margin-top: 20px;
  text-align: center;
}

.ficheiro-button {
  padding: 10px 20px;
  background-color: #0c0548;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
}

.ficheiro-alerta {
  margin-top: 10px;
  color: #ff0000;
  font-weight: bold;
}

.imagem-anexo {
  margin-top: 15px;
  max-width: 100%;
  max-height: 300px;
  border: 1px solid #ccc;
  border-radius: 10px;
}

/* Estilo para o iframe quando for um PDF */
.ficheiro-frame {
  width: 100%;
  height: 500px;
  margin-top: 15px;
  border-radius: 10px;
  border: 1px solid #ccc;
}
</style>
