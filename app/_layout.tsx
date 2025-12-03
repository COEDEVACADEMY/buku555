import { Stack } from 'expo-router';
import { Platform } from 'react-native';
import { useEffect } from 'react';

export default function RootLayout() {
  useEffect(() => {
    if (Platform.OS !== 'web') {
      import('react-native-google-mobile-ads').then(mobileAds => {
        mobileAds
          .default()
          .initialize()
          .then(adapterStatuses => {
            // Initialization complete!
          });
      });
    }
  }, []);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
