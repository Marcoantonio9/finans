// import { ref } from 'vue'
import useSupabase from '../lib/supabaseClient'
import UseAuthUsers from './UseAuthUsers'
import { dateSelected, userProfileName } from '../utils/index'

export default function useTransitionsUsers () {
  const { supabase } = useSupabase()
  const { user } = UseAuthUsers()

  const register = async ({ description, transitionValue, date, type }) => {
    const { error } = await supabase
      .from('myFinances')
      .insert(
        {
          description: description,
          created_at: null,
          transition_value: transitionValue,
          date: date,
          user_id: user.value.id,
          type: type
        }
      )
    if (error) throw error
  }

  const update = async (myTransition, id) => {
    const { error } = await supabase
      .from('myFinances')
      .update({
        description: myTransition.description,
        created_at: myTransition.null,
        transition_value: myTransition.transitionValue,
        date: myTransition.date,
        user_id: user.value.id,
        type: myTransition.type
      })
      .eq('id', id)
    if (error) throw error
  }

  const remove = async (id) => {
    const { error } = await supabase
      .from('myFinances')
      .delete()
      .eq('id', id)
    if (error) throw error
  }

  const getList = async () => {
    const { data, error } = await supabase
      .from('myFinances')
      .select('*')
      .order('date', { ascending: false })
      .gte('date', dateSelected.value.start)
      .lte('date', dateSelected.value.end)
    if (error) throw error
    return data
  }

  const configUpdateUser = async (fields) => {
    const { data, error } = await supabase.auth.updateUser(
      {
        email: fields.value.email
      }
    )

    if (error) throw error
    return data
  }

  const isLoggedChangePassword = async (fields) => {
    const { data, error } = await supabase.auth.updateUser(
      {
        password: fields.value.password
      }
    )

    if (error) throw error
    return data
  }

  async function updateProfile (fields) {
    const updates = {
      id: user.value.id,
      username: fields.value.name,
      updated_at: new Date()
    }

    const { data, error } = await supabase.from('profiles').upsert(updates)
    if (error) throw error
    return data
  }

  async function getProfile () {
    const { data, error } = await supabase
      .from('profiles')
      .select('username')
      .eq('id', user.value.id)
      .single()
    if (error) throw error
    return data
  }

  async function checkIfTheNameHasChanged () {
    const { username } = await getProfile()
    userProfileName.value = username != null ? username : user.value.user_metadata.name
    return username
  }

  return {
    register,
    getList,
    update,
    remove,
    configUpdateUser,
    updateProfile,
    getProfile,
    checkIfTheNameHasChanged,
    isLoggedChangePassword
  }
}
