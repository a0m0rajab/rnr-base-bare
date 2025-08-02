import React from 'react'
import { View, ScrollView, Alert, Linking, Platform } from 'react-native'
import { Button } from './ui/button'
import { Text } from './ui/text'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Separator } from './ui/separator'
import { Info } from '~/lib/icons/Info'
import { Palette } from '~/lib/icons/Palette'
import { useSession } from '../utils/ctx'
import { ThemeToggle } from './ThemeToggle'
import * as ImagePicker from 'expo-image-picker'

export default function Settings() {
    const { session, signOut } = useSession()

    const handlePermissions = async () => {
        // Check current permissions status
        const { status: mediaLibraryStatus } = await ImagePicker.getMediaLibraryPermissionsAsync()

        const permissionStatus = mediaLibraryStatus === 'granted' ? '✅ Granted' : '❌ Not Granted'

        Alert.alert(
            'App Permissions',
            `Current Permission Status:\n\n📸 Media Library: ${permissionStatus}\n\nThis app uses the following permissions:\n\n• Camera Roll/Media Library: To upload and change profile pictures\n• Network Access: To sync data with our servers\n• Storage: To cache data and save preferences\n\nTo change permissions, go to your device settings > Apps > ${Platform.OS === 'ios' ? 'This App' : 'RNR Base'} > Permissions`,
            [{ text: 'OK' }]
        )
    }

    const handleTermsOfUse = async () => {
        const termsUrl = 'https://your-app.com/terms' // Replace with your actual terms URL

        try {
            const supported = await Linking.canOpenURL(termsUrl)
            if (supported) {
                await Linking.openURL(termsUrl)
            } else {
                Alert.alert(
                    'Terms of Use',
                    'Our Terms of Use govern your use of this application. By using this app, you agree to be bound by these terms.\n\nFor the full terms, please visit our website or contact support.',
                    [{ text: 'OK' }]
                )
            }
        } catch (error) {
            Alert.alert(
                'Terms of Use',
                'Our Terms of Use govern your use of this application. By using this app, you agree to be bound by these terms.\n\nFor the full terms, please visit our website or contact support.',
                [{ text: 'OK' }]
            )
        }
    }

    const handlePrivacyPolicy = async () => {
        const privacyUrl = 'https://your-app.com/privacy' // Replace with your actual privacy URL

        try {
            const supported = await Linking.canOpenURL(privacyUrl)
            if (supported) {
                await Linking.openURL(privacyUrl)
            } else {
                Alert.alert(
                    'Privacy Policy',
                    'We respect your privacy and are committed to protecting your personal information. Our Privacy Policy explains how we collect, use, and protect your data.\n\nFor the full privacy policy, please visit our website or contact support.',
                    [{ text: 'OK' }]
                )
            }
        } catch (error) {
            Alert.alert(
                'Privacy Policy',
                'We respect your privacy and are committed to protecting your personal information. Our Privacy Policy explains how we collect, use, and protect your data.\n\nFor the full privacy policy, please visit our website or contact support.',
                [{ text: 'OK' }]
            )
        }
    }

    const handleSignOut = () => {
        Alert.alert(
            'Sign Out',
            'Are you sure you want to sign out of your account?',
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

    const handleSupport = () => {
        Alert.alert(
            'Support',
            'Need help? Contact our support team:\n\n📧 Email: support@yourapp.com\n🌐 Website: www.yourapp.com\n\nWe typically respond within 24 hours.',
            [{ text: 'OK' }]
        )
    }

    const handleAbout = () => {
        Alert.alert(
            'About RNR Base',
            'RNR Base is a modern React Native starter template built with:\n\n• Expo Router for navigation\n• NativeWind for styling\n• Supabase for backend\n• TypeScript for type safety\n\nBuilt with ❤️ for developers',
            [{ text: 'OK' }]
        )
    }

    return (
        <ScrollView className="flex-1 bg-background">
            <View className="p-6 space-y-6">
                {/* Header */}
                <View className="space-y-3">
                    <Text className="text-3xl font-bold text-foreground">Settings</Text>
                    <Text className="text-base text-muted-foreground">
                        Manage your app preferences and account settings
                    </Text>
                </View>

                {/* User Info Card */}
                <Card className="bg-gradient-to-r from-primary/5 to-primary/10">
                    <CardContent className="p-4">
                        <View className="flex-row items-center space-x-4">
                            <View className="w-12 h-12 bg-primary rounded-full items-center justify-center">
                                <Text className="text-white font-bold text-lg">
                                    {session?.user?.email?.charAt(0).toUpperCase() || 'U'}
                                </Text>
                            </View>
                            <View className="flex-1">
                                <Text className="font-semibold text-base text-foreground">
                                    Welcome back!
                                </Text>
                                <Text className="text-sm text-muted-foreground">
                                    {session?.user?.email}
                                </Text>
                            </View>
                        </View>
                    </CardContent>
                </Card>

                {/* Appearance Section */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="flex-row items-center space-x-2">
                            <Palette size={20} className="text-primary" />
                            <Text>Appearance</Text>
                        </CardTitle>
                        <CardDescription>
                            Customize how the app looks and feels
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <View className="flex-row items-center justify-between p-4 bg-muted/30 rounded-lg">
                            <View className="flex-1">
                                <Text className="font-semibold text-base">Theme</Text>
                                <Text className="text-sm text-muted-foreground">
                                    Switch between light and dark mode
                                </Text>
                            </View>
                            <ThemeToggle />
                        </View>
                    </CardContent>
                </Card>

                {/* Legal & Privacy Section */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="flex-row items-center space-x-2">
                            <Info size={20} className="text-primary" />
                            <Text>Legal & Privacy</Text>
                        </CardTitle>
                        <CardDescription>
                            Important information about your rights and our policies
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-1">
                        <Button
                            onPress={handlePermissions}
                            variant="ghost"
                            className="h-16 justify-start p-4 rounded-lg hover:bg-muted/50"
                        >
                            <View className="flex-row items-center space-x-4 flex-1">
                                <View className="w-10 h-10 bg-blue-500/10 rounded-full items-center justify-center">
                                    <Text className="text-lg">🔐</Text>
                                </View>
                                <View className="flex-1">
                                    <Text className="font-semibold text-base text-left">App Permissions</Text>
                                    <Text className="text-sm text-muted-foreground text-left">
                                        View and manage app permissions
                                    </Text>
                                </View>
                                <Text className="text-muted-foreground">›</Text>
                            </View>
                        </Button>

                        <Button
                            onPress={handleTermsOfUse}
                            variant="ghost"
                            className="h-16 justify-start p-4 rounded-lg hover:bg-muted/50"
                        >
                            <View className="flex-row items-center space-x-4 flex-1">
                                <View className="w-10 h-10 bg-green-500/10 rounded-full items-center justify-center">
                                    <Text className="text-lg">📄</Text>
                                </View>
                                <View className="flex-1">
                                    <Text className="font-semibold text-base text-left">Terms of Use</Text>
                                    <Text className="text-sm text-muted-foreground text-left">
                                        Read our terms and conditions
                                    </Text>
                                </View>
                                <Text className="text-muted-foreground">›</Text>
                            </View>
                        </Button>

                        <Button
                            onPress={handlePrivacyPolicy}
                            variant="ghost"
                            className="h-16 justify-start p-4 rounded-lg hover:bg-muted/50"
                        >
                            <View className="flex-row items-center space-x-4 flex-1">
                                <View className="w-10 h-10 bg-purple-500/10 rounded-full items-center justify-center">
                                    <Text className="text-lg">🛡️</Text>
                                </View>
                                <View className="flex-1">
                                    <Text className="font-semibold text-base text-left">Privacy Policy</Text>
                                    <Text className="text-sm text-muted-foreground text-left">
                                        Learn how we protect your data
                                    </Text>
                                </View>
                                <Text className="text-muted-foreground">›</Text>
                            </View>
                        </Button>
                    </CardContent>
                </Card>

                {/* Support & Help Section */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle>Support & Help</CardTitle>
                        <CardDescription>
                            Get help and learn more about the app
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-1">
                        <Button
                            onPress={handleSupport}
                            variant="ghost"
                            className="h-16 justify-start p-4 rounded-lg hover:bg-muted/50"
                        >
                            <View className="flex-row items-center space-x-4 flex-1">
                                <View className="w-10 h-10 bg-orange-500/10 rounded-full items-center justify-center">
                                    <Text className="text-lg">💬</Text>
                                </View>
                                <View className="flex-1">
                                    <Text className="font-semibold text-base text-left">Contact Support</Text>
                                    <Text className="text-sm text-muted-foreground text-left">
                                        Get help from our team
                                    </Text>
                                </View>
                                <Text className="text-muted-foreground">›</Text>
                            </View>
                        </Button>

                        <Button
                            onPress={handleAbout}
                            variant="ghost"
                            className="h-16 justify-start p-4 rounded-lg hover:bg-muted/50"
                        >
                            <View className="flex-row items-center space-x-4 flex-1">
                                <View className="w-10 h-10 bg-cyan-500/10 rounded-full items-center justify-center">
                                    <Text className="text-lg">ℹ️</Text>
                                </View>
                                <View className="flex-1">
                                    <Text className="font-semibold text-base text-left">About</Text>
                                    <Text className="text-sm text-muted-foreground text-left">
                                        Learn about this app
                                    </Text>
                                </View>
                                <Text className="text-muted-foreground">›</Text>
                            </View>
                        </Button>
                    </CardContent>
                </Card>

                {/* App Information */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle>App Information</CardTitle>
                        <CardDescription>
                            Version and build details
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <View className="flex-row justify-between items-center p-3 bg-muted/20 rounded-lg">
                            <View className="flex-row items-center space-x-3">
                                <View className="w-8 h-8 bg-primary/10 rounded-full items-center justify-center">
                                    <Text className="text-primary font-bold">v</Text>
                                </View>
                                <Text className="font-medium text-muted-foreground">Version</Text>
                            </View>
                            <Text className="font-semibold">1.0.0</Text>
                        </View>

                        <View className="flex-row justify-between items-center p-3 bg-muted/20 rounded-lg">
                            <View className="flex-row items-center space-x-3">
                                <View className="w-8 h-8 bg-primary/10 rounded-full items-center justify-center">
                                    <Text className="text-primary font-bold">#</Text>
                                </View>
                                <Text className="font-medium text-muted-foreground">Build</Text>
                            </View>
                            <Text className="font-semibold">2025.08.02</Text>
                        </View>

                        <View className="flex-row justify-between items-center p-3 bg-muted/20 rounded-lg">
                            <View className="flex-row items-center space-x-3">
                                <View className="w-8 h-8 bg-primary/10 rounded-full items-center justify-center">
                                    <Text className="text-primary font-bold">📱</Text>
                                </View>
                                <Text className="font-medium text-muted-foreground">Platform</Text>
                            </View>
                            <Text className="font-semibold capitalize">{Platform.OS}</Text>
                        </View>
                    </CardContent>
                </Card>

                {/* Account Actions */}
                <Card className="border-destructive/20">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-destructive">Account Actions</CardTitle>
                        <CardDescription>
                            Manage your account and session
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button
                            onPress={handleSignOut}
                            variant="destructive"
                            className="h-12 w-full"
                        >
                            <Text className="font-semibold">Sign Out</Text>
                        </Button>
                    </CardContent>
                </Card>

                {/* Footer */}
                <View className="pt-6 pb-8">
                    <View className="items-center space-y-2">
                        <Text className="text-center text-sm text-muted-foreground">
                            Made with ❤️ using React Native & Expo
                        </Text>
                        <Text className="text-center text-xs text-muted-foreground">
                            © 2025 RNR Base. All rights reserved.
                        </Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}
