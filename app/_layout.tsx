import { Stack } from 'expo-router';
import { SessionProvider, useSession } from '../utils/ctx';
import { SplashScreenController } from '../utils/splash';
import { useEffect } from 'react';
import { router } from 'expo-router';

export default function Root() {
    // Set up the auth context and render our layout inside of it.
    return (
        <SessionProvider>
            <SplashScreenController />
            <RootNavigator />
        </SessionProvider>
    );
}


function RootNavigator() {
    const { session, isLoading } = useSession();

    useEffect(() => {
        if (!isLoading && !session) {
            router.replace('/introduction');
        }
    }, [session, isLoading]);

    return (
        <Stack>
            <Stack.Protected guard={!!session}>
                <Stack.Screen name="(app)" options={{ headerShown: false }} />
            </Stack.Protected>

            <Stack.Protected guard={!session}>
                <Stack.Screen name="introduction" options={{ headerShown: false }} />
                <Stack.Screen name="sign-in" options={{ headerShown: false }} />
            </Stack.Protected>
        </Stack>
    );
}