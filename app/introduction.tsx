import React, { useState, useRef } from 'react';
import { View, ScrollView, Dimensions, Image, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { Rocket } from '~/lib/icons/Rocket';
import { Palette } from '~/lib/icons/Palette';
import { Zap } from '~/lib/icons/Zap';

const { width: screenWidth } = Dimensions.get('window');

interface SlideData {
    id: number;
    title: string;
    description: string;
    icon: React.ComponentType<any>;
    backgroundColor: string;
}

const slides: SlideData[] = [
    {
        id: 1,
        title: "Welcome to RNR Base",
        description: "A powerful React Native starter kit with Expo Router, NativeWind, and Supabase integration for rapid app development.",
        icon: Rocket,
        backgroundColor: "bg-blue-500",
    },
    {
        id: 2,
        title: "Beautiful UI Components",
        description: "Pre-built components following shadcn/ui patterns with NativeWind styling and dark/light theme support.",
        icon: Palette,
        backgroundColor: "bg-purple-500",
    },
    {
        id: 3,
        title: "Ready to Build",
        description: "Authentication, navigation, and database integration are all set up. Start building your amazing app today!",
        icon: Zap,
        backgroundColor: "bg-green-500",
    },
];

export default function Introduction() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const scrollViewRef = useRef<ScrollView>(null);

    const handleScroll = (event: any) => {
        const slideIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
        setCurrentSlide(slideIndex);
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
            <View className="flex-1 bg-background">
                {/* Header with Skip and Sign In buttons */}
                <View className="flex-row justify-between items-center pt-12 px-6 pb-4 z-10">
                    <Pressable onPress={handleGetStarted}>
                        <Text className="text-muted-foreground font-medium text-base">Skip</Text>
                    </Pressable>
                    <Pressable onPress={handleSignIn}>
                        <Text className="text-primary font-semibold text-base">Sign In</Text>
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
                            <View className={`flex-1 ${slide.backgroundColor} justify-center items-center px-8`}>
                                {/* Icon illustration */}
                                <View className="w-64 h-64 bg-white/10 rounded-3xl mb-8 justify-center items-center border-2 border-white/20">
                                    <slide.icon size={120} className="text-white" />
                                </View>

                                {/* Content overlay */}
                                <View className="items-center">
                                    <Text className="text-white text-3xl font-bold text-center mb-4">
                                        {slide.title}
                                    </Text>
                                    <Text className="text-white/90 text-base text-center leading-6 max-w-sm">
                                        {slide.description}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </ScrollView>

                {/* Bottom section with indicators and button */}
                <View className="px-6 pb-12 pt-8 bg-background">
                    {/* Slide indicators */}
                    <View className="flex-row justify-center mb-8">
                        {slides.map((_, index) => (
                            <Pressable
                                key={index}
                                onPress={() => goToSlide(index)}
                                className={`w-2 h-2 rounded-full mx-1 ${index === currentSlide ? 'bg-primary' : 'bg-muted'
                                    }`}
                            />
                        ))}
                    </View>

                    {/* Action buttons */}
                    <View className="gap-4">
                        <Button onPress={handleGetStarted} className="w-full">
                            <Text className="text-primary-foreground font-semibold">Get Started</Text>
                        </Button>
                    </View>
                </View>
            </View>
        </>
    );
}
