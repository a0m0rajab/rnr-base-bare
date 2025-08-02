import React from 'react';
import { View, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '~/components/ui/text';
import { Rocket } from '~/lib/icons/Rocket';

interface LoadingScreenProps {
    message?: string;
    showIcon?: boolean;
}

export function LoadingScreen({ message = "Loading...", showIcon = true }: LoadingScreenProps) {
    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const pulseAnim = React.useRef(new Animated.Value(1)).current;

    React.useEffect(() => {
        // Fade in animation
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();

        // Pulse animation for loading dots
        const pulseAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 0.5,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ])
        );

        pulseAnimation.start();

        return () => {
            pulseAnimation.stop();
        };
    }, []);

    return (
        <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <Animated.View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: fadeAnim,
                }}
            >
                {/* Decorative background elements */}
                <View className="absolute top-1/4 left-8 w-32 h-32 rounded-full bg-white/5" />
                <View className="absolute bottom-1/3 right-12 w-24 h-24 rounded-full bg-white/5" />
                <View className="absolute top-1/2 right-8 w-16 h-16 rounded-full bg-white/10" />

                {showIcon && (
                    <View className="w-24 h-24 rounded-2xl mb-8 justify-center items-center relative overflow-hidden">
                        <View
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                            className="w-full h-full absolute rounded-2xl border border-white/20"
                        />
                        <Rocket size={48} className="text-white z-10" />
                    </View>
                )}

                {/* Loading text */}
                <Text className="text-white text-lg text-center mb-4 tracking-wide">
                    {message}
                </Text>

                {/* Loading dots */}
                <Animated.View
                    style={{ opacity: pulseAnim }}
                    className="flex-row space-x-2"
                >
                    {[0, 1, 2].map((index) => (
                        <View
                            key={index}
                            className="w-2 h-2 bg-white/60 rounded-full"
                        />
                    ))}
                </Animated.View>
            </Animated.View>
        </LinearGradient>
    );
}
