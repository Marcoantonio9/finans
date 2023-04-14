<template lang="">
    <div class="w-full h-16 bg-blue-500 flex justify-between items-center">
      <div class="icon w-14 h-full flex justify-center items-center">
        <img
          class="px-3 py-3 w-14 hover:cursor-pointer"
          src="../../assets/images/bars.svg"
          alt="Icone menu"
          @click="changeStatusSidebar"
        >
      </div>
      <div class="avatar px-10 flex justify-center items-center gap-2">
        <span class="text-white">Olá, <strong>{{ userProfileName }}</strong>!</span>
        <img src="../../assets/images/avatar.svg" alt="Avatar" class="w-10 border rounded-full px-2 py-2">
      </div>
    </div>
</template>
<script>
import { onMounted } from 'vue'
import UseAuthUsers from '../../composables/UseAuthUsers'
import useTransitionsUsers from '@/composables/UseTransitionsUsers'
import { userProfileName } from '@/utils/index'

export default {
  props: {
    statusSidebar: Boolean,
    changeStatusSidebar: Function
  },
  setup () {
    const { user } = UseAuthUsers()
    const { checkIfTheNameHasChanged } = useTransitionsUsers()

    onMounted(() => {
      checkIfTheNameHasChanged()
    })

    return {
      user,
      userProfileName
    }
  }
}
</script>
