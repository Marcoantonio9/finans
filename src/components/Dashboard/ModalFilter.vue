<template lang="">
  <form class="fixed z-10 overflow-y-auto top-0 w-full left-0" id="modal" @submit.prevent="getListAndCloseModal">
    <div class="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-900 opacity-75"></div>
      </div>
      <span class="sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
      <div class="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
        <div class="bg-gray-200 px-4 py-3 flex justify-between items-center">
          <h3 class="text-lg">Filtrar</h3>
          <span class="text-4xl hover:cursor-pointer" @click="openModalFilter">
            &times;
          </span>
        </div>
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <label class="w-12/12 flex flex-col mt-5">
            <span>Data Inicial</span>
            <input v-model="dateSelected.start" class="block w-12/12 px-4 py-3 text-lg bg-gray-100 border-2 border-transparent rounded" type="date" placeholder="dd/mm/aaaa">
            <div class="input-errors">
              <span class="text-red-600"></span>
            </div>
          </label>

          <label class="w-12/12 flex flex-col mt-5">
            <span>Data Final</span>
            <input v-model="dateSelected.end" class="block w-12/12 px-4 py-3 text-lg bg-gray-100 border-2 border-transparent rounded" type="date" placeholder="dd/mm/aaaa">
            <div class="input-errors">
              <span class="text-red-600"></span>
            </div>
          </label>
        </div>
        <div class="px-4 py-3 text-right">
          <button type="button" class="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2" @click="openModalFilter"><i class="fas fa-times"></i>Cancelar</button>
          <button type="submit" class="py-2 px-4 bg-blue-500 text-white rounded mr-2 hover:bg-blue-700"><i class="fas fa-plus"></i> Salvar</button>
        </div>
      </div>
    </div>
  </form>
  </template>
<script>
import { dateSelected, selectedNewFilter } from '../../utils/index'
import useTransitionsUsers from '@/composables/UseTransitionsUsers'

export default {
  components: { },
  props: {
    openModalFilter: Function
  },
  setup (props) {
    const { getList } = useTransitionsUsers()
    function getListAndCloseModal () {
      getList()
      props.openModalFilter()
      selectedNewFilter.value = true
    }
    return {
      dateSelected,
      getListAndCloseModal
    }
  }
}
</script>
