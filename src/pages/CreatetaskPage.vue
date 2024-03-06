<script setup>
import { ref } from 'vue';
import { useTaskStore } from 'stores/task-store';


const taskStore = useTaskStore();


const task = ref({
  description: '',
  deadline: '',
  priority: 'Média',
  assignedTo: '',
  status: 'Pendente'
});


const addTask = async () => {

  console.log('Tarefa adicionada:', task.value);
};
</script>

<template>
  <q-page padding>
    <div class="q-pa-md" style="max-width: 600px; margin: 0 auto;">
      <q-form @submit="addTask">
        <q-input filled v-model="task.description" label="Descrição da Tarefa" lazy-rules :rules="[val => val && val.length > 0 || 'Campo obrigatório']"/>

        <q-input filled v-model="task.deadline" mask="####-##-##" label="Prazo (YYYY-MM-DD)" lazy-rules :rules="[val => val && val.match(/^\d{4}-\d{2}-\d{2}$/) || 'Data inválida']"/>

        <q-select filled v-model="task.priority" :options="['Alta', 'Média', 'Baixa']" label="Prioridade"/>

        <q-input filled v-model="task.assignedTo" label="Responsável" lazy-rules :rules="[val => val && val.length > 0 || 'Campo obrigatório']"/>

        <q-select filled v-model="task.status" :options="['Pendente', 'Em Andamento', 'Concluída']" label="Status"/>

        <div class="q-mt-md">
          <q-btn label="Adicionar Tarefa" type="submit" color="primary"/>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

