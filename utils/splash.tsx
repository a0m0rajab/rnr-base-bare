import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { SplashScreen as ExpoSplashScreen } from 'expo-router';
import { useSession } from './ctx';
import { SplashScreen } from '~/components/SplashScreen';

// Create context to track splash screen state
const SplashContext = createContext<{
    splashComplete: boolean;
}>({
    splashComplete: false,
});

export const useSplash = () => useContext(SplashContext);

export function SplashProvider({ children }: { children: React.ReactNode }) {
    const [splashComplete, setSplashComplete] = useState(false);

    return (
        <SplashContext.Provider value={{ splashComplete }}>
            <SplashScreenController onComplete={() => setSplashComplete(true)} />
            {splashComplete && children}
        </SplashContext.Provider>
    );
}

function SplashScreenController({ onComplete }: { onComplete: () => void }) {
    const { isLoading } = useSession();
    const [showCustomSplash, setShowCustomSplash] = useState(true);
    const [splashFinished, setSplashFinished] = useState(false);

    useEffect(() => {
        // Keep the expo splash screen visible initially
        ExpoSplashScreen.preventAutoHideAsync().catch(() => {
            // Splash screen is already hidden or there was an error
        });
    }, []);

    useEffect(() => {
        // Hide expo splash screen once our custom splash is ready
        if (showCustomSplash) {
            setTimeout(() => {
                ExpoSplashScreen.hideAsync().catch(() => {
                    // Splash screen is already hidden or there was an error
                });
            }, 100);
        }
    }, [showCustomSplash]);

    useEffect(() => {
        // Hide custom splash screen when session loading is complete and splash animation is finished
        if (!isLoading && splashFinished) {
            setTimeout(() => {
                setShowCustomSplash(false);
                onComplete();
            }, 100);
        }
    }, [isLoading, splashFinished, onComplete]);

    const handleSplashFinish = useCallback(() => {
        setSplashFinished(true);
    }, []);

    // Show custom splash screen while loading or splash animation is running
    if (showCustomSplash) {
        return <SplashScreen onFinish={handleSplashFinish} />;
    }

    return null;
}
