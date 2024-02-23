<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from 'stores/user-store'
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar'
const $q = useQuasar();


const userStore = useUserStore();
const router = useRouter();
const name = userStore.userDetails?.name;

onMounted(async () => {
  await userStore.fetchCurrentUserDetails();
});


const logouts = async () =>{
  await userStore.logout();
  router.push({name:'login'})
  $q.notify({
    type: 'positive',
    message: 'Logout realizado com sucesso.',
  });

}

</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>

        <q-toolbar-title>
         Tasks

        </q-toolbar-title>
        <div>{{name}}</div>
        <q-btn-dropdown color="primary" label="nickname">
          <q-list>
            <q-item clickable v-close-popup label="Editar Usuario" >Editar Usuario</q-item>
          </q-list>
        </q-btn-dropdown>
       <q-btn class="q-ml-sm justify-end bg-blue-7" @click="logouts" flat label="Sair"></q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>



