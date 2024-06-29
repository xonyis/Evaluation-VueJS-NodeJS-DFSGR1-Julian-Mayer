<template>
  <tr>
      <td class="align-middle"><i class="fa-regular fa-user me-2" />
          {{ client.firstName +' '+ client.lastName }}</td>
      <td class="align-middle">{{ client.companyName }}</td>
      <td class="align-middle text-end">{{ formattedDate }}</td>
      <td class="align-middle d-flex gap-2 justify-content-end align-items-center">
          <button  v-if="canDelete" @click="onDelete()" class="btn btn-outline-danger">
            <i class="fa-solid fa-trash me-2" />Supprimer
          </button>
          <button @click="onEdit()" class="btn btn-outline-primary">
            <i class="fa-solid fa-pen me-2" />Editer
          </button>
      </td>
  </tr>
</template>
<script>
export default {
    props: {
      client: {
        type: Object,
        required: true
      },
      canDelete: {
      type: Boolean,
      default: true,
    }
    },
    computed: {
      clientName() {
        return this.client.firstName + ' ' + this.client.lastName
      },
      formattedDate() {
      let dateStr = this.client.date
      let pattern = /(\d{4})-(\d{2})-(\d{2})/;
      return  dateStr.replace(pattern, '$3/$2/$1')
      }
    },
    methods: {
      onDelete() {
        this.$emit('delete', this.client)
      },
      onEdit() {
        this.$emit('edit', this.client)
      }
    }
}
</script>
  