<template lang="">
  <form class="fixed z-10 overflow-y-auto top-0 w-full left-0" id="modal" @submit.prevent="checkAndSave">
    <div class="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-900 opacity-75" />
      </div>
      <span class="sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
      <div class="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
        <div class="bg-gray-200 px-4 py-3 flex justify-between items-center">
          <h3 class="text-lg">Nova transação</h3>
          <span class="text-4xl hover:cursor-pointer">
            &times;
          </span>
        </div>
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <label class="w-12/12 flex flex-col">
            <span>Descrição</span>
            <input v-model="myTransition.description" class="block w-12/12 px-4 py-3 text-lg bg-gray-100 border-2 border-transparent rounded" type="text" placeholder="Descrição">
            <div class="input-errors" v-for="error of v$.description.$errors" :key="error.$uid">
              <span class="text-red-600">{{ error.$message }}</span>
            </div>
          </label>

          <label class="w-12/12 flex flex-col mt-5">
            <span>Valor</span>
            <money3 v-model="myTransition.transitionValue" v-bind="config" class="block w-12/12 px-4 py-3 text-lg bg-gray-100 border-2 border-transparent rounded" type="text" placeholder="Valor"></money3>
            <div class="input-errors" v-for="error of v$.transitionValue.$errors" :key="error.$uid">
              <span class="text-red-600">{{ error.$message }}</span>
            </div>
          </label>

          <label class="w-12/12 flex flex-col mt-5">
            <span>Tipo</span>
            <select v-model="myTransition.type" class="block w-12/12 px-4 py-3 text-lg bg-gray-100 border-2 border-transparent rounded" placeholder="Valor">
              <option v-for="(item, index) in optionsType" :key="index" v-bind:value="item.value">
                {{ item.name }}
              </option>
            </select>
          </label>

          <label class="w-12/12 flex flex-col mt-5">
            <span>Data</span>
            <input v-model="myTransition.date" class="block w-12/12 px-4 py-3 text-lg bg-gray-100 border-2 border-transparent rounded" type="date" placeholder="dd/mm/aaaa">
            <div class="input-errors" v-for="error of v$.date.$errors" :key="error.$uid">
              <span class="text-red-600">{{ error.$message }}</span>
            </div>
          </label>
        </div>
        <div class="px-4 py-3 text-right">
          <button type="button" class="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2" @click="openModalCreateFinances"><i class="fas fa-times"></i>Cancelar</button>
          <button type="submit" class="py-2 px-4 bg-blue-500 text-white rounded mr-2 hover:bg-blue-700"><i class="fas fa-plus"></i> Salvar</button>
        </div>
      </div>
    </div>
  </form>
  </template>
<script>
import { ref, computed, reactive, onMounted } from 'vue'
import useTransitionUsers from '../../composables/UseTransitionsUsers'
import { useToast } from 'vue-toastification'
import { Money3Component } from 'v-money3'
import { statusSaveButton } from '../../utils/index'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'

export default {
  components: { money3: Money3Component },
  props: {
    openModalCreateFinances: Function,
    handleListMyTransitions: Function,
    itemTransitionEditable: Object
  },
  setup (props) {
    const toast = useToast()
    const { register, update } = useTransitionUsers()
    const isEdit = ref(false)

    const optionsType = ref([
      {
        name: 'Entrada',
        value: 1
      },
      {
        name: 'Saída',
        value: 0
      }
    ])

    const myTransition = reactive({
      description: '',
      transitionValue: '',
      type: 1,
      date: ''
    })

    const rules = computed(() => {
      return {
        description: { required: helpers.withMessage('* Campo obrigatório', required) },
        transitionValue: { required: helpers.withMessage('* Campo obrigatório', required) },
        date: { required: helpers.withMessage('* Campo obrigatório', required) }
      }
    })

    const v$ = useVuelidate(rules, myTransition)

    async function save () {
      const isValid = await v$.value.$validate()
      try {
        if (isValid) {
          await register(myTransition)
          props.openModalCreateFinances()
          props.handleListMyTransitions()
          toast.success('Salvo com sucesso!')
          isEdit.value = false
        }
      } catch (error) {
        toast.error('Ops, ocorreu um erro. Tente novamente!')
      }
    }

    async function saveUpdate () {
      const isValid = await v$.value.$validate()
      try {
        if (isValid) {
          await update(myTransition, props.itemTransitionEditable.id)
          props.openModalCreateFinances()
          props.handleListMyTransitions()
          toast.success('Salvo com sucesso!')
          isEdit.value = false
        }
      } catch (error) {
        toast.error('Ops, ocorreu um erro ao editar. Tente novamente!')
      }
    }

    const checkAndSave = computed(() => {
      return isEdit.value ? saveUpdate : save
    })

    onMounted(() => {
      if (Object.keys(props.itemTransitionEditable).length) {
        myTransition.description = props.itemTransitionEditable.description
        myTransition.transitionValue = props.itemTransitionEditable.transition_value
        myTransition.type = props.itemTransitionEditable.type
        myTransition.date = props.itemTransitionEditable.date
        isEdit.value = true
      }
    })

    return {
      myTransition,
      save,
      saveUpdate,
      optionsType,
      config: {
        masked: false,
        prefix: '',
        suffix: '',
        thousands: ',',
        decimal: '.',
        precision: 2,
        disableNegative: false,
        disabled: false,
        min: null,
        max: null,
        allowBlank: false,
        minimumNumberOfCharacters: 0
      },
      statusSaveButton,
      v$,
      isEdit,
      checkAndSave
    }
  }
}
</script>
