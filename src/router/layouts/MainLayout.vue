<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from 'stores/user-store'
import {userUpdateStore} from 'stores/userUpdate-store'
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar'
import {useTaskStore} from 'stores/task-store'

const taskStore = useTaskStore();

const $q = useQuasar();
const carregandoIframeEditar = ref(true);
const carregandoIframeCriar = ref(true);
const mostrarPopup = ref(false);
const mostrarPopupCriar = ref(false);
const mostrarPopupCriarTask = ref(false);
const iframeRef = ref(false);
const atualizarUsuario = ref("/#/updateuser");
const createTask = ref("/#/createTask")
const userStore = useUserStore();
const router = useRouter();
const userUpdate = userUpdateStore();
const loading =ref(false);
const tasks = ref([]);

const name = userStore.userDetails?.nickname;
const names = userUpdate.usuario.username

const envia = () => {
  userUpdate.usuario.id = userStore.userDetails?.id
  userUpdate.usuario.username = userStore.userDetails?.username
  userUpdate.usuario.email = userStore.userDetails?.email
  userUpdate.usuario.nickname = userStore.userDetails?.nickname
  userUpdate.usuario.phonenumber = userStore.userDetails?.phoneNumber

  console.log( "nickname:",userUpdate.usuario.nickname)
}

const pagination = ref({
  sortBy:'name',
  descending: false,
  page: 1,
  rowsPerPage: 5
})


const fecharPopup = async () => {
  if (mostrarPopup.value) mostrarPopup.value = false;
  if (mostrarPopupCriar.value) mostrarPopupCriar.value = false;
  if(mostrarPopupCriarTask.value) mostrarPopupCriarTask.value =false;
  carregandoIframeEditar.value = true;
  carregandoIframeCriar.value = true;
};

const exibirCriar = () => {
  mostrarPopupCriar.value = true;
};

const exibirCriarTask = () => {
  mostrarPopupCriarTask.value = true;
};


const loadTasks = async () => {
  loading.value = true;
  tasks.value = userStore.userDetails.tasks || [];
  loading.value = false;
};

const criarTask = () =>{
  exibirCriarTask();
}

onMounted(async () => {
  userStore.recoverUserDetails();
  await userStore.fetchCurrentUserDetails();
  await userUpdate.usuario
  await taskStore.fetchAllTask();
  await loadTasks();

});

const logouts = async () => {
  await userStore.logout();
  await userUpdate.limparUsuario();
  router.push({ name: 'login' });
  $q.notify({
    type: 'positive',
    message: 'Logout realizado com sucesso.',
  });
};

const handleClick = () => {
  exibirCriar();
  envia();
};

const handleClickTask = () => {
  exibirCriar();
  envia();
};


</script>

<style>
  .header-background {
    background-image: url('src/assets/img2.webp');
    background-size: cover;
    background-position: center;
  }

  .my-full-width {
    width: 100%;
  }

  .text-success {
    color: green;
  }

  .text-warning {
    color: orange;
  }

</style>


