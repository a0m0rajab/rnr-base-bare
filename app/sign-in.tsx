import { ScrollView, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Auth from '~/components/Auth';
import { Text } from '~/components/ui/text';

export default function SignIn() {
    return (
        <>
            <StatusBar style="auto" />
            <ScrollView className="flex-1 bg-background">
                <View className="flex-1 justify-center px-6 py-12 min-h-screen">
                    <View className="w-full max-w-sm mx-auto">
                        {/* Header Section */}
                        <View className="mb-8 text-center">
                            <Text className="text-3xl font-bold text-foreground mb-2">
                                Welcome Back
                            </Text>
                            <Text className="text-muted-foreground text-base">
                                Sign in to your account to continue
                            </Text>
                        </View>

                        {/* Auth Form */}
                        <Auth />
                    </View>
                </View>
            </ScrollView>
        </>
    );
}
