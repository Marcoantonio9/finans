import { ref } from 'vue'
import useSupabase from '../lib/supabaseClient'

const user = ref(null)
export default function useAuthUser () {
  const { supabase } = useSupabase()

  const login = async (email, password) => {
    const { user, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return user
  }

  const loginWithSocialProvider = async (provider) => {
    const { user, error } = await supabase.auth.signInWithPassword({ provider })
    if (error) throw error
    return user
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  const isLoggedIn = () => {
    return !!user.value
  }

  const register = async (email, password, { ...meta }) => {
    const { user, error } = await supabase.auth.signUp(
      {
        email,
        password,
        options: {
          data: {
            name: meta.name
          }
        },
        redirectTo: `${window.location.origin}/dashboard?fromEmail=registragionConfirmation`
      }
      // {
      //   data: {
      //     name: meta.name
      //   },
      //   redirectTo: `${window.location.origin}/dashboard?fromEmail=registragionConfirmation`
      // }
    )
    if (error) throw error
    return user
  }

  const update = async (data) => {
    const { user, error } = await supabase.auth.updateUser(data)
    if (error) throw error
    return user
  }

  const sendPasswordRestEmail = async (email) => {
    const { user, error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) throw error
    return user
  }

  const resetPassword = async (accessToken, newPassword) => {
    // const { error } = await supabase.auth.updateUser(accessToken, { password: newPassword })
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) throw error
    return user
  }

  return {
    user,
    login,
    loginWithSocialProvider,
    logout,
    isLoggedIn,
    register,
    update,
    sendPasswordRestEmail,
    resetPassword
  }
}
