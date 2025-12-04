import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { initializeMobileAds } from '../lib/mobileAds';

export default function RootLayout() {
  useEffect(() => {
    initializeMobileAds();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
