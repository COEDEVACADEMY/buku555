import React, { useState, useEffect } from 'react';
import { getDebts, saveDebts, Debt } from '../../lib/storage';
import { useIsFocused } from '@react-navigation/native';
import DebtList from '../../components/DebtList';
import { Spinner, YStack } from 'tamagui';

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
          <YStack flex={1} justifyContent="center" alignItems="center">
              <Spinner size="large" color="$blue10" />
          </YStack>
      );
  }

  return (
    <DebtList 
        debts={paidDebts}
        onPressAction={handleMarkAsUnpaid}
        actionText="Tandai sebagai Belum Dibayar"
        emptyMessage="Tiada hutang yang telah dibayar."
        isPaid={true}
    />
  );
};

export default PaidScreen;
