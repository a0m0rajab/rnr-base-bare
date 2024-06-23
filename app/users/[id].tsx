
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Card } from '@/components/ui/card';
import UserCard from '@/components/userCard';
import { Stack, useLocalSearchParams } from 'expo-router';

import { Image, StyleSheet, Text } from 'react-native';

export default function Page() {

  const { id } = useLocalSearchParams();
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={{
            uri: "https://www.github.com/a0m0rajab.png",
          }}
          className='h-full'
        />
      }>
      <Stack.Screen options={{ title: id as string }} />
      <Text>Blog post: {id}</Text>
      <UserCard
        avatar="https://www.github.com/a0m0rajab.png"
        name="a0m0rajab"
        role="Software Engineer"
        id="1"
      />
    </ParallaxScrollView>
  );
}
