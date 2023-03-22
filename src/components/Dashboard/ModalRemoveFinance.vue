<template lang="">
  <form class="fixed z-10 overflow-y-auto top-0 w-full left-0" id="modal" @submit.prevent="checkAndSave">
    <div class="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-900 opacity-75" />
      </div>
      <span class="sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
      <div class="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
        <div class="bg-gray-200 px-4 py-3 flex justify-between items-center">
          <h3 class="text-lg">Atenção</h3>
          <span class="text-4xl hover:cursor-pointer" @click="openModalDeleteFinance">
            &times;
          </span>
        </div>
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          Tem certeza que deseja excluir {{ getItemDelete.description }} ?
        </div>
        <div class="px-4 py-3 text-right">
          <button type="button" class="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2" @click="openModalDeleteFinance"><i class="fas fa-times"></i>Cancelar</button>
          <button type="submit" class="py-2 px-4 bg-red-500 text-white rounded mr-2 hover:bg-red-700" @click="removeFinance"><i class="fas fa-plus"></i> Confirmar</button>
        </div>
      </div>
    </div>
  </form>
  </template>
<script>
import useTransitionUsers from '../../composables/UseTransitionsUsers'
import { useToast } from 'vue-toastification'

export default {
  props: {
    openModalDeleteFinance: Function,
    handleListMyTransitions: Function,
    getItemDelete: Object
  },
  setup (props) {
    const toast = useToast()
    const { remove } = useTransitionUsers()

    async function removeFinance () {
      try {
        await remove(props.getItemDelete.id)
        props.openModalDeleteFinance()
        props.handleListMyTransitions()
        toast.success('Deletado com sucesso!')
      } catch (error) {
        toast.error('Erro ao deletar!')
      }
    }

    return {
      removeFinance
    }
  }
}
</script>
