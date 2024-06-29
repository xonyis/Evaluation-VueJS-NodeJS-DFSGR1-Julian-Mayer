<template>
    <table class="table">
      <thead>
        <tr>
          <!-- pour personnaliser éventuellement l'entête du tableau, on pourra utiliser le slot thead avec <template #thead></template> -->
          <slot name="thead">
            <th scope="col" class="col-3">Nom</th>
            <th scope="col" class="col-4">Entreprise</th>
            <th scope="col" class="col-2 text-end">Date d'ajout</th>
            <th scope="col" class="col-3 text-end">Actions</th>
          </slot>
        </tr>
      </thead>
      <tbody>
        <!-- affichage des lignes de tableau -->
        <slot />
      </tbody>
    </table>
  </template>
  
  <script>
  export default {}
  </script>
  
  <style scoped></style>
  