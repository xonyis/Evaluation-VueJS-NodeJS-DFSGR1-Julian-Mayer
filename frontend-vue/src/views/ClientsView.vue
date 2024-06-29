<template>
    <div>
        <!-- titre et bouton ajouter -->
    <div class="row border-bottom pb-3 mb-3">
      <div class="col">
        <h1 class="h3"><i class="fa-solid fa-angle-down me-2" />Liste des Clients</h1>
      </div>
      <div class="col text-end">
        <router-link to="/edit-client/-1" class="btn btn-outline-primary">
          <i class="fa-solid fa-plus-circle me-2" />
          Ajouter un Client
        </router-link>
      </div>
    </div>
    <TableClientList>
      <ClientTableRowVue 
        v-for="client in clients"
        :key="client.id"
        :client="client"
        @edit="onEditClient($event)"
        @delete="onDeleteClient($event)"/>
    </TableClientList>
        
    </div>  
    <!-- <pre>
      {{ clients }}
    </pre> -->
</template>
<script>
import ClientTableRowVue from '../components/TableList/ClientTableRow.vue'
import TableClientList from '../components/TableList/TableClientList.vue'
import { useClientStore } from '@/stores/client.js'
import { mapActions, mapState } from 'pinia' 
export default {
    data(){
        return {}
    },
    components: {
        ClientTableRowVue,
        TableClientList
    },
    computed: {
    ...mapState(useClientStore, ['clients']),
    
  },
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


  // attention c'est une fonction asynchrone !!!!!
  
}
</script>