<template>
  <div class="profile-container">
    <div class="profile-header">
      <div class="profile-icon"></div>
    </div>
    <div class="form-group">
      <input type="text" class="profile-input" v-model="profileP.name" placeholder="Nome Completo" />
      <input type="date" class="profile-input" v-model="profileP.dob" placeholder="Data Nascimento"/>
      <input type="text" class="profile-input" v-model="profileP.specialty" placeholder="Especialidade" />
      <input type="text" class="profile-input" v-model="profileP.location" placeholder="Área" />
      <input type="text" class="profile-input" v-model="profileP.phone" placeholder="Telefone" />
      <input type="email" class="profile-input" v-model="profileP.email" placeholder="Email" />
      <input type="text" class="profile-input" v-model="profileP.address" placeholder="Endereço" />
    </div>
    <div class="profile-actions">
      <router-link to="/editar-perfil-perito" class="btn-edit">Editar Perfil</router-link>
      <router-link to="/login" class="btn-logout">Terminar Sessão</router-link>
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
  name: 'UserProfilePeritos',
  data() {
    return {
      profileP: {
        name: '',
        dob: '',
        specialty: '',
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
      const savedProfile = localStorage.getItem('profileP');
      if (savedProfile) {
        this.profileP = JSON.parse(savedProfile);
      }
    },
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
  margin: 40px auto;
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