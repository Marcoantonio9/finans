<template lang="">
<div class="fixed z-10 overflow-y-auto top-0 w-full left-0" id="modal">
  <div class="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <div class="fixed inset-0 transition-opacity">
      <div class="absolute inset-0 bg-gray-900 opacity-75"></div>
    </div>
    <span class="sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
    <div class="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
      <div class="bg-gray-200 px-4 py-3 flex justify-between items-center">
        <h3 class="text-lg">Recuperar senha</h3>
        <span class="text-4xl hover:cursor-pointer" @click="changeStatusModalResetForm">
          &times;
        </span>
      </div>
      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <label class="w-12/12 flex flex-col">
          <span>E-mail</span>
          <input v-model="credentials.email" class="block w-12/12 px-4 py-3 text-lg bg-gray-100 border-2 border-transparent rounded" type="text" placeholder="janedoe@email.com">
          <div class="w-9/12" v-for="error of v$.email.$errors" :key="error.$uid">
            <span class="text-left text-red-600">{{ error.$message }}</span>
          </div>
        </label>
      </div>
      <div class="px-4 py-3 text-right">
        <button type="button" class="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"  @click="changeStatusModalResetForm"><i class="fas fa-times"></i>Cancelar</button>
        <button type="button" class="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2" @click="resetPassword"><i class="fas fa-plus"></i> Recuperar</button>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import { computed } from 'vue'
import { credentials } from '../../utils/index'
import UseAuthUsers from '../../composables/UseAuthUsers'
import { useToast } from 'vue-toastification'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'

export default {
  props: {
    changeStatusModalResetForm: Function
  },
  setup (props) {
    const { sendPasswordRestEmail } = UseAuthUsers()
    const toast = useToast()

    const rules = computed(() => {
      return {
        email: { required: helpers.withMessage('* Campo obrigatório', required) }
      }
    })

    const v$ = useVuelidate(rules, credentials)

    async function resetPassword () {
      const isValid = await v$.value.$validate()
      try {
        if (isValid) {
          await sendPasswordRestEmail(credentials.email)
          toast.success(`Um e-mail de recuperação foi enviado para: ${credentials.email}`)
          props.changeStatusModalResetForm()
        }
      } catch (error) {
        toast.error('Erro um erro, tente novamente mais tarde')
      }
    }
    return {
      credentials,
      resetPassword,
      v$
    }
  }
}
</script>
