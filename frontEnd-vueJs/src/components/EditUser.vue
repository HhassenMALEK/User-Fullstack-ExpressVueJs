<template>
  <div>
    <h1>Edit User</h1>
    <form @submit.prevent="updateUser">
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="name" required>
      <label for="age">Age:</label>
      <input type="number" id="age" v-model="age" required>
      <button type="submit">Update</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EditUser',
  data() {
    return {
      name: '',
      age: '',
      userId: null
    };
  },
  created() {
    this.userId = this.$route.params.id;
    this.fetchUser(this.userId);
  },
  methods: {
    fetchUser(id) {
      axios.get(`http://localhost:3000/users/${id}`)
        .then(response => {
          const user = response.data;
          this.name = user.name;
          this.age = user.age;
        })
        .catch(error => {
          console.error('There was an error fetching the user!', error);
        });
    },
    updateUser() {
      const user = {
        name: this.name,
        age: this.age
      };
      axios.put(`http://localhost:3000/users/${this.userId}`, user)
        .then(response => {
          console.log('User updated:', response.data);
          this.$router.push('/users');
        })
        .catch(error => {
          console.error('There was an error updating the user!', error);
        });
    }
  }
};
</script>