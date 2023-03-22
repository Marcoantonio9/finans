<template lang="">
  <div>
    <div class="container mx-auto flex justify-center items-center h-screen">
      <form class="py-20 flex flex-col w-10/12 md:w-4/12 items-center justify-center border rounded-md" @submit.prevent="createAccount" v-if="!messageCreateAccout">
        <h3 class="text-4xl mb-5">Criar uma conta</h3>
        <label class="flex flex-col items-center w-full">
          <span class="text-lg w-9/12">Nome</span>
          <input v-model="credentials.name" class="block w-9/12 px-4 py-3 text-lg bg-gray-100 border-2 border-transparent rounded" type="text" placeholder="Jane Doe">
          <div class="w-9/12" v-for="error of errorsName.$errors" :key="error.$uid">
            <span class="text-left text-red-600">{{ error.$message }}</span>
          </div>
        </label>
        <label class="flex flex-col items-center w-full">
          <span class="text-lg mt-9 w-9/12">E-mail</span>
          <input v-model="credentials.email" class="block w-9/12 px-4 py-3 text-lg bg-gray-100 border-2 border-transparent rounded" type="email" placeholder="janedoe@email.com">
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
        <button type="submit" class="px-8 py-3 mt-10 text-2xl font-bold rounded-full bg-blue-500 text-white flex justify-center items-center" ty>
          <span>
            Criar conta
          </span>
        </button>
        <div class="mt-10">
          <span class="hover:cursor-pointer hover:underline" @click="changeStatusForm">
            Voltar
          </span>
        </div>
      </form>
      <div class="py-20 flex flex-col w-10/12 md:w-4/12 items-center justify-center border rounded-md text-center px-10" v-else>
        Cadastro realizado com sucesso! <br>
        Um e-mail de confirmação foi enviado. Para fazer login, confirme o seu e-mail. <br>
        <span class="hover:cursor-pointer underline font-bold mt-10" @click="changeStatusForm">
          Fazer Login
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { credentials, messageCreateAccout } from '../../utils/index'

export default {
  props: {
    isLogin: Boolean,
    changeStatusForm: Function,
    createAccount: Function,
    errorsName: Object,
    errorsEmail: Object,
    errorsPassword: Object
  },
  setup () {
    return {
      credentials,
      messageCreateAccout
    }
  }
}
</script>
