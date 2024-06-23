<template>
  <UTable :rows="tasks" :columns="columns">
    <template #createdAt-data="{ row }">
      <span>{{ dayjs(row.createdAt).format('MMM DD, YYYY') }}</span>
    </template>
    <template #actions-data="{ row }">
      <UDropdown :items="items(row)">
        <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
      </UDropdown>
    </template>
  </UTable>
  <UButton label="Open" @click="isOpen = true" />
  <UModal v-model="isOpen">
    <div class="p-4">
      <UForm :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Name" name="name" required>
          <UInput v-model="state.name"/>
        </UFormGroup>

        <UFormGroup label="Description" name="description">
          <UInput v-model="state.description"/>
        </UFormGroup>

        <UButton type="submit">
          Submit
        </UButton>
      </UForm>
    </div>
  </UModal>
</template>

<script setup lang="ts">
import type {ITodo} from "~/types";
import type {ObjectId} from "mongodb";
import dayjs from 'dayjs';
const { getAll, tasks, saveTask, deleteTask } = useTasks()
const isOpen = ref(false)
const state = reactive({
  name: '',
  description: '',
  id: null as ObjectId | null,
})

const columns = [{
  key: '_id',
  label: 'ID'
}, {
  key: 'name',
  label: 'Task name'
}, {
  key: 'description',
  label: 'Description'
}, {
  key: 'createdAt',
  label: 'Created'
}, {
  key: 'actions'
}]

const items = (row: ITodo) => [
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => editById(row._id)
  }, {
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid',
    click: () => deleteById(row._id)
  }]
]

await callOnce(async () => {
  await getAll()
})
const onSubmit = async () => {
  await saveTask({
    name: state.name,
    description: state.description,
    id: state.id
  })
  state.name = ''
  state.description = ''
  state.id = null
  isOpen.value = false
}

const deleteById = (id: ObjectId) => {
  deleteTask(id)
}

const editById = (id: ObjectId) => {
  const task = tasks.value.find(t => t._id === id)
  if (task) {
    state.name = task.name
    state.description = task.description
    state.id = task._id
    isOpen.value = true
  }
}
</script>

