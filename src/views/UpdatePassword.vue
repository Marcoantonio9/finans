<template lang="">
  <div>
    <div class="container mx-auto flex justify-center items-center h-screen">
      <form class="py-20 flex flex-col w-10/12 md:w-4/12 items-center justify-center border rounded-md" @submit.prevent="handlePasswordReset">
        <h3 class="text-4xl mb-5">Atualizar senha</h3>
        <label class="flex flex-col items-center w-full">
          <span class="text-lg mt-9 w-9/12">Senha</span>
          <input v-model="credentials.password" class="block w-9/12 px-4 py-3 text-lg bg-gray-100 border-2 border-transparent rounded" type="password" placeholder="*****">
          <div class="w-9/12" v-for="error of v$.password.$errors" :key="error.$uid">
            <span class="text-left text-red-600">{{ error.$message }}</span>
          </div>
        </label>
        <button type="submit" class="px-8 py-3 mt-10 text-2xl font-bold rounded-full bg-blue-500 text-white flex justify-center items-center">
          <span>
            Salvar
          </span>
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import { computed } from 'vue'
import UseAuthUsers from '../composables/UseAuthUsers'
import { credentials } from '../utils/index'
import { useRouter, useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers, minLength } from '@vuelidate/validators'

export default {
  setup () {
    const { resetPassword } = UseAuthUsers()
    const route = useRoute()
    const router = useRouter()
    const token = route.query.token
    const toast = useToast()

    const rules = computed(() => {
      return {
        password: { required: helpers.withMessage('* Campo obrigatório', required), minLength: helpers.withMessage('Esse campo deve ter no minímo 6 caracteres.', minLength(6)) }
      }
    })

    const v$ = useVuelidate(rules, credentials)

    async function handlePasswordReset () {
      const isValid = await v$.value.$validate()
      try {
        if (isValid) {
          await resetPassword(token, credentials.password)
          router.push({ name: 'Login' })
          toast.success('Senha alterada com sucesso!')
        }
      } catch (error) {
        toast.error('Ops, ocorreu um erro ao alterar a senha')
      }
    }

    return {
      credentials,
      handlePasswordReset,
      v$
    }
  }
}
</script>
