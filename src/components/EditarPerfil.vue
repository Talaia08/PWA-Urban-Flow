<template>
  <div class="edit-profile-container">
    <h2>Editar Perfil</h2>
    <form @submit.prevent="saveProfile">
      <div class="form-group">
        <label for="name">Nome</label>
        <input type="text" id="name" v-model="profile.name" />
      </div>
      <div class="form-group">
        <label for="dob">Data de Nascimento</label>
        <input type="date" id="dob" v-model="profile.dob" />
      </div>
      <div class="form-group">
        <label for="occupation">Ocupação</label>
        <input type="text" id="occupation" v-model="profile.occupation" />
      </div>
      <div class="form-group">
        <label for="location">Localização</label>
        <input type="text" id="location" v-model="profile.location" />
      </div>
      <div class="form-group">
        <label for="phone">Telefone</label>
        <input type="tel" id="phone" v-model="profile.phone" />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="profile.email" />
      </div>
      <div class="form-group">
        <label for="address">Endereço</label>
        <input type="text" id="address" v-model="profile.address" />
      </div>
      <button type="submit" class="btn-save">Salvar</button>
    </form>
    <!-- Menu at the bottom -->
    <div class="footer-menu">
      <router-link to="/" class="menu-item">
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
</template>

<script>
export default {
  name: 'EditarPerfil',
  data() {
    return {
      profile: {
        name: '',
        dob: '',
        occupation: '',
        location: '',
        phone: '',
        email: '',
        address: '',
      },
    };
  },
  methods: {
    saveProfile() {
      // Salvar os dados no localStorage
      localStorage.setItem('profile', JSON.stringify(this.profile));
      console.log('Perfil salvo:', this.profile);
      alert('Perfil salvo com sucesso!');
    },
    loadProfile() {
      // Carregar os dados do localStorage
      const savedProfile = localStorage.getItem('profile');
      if (savedProfile) {
        this.profile = JSON.parse(savedProfile);
      }
    },
  },
  mounted() {
    this.loadProfile(); // Carregar os dados quando o componente for montado
  },
};
</script>

<style scoped>
.edit-profile-container {
  background-color: white;
  padding: 20px;
  width: 100vw;              /* ocupa toda a largura visível */
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 100vh;
  padding-bottom: 100px;     /* espaço para o footer */
  box-sizing: border-box;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.btn-save {
  background-color: #0c0548;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-save:hover {
  background-color: #0c0548;
}

.footer-menu {
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 400px;
  padding: 10px 0;
  background-color: white; /* Cor de fundo do menu */
  border-top: 1px solid white; /* Remover bordas azuis */
  position: fixed; /* Fixar o menu na parte inferior */
  bottom: 0; /* Posicionar na parte inferior */
  left: 50%;
  transform: translateX(-50%);
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
  filter: brightness(1.5); /* Destacar o ícone ativo */
}
</style>