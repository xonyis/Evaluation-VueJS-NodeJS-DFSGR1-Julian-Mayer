<template>
  <main>
    <div class="row">
      <div class="col-4 ">
        <DonutChart />
      </div>
      <div class="col-8">
          <!-- <router-link to="/edit-client/-1" class="btn btn-outline-primary float-end mb-3">
            <i class="fa-solid fa-plus-circle me-2" />
            Ajouter un Client
          </router-link> -->
          <TableBill></TableBill>
          <TableClient class="mt-5"></TableClient>
        
<!--        
          <router-link to="/edit-bill/-1" class="btn btn-outline-primary float-end mb-3">
            <i class="fa-solid fa-plus-circle me-2" />
            Ajouter une facture
          </router-link> -->

    
      </div>
    </div>
  </main>
</template>

<script>


import TableBill from '../components/TableBill.vue'
import TableClient from '../components/TableClient.vue'
import DonutChart from '../components/DonutChart.vue'
import { useClientStore } from '@/stores/client.js'
import { useBillStore } from '@/stores/bill.js'

import { mapActions, mapState } from 'pinia'

export default {
  data() {
    return {
      
    }
  },
  components: {
    TableBill,
    TableClient,
    DonutChart
  },
  computed: {
    ...mapState(useBillStore, ['bills']),
    ...mapState(useClientStore, ['clients'])

  },

  // attention c'est une fonction asynchrone !!!!!
  async mounted() {
    // récupère les données de l'API
    await this.getAllBills()
    await this.getAllClients()

  },
  methods: {
    ...mapActions(useClientStore, [ 'getAllClients', 'onDeleteClient']),

    ...mapActions(useBillStore, ['onDeleteBill', 'getAllBills']),

  }
}
</script>
