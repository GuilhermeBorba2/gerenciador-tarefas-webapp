<script setup>
import { ref } from 'vue';
import { useTaskStore } from 'stores/task-store';
import { userUpdateStore } from 'stores/userUpdate-store'

const userUpdate = userUpdateStore();
const taskStore = useTaskStore();
const id = userUpdate.usuario.id;



const task = ref({
  title: '',
  description: '',
  priority: '',
  status: '',
  creationDate: '',
  completionDate: '',
});


function onReset() {
  task.value = {
    title: '',
    description: '',
    priority: '',
    status: '',
    creationDate: '',
    completionDate: '',
  };
}

const createTask = async () => {
  try {
    const saveTask = {
      title: task.value.title,
      description: task.value.description,
      priority: task.value.priority,
      status: task.value.status,
      userId: id,
      creationDate: formatarData(task.value.creationDate),
      completionDate: formatarData(task.value.completionDate),
    };

    await taskStore.addTask(saveTask); // Supondo que este método faça a requisição POST corretamente
    globalMessageStore.addMessage({
      type: 'success',
      text: 'Tarefa criada com sucesso!',
    });
    onReset(); // Reseta o formulário após o sucesso
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    globalMessageStore.addMessage({
      type: "error",
      text: error.message || "Erro ao criar a tarefa",
    });
  }
};


function formatarData(dataString) {
  return dataString.replace(/\//g, '-');
}

const addTask = async () => {
  await createTask();
  console.log('Tarefa adicionada:', task.value);
};
</script>

<template>
  <q-layout>
    <q-page-container>
        <q-page class="flex flex-center">
          <q-card class="tamanho" align="center">
              <q-card-section>
              <q-form @submit="addTask" class="q-gutter-md ">
                <q-input color="teal" filled v-model="task.title"  class="bg-grey-4" label="Titulo da Task" lazy-rules :rules="[val => val && val.length > 0 || 'Campo obrigatório']"/>
                <q-input color="teal" filled v-model="task.description"  class="bg-grey-4"  label="Descrição da Tarefa" lazy-rules :rules="[val => val && val.length > 0 || 'Campo obrigatório']"/>
                <q-select color="teal" filled v-model="task.priority"  class="bg-grey-4"  :options="['Alta', 'Média', 'Baixa']" label="Prioridade"/>
                <q-select color="teal" filled v-model="task.status" class="bg-grey-4"  :options="['Pendente', 'Em Andamento', 'Concluída']" label="Status"/>

                <q-input  color="teal" filled v-model="task.creationDate" mask="date"  class="bg-grey-4" :rules="['date']">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="task.creationDate">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>

                <q-input color="teal" filled class="bg-grey-4" v-model="task.completionDate" mask="date" :rules="['date']">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="task.completionDate">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>

                <div class="" style="margin-bottom:190px">
                  <q-btn label="Adicionar Tarefa"  class="q-mr-md" type="submit" color="primary"/>
                  <q-btn label="Limpar" color="primary" outline @click="onReset" />
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </q-page>
    </q-page-container>
  </q-layout>

</template>

