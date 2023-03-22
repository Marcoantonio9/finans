<template lang="">
  <LoginForm
    v-if="isLogin"
    :isLogin="isLogin"
    :changeStatusForm="changeStatusForm"
    :handleLogin="handleLogin"
    :errorsEmail="v$.email"
    :errorsPassword="v$.password"
  />
  <CreateAccount
    v-else
    :isLogin="isLogin"
    :changeStatusForm="changeStatusForm"
    :createAccount="createAccount"
    :errorsName="v$.name"
    :errorsEmail="v$.email"
    :errorsPassword="v$.password"
  />
</template>
<script>
import { ref, watch, computed } from 'vue'
import LoginForm from '../components/LoginForm'
import CreateAccount from '../components/CreateAccount'
import UseAuthUsers from '../composables/UseAuthUsers'
import { credentials, messageCreateAccout } from '../utils/index'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers, requiredIf } from '@vuelidate/validators'

export default {
  components: {
    LoginForm,
    CreateAccount
  },
  setup () {
    const isLogin = ref(true)
    const { login, register } = UseAuthUsers()
    const toast = useToast()
    const router = useRouter()

    const rules = computed(() => {
      return {
        name: {
          required: helpers.withMessage('* Campo obrigatório', requiredIf(function () {
            return !isLogin.value
          }))
        },
        email: { required: helpers.withMessage('* Campo obrigatório', required) },
        password: { required: helpers.withMessage('* Campo obrigatório', required) }
      }
    })

    const v$ = useVuelidate(rules, credentials)

    function changeStatusForm () {
      isLogin.value = !isLogin.value
      v$.value.$reset()
    }

    async function handleLogin () {
      const isValid = await v$.value.$validate()
      try {
        if (isValid) {
          await login(credentials.email, credentials.password)
          router.replace({ name: 'Dashboard' })
        }
      } catch (error) {
        toast.error('Erro ao realizar login')
      }
    }

    async function createAccount () {
      const isValid = await v$.value.$validate()
      try {
        if (isValid) {
          await register(credentials.email, credentials.password, { name: credentials.name })
          messageCreateAccout.value = true
          toast.success(`Um e-mail de confirmação foi enviado para: ${credentials.email}`)
        }
      } catch (error) {
        toast.error('Ocorreu um erro ao criar a conta, tente novamente mais tarde')
      }
    }

    watch(isLogin, (value) => {
      if (value) {
        messageCreateAccout.value = false
      }
      credentials.name = ''
      credentials.email = ''
      credentials.password = ''
    })

    return {
      isLogin,
      changeStatusForm,
      handleLogin,
      createAccount,
      v$
    }
  }
}
</script>
