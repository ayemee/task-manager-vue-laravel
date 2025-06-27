<template>
    <div class="min-h-screen bg-gray-100 flex justify-center p-10">
        <div class="w-full bg-white rounded-2xl shadow-lg p-8">
            <div class="flex flex-col sm:flex-row justify-end mb-10 gap-2">
                <a href="/login" class="text-gray-500 hover:underline">Log out</a>
            </div>
            <!-- Add Task Form -->
            <form @submit.prevent="addTask" class="mb-10">
                <div class="flex flex-col sm:flex-row gap-2">
                    <input v-model="form.title" placeholder="Add New Task" class="border border-gray-500 p-2 rounded w-full" required />
                    <select v-model="form.priority" class="border border-gray-500 p-2 rounded">
                        <option value="low">Low</option>
                        <option value="medium" selected>Medium</option>
                        <option value="high">High</option>
                    </select>
                    <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-300">
                        Add
                    </button>
                </div>
            </form>
            <!-- Filter + Search -->
            <div class="flex flex-col sm:flex-row justify-between mb-6 gap-2">
                <input
                    v-model="search"
                    type="text"
                    placeholder="Search tasks..."
                    class="px-3 py-2 border border-gray-500 rounded w-full sm:w-2/4"
                />
                <select v-model="filterStatus" class="px-3 py-2 border border-gray-500 rounded w-full sm:w-1/4">
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                </select>
                <select v-model="filterPriority" class="px-3 py-2 border border-gray-500 rounded w-full sm:w-1/4">
                    <option value="low">Low</option>
                    <option value="medium" selected>Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            <!-- Task List -->
            <draggable v-model="filteredTasks" item-key="id" @end="logOrder" class="space-y-2 border-gray-500">
                <template #item="{ element: task }">
                    <transition name="fade">
                    <div
                        class="flex justify-between items-center p-3 border-l-4 bg-gray-200 shadow-sm rounded"
                        :class="priorityColor(task.priority)"
                    >
                        <div class="flex items-center gap-2">
                        <button v-if="task.status != 'completed'" @click="markAsComplete(task, true)">&#x2714;</button>
                        <span :class="{ 'line-through text-gray-400': task.status == 'completed' }">{{ task.title }}</span>
                        </div>
                        <button @click="deleteTask(task.id)">&#x2716;</button>
                    </div>
                    </transition>
                </template>
            </draggable>
            <div v-if="filteredTasks.length === 0" class="text-gray-400 text-center mt-6">No tasks found.</div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import draggable from 'vuedraggable'
import { useTaskStore } from '../stores/taskStore'

const taskStore = useTaskStore()

const form = ref({
  title: '',
  priority: 'low',
  user_id: 1
})

onMounted(() => {
  form.status = 'all'
  taskStore.fetchTasks(form);
})

// Inputs
const search = ref('')
const filterStatus = ref('all')
const filterPriority = ref('high')

const addTask = async () => {
    console.log('form', form.value);
    if (!form.value.title) return
    await taskStore.addTask(form.value)
    form.value.title = ''
    taskStore.fetchTasks(form)
}

const deleteTask = async (id) => {
  await taskStore.deleteTask(id)
}

const markAsComplete = async (task, status=false) => {
    task.completed = status;
    await taskStore.updateTask(task)
}

const priorityColor = (priority) => {
  return {
    high: 'border-red-500',
    medium: 'border-yellow-400',
    low: 'border-green-500'
  }[priority] || 'border-gray-300'
}

const filteredTasks = computed(() => {
    return taskStore.tasks
    .filter(task => {
        if(filterStatus.value !== 'all') {
            return task.title.toLowerCase().includes(search.value.toLowerCase()) 
                && task.status == filterStatus.value
                && task.priority == filterPriority.value;
        } else {
            return task.title.toLowerCase().includes(search.value.toLowerCase())
                && task.priority == filterPriority.value;
        }
    })
})

// Save order
const logOrder = () => {
  console.log('New order:', filteredTasks.value.map(t => t.id))
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all 0.8s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>