<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useQuasar } from 'quasar';
import { useUserStore } from 'src/stores/user-store';
import { useGlobalMessageStore } from 'stores/global-message'
import { useRouter } from 'vue-router';
import { userUpdateStore } from 'stores/userUpdate-store'
const $q = useQuasar();
const userStore = useUserStore();
const userUpdate = userUpdateStore();

const router = useRouter();
const id = userUpdate.usuario.id;

const user = ref({
  'username': '',
  'newPassword': '',
  'email': '',
  'nickname': '',
  'phonenumber': '',

});

onMounted(async () => {
  if(id){
    user.value.username =  userUpdate.usuario.username ;
    user.value.email =   userUpdate.usuario.email;
    user.value.nickname =   userUpdate.usuario.nickname;
    user.value.phonenumber=  userUpdate.usuario.phonenumber;
  }
});

const updateUsuario = async () =>{
  console.log("cheguei")
  try{
    const dadosAtualizar = {
      username: user.value.username,
      nickname: user.value.nickname,
      newPassword: user.value.newPassword,
      email: user.value.email,
      phoneNumber: user.value.phonenumber,
    };
    await userStore.updateUser(id, dadosAtualizar);
    await userUpdate.limparUsuario();
    useGlobalMessageStore().addMessage({
      type: 'success',
      text: 'Atualizado com sucesso!',
    });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    useGlobalMessageStore().addMessage({
      type: "error",
      text: "Erro ao atualizar o usuário",

    });
    console.log('id:',id);
  }
};

function onReset() {
  user.value = { username: '', newPassword: '', email: '', nickname: '', phonenumber: '' };
}

const phoneMask = computed(() => {
  return user.value.phonenumber.length <= 15 ? '(##) #####-####' : '(##) ######-####';
});


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

          <q-card-section>
            <q-form class="q-gutter-md ">
              <q-input filled v-model="user.username" label="Nome de usuário" :rules="[val => val && val.length > 0 || 'Por favor, preencha o nome de usuário']" />
              <q-input filled type="password" v-model="user.newPassword" label="Senha" :rules="[val => val && val.length > 0 || 'Por favor, preencha a senha']" />
              <q-input filled v-model="user.email" label="Email" :rules="[val => val && val.length > 0 || 'Por favor, preencha o email']" />
              <q-input filled v-model="user.nickname" label="Apelido" :rules="[val => val && val.length > 0 || 'Por favor, preencha o apelido']" />
              <q-input filled v-model="user.phonenumber" label="Telefone" :mask="phoneMask" :rules="[val => val && val.length > 0 || 'Por favor, preencha o número de telefone']" hint="Formato: (99) 99999-9999 ou (99) 999999-9999" />
            </q-form>
          </q-card-section>
        </q-card>
        <div class="" style="margin-bottom:190px">
          <q-btn label="Atualizar" color="primary" class="q-mr-md" @click="updateUsuario" />
          <q-btn label="Limpar" color="primary" outline @click="onReset" />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
