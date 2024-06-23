import type {ITodo} from "~/types";
import type {ObjectId} from "mongodb";

export const useTasks = () => {
    const tasks = useState<ITodo[]>('tasks', () => [])

    const getAll = async () => {
        const response = await $fetch('/api/v1/item/all-items')
        tasks.value = response.data
    }

    const saveTask = async (task: { name: string; description?: string; id: ObjectId | null }) => {
        const { name, description = '', id } = task;
        const endpoint = id ? `/api/v1/item/${id}` : '/api/v1/item/add';
        const method = id ? 'PUT' : 'POST';

        const response = await $fetch(endpoint, {
            method: method,
            body: { name, description }
        });

        if (id) {
            tasks.value = tasks.value.map(t => t._id === id ? { ...t, name, description } : t);
        } else {
            tasks.value.push(response.data);
        }
    }

    const deleteTask = async (id: ObjectId) => {
        await $fetch(`/api/v1/item/${id}`, {
            method: 'DELETE',
        })
        tasks.value = tasks.value.filter((task) => task._id !== id)
    }

    return {tasks, getAll, saveTask, deleteTask}
}
