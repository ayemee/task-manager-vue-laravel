<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label class="block text-gray-600 text-sm mb-1">Email</label>
          <input v-model="form.email" type="email" class="w-full px-4 py-2 rounded border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div class="mb-4">
          <label class="block text-gray-600 text-sm mb-1">Password</label>
          <input v-model="form.password" type="password" class="w-full px-4 py-2 rounded border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <button type="submit" class="w-full bg-green-500 hover:bg-green-300 text-white py-2 rounded font-semibold transition">
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
  import { reactive } from 'vue';
  import { useAuthStore } from '../stores/authStore'
  import { useRouter } from 'vue-router';

  const authStore = useAuthStore()
  const router = useRouter();

  const form = reactive({
    name: '',
    email: '',
    password: '',
    is_admin: 1
  })

  const login = async () => {
    await authStore.login(form);
    if(authStore.success) {
      router.push('/dashboard');
    } else {
      alert('Wrong email or password!');
    }
  }
</script>