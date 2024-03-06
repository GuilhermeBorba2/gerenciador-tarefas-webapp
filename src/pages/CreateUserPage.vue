<script setup>
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar';
import { useUserStore } from 'src/stores/user-store';
import { useGlobalMessageStore } from 'stores/global-message';
import { useRouter } from 'vue-router';

const $q = useQuasar();
const userStore = useUserStore();
const router = useRouter();


const user = ref({
  'username': '',
  'password': '',
  'email': '',
  'nickname': '',
  'phonenumber': '',
});

const saveUsuario = async () => {
  try {
    const dadosSalvar = {
      username: user.value.username,
      password: user.value.password,
      nickname: user.value.nickname,
      email: user.value.email,
      phoneNumber: user.value.phonenumber,
    };
    if((dadosSalvar.username !=='') && (dadosSalvar.password!=='')){
      await userStore.registerUser(dadosSalvar);
      useGlobalMessageStore().addMessage({
        type: "success",
        text: "Salvo com sucesso!",
      });
    }else{
      useGlobalMessageStore().addMessage({
        type: "error",
        text: "preencha os campos",
      });
    }

  } catch (error) {
    useGlobalMessageStore().addMessage({
      type: "error",
      text: "Erro ao salvar o usuário",
    });
  }
};

function onReset() {
  user.value.username = '';
  user.value.password = '';
  user.value.email = '';
  user.value.nickname = '';
  user.value.phonenumber = '';
}

const phoneMask = computed(() => {
  return user.value.phonenumber.length <= 10 ? '(##) ####-####' : '(##) #####-####';
});

const voltar = () => {
  router.push({ name: 'login' });
}
</script>


<style >
.tamanho{
  width:600px;
}
</style>

<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card class="tamanho" align="center">
          <q-card-section class="bg-blue-3">
            <div class="text-h6">Registrar Novo Usuário</div>

          </q-card-section>

          <q-card-section>
            <q-form @submit.prevent="saveUsuario"  class="q-gutter-md">
              <q-input filled v-model="user.username" label="Nome de usuário" :rules="[val => val && val.length > 0 || 'Por favor, preencha o nome de usuário']" />
              <q-input filled type="password" v-model="user.password" label="Senha" :rules="[val => val && val.length > 0 || 'Por favor, preencha a senha']" />
              <q-input filled v-model="user.email" label="Email" :rules="[val => val && val.length > 0 || 'Por favor, preencha o email']" />
              <q-input filled v-model="user.nickname" label="Apelido" :rules="[val => val && val.length > 0 || 'Por favor, preencha o apelido']" />
              <q-input
                filled
                v-model="user.phonenumber"
                label="Telefone"
                :mask="phoneMask"
                :rules="[val => val && val.length > 0 || 'Por favor, preencha o número de telefone']"
                hint="Formato: (99) 99999-9999 ou (99) 999999-9999"
              />
            </q-form>
            <div class="q-mt-md flex row">

              <div class="justify-end col-9 ">
                <q-btn label="Registrar" color="primary" class="q-mr-md" @click="saveUsuario" />
                <q-btn label="Limpar" type="reset" color="primary" v-on="" outline @click="onReset" />
              </div>

              <div class="justify-end  col-3" >
                <q-btn class=""  label="login" type="reset" color="green" v-on=""  @click="voltar" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
