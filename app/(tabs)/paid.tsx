import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { getDebts, saveDebts, Debt } from '../../lib/storage';
import { useIsFocused } from '@react-navigation/native';
import DebtList from '../../components/DebtList';
import { AdMobBanner } from 'expo-ads-admob';

const PaidScreen = () => {
  const [paidDebts, setPaidDebts] = useState<Debt[] | null>(null);
  const isFocused = useIsFocused();

  const fetchDebts = async () => {
    try {
      const allDebts = await getDebts();
      if (allDebts) {
        const paid = allDebts.filter(debt => debt.paid);
        setPaidDebts(paid);
      } else {
        setPaidDebts([]);
      }
    } catch (error) {
      console.error("Error fetching debts:", error);
      setPaidDebts([]);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchDebts();
    }
  }, [isFocused]);

  const handleMarkAsUnpaid = async (debtId: number) => {
    const allDebts = await getDebts();
    if (!allDebts) return;

    const updatedDebts = allDebts.map(debt =>
      debt.id === debtId ? { ...debt, paid: false } : debt
    );
    await saveDebts(updatedDebts);
    fetchDebts(); // Refetch debts to update the list
  };

  if (paidDebts === null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
        <DebtList
          debts={paidDebts}
          onPressAction={handleMarkAsUnpaid}
          actionText="Tandai sebagai Belum Dibayar"
          emptyMessage="Tiada hutang yang telah dibayar."
          isPaid={true}
        />
        <View style={styles.adContainer}>
            <AdMobBanner
              bannerSize="fullBanner"
              adUnitID="ca-app-pub-7556071990692700/7707767494"
              servePersonalizedAds
              onDidFailToReceiveAdWithError={(e) => console.log(e)}
            />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
      flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  adContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  }
});

export default PaidScreen;
