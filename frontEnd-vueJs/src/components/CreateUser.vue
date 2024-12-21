<template>
  <div class="container">
    <h1>Create User</h1>
    <form @submit.prevent="createUser">
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="name" required>
      <label for="age">Age:</label>
      <input type="number" id="age" v-model="age" required>
      <button type="submit">Create</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CreateUser',
  data() {
    return {
      name: '',
      age: ''
    };
  },
  methods: {
    createUser() {
      const user = {
        name: this.name,
        age: this.age
      };
      axios.post('http://localhost:3000/users', user)
        .then(response => {
          console.log('User created:', response.data);
          this.$router.push('/users');
        })
        .catch(error => {
          console.error('There was an error creating the user!', error);
        });
    }
  }
};
</script>