<template lang="">
  <div>
    <form class="container mx-auto" @submit.prevent="updateUser">
      <label class="flex flex-col items-center w-full mt-9">
        <span class="text-lg w-9/12">Nome</span>
        <input v-model="fields.name" class="block w-9/12 px-4 py-3 text-lg bg-gray-100 border-2 border-transparent rounded" type="text" placeholder="Jane Doe">
        <div class="w-9/12" v-for="error of v$.name.$errors" :key="error.$uid">
          <span class="text-left text-red-600">{{ error.$message }}</span>
        </div>
      </label>

      <label class="flex flex-col items-center w-full mt-9">
        <span class="text-lg w-9/12">Email</span>
        <input v-model="fields.email" class="block w-9/12 px-4 py-3 text-lg bg-gray-100 border-2 border-transparent rounded" type="email" placeholder="Janedoe@email.com">
        <div class="w-9/12" v-for="error of v$.email.$errors" :key="error.$uid">
          <span class="text-left text-red-600">{{ error.$message }}</span>
        </div>
      </label>

      <!-- <label class="flex flex-col items-center w-full mt-9">
        <span class="text-lg w-9/12">Telefone</span>
        <input v-model="fields.phone" class="block w-9/12 px-4 py-3 text-lg bg-gray-100 border-2 border-transparent rounded" type="text" placeholder="(xx) xxxxx-xxxx">
      </label> -->

      <label class="flex flex-col items-center w-full mt-9">
        <span class="text-lg w-9/12">Senha</span>
        <input v-model="fields.password" class="block w-9/12 px-4 py-3 text-lg bg-gray-100 border-2 border-transparent rounded" type="password" placeholder="******">
        <div class="w-9/12" v-for="error of v$.password.$errors" :key="error.$uid">
          <span class="text-left text-red-600">{{ error.$message }}</span>
        </div>
      </label>

      <div class="flex justify-center">
        <button type="submit" class="px-8 py-3 mt-10 text-2xl font-bold rounded-full bg-blue-500 text-white flex justify-center items-center" ty>
          <span>
            Salvar
          </span>
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import { ref, onMounted, computed } from 'vue'
import UseAuthUsers from '../../composables/UseAuthUsers'
import useTransitionsUsers from '@/composables/UseTransitionsUsers'
import { userProfileName } from '@/utils/index'
import { useToast } from 'vue-toastification'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers, minLength } from '@vuelidate/validators'

export default {
  setup () {
    const { user } = UseAuthUsers()
    const { configUpdateUser, updateProfile, checkIfTheNameHasChanged, isLoggedChangePassword } = useTransitionsUsers()
    const toast = useToast()

    const fields = ref({
      name: '',
      email: '',
      // phone: '',
      password: ''
    })

    async function getDataUsers () {
      try {
        await checkIfTheNameHasChanged()
        fields.value.name = userProfileName.value
        fields.value.email = user.value.email
        fields.value.phone = user.value.phone
      } catch (error) {
        console.log(error)
      }
    }

    const rules = computed(() => {
      console.log(fields.value.name)
      return {
        name: { required: helpers.withMessage('* Campo obrigatório', required), minLength: helpers.withMessage('* Esse campo deve ter no minímo 6 caracteres.', minLength(3)) },
        email: { required: helpers.withMessage('* Campo obrigatório', required) },
        password: { minLength: helpers.withMessage('* Esse campo deve ter no minímo 6 caracteres.', minLength(6)) }
      }
    })

    const v$ = useVuelidate(rules, fields)

    async function updateUser () {
      const isValid = await v$.value.$validate()
      if (isValid) {
        try {
          await configUpdateUser(fields)
          await updateProfile(fields)
          await checkIfTheNameHasChanged()

          if (fields.value.password) {
            await isLoggedChangePassword(fields)
          }

          toast.success('Salvo com sucesso!')
        } catch (error) {
          toast.error('Ops, ocorreu um erro!')
        }
      }
    }

    onMounted(() => {
      getDataUsers()
    })

    return {
      user,
      fields,
      updateUser,
      userProfileName,
      v$
    }
  }
}
</script>
