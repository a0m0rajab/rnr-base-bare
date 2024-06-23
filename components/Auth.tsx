import React, { useState } from 'react'
import { Alert, StyleSheet, View, AppState, Button, Image } from 'react-native'
import { supabase } from '@/utils/supabase'
import { Input } from './ui/input'
import { useSession } from '@/context'
import { router } from 'expo-router'
import { Text } from './ui/text'
import ParallaxScrollView from './ParallaxScrollView'

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

export default function Auth() {
  const { signIn } = useSession();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await signIn(email,password);
    
    if (error) {
      Alert.alert(error.message)
      setLoading(false)
      return
    }
    
    router.replace('/');
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')
    setLoading(false)
  }

  return (
    <ParallaxScrollView 
    headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={{ height: 178, width: 290, bottom: 0, left: 0,  position: 'absolute'}}
        />
    }>
    <View className='h-screen'>
      <View className='container gap-2'>
        <View >
          <Text>Email</Text>
          <Input
            placeholder="Email"
            //   leftIcon={{ type: 'font-awesome', name: 'envelope' }}
            onChangeText={(text) => setEmail(text)}
            value={email}
            //   placeholder="email@address.com"
            autoCapitalize={'none'}
          />
        </View>
        <View >
          <Text>Password</Text>
          <Input
            placeholder="Password"
            //   leftIcon={{ type: 'font-awesome', name: 'lock' }}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            //   placeholder="Password"
            autoCapitalize={'none'}
          />
        </View>
        <View >
          <Button title="Sign in" disabled={loading} onPress={() => signInWithEmail()} />
        </View>
        <View >
          <Button title="Sign up" disabled={loading} onPress={() => signUpWithEmail()} />
        </View>

      </View>
    </View>
    </ParallaxScrollView>
  )
}