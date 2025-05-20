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
      this.$router.push('/perfil'); // Redirecionar para a página de perfil
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
  max-width: 600px;
  margin: 0 auto;
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
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-save:hover {
  background-color: #0056b3;
}
</style>