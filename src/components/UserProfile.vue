<template>
  <div class="profile-container">
    <div class="profile-header">
      <div class="profile-icon"></div>
    </div>
    <div class="form-group">
      <input type="text" class="profile-input" v-model="profile.name" placeholder="Nome Completo" />
      <input type="text" class="profile-input" v-model="profile.dob" placeholder="Data de Nascimento" />
      <input type="text" class="profile-input" v-model="profile.occupation" placeholder="Profissão" />
      <input type="text" class="profile-input" v-model="profile.location" placeholder="Localização" />
      <input type="text" class="profile-input" v-model="profile.phone" placeholder="Telefone" />
      <input type="text" class="profile-input" v-model="profile.email" placeholder="Email" />
      <input type="text" class="profile-input" v-model="profile.address" placeholder="Endereço" />
    </div>
    <div class="profile-actions">
      <router-link to="/editar-perfil" class="btn-edit">Editar Perfil</router-link>
      <button class="btn-logout" @click="logout">Terminar Sessão</button>
    </div>
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
  name: 'UserProfile',
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
    loadProfile() {
      // Carregar os dados do localStorage
      const savedProfile = localStorage.getItem('profile');
      if (savedProfile) {
        this.profile = JSON.parse(savedProfile);
      }
    },
    logout() {
      localStorage.removeItem('userType');
      this.$router.push('/login');
    }
  },
  mounted() {
    this.loadProfile(); // Carregar os dados quando o componente for montado
  },
};
</script>

<style scoped>
.profile-container {
  background-color: white; /* Tela completamente branca */
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
}

.profile-header {
  margin-bottom: 20px;
}

.profile-icon {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: url('@/assets/images/profile-icon.png') lightgray 50% / cover no-repeat;
  margin: 40px auto; /* Mover o logo do perfil mais para baixo */
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 90%;
  max-width: 400px;
  margin: 0 auto 20px;
  margin-top: -70px;
}

.profile-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
  height: 40px;
  font-size: 16px;
  padding-left: 12px;
}

.input-group {
  position: relative;
}


.profile-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 5px;
  margin-bottom: 80px;
}

.btn-edit, .btn-logout {
  display: block;
  background-color: #0c0548;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1em;
  width: 80%;
  margin: 0 auto;
  max-width: 300px;
  text-align: center;
  text-decoration: none; /* importante para router-link */
  line-height: normal;      /* Garante altura de linha igual */
  box-sizing: border-box;
}

.btn-edit:hover, .btn-logout:hover {
  background-color: #0056b3;
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