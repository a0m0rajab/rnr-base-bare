import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Text } from '~/components/ui/text';
import { Rocket } from '~/lib/icons/Rocket';

interface SplashScreenProps {
    onFinish: () => void;
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const animationRef = useRef<Animated.CompositeAnimation | null>(null);

    useEffect(() => {
        // Small delay to ensure component is mounted properly
        const timer = setTimeout(() => {
            // Start the animation sequence
            const animationSequence = Animated.sequence([
                // Initial fade in and scale
                Animated.parallel([
                    Animated.timing(fadeAnim, {
                        toValue: 1,
                        duration: 800,
                        useNativeDriver: true,
                    }),
                    Animated.spring(scaleAnim, {
                        toValue: 1,
                        tension: 50,
                        friction: 8,
                        useNativeDriver: true,
                    }),
                    Animated.timing(slideAnim, {
                        toValue: 0,
                        duration: 800,
                        useNativeDriver: true,
                    }),
                ]),
                // Pause
                Animated.delay(1000),
                // Subtle rotation animation
                Animated.timing(rotateAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                // Another pause
                Animated.delay(500),
                // Fade out
                Animated.parallel([
                    Animated.timing(fadeAnim, {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(scaleAnim, {
                        toValue: 1.1,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                ]),
            ]);

            animationRef.current = animationSequence;
            animationSequence.start((finished) => {
                if (finished) {
                    onFinish();
                }
            });
        }, 100);

        // Cleanup function
        return () => {
            clearTimeout(timer);
            if (animationRef.current) {
                animationRef.current.stop();
            }
        };
    }, [onFinish]);

    const rotateInterpolate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <>
            <StatusBar style="light" />
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
                    <View className="absolute bottom-1/4 left-12 w-20 h-20 rounded-full bg-white/5" />

                    {/* Main logo container */}
                    <Animated.View
                        style={{
                            transform: [
                                { scale: scaleAnim },
                                { translateY: slideAnim },
                                { rotate: rotateInterpolate },
                            ],
                        }}
                        className="w-40 h-40 rounded-3xl mb-8 justify-center items-center relative overflow-hidden"
                    >
                        <View
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                            className="w-full h-full absolute rounded-3xl border-2 border-white/20"
                        />
                        <View className="absolute inset-4 bg-white/5 rounded-2xl" />
                        <Rocket size={80} className="text-white z-10" />

                        {/* Floating particles effect */}
                        <Animated.View
                            style={{
                                opacity: fadeAnim,
                                transform: [{
                                    rotate: rotateInterpolate,
                                }],
                            }}
                            className="absolute top-4 right-4 w-2 h-2 bg-white/40 rounded-full"
                        />
                        <View className="absolute bottom-6 left-6 w-1 h-1 bg-white/60 rounded-full" />
                        <View className="absolute top-8 left-4 w-1.5 h-1.5 bg-white/50 rounded-full" />
                    </Animated.View>

                    {/* App name and tagline */}
                    <Animated.View
                        style={{
                            transform: [{ translateY: slideAnim }],
                            opacity: fadeAnim,
                        }}
                        className="items-center"
                    >
                        <Text className="text-white text-4xl font-bold text-center mb-2 tracking-wide">
                            RNR Base
                        </Text>
                        <Text className="text-white/80 text-lg text-center tracking-wider">
                            React Native Reimagined
                        </Text>
                    </Animated.View>

                    {/* Loading indicator */}
                    <Animated.View
                        style={{
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }],
                        }}
                        className="absolute bottom-20 items-center"
                    >
                        <View className="flex-row space-x-2">
                            {[0, 1, 2].map((index) => (
                                <Animated.View
                                    key={index}
                                    style={{
                                        opacity: fadeAnim,
                                        transform: [{
                                            scale: fadeAnim.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [0.8, 1],
                                            }),
                                        }],
                                    }}
                                    className="w-2 h-2 bg-white/60 rounded-full"
                                />
                            ))}
                        </View>
                        <Text className="text-white/60 text-sm mt-4 tracking-wide">
                            Loading...
                        </Text>
                    </Animated.View>
                </Animated.View>
            </LinearGradient>
        </>
    );
}
