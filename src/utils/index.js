import { reactive, ref } from 'vue'

const credentials = reactive({
  name: '',
  email: '',
  password: ''
})

const today = new Date()

const dateSelected = ref({
  start: new Date(today.setDate(today.getDate() - 30)).toISOString().substring(0, 10),
  end: new Date().toISOString().substring(0, 10)
})

const messageCreateAccout = ref(false)
const statusModalResetPassword = ref(false)
const statusSaveButton = ref(true)
const selectedNewFilter = ref(false)
const userProfileName = ref(null)

export {
  credentials,
  messageCreateAccout,
  statusModalResetPassword,
  statusSaveButton,
  dateSelected,
  selectedNewFilter,
  userProfileName
}
