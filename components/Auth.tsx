import React, { useState } from 'react'
import { Alert, AppState, View } from 'react-native'
import { supabase } from '../utils/supabase'
import { Input } from '~/components/ui/input';
import { Button } from './ui/button'
import { Text } from './ui/text'
import { Label } from '~/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

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
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert('Sign In Error', error.message)
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

    if (error) Alert.alert('Sign Up Error', error.message)
    if (!session) Alert.alert('Success', 'Please check your inbox for email verification!')
    setLoading(false)
  }

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">
          {isSignUp ? 'Create Account' : 'Sign In'}
        </CardTitle>
        <CardDescription className="text-center">
          {isSignUp
            ? 'Enter your details to create a new account'
            : 'Enter your credentials to access your account'
          }
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Email Input */}
        <View className="space-y-2">
          <Label nativeID="email" className="text-sm font-medium">
            Email
          </Label>
          <Input
            id="email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="email"
            className="h-12"
          />
        </View>

        {/* Password Input */}
        <View className="space-y-2">
          <Label nativeID="password" className="text-sm font-medium">
            Password
          </Label>
          <Input
            id="password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            autoCapitalize="none"
            autoComplete={isSignUp ? "new-password" : "current-password"}
            className="h-12"
          />
        </View>

        {/* Action Buttons */}
        <View className="space-y-4 pt-4">
          <Button
            onPress={isSignUp ? signUpWithEmail : signInWithEmail}
            disabled={loading}
            className="h-12"
            size="lg"
          >
            <Text className={loading ? "opacity-70" : ""}>
              {loading
                ? (isSignUp ? 'Creating Account...' : 'Signing In...')
                : (isSignUp ? 'Create Account' : 'Sign In')
              }
            </Text>
          </Button>

          <Button
            variant="outline"
            onPress={() => setIsSignUp(!isSignUp)}
            disabled={loading}
            className="h-12 mt-2"
          >
            <Text>
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </Text>
          </Button>
        </View>
      </CardContent>
    </Card>
  )
}