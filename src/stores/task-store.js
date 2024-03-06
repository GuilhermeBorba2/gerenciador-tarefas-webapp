import {defineStore} from 'pinia'
import { taskService } from 'src/services/task-service'

export const useTaskStore = defineStore ('task', {
  state:()=>({
      task:[],
  }),
  getters:{

  },
  actions:{
    async fetchAllTask(){
      try{
        const response = await taskService.getAllTasks();
        this.task = response.data
      }catch (e){
        console.error('erro ao buscar Task: ', e);
      }
    },
    async fetchTaskbyId(id){
      try{
          const response = await taskService.getTaskByID(id);
          this.task = response.data
      }catch (e){
        console.error("erro ao buscar o task: ",e);
      }
    },
    async updateTask(id, taskDto){
      try{
        const response = await taskService.updateTask(id, taskDto);
        this.task = response.data
      }catch (e){
        console.error('erro ao atualizar a task: '. e);
      }
    },
    async addTask(taskDto){
      try{
        const response = await taskService.createTask(taskDto);
        this.task = response.data;
      }catch (e){
        console.error('Erro ao cadastrar task: ', e);
      }
    },
    async removeTask (id){
      try{
        const response = await taskService.deleteTask(id);
      }catch (e){
        console.error('Erro ao deletar Task: ', e);
      }
    },
  },
});
