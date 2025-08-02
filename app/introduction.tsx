import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, Dimensions, Pressable, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { Rocket } from '~/lib/icons/Rocket';
import { Palette } from '~/lib/icons/Palette';
import { Zap } from '~/lib/icons/Zap';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth } = Dimensions.get('window');

interface SlideData {
    id: number;
    title: string;
    description: string;
    icon: React.ComponentType<any>;
    gradientColors: string[];
    iconBackground: string;
}

const slides: SlideData[] = [
    {
        id: 1,
        title: "Welcome to RNR Base",
        description: "Experience the power of modern React Native development with our carefully crafted starter kit featuring Expo Router, NativeWind, and Supabase.",
        icon: Rocket,
        gradientColors: ['#667eea', '#764ba2'],
        iconBackground: 'rgba(255, 255, 255, 0.15)',
    },
    {
        id: 2,
        title: "Beautiful UI Components",
        description: "Discover stunning pre-built components following shadcn/ui design patterns with seamless dark/light theme support and responsive layouts.",
        icon: Palette,
        gradientColors: ['#f093fb', '#f5576c'],
        iconBackground: 'rgba(255, 255, 255, 0.15)',
    },
    {
        id: 3,
        title: "Ready to Scale",
        description: "Everything you need is perfectly configured: authentication flows, secure database connections, and scalable architecture patterns.",
        icon: Zap,
        gradientColors: ['#4facfe', '#00f2fe'],
        iconBackground: 'rgba(255, 255, 255, 0.15)',
    },
];

export default function Introduction() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const scrollViewRef = useRef<ScrollView>(null);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Fade in animation on mount
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();
    }, []);

    const handleScroll = (event: any) => {
        const slideIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
        if (slideIndex !== currentSlide) {
            setCurrentSlide(slideIndex);
            // Animate slide transition
            Animated.timing(slideAnim, {
                toValue: slideIndex,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    };

    const goToSlide = (index: number) => {
        scrollViewRef.current?.scrollTo({ x: index * screenWidth, animated: true });
        setCurrentSlide(index);
    };

    const handleGetStarted = () => {
        router.replace('/sign-in');
    };

    const handleSignIn = () => {
        router.replace('/sign-in');
    };

    return (
        <>
            <StatusBar style="light" />
            <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
                {/* Header with Skip and Sign In buttons */}
                <View className="absolute top-0 left-0 right-0 flex-row justify-between items-center pt-12 px-6 pb-4 z-20">
                    <Pressable
                        onPress={handleGetStarted}
                        className="bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm"
                    >
                        <Text className="text-white font-medium text-sm">Skip</Text>
                    </Pressable>
                    <Pressable
                        onPress={handleSignIn}
                        className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm border border-white/30"
                    >
                        <Text className="text-white font-semibold text-sm">Sign In</Text>
                    </Pressable>
                </View>

                {/* Slides */}
                <ScrollView
                    ref={scrollViewRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    className="flex-1"
                >
                    {slides.map((slide, index) => (
                        <View key={slide.id} className="flex-1" style={{ width: screenWidth }}>
                            <LinearGradient
                                colors={slide.gradientColors as any}
                                style={{ flex: 1 }}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            >
                                <View className="flex-1 justify-center items-center px-8 relative">
                                    {/* Decorative background elements */}
                                    <View className="absolute top-1/4 left-8 w-32 h-32 rounded-full bg-white/5" />
                                    <View className="absolute bottom-1/3 right-12 w-24 h-24 rounded-full bg-white/5" />
                                    <View className="absolute top-1/2 right-8 w-16 h-16 rounded-full bg-white/10" />

                                    {/* Icon container with enhanced styling */}
                                    <Animated.View
                                        style={{
                                            transform: [{
                                                scale: fadeAnim.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [0.8, 1],
                                                })
                                            }]
                                        }}
                                        className="w-72 h-72 rounded-3xl mb-12 justify-center items-center relative overflow-hidden"
                                    >
                                        <View
                                            style={{ backgroundColor: slide.iconBackground }}
                                            className="w-full h-full absolute rounded-3xl border-2 border-white/20"
                                        />
                                        <View className="absolute inset-4 bg-white/5 rounded-2xl" />
                                        <slide.icon size={140} className="text-white z-10" />

                                        {/* Floating particles effect */}
                                        <View className="absolute top-8 right-8 w-2 h-2 bg-white/40 rounded-full" />
                                        <View className="absolute bottom-12 left-12 w-1 h-1 bg-white/60 rounded-full" />
                                        <View className="absolute top-16 left-8 w-1.5 h-1.5 bg-white/50 rounded-full" />
                                    </Animated.View>

                                    {/* Content with enhanced typography */}
                                    <Animated.View
                                        style={{
                                            transform: [{
                                                translateY: fadeAnim.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [30, 0],
                                                })
                                            }]
                                        }}
                                        className="items-center max-w-sm"
                                    >
                                        <Text className="text-white text-4xl font-bold text-center mb-6 leading-tight">
                                            {slide.title}
                                        </Text>
                                        <Text className="text-white/90 text-lg text-center leading-7 tracking-wide">
                                            {slide.description}
                                        </Text>
                                    </Animated.View>
                                </View>
                            </LinearGradient>
                        </View>
                    ))}
                </ScrollView>

                {/* Enhanced bottom section */}
                <View className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl">
                    <View className="px-8 py-8">
                        {/* Slide indicators with animation */}
                        <View className="flex-row justify-center mb-8">
                            {slides.map((_, index) => (
                                <Pressable
                                    key={index}
                                    onPress={() => goToSlide(index)}
                                    className={`h-2 rounded-full mx-1 transition-all duration-300 ${index === currentSlide
                                            ? 'bg-blue-500 w-8'
                                            : 'bg-gray-300 w-2'
                                        }`}
                                />
                            ))}
                        </View>

                        {/* Enhanced action button */}
                        <Animated.View
                            style={{
                                transform: [{
                                    scale: fadeAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0.9, 1],
                                    })
                                }]
                            }}
                        >
                            <Pressable
                                onPress={handleGetStarted}
                                className="rounded-2xl py-4 px-8 shadow-lg active:scale-95 transition-transform duration-150"
                                style={{
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 4 },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 8,
                                    elevation: 8,
                                }}
                            >
                                <LinearGradient
                                    colors={['#667eea', '#764ba2'] as any}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={{
                                        borderRadius: 16,
                                        paddingVertical: 16,
                                        paddingHorizontal: 32,
                                    }}
                                >
                                    <Text className="text-white text-lg font-bold text-center tracking-wide">
                                        Get Started
                                    </Text>
                                </LinearGradient>
                            </Pressable>
                        </Animated.View>

                        {/* Additional navigation hint */}
                        <Text className="text-gray-500 text-center text-sm mt-4">
                            Swipe to explore features
                        </Text>
                    </View>
                </View>
            </Animated.View>
        </>
    );
}
