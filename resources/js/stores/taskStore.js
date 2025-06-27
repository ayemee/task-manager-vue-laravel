import { defineStore } from 'pinia'
import axios from 'axios'

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [],
    error: null,
    filters: {
      status: 'all',
      priority: ''
    }
  }),

  actions: {
    async fetchTasks(req) {
      this.error = null
      try {
        const response = await axios.get('/task', {
          params: {
            status: req.value.status,
          }
        })
        this.tasks = response.data
      } catch (e) {
        this.error = 'Failed to fetch tasks.'
        console.error(e)
      }
    },

    async addTask(newTask) {
      try {
        const res = await axios.post('/task', newTask)
        this.tasks.push(res.data)
      } catch (e) {
        console.error('Failed to add task:', e)
      }
    },

    async deleteTask(id) {
      try {
        await axios.delete(`/task/${id}`)
        this.tasks = this.tasks.filter(task => task.id !== id)
      } catch (e) {
        console.error('Failed to delete task:', e)
      }
    },

    async updateTask(task) {
      try {
        if(task.completed) {
            task.status = 'completed';
        } else {
            task.status = 'pending';
        }
        await axios.put(`/task/${task.id}`, task)
      } catch (e) {
        console.error('Failed to update task:', e)
      }
    },
  }
})