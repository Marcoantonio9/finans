<template lang="">
  <div v-if="user" class="flex">
    <SideBar
      :statusSidebar="statusSidebar"
      :changeStatusSidebar="changeStatusSidebar"
      :handleLogout="handleLogout"
    />
    <div class="w-full">
      <TopBar
        :statusSidebar="statusSidebar"
        :changeStatusSidebar="changeStatusSidebar"
      />
      <router-view/>
    </div>
  </div>
</template>
<script>
import UseAuthUsers from '../../composables/UseAuthUsers'
import { useRouter } from 'vue-router'
import SideBar from '../../components/Dashboard/SideBar.vue'
import TopBar from '../../components/Dashboard/TopBar.vue'
import { ref } from 'vue'

export default {
  components: {
    SideBar,
    TopBar
  },
  setup () {
    const { user, logout } = UseAuthUsers()
    const router = useRouter()
    const statusSidebar = ref(true)

    async function handleLogout () {
      await logout()
      router.replace({ name: 'Login' })
    }

    function changeStatusSidebar () {
      statusSidebar.value = !statusSidebar.value
    }

    return {
      user,
      handleLogout,
      statusSidebar,
      changeStatusSidebar
    }
  }
}
</script>
