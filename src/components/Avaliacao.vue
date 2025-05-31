<template>
    <div class="avaliacao-container">
      <button class="back-button" @click="$router.back()">←</button>
      <h1>Avaliação da Aplicação</h1>
  
      <div v-for="(categoria, index) in categorias" :key="index" class="avaliacao-item">
        <label>{{ categoria.nome }}</label>
        <div class="estrelas">
          <span
            v-for="i in 5"
            :key="i"
            class="estrela"
            :class="{ ativa: categoria.valor >= i }"
            @click="categoria.valor = i"
          >★</span>
        </div>
      </div>
  
      <textarea
        v-model="comentario"
        placeholder="Comentários adicionais..."
        class="comentario"
      ></textarea>
  
      <button class="submit-button" @click="submeterAvaliacao">Submeter</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AvaliacaoApp',
    data() {
      return {
        categorias: [
          { nome: 'Avaliação do Serviço', valor: 0 },
          { nome: 'Avaliação do Perito', valor: 0 },
          { nome: 'Avaliação da Obra', valor: 0 },
          { nome: 'Tempo de Execução', valor: 0 },
        ],
        comentario: '',
      };
    },
    methods: {
      submeterAvaliacao() {
        const avaliacao = {
          categorias: this.categorias,
          comentario: this.comentario,
          data: new Date().toISOString(),
          origem: 'PWA'
        };
        const avaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || [];
        avaliacoes.push(avaliacao);
        localStorage.setItem('avaliacoes', JSON.stringify(avaliacoes));
        localStorage.setItem('avaliacaoFeita', 'true');
        alert('Obrigado pelo seu feedback!');
        this.$router.push('/');
      },
    },
  };
  </script>
  
  <style scoped>
  .avaliacao-container {
    background: white;
    color: #0c0548;
    padding: 20px;
    min-height: 100vh;
  }
  
  .back-button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    margin-bottom: 10px;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .avaliacao-item {
    margin-bottom: 20px;
  }
  
  .estrelas {
    display: flex;
    gap: 5px;
  }
  
  .estrela {
    font-size: 28px;
    cursor: pointer;
    color: #ccc;
    transition: 0.2s;
  }
  
  .estrela.ativa {
    color: gold;
  }
  
  .comentario {
    width: 100%;
    padding: 10px;
    height: 100px;
    margin-top: 10px;
    font-size: 14px;
    border-radius: 8px;
    border: 1px solid #ccc;
  }
  
  .submit-button {
    background-color: #0c0548;
    color: white;
    padding: 12px;
    width: 100%;
    border: none;
    border-radius: 30px;
    font-weight: bold;
    margin-top: 20px;
  }
  </style>
  