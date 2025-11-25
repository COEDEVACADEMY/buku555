
import { Tabs } from 'expo-router';
import React from 'react';
import { Image, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { PortalProvider } from '@gorhom/portal';
import { Ionicons } from '@expo/vector-icons';

const CustomHeader = ({ title }: { title: string }) => {
    return (
        <View style={styles.headerContainer}>
             <View style={styles.rowContainer}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/images/logo.png')}
                />
                <Text style={styles.headerTitle}>{title}</Text>
            </View>
            <View style={[styles.rowContainer, { marginTop: 12 }]}>
                <TextInput 
                    style={styles.searchInput} 
                    placeholder="Cari hutang..." 
                />
                <TouchableOpacity style={styles.searchButton}>
                    <Ionicons name="search" size={20} color="#888" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#fff',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingTop: 40, 
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    logo: {
        width: 30,
        height: 30,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    searchInput: {
        flex: 1,
        height: 36,
        paddingHorizontal: 12,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
    },
    searchButton: {
        padding: 6,
    },
    tabBar: {
        // You can add styles for the tab bar if needed
    },
});

export default function TabLayout() {
  return (
    <PortalProvider>
      <Tabs 
          screenOptions={{ 
              tabBarShowLabel: false,
              tabBarActiveTintColor: '#007AFF', // Example active color
              tabBarInactiveTintColor: '#8e8e93', // Example inactive color
              tabBarStyle: styles.tabBar,
          }}
      >
        <Tabs.Screen
          name="index"
          options={{
            header: () => <CustomHeader title="Utama" />,
            tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="not-paid"
          options={{
            header: () => <CustomHeader title="Belum Dibayar" />,
            tabBarIcon: ({ color, size }) => <Ionicons name="list-outline" color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="paid"
          options={{
            header: () => <CustomHeader title="Sudah Dibayar" />,
            tabBarIcon: ({ color, size }) => <Ionicons name="checkmark-done-outline" color={color} size={size} />,
          }}
        />
      </Tabs>
    </PortalProvider>
  );
}
