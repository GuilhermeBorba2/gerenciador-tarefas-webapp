import { api } from 'boot/axios';

const baseURL = '/tasks';

export const taskService = {
  async getAllTasks(){
    const response = await api.get(baseURL)
    return response.data
  },
  async getTaskByID(id){
    const response = await api.get(`${baseURL}/${id}`);
    return response.data;
  },
  async createTask(taskDto){
    const response = await api.post(`${baseURL}`, taskDto);
    return response.data;
  },
  async updateTask(id, taskDto){
    const response = await api.put(`${baseURL}/${id}`, taskDto)
    return response.data;
  },
  async deleteTask(id){
    const response = await api.delete(`${baseURL}/${id}`);
    return response.data
  },
  async changeTaskStatus(id,status){
    const response = await api.patch(`${baseURL}/${id}/status`, {status});
    return response.data

  },
};