<template>
  <q-layout view="lHh Lpr lFf">
    <q-header  class="header-background" elevated>
      <q-toolbar>
        <q-toolbar-title class="text-grey-7 text-h4">
        <b>Tasks</b>
        </q-toolbar-title>
        <div class=" q-mr-md">
          <span> olá, {{name}}</span>
        </div>

        <q-btn-dropdown color="primary" >
          <q-list  class="bg-white">
            <q-item clickable v-close-popup  @click="handleClick" class="text-blue-7 bg-grey-4"  >Editar Usuario</q-item>
            <q-item clickable v-close-popup @click="criarTask" class="text-blue-7 bg-grey-4"> Criar Task </q-item>
            <q-item clickable v-close-popup @click="logouts" class="text-blue-7 bg-grey-4" > Sair</q-item>

          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <div class="flex justify-center">
        <q-input v-model="text" label="Descrição" :dense="dense" />


        <div class="q-pa-sm rounded-borders q-ml-sm" :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'">
          <q-toggle
            name="music_genre"
            v-model="genreRock"
            true-value="rock"
            label="Rock"
          />

          <q-toggle
            name="music_genre"
            v-model="genreFunk"
            true-value="funk"
            label="Funk"
          />

          <q-toggle
            name="music_genre"
            v-model="genrePop"
            true-value="pop"
            label="Pop"
          />
        </div>
      </div>
    </q-page-container>


    <q-page-container>
      <div v-if="loading" class="flex flex-center q-">
        <q-spinner color="primary" />
      </div>
      <div v-else class="q-gutter-md " style="max-width: 100%">
        <div class="row q-col-gutter-md q-ml-sm">
          <q-card v-for="(task, index) in tasks" :key="index" class="my-card col-xs-12 col-sm-6 col-md-4 col-lg-3 q-ml-lg">
            <q-card-section>
              <div class="text-h6">Descrição:</div>
              <div class="text-subtitle2">{{ task.description }}</div>
            </q-card-section>

            <!-- ... outras seções ... -->

            <q-card-section>
              <div class="text-h6">Status:</div>
              <div :class="{'text-success': task.status === 'Concluída', 'text-warning': task.status === 'Pendente'}">
                {{ task.status }}
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-page-container>

    <!-- ... Editar Usuario... -->
    <q-dialog
      v-model="mostrarPopupCriar" persistent>
      <q-card style="width: 30%; max-width: 100%; height: 700px ">
        <q-card-section class="bg-blue-5 q-pa-none q-mb-none ">
          <div class="flex row q-ml-sm">
            <div
              class="text-h6 col q-ml-sm"
              style="margin-top: 0.5%; color: #f1f1f1"
            >
              <div class="q-mt-sm"> Editar Usuario: {{names}}</div>
            </div>
            <div>
              <q-btn
                ref="iframeRef"
                color="red-14"
                flat
                icon="cancel"
                size="lg"
                @click="fecharPopup"
              />
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <div v-if="carregandoIframeCriar" class="flex flex-center"
               style="overflow: hidden; height: 400px; width: 100%">
            <q-spinner-gears color="primary" size="110px"/>
          </div>
          <iframe
            v-show="!carregandoIframeCriar"
            @load="carregandoIframeCriar = false"
            id="meuIframe"
            :src="atualizarUsuario"
            frameborder="0"
            height="770px"
            style="overflow: hidden"
            width="100%"
          />
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- ... Create Task ... -->
    <q-dialog
      v-model="mostrarPopupCriar" persistent>
      <q-card style="width: 30%; max-width: 100%; height: 700px ">
        <q-card-section class="bg-blue-5 q-pa-none q-mb-none ">
          <div class="flex row q-ml-sm">
            <div
              class="text-h6 col q-ml-sm"
              style="margin-top: 0.5%; color: #f1f1f1"
            >
              <div class="q-mt-sm"> Editar Usuario: {{names}}</div>
            </div>
            <div>
              <q-btn
                ref="iframeRef"
                color="red-14"
                flat
                icon="cancel"
                size="lg"
                @click="fecharPopup"
              />
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <div v-if="carregandoIframeCriar" class="flex flex-center"
               style="overflow: hidden; height: 400px; width: 100%">
            <q-spinner-gears color="primary" size="110px"/>
          </div>
          <iframe
            v-show="!carregandoIframeCriar"
            @load="carregandoIframeCriar = false"
            id="meuIframe"
            :src="createTask"
            frameborder="0"
            height="770px"
            style="overflow: hidden"
            width="100%"
          />
        </q-card-section>
      </q-card>
    </q-dialog>










    <<q-footer  class="bg-primary">
    <div class="text-center">
      1.0.0 Alpha
    </div>
  </q-footer>

  </q-layout>
</template>



