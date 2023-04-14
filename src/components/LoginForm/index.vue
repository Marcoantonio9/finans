<template lang="">
  <div>
    <div class="container mx-auto flex justify-center items-center h-screen">
      <form class="py-20 flex flex-col w-10/12 md:w-4/12 items-center justify-center border rounded-md" @submit.prevent="handleLogin">
        <h3 class="text-4xl mb-5">Login</h3>
        <label class="flex flex-col items-center w-full">
          <span class="text-lg w-9/12">E-mail</span>
          <input v-model="credentials.email" class="block w-9/12 px-4 py-3 text-lg bg-gray-100 border-2 border-transparent rounded" type="text" placeholder="janedoe@email.com">
          <div class="w-9/12" v-for="error of errorsEmail.$errors" :key="error.$uid">
            <span class="text-left text-red-600">{{ error.$message }}</span>
          </div>
        </label>
        <label class="flex flex-col items-center w-full">
          <span class="text-lg mt-9 w-9/12">Senha</span>
          <input v-model="credentials.password" class="block w-9/12 px-4 py-3 text-lg bg-gray-100 border-2 border-transparent rounded" type="password" placeholder="*****">
          <div class="w-9/12" v-for="error of errorsPassword.$errors" :key="error.$uid">
            <span class="text-left text-red-600">{{ error.$message }}</span>
          </div>
        </label>
        <span class="w-9/12 hover:cursor-pointer hover:underline mt-2" @click="changeStatusModalResetForm">
          Esqueceu a senha?
        </span>
        <button type="submit" class="px-8 py-3 mt-10 text-2xl font-bold rounded-full bg-blue-500 text-white flex justify-center items-center">
          <span>
            Entrar
          </span>
        </button>
        <div class="mt-10">
          <span class="hover:cursor-pointer hover:underline" @click="changeStatusForm">
            Criar uma conta
          </span>
        </div>
      </form>
    </div>
    <ResetPassword
      :changeStatusModalResetForm="changeStatusModalResetForm"
      v-if="statusModalResetPassword"
    />
  </div>
</template>
<script>
import { credentials, statusModalResetPassword } from '../../utils/index'
import ResetPassword from './ResetPassword.vue'

export default {
  props: {
    isLogin: Boolean,
    changeStatusForm: Function,
    handleLogin: Function,
    errorsEmail: Object,
    errorsPassword: Object
  },
  components: { ResetPassword },
  setup () {
    credentials.name = ''
    credentials.email = ''
    credentials.password = ''

    function changeStatusModalResetForm () {
      statusModalResetPassword.value = !statusModalResetPassword.value
      credentials.email = ''
    }
    return {
      credentials,
      statusModalResetPassword,
      changeStatusModalResetForm
    }
  }
}
</script>
