import React, { useState } from 'react'
import { View, Alert, ScrollView, Platform } from 'react-native'
import { useSession } from '../utils/ctx'
import { useProfile } from '../hooks/useProfile'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Text } from './ui/text'
import { Label } from './ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Separator } from './ui/separator'
import { Mail } from '~/lib/icons/Mail'
import * as ImagePicker from 'expo-image-picker'
import { LoadingScreen } from './LoadingScreen'

export default function Profile() {
    const { session, signOut } = useSession()
    const { profile, setProfile, loading, saving, updateProfile, uploadAvatar: uploadAvatarHook } = useProfile()
    const [uploading, setUploading] = useState(false)

    async function handleUpdateProfile() {
        const result = await updateProfile(profile)
        if (result.success) {
            Alert.alert('Success', 'Profile updated successfully!')
        }
    }

    async function handleUploadAvatar() {
        try {
            setUploading(true)

            // Request permissions
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
            if (status !== 'granted') {
                Alert.alert('Permission Required', 'We need camera roll permissions to upload your avatar.')
                return
            }

            // Pick image
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            })

            if (result.canceled) {
                return
            }

            const image = result.assets[0]
            if (!image.uri) {
                throw new Error('No image selected')
            }

            // Use the hook's upload function
            const uploadResult = await uploadAvatarHook(image.uri)
            if (uploadResult.success) {
                Alert.alert('Success', 'Avatar updated successfully!')
            } else if (uploadResult.error) {
                Alert.alert('Upload Error', uploadResult.error)
            }

        } catch (error) {
            if (error instanceof Error) {
                Alert.alert('Upload Error', error.message)
            }
        } finally {
            setUploading(false)
        }
    }

    async function handleSignOut() {
        Alert.alert(
            'Sign Out',
            'Are you sure you want to sign out?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Sign Out',
                    style: 'destructive',
                    onPress: () => signOut()
                }
            ]
        )
    }

    const getAvatarFallback = () => {
        const fullName = `${profile.name} ${profile.surname}`.trim()
        if (fullName) {
            return fullName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
        }
        if (profile.username) {
            return profile.username.slice(0, 2).toUpperCase()
        }
        return session?.user?.email?.slice(0, 2).toUpperCase() || 'U'
    }

    if (loading) {
        return <LoadingScreen />
    }

    return (
        <ScrollView className="flex-1 bg-background">
            <View className="p-6 space-y-6">
                {/* Header */}
                <Card>
                    <CardHeader className="items-center space-y-4">
                        <View className="relative">
                            <Avatar alt="Profile Picture" className="w-24 h-24">
                                <AvatarImage source={{ uri: profile.avatar_url || undefined }} />
                                <AvatarFallback>
                                    <Text className="text-2xl font-semibold text-muted-foreground">
                                        {getAvatarFallback()}
                                    </Text>
                                </AvatarFallback>
                            </Avatar>
                        </View>

                        <Button
                            onPress={handleUploadAvatar}
                            disabled={uploading}
                            variant="outline"
                            size="sm"
                        >
                            <Text>{uploading ? 'Uploading...' : 'Change Avatar'}</Text>
                        </Button>

                        <View className="items-center space-y-1">
                            <Text className="text-xl font-semibold">
                                {`${profile.name} ${profile.surname}`.trim() || profile.username || 'User'}
                            </Text>
                            <View className="flex-row items-center space-x-2">
                                <Mail size={16} className="text-muted-foreground" />
                                <Text className="text-sm text-muted-foreground">
                                    {session?.user?.email}
                                </Text>
                            </View>
                        </View>
                    </CardHeader>
                </Card>

                {/* Profile Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>
                            Update your personal information and preferences.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Name */}
                        <View className="space-y-2">
                            <Label nativeID="name">First Name</Label>
                            <Input
                                aria-labelledby="name"
                                placeholder="Enter your first name"
                                value={profile.name}
                                onChangeText={(text: string) => setProfile(prev => ({ ...prev, name: text }))}
                                className="h-12"
                            />
                        </View>

                        {/* Surname */}
                        <View className="space-y-2">
                            <Label nativeID="surname">Last Name</Label>
                            <Input
                                aria-labelledby="surname"
                                placeholder="Enter your last name"
                                value={profile.surname}
                                onChangeText={(text: string) => setProfile(prev => ({ ...prev, surname: text }))}
                                className="h-12"
                            />
                        </View>

                        <Separator />

                        {/* Username */}
                        <View className="space-y-2">
                            <Label nativeID="username">Username</Label>
                            <Input
                                aria-labelledby="username"
                                placeholder="Enter your username"
                                value={profile.username}
                                onChangeText={(text: string) => setProfile(prev => ({ ...prev, username: text }))}
                                autoCapitalize="none"
                                className="h-12"
                            />
                        </View>

                        {/* Website */}
                        <View className="space-y-2">
                            <Label nativeID="website">Website</Label>
                            <Input
                                aria-labelledby="website"
                                placeholder="https://your-website.com"
                                value={profile.website || ''}
                                onChangeText={(text: string) => setProfile(prev => ({ ...prev, website: text || null }))}
                                autoCapitalize="none"
                                keyboardType="url"
                                className="h-12"
                            />
                        </View>

                        <Separator />

                        {/* Email (Read-only) */}
                        <View className="space-y-2">
                            <Label nativeID="email">Email</Label>
                            <Input
                                aria-labelledby="email"
                                placeholder="Email"
                                value={session?.user?.email || ''}
                                editable={false}
                                className="h-12 bg-muted"
                            />
                            <Text className="text-xs text-muted-foreground">
                                Email cannot be changed from this screen
                            </Text>
                        </View>
                    </CardContent>
                </Card>

                {/* Actions */}
                <View className="space-y-3">
                    <Button
                        onPress={handleUpdateProfile}
                        disabled={saving}
                        className="h-12"
                        size="lg"
                    >
                        <Text>{saving ? 'Updating...' : 'Update Profile'}</Text>
                    </Button>

                    <Button
                        onPress={handleSignOut}
                        variant="outline"
                        className="h-12"
                        size="lg"
                    >
                        <Text>Sign Out</Text>
                    </Button>
                </View>

                {/* Footer */}
                <View className="pt-4 pb-8">
                    <Text className="text-center text-sm text-muted-foreground">
                        Last updated: {new Date().toLocaleDateString()}
                    </Text>
                </View>
            </View>
        </ScrollView>
    )
}
