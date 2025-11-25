import React, { useState, useEffect } from 'react';
import { getDebts, saveDebts, Debt } from '../../lib/storage';
import { useIsFocused } from '@react-navigation/native';
import DebtList from '../../components/DebtList';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { AdMobBanner } from 'expo-ads-admob';

const NotPaidScreen = () => {
  const [notPaidDebts, setNotPaidDebts] = useState<Debt[] | null>(null);
  const isFocused = useIsFocused();

  const fetchDebts = async () => {
    try {
        const allDebts = await getDebts();
        if (allDebts) {
            const notPaid = allDebts.filter(debt => !debt.paid);
            setNotPaidDebts(notPaid);
        } else {
            setNotPaidDebts([]);
        }
    } catch (error) {
        console.error("Error fetching debts:", error);
        setNotPaidDebts([]);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchDebts();
    }
  }, [isFocused]);

  const handleMarkAsPaid = async (debtId: number) => {
    const allDebts = await getDebts();
    if (!allDebts) return;

    const updatedDebts = allDebts.map(debt =>
      debt.id === debtId ? { ...debt, paid: true } : debt
    );
    await saveDebts(updatedDebts);
    fetchDebts(); // Refetch debts to update the list
  };

  if (notPaidDebts === null) {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
        <DebtList 
            debts={notPaidDebts}
            onPressAction={handleMarkAsPaid}
            actionText="Tandai sebagai Dibayar"
            emptyMessage="Tiada hutang yang belum dibayar."
            isPaid={false}
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
  },
  adContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  }
});

export default NotPaidScreen;
