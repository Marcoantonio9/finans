<template lang="">
  <div class="container mx-auto">
    <h3 class="text-4xl py-10">Minhas finanças</h3>
    <div class="flex flex-col items-center md:flex-row justify-center gap-5 md:gap-20">
      <div class="card rounded-lg border w-80 h-48 px-5 flex flex-col justify-center gap-10">
        <div class="flex justify-between">
          <span class="text-2xl">Entradas</span>
          <img src="../../assets/images/arrow-up.svg" class="w-10" alt="">
        </div>
        <div class="h-16">
          <h3 class="text-4xl">{{ totalEntrace.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}) }}</h3>
        </div>
      </div>

      <div class="card rounded-lg border w-80 h-48 px-5 flex flex-col justify-center gap-10">
        <div class="flex justify-between">
          <span class="text-2xl">Saídas</span>
          <img src="../../assets/images/arrow-down.svg" class="w-10" alt="">
        </div>
        <div class="h-16">
          <h3 class="text-4xl">{{ totalExit.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}) }}</h3>
        </div>
      </div>

      <div class="card bg-green-400 rounded-lg border w-80 h-48 px-5 flex flex-col justify-center gap-10">
        <div class="flex justify-between">
          <span class="text-2xl">Total</span>
          <img src="../../assets/images/money.svg" class="w-10" alt="">
        </div>
        <div class="h-16">
          <h3 class="text-4xl">{{ atualFinance.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}) }}</h3>
        </div>
      </div>
    </div>

    <div class="w-full h-full bg-white mt-9">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="flex flex-col">
          <div class="mb-2 py-4 flex flex-wrap flex-grow justify-between">
            <div class="flex items-center py-2">
              <span
                @click="openModalCreateFinances()"
                class="inline-block px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline hover:cursor-pointer">
                Nova transação
              </span>
            </div>

            <div class="flex flex-col items-end">
              <span @click="openModalFilter()" class="font-bold hover:cursor-pointer">&darr; Filtrar</span>
              <span class="text-gray-500">
                {{ new Date(dateSelected.start).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) }} - {{ new Date(dateSelected.end).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) }}
              </span>
            </div>
          </div>
          <div class="-my-2 py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 h-96">
            <div class="align-middle inline-block w-full h-full shadow overflow-x-auto sm:rounded-lg border-b border-gray-200">
              <table class="min-w-full">
                <thead>
                  <tr class="bg-gray-50 border-b border-gray-200 text-xs leading-4 text-gray-500 uppercase tracking-wider">
                    <th class="px-6 py-3 text-left font-medium">
                      Descrição
                    </th>
                    <th class="px-6 py-3 text-left font-medium">
                      Valor
                    </th>
                    <th class="px-6 py-3 text-left font-medium">
                      Data
                    </th>
                    <th class="px-6 py-3 text-left font-medium">
                      Tipo
                    </th>
                    <th class="px-6 py-3 text-left font-medium">
                      Deletar
                    </th>
                    <th class="px-6 py-3 text-left font-medium">
                      Editar
                    </th>
                  </tr>
                </thead>

                <tbody class="bg-white">
                  <tr v-for="(item, key) in myListTransitions" :key="key">
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div class="text-sm leading-5 text-gray-900">
                        {{ item.description }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div class="text-sm leading-5 text-gray-900">
                        {{ item.transition_value.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}) }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div class="text-sm leading-5 text-gray-900">
                        {{ formatDate(item.date)  }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <span
                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                        :class="{'bg-blue-100 text-blue-800': item.type === 1, 'bg-red-100 text-red-800': item.type === 0}"
                        >
                        {{ item.type === 1 ? 'Entrada' : 'Saída' }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                      <div>
                        <span class="inline-flex items-center justify-center p-2 bg-red-500 rounded-md shadow-lg hover:cursor-pointer" @click="openModalDeleteFinance(item)">
                          <img class="w-4" src="../../assets/images/delete.svg" alt="Botão de deletar">
                        </span>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                      <div>
                        <span class="inline-flex items-center justify-center p-2 bg-indigo-500 rounded-md shadow-lg hover:cursor-pointer" @click="openModalCreateFinances(item)">
                          <img class="w-4" src="../../assets/images/edit.svg" alt="Botão de editar">
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ModalCreateFinances
    v-if="statusModalCreate"
    :openModalCreateFinances="openModalCreateFinances"
    :handleListMyTransitions="handleListMyTransitions"
    :itemTransitionEditable="itemTransitionEditable"
  />
  <ModalRemoveFinance
    v-if="statusModalDelete"
    :openModalDeleteFinance="openModalDeleteFinance"
    :handleListMyTransitions="handleListMyTransitions"
    :getItemDelete="getItemDelete"
  />
  <ModalFilter
    v-if="statusModalFilter"
    :openModalFilter="openModalFilter"
  />
</template>
<script>
import { ref, onMounted, watch } from 'vue'
import useTransitionsUsers from '@/composables/UseTransitionsUsers'
import ModalCreateFinances from '@/components/Dashboard/ModalCreateFinances.vue'
import ModalRemoveFinance from '@/components/Dashboard/ModalRemoveFinance.vue'
import ModalFilter from '@/components/Dashboard/ModalFilter.vue'
import { selectedNewFilter, dateSelected } from '../../utils/index'

export default {
  components: {
    ModalCreateFinances,
    ModalRemoveFinance,
    ModalFilter
  },
  setup () {
    const { getList } = useTransitionsUsers()
    const statusModalCreate = ref(false)
    const statusModalDelete = ref(false)
    const statusModalFilter = ref(false)
    const myListTransitions = ref([])
    const totalEntrace = ref(0)
    const totalExit = ref(0)
    const atualFinance = ref(0)
    const itemTransitionEditable = ref({})
    const getItemDelete = ref({})

    async function handleListMyTransitions () {
      myListTransitions.value = await getList()
      totalEntrace.value = myListTransitions.value.reduce((acc, obj) => {
        if (obj.type === 1) {
          return acc + obj.transition_value
        }
        return acc
      }, 0)
      totalExit.value = myListTransitions.value.reduce((acc, obj) => {
        if (obj.type === 0) {
          return acc + obj.transition_value
        }
        return acc
      }, 0)
      atualFinance.value = totalEntrace.value - totalExit.value
    }

    onMounted(() => {
      handleListMyTransitions()
    })

    watch(selectedNewFilter, (v) => {
      if (v === true) {
        handleListMyTransitions()
        selectedNewFilter.value = null
      }
    })

    function openModalCreateFinances (item) {
      statusModalCreate.value = !statusModalCreate.value
      if (!item) {
        itemTransitionEditable.value = {}
        return
      }
      itemTransitionEditable.value = { ...item }
    }

    function openModalDeleteFinance (item) {
      statusModalDelete.value = !statusModalDelete.value
      getItemDelete.value = { ...item }
    }

    function formatDate (date) {
      const format = new Date(date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
      return format
    }

    function openModalFilter () {
      statusModalFilter.value = !statusModalFilter.value
    }

    return {
      openModalCreateFinances,
      statusModalCreate,
      myListTransitions,
      handleListMyTransitions,
      totalEntrace,
      totalExit,
      atualFinance,
      itemTransitionEditable,
      statusModalDelete,
      openModalDeleteFinance,
      getItemDelete,
      formatDate,
      openModalFilter,
      statusModalFilter,
      dateSelected
    }
  }
}
</script>
