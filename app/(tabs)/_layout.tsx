import { Tabs } from 'expo-router';
import React from 'react';
import { Image } from 'react-native';
import { Home, List, Check, Search } from '@tamagui/lucide-icons';
import { Button, H3, Input, XStack, YStack } from 'tamagui';

const CustomHeader = ({ title }: { title: string }) => {
    return (
        <YStack 
            backgroundColor="$background" 
            padding="$3" 
            borderBottomWidth={1} 
            borderBottomColor="$borderColor"
            paddingTop="$6" 
        >
             <XStack alignItems="center" gap="$3">
                <Image
                    style={{ width: 30, height: 30 }}
                    source={require('../../assets/images/logo.png')}
                />
                <H3>{title}</H3>
            </XStack>
            <XStack alignItems="center" gap="$2" marginTop="$3">
                <Input 
                    flex={1} 
                    size="$3" 
                    placeholder="Cari hutang..." 
                />
                <Button size="$3" icon={Search} chromeless />
            </XStack>
        </YStack>
    );
};

export default function TabLayout() {
  return (
    <Tabs 
        screenOptions={{ 
            tabBarShowLabel: false,
            tabBarActiveTintColor: '$blue10',
            tabBarInactiveTintColor: '$gray10',
        }}
    >
      <Tabs.Screen
        name="index"
        options={{
          header: () => <CustomHeader title="Utama" />,
          tabBarIcon: ({ color }) => <Home color={color} />,
        }}
      />
      <Tabs.Screen
        name="not-paid"
        options={{
          header: () => <CustomHeader title="Belum Dibayar" />,
          tabBarIcon: ({ color }) => <List color={color} />,
        }}
      />
      <Tabs.Screen
        name="paid"
        options={{
          header: () => <CustomHeader title="Sudah Dibayar" />,
          tabBarIcon: ({ color }) => <Check color={color} />,
        }}
      />
    </Tabs>
  );
}
