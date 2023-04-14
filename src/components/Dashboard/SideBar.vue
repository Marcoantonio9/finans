<template lang="">
  <div class="flex">
    <div class="h-full md:h-screen bg-blue-500 w-24 flex flex-col items-center justify-between" v-if="statusSidebar">
      <div class="flex flex-col gap-8">
        <div class="roudend-md h-16 flex flex-col justify-center items-center hover:cursor-pointer">
          <span class="text-white text-2xl">
            Finans!
          </span>
        </div>
        <router-link to="/dashboard">
          <div class="roudend-md flex flex-col items-center hover:cursor-pointer hover:border">
            <div class="w-12/12 flex justify-center">
              <img class="px-3 py-3 w-8/12" src="../../assets/images/graphics.svg" alt="Icone Dinheiro">
            </div>
            <span class="text-white">
              Finanças
            </span>
          </div>
        </router-link>
        <router-link to="/configuracoes">
          <div class="roudend-md flex flex-col items-center hover:cursor-pointer hover:border">
            <div class="w-12/12 flex justify-center">
              <img class="px-3 py-3 w-8/12" src="../../assets/images/config.svg" alt="Icone Ajustes">
            </div>
            <span class="text-white">
                Ajustes
            </span>
          </div>
        </router-link>
      </div>

      <div>
        <div class="roudend-md flex flex-col items-center hover:cursor-pointer hover:border" @click="handleLogout">
          <div class="w-12/12 flex justify-center">
            <img class="px-3 py-3 w-8/12" src="../../assets/images/logout.svg" alt="Icone Dinheiro">
          </div>
          <span class="text-white">
            Sair
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UseAuthUsers from '../../composables/UseAuthUsers'

export default {
  props: {
    statusSidebar: Boolean,
    changeStatusSidebar: Function,
    handleLogout: Function
  },
  setup () {
    const { user } = UseAuthUsers()

    return {
      user
    }
  }
}
</script>
