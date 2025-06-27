<template>
 <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
      <form @submit.prevent="register">
        <div class="mb-4">
          <label class="block text-gray-600 text-sm mb-1">Name</label>
          <input v-model="form.name" type="text" class="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div class="mb-4">
          <label class="block text-gray-600 text-sm mb-1">Email</label>
          <input v-model="form.email" type="email" class="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div class="mb-4">
          <label class="block text-gray-600 text-sm mb-1">Password</label>
          <input v-model="form.password" type="password" class="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div class="mb-6">
          <label class="block text-gray-600 text-sm mb-1">Confirm Password</label>
          <input v-model="form.password_confirmation" type="password" class="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <button type="submit" class="w-full bg-green-500 hover:green-300 text-white py-2 rounded-xl font-semibold transition">
          Register
        </button>
      </form>

      <p class="text-center text-sm text-gray-500 mt-4">
        Already have an account?
        <a href="/login" class="text-blue-600 hover:underline">Log in</a>
      </p>
    </div>
  </div>
</template>

<script setup>
  import { reactive } from 'vue';
  import { useAuthStore } from '../stores/auth'
  import { useRouter } from 'vue-router';

  const auth = useAuthStore()
  const router = useRouter();

  const form = reactive({
    name: '',
    email: '',
    password: '',
    is_admin: 1
  })

  const register = async () => {
    await auth.register(form);
    if(auth.success) {
      router.push('/login');
    } else {
      alert('Unable to register account. Please fill up the form correctly!');
    }
  }
</script>