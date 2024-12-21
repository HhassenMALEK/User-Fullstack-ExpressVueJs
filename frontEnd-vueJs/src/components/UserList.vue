<template>
  <div class="container">
    <h1>Users</h1>
    <router-link to="/users/create" class="router-link">Create User</router-link>
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.age }}</td>
          <td class="actions">
            <router-link :to="`/users/${user.id}`" class="router-link">Voir</router-link>
            <router-link :to="`/users/${user.id}/edit`" class="router-link">Modifier</router-link>
            <button @click="deleteUser(user.id)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button @click="fetchUsers(links.prev)" :disabled="!links.prev">Previous</button>
      <button @click="fetchUsers(links.next)" :disabled="!links.next">Next</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserList',
  data() {
    return {
      users: [],
      links: {}
    };
  },
  created() {
    this.fetchUsers('http://localhost:3000/users?page=1&limit=3');
  },
  methods: {
    fetchUsers(url) {
      //axios pour faire une requête GET à l'URL 
      axios.get(url)
        .then(response => {

          console.log("Response received:", response);

      //Met à jour la liste des utilisateurs avec les données reçues
          this.users = response.data.data;

      //Met à jour les liens de pagination avec les données reçues
          this.links = response.data.links;
          console.log("Users",this.users)
          console.log("Links data:", this.links);
        })
        .catch(error => {
          console.error('There was an error fetching the users!', error);
        });
    },
    deleteUser(id) {
      axios.delete(`http://localhost:3000/users/${id}`)
        .then(response => {
          console.log('User deleted:', response.data);
          // Rafraîchir la liste des utilisateurs après la suppression
          this.fetchUsers('http://localhost:3000/users?page=1&limit=3');
        })
        .catch(error => {
          console.error('There was an error deleting the user!', error);
        });
    }
    
  }
};
</script>