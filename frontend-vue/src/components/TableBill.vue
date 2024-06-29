<template>
    <card class="card">
        <TableList>
            <BillTableRow
              v-for="bill in bills"
              :key="bill.id"
              :bill="bill"
              :canDelete="false"
              @edit="onEditBill($event)"
              @delete="onDeleteBill($event)"
            />
        </TableList>
    </card>
</template>
<script>
import BillTableRow from '@/components/TableList/BillTableRow.vue'
import TableList from '@/components/TableList/TableList.vue'
import { useBillStore } from '@/stores/bill.js'
import { mapActions, mapState } from 'pinia'

export default {
  components: {
    TableList,
    BillTableRow
  },
  computed: {
    ...mapState(useBillStore, ['bills'])
  },

  // attention c'est une fonction asynchrone !!!!!
  async mounted() {
    // récupère les données de l'API
    await this.getAllBills()
  },

  methods: {
    ...mapActions(useBillStore, ['onDeleteBill', 'getAllBills']),
    onEditBill(bill) {
      console.log('edit bill with id: ', bill.id)
      // je change de page programmatiquement avec le $router
      this.$router.push({
        name: 'edit-bill',
        params: {
          id: bill.id
        }
      })
      // autre syntaxe en utilisant le path (dynamique)
      // this.$router.push({ path: `/edit-bill/${bill.id}`  })
    }
  }
}
</script>
<style scoped>
card {
    font-size:.8em;
}
</style>