import { clients } from '@/seeds/clients.js'
import { defineStore } from 'pinia'
// on a installé la librairie uuid avec npm i uuid afin de pouvoir l'utiliser ici
export const useClientStore = defineStore('client', {
    state: () => ({
        clients,
        client: null
    }),
    getters: {},
    actions: {
        // récupère les données depuis l'API : fonction asynchrone
        async getAllClients() {
            const response = await this.$http.get('/clients')
            this.clients = response.data
        },

        // récupère une bill dans le store bill au moment de l'édition
        async setClient(id) {
            console.log(id);
            // si l'id est égal à -1, cela veut dire que l'on veut créer une nouvelle facture, donc on ne récupère pas de facture dans le store bill
            if (id == '-1') {
                this.client = {
                    id: -1,
                    firstName: '',
                    lastName: '',
                    date: '',
                    role: '',
                    companyName: '',
                    phone: '',
                    email: '',
                    adrss1: '',
                    adrss2: '',
                    zipCode: '',
                    city: '',
                    pays: '',
                }
            } else {
                // si je modifie une bill, je fais un appel à l"API pour récupérer les données :

                const response = await this.$http.get('/clients/' + id)
                this.client = response.data
            }
        },
        // recherche la facture correspondante dans le store, et enregistre les modifications
        async onUpdateClient(client) {
            const response = await this.$http.patch('/clients/' + client.id, client)
            console.log(response.data)
                // je vidange la donnée d'édition d'une bill
            this.client = null
            await this.getAllClients()
        },

        // Créer une nouvelle facture
        async onCreateClient(client) {
            // j'ajoute une nouvelle facture dans le tableau des bills, en ajoutant au passage un id unique grâce à la méthode importée uuidv4() depuis le package uuid
            const response = await this.$http.post('/clients', client)
            console.log(response.data)
            this.client = null
            await this.getAllClients()
        },

        async onDeleteClient(client) {
            // on recherche l'index de la facture à supprimer, et on retourne un nouveau tableau de bills sans celle-ci
            const response = await this.$http.delete('/clients/' + client.id)
            console.log(response.data)
                // pour raffraichir la liste des factures, je relance la méthode getAllBills()
            await this.getAllClients()
        }
    }
})