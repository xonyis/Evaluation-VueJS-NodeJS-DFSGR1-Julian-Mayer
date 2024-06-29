<template>
    <div v-if="client">
      <!-- titre et bouton ajouter -->
      <div class="row border-bottom pb-3 mb-3">
        <div class="col">
          <h1 v-if="isNewClient" class="h3">
            <i class="fa-solid fa-angle-down me-2" />Créer un Client
          </h1>
          <h1 v-else class="h3"><i class="fa-solid fa-angle-down me-2" />Editer un Client</h1>
        </div>
        <div v-if="!isNewClient" class="col text-end">
          <button @click="deleteClient(client)" class="btn btn-outline-danger">
            <i class="fa-solid fa-trash me-2" />
            Supprimer un Client
          </button>
        </div>
      </div>
  
      <div class="row">
        <h4>Contact :</h4>
        <div class="col-md-4">
          <div class="form-floating mb-3">
            <input
              type="text"
              name="prenom"
              id="prenom"
              v-model="client.firstName"
              class="form-control"
              placeholder="Prenom"
              :class="{ 'is-invalid': !client.firstName }"
            />
            <label for="firstName" class="form-label">Prenom</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="text"
              name="fonction"
              id="fonction"
              class="form-control"
              placeholder="Fonction"
              v-model="client.role"
              :class="{ 'is-invalid': !client.role }"
            />
            <label for="fonction" class="form-label">Fonction</label>
          </div>
          
        </div>
        <div class="col-md-4">
          <div class="form-floating mb-3">
            <input
              type="text"
              name="lastName"
              id="lastName"
              class="form-control"
              placeholder="Nom"
              v-model="client.lastName"
              :class="{ 'is-invalid': !client.lastName }"
            />
            <label for="lastName" class="form-label">Nom</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="text"
              name="telephone"
              id="telephone"
              class="form-control"
              placeholder="Telephone"
              v-model="client.phone"
            />
            <label for="telephone" class="form-label">Telephone</label>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-floating mb-3">
            <input
              type="date"
              name="date"
              id="date"
              class="form-control"
              placeholder="Date"
              format="yyyy-MM-dd"
              v-model="client.date"
              :class="{ 'is-invalid': !client.date }"
            />
            <label for="date" class="form-label">Date d'ajout</label>
          </div>
        </div>
        
      </div>
      <div class="row">
            <div class="col-md-8">
                <div class="form-floating mb-3">
                    <input
                      type="text"
                      name="email"
                      id="email"
                      class="form-control"
                      placeholder="Email"
                      v-model="client.email"
                      :class="{ 'is-invalid': !client.email }"
                    />
                    <label for="email" class="form-label">Email</label>
                </div>
                <div class="form-floating mb-3">
                    <input
                      type="text"
                      name="companyName"
                      id="companyName"
                      class="form-control"
                      placeholder="Entreprise"
                      v-model="client.companyName"
                      :class="{ 'is-invalid': !client.companyName }"
                    />
                    <label for="companyName" class="form-label">Entreprise</label>
                </div>
            </div>
        </div>

        <div class="row">
            <h4>Coordonnées :</h4>
            <div class="col-md-6">
                <div class="form-floating mb-3">
                    <input
                      type="text"
                      name="adrss1"
                      id="adrss1"
                      class="form-control"
                      placeholder="Adresse 1"
                      v-model="client.adrss1"
                      :class="{ 'is-invalid': !client.adrss1 }"
                    />
                    <label for="adrss1" class="form-label">Adresse 1</label>
                </div>
                <div class="form-floating mb-3">
                    <input
                      type="text"
                      name="adrss2"
                      id="adrss2"
                      class="form-control"
                      placeholder="Adresse 2"
                      v-model="client.adrss2"
                    />
                    <label for="adrss2" class="form-label">Adresse 2</label>
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-floating mb-3">
                    <input
                      type="text"
                      name="zipCode"
                      id="zipCode"
                      class="form-control"
                      placeholder="Code postal"
                      v-model="client.zipCode"
                    />
                    <label for="zipCode" class="form-label">Code postal</label>
                </div>
                <div class="form-floating mb-3">
                    <input
                      type="text"
                      name="pays"
                      id="pays"
                      class="form-control"
                      placeholder="Pays"
                      v-model="client.pays"
                      :class="{ 'is-invalid': !client.pays }"
                    />
                    <label for="pays" class="form-label">Pays</label>
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-floating mb-3">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      class="form-control"
                      placeholder="Ville"
                      v-model="client.city"
                      :class="{ 'is-invalid': !client.city }"
                    />
                    <label for="city" class="form-label">Ville</label>
                </div>
            </div>
        </div>

    
        
      
      <p class="text-end">
        <button
          @click="submitForm()"
          :disabled="formInvalid"
          class="btn btn-outline-primary btn-lg px-5"
        >
          <i class="fa-solid fa-save me-2" />Enregistrer
        </button>
      </p>
      <!-- 1ère manière de récupérer des paramètres de la route : -->
      <pre>{{ bill }}</pre>
    </div>
  </template>
  
  <script>
  // import PrestationTableRow from '@/components/TableList/PrestationTableRow.vue'
  import TableList from '@/components/TableList/TableList.vue'
  // on importe le store
  import { useClientStore } from '@/stores/client.js'
  // on importe les actions de pinia
  import { mapActions, mapWritableState } from 'pinia'
  
  const prestationInterface = {
    description: '',
    price: 0,
    qty: 1
  }
  
  export default {
    components: {
      // PrestationTableRow,
      TableList
    },
    props: {
      id: {
        type: [String, Number],
        required: true
      }
    },
    data() {
      return {
        
      }
    },
    computed: {
      ...mapWritableState(useClientStore, ['client']),
  
      // test si c'est une nouvelle facture ou si on édite une facture existante
      isNewClient() {
        return this.id == '-1'
      },
  
      formInvalid() {
        return (
          !this.client ||
          !this.client.firstName ||
          !this.client.lastName ||
          !this.client.date ||
          !this.client.email ||
          !this.client.companyName ||
          !this.client.adrss1 ||
          !this.client.pays ||
          !this.client.city
        )
      },
    },
    mounted() {
      // charge les données de la facture à éditer
      this.setClient(this.id)
    },
    methods: {
      // on déclare l'action ou les actions du store que l'on souhaite utiliser
      ...mapActions(useClientStore, ['setClient', 'onDeleteClient', 'onCreateClient', 'onUpdateClient']),
  
      // soumission du formulaire d'édition
      submitForm() {
        if (this.isNewClient) {
          this.onCreateClient(this.client)
        } else {
          // j'appelle la fonction pour mettre à jour une facture depuis le store
          this.onUpdateClient(this.client)
        }
  
        // puis je redirige l'utilisateur vers la page de liste
        this.$router.push({ path: '/clients' })
      },
  
      // suppression de la bill
      deleteClient(client) {
        // j'appelle la fonction qui vient du store stores/bills.js onDeleteBill() déclarée dans les actions du store
        this.onDeleteClient(client)
        // puis je redirige l'utilisateur vers la page de liste
        this.$router.push({ path: '/clients' })
      }
    },
  }
  </script>
  
  <style scoped>
  .table .th-actions {
    width: 10%;
  }
  .table .th-prestation {
    width: 44%;
  }
  .table .th-quantite {
    width: 10%;
  }
  .table .th-montant-ht,
  .table .th-montant-total {
    width: 18%;
  }
  </style>
  