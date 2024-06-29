<template>
    <card class="card">
        <TableClientList>
      <ClientTableRowVue 
        v-for="client in clients"
        :key="client.id"
        :client="client"
        :canDelete="false"
        @edit="onEditClient($event)"
        @delete="onDeleteClient($event)"/>
    </TableClientList>
    </card>
</template>
<script>
import ClientTableRowVue from '../components/TableList/ClientTableRow.vue'
import TableClientList from '../components/TableList/TableClientList.vue'
import { useClientStore } from '@/stores/client.js'
import { mapActions, mapState } from 'pinia'

export default {
  components: {
    ClientTableRowVue,
    TableClientList
  },
  computed: {
    ...mapState(useClientStore, ['clients']),
  },

  // attention c'est une fonction asynchrone !!!!!
   // attention c'est une fonction asynchrone !!!!!
   async mounted() {
    // récupère les données de l'API
    await this.getAllClients()
  },
  methods: {
    ...mapActions(useClientStore, [ 'getAllClients', 'onDeleteClient']),

    onEditClient(client) {
      console.log('edit bill with id: ', client)
      // je change de page programmatiquement avec le $router
      this.$router.push({
        name: 'edit-client',
        params: {
          id: client.id
        }
      })
    }
  }
}
</script>
<style scoped>
card {
    font-size:.8em;
}

</style>