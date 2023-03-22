// import { ref } from 'vue'
import useSupabase from '../lib/supabaseClient'
import UseAuthUsers from './UseAuthUsers'
import { dateSelected } from '../utils/index'

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
    // const d1 = '2023-03-09'
    // const d2 = '2023-03-18'
    const { data, error } = await supabase
      .from('myFinances')
      .select('*')
      .order('date', { ascending: false })
      .gte('date', dateSelected.value.start)
      .lte('date', dateSelected.value.end)
    if (error) throw error
    return data
  }

  return {
    register,
    getList,
    update,
    remove
  }
}
