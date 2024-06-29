<template>
  <tr>
    <td class="align-middle">{{ formattedDate }}</td>
    <td class="align-middle">{{ bill.description }}</td>
    <td class="align-middle">{{ clientName }}</td>
    <td class="align-middle text-end">{{ bill.totalHT.toFixed(2) }} HT</td>
    <td class="align-middle text-end">{{ bill.totalTTC.toFixed(2) }} TTC</td>
    <td class="align-middle d-flex gap-2 justify-content-end align-items-center">
      <button v-if="canDelete" @click="onDelete()" class="btn btn-outline-danger">
        <i class="fa-solid fa-trash me-2" />Supprimer
      </button>
      <button @click="onEdit()" class="btn btn-outline-info">
        <i class="fa-solid fa-pen me-2" />Editer
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    bill: {
      type: Object,
      required: true
    },
    canDelete: {
      type: Boolean,
      default: true,
    }
  },
  emits: ['delete', 'edit'],
  computed: {
    clientName() {
      return this.bill.client.firstName + ' ' + this.bill.client.lastName
    },
    formattedDate() {
      let dateStr = this.bill.date
      let pattern = /(\d{4})-(\d{2})-(\d{2})/;
      return  dateStr.replace(pattern, '$3/$2/$1')
    }
  },
  methods: {
    onDelete() {
      this.$emit('delete', this.bill)
    },
    onEdit() {
      this.$emit('edit', this.bill)
    }
  }
}
</script>

<style scoped>

</style>
