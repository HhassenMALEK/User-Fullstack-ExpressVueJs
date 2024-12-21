<template>
  <div class="container">
    <h1>User Details</h1>
    <div v-if="user">
      <p><strong>ID:</strong> {{ user.id }}</p>
      <p><strong>Name:</strong> {{ user.name }}</p>
      <p><strong>Age:</strong> {{ user.age }}</p>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserDetails',
  data() {
    return {
      user: null
    };
  },
  created() {
    const userId = this.$route.params.id;
    this.fetchUser(userId);
  },
  methods: {
    fetchUser(id) {
      axios.get(`http://localhost:3000/users/${id}`)
        .then(response => {
          this.user = response.data;
        })
        .catch(error => {
          console.error('There was an error fetching the user!', error);
        });
    }
  }
};
</script>