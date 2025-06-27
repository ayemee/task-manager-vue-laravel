import { defineStore } from 'pinia'
import axios from 'axios'

export const usePostStore = defineStore('post', {
  state: () => ({
    posts: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchPosts() {
      this.loading = true
      try {
        const res = await axios.get('/post')
        this.posts = res.data
      } catch (err) {
        this.error = err.response?.data || 'Failed to fetch'
      } finally {
        this.loading = false
      }
    },

    async addPost(data) {
      try {
        await axios.post(`/post`, data)
        await this.fetchPosts() // Refresh the list
      } catch (err) {
        console.error('Update error:', err)
      }
    },

    async updatePost(id, data) {
      try {
        await axios.put(`/post/${id}`, data)
        await this.fetchPosts() // Refresh the list
      } catch (err) {
        console.error('Update error:', err)
      }
    },

    async deletePost(id) {
      try {
        await axios.delete(`/post/${id}`)
        this.posts = this.posts.filter(p => p.id !== id)
      } catch (err) {
        console.error('Delete error:', err)
      }
    }
  }
})