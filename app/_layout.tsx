import { Stack } from 'expo-router';
import { TamaguiProvider } from 'tamagui';
import { PortalProvider } from '@gorhom/portal';
import tamaguiConfig from '../tamagui.config';

export default function RootLayout() {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <PortalProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </PortalProvider>
    </TamaguiProvider>
  );
}
