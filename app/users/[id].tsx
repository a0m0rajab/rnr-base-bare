
import { Stack, useLocalSearchParams } from 'expo-router';

import { Text } from 'react-native';

export default function Page() {

  const { id } = useLocalSearchParams();
  return (
    <>
      <Stack.Screen options={{ title: id as string }} />
      <Text>Blog post: {id}</Text>
    </>
  );
}
