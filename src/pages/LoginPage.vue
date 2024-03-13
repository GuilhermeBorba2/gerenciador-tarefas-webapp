<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar';
import { useUserStore } from 'stores/user-store'
import { useRouter } from 'vue-router';
import { userUpdateStore } from 'stores/userUpdate-store'


const $q = useQuasar();
const userStore = useUserStore();
const router = useRouter();
const userUpdate = userUpdateStore();

const credentials = ref({
  username: '' ,
  password: '' ,
});

const registrarUsuario=()=>{
  router.push({name: 'createuser'})
}

const onReset = () => {
  credentials.value.username = '';
  credentials.value.password = '';
};

const login = async () => {
  try {
    await userStore.login(credentials.value);
    $q.notify({
      type: 'positive',
      message: 'Login bem-sucedido!',
    });
    console.log('passou')
    console.log("o o que tem aqui: ", userStore.userDetails)
    router.push({ name: 'menutaskcomponent' });
  } catch (error) {

    console.error('Erro no login:', error);
    $q.notify({
      type: 'negative',
      message: 'Falha no login. Verifique suas credenciais.',
    });
  }
};

</script>

<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card class="q-pa-sm bg-grey-3" style="width: 400px;">
          <q-card-section class="bg-primary" style="border-radius: inherit">
            <div class="text-h6 text-center text-white">Login</div>
          </q-card-section>

          <q-card-section>
            <q-form @submit.prevent="login" @reset="onReset" class="q-gutter-md">
              <q-input filled  v-model="credentials.username" label="User" />
              <q-input filled v-model="credentials.password" label="Password" type="password" />

              <div class="q-mt-lg flex flex-center">
                <q-btn label="Entrar" type="submit" color="primary" />
                <q-btn class="q-ml-md " @click="registrarUsuario" label="Criar conta"  color="green"/>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
      </q-page-container>
  </q-layout>
</template>

