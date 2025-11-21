import React, { useState, useEffect } from 'react';
import { getDebts, saveDebts, Debt } from '../../lib/storage';
import { useIsFocused } from '@react-navigation/native';
import DebtList from '../../components/DebtList';
import { Spinner, YStack } from 'tamagui';

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
        <YStack flex={1} justifyContent="center" alignItems="center">
            <Spinner size="large" color="$blue10" />
        </YStack>
    );
  }

  return (
    <DebtList 
        debts={notPaidDebts}
        onPressAction={handleMarkAsPaid}
        actionText="Tandai sebagai Dibayar"
        emptyMessage="Tiada hutang yang belum dibayar."
        isPaid={false}
    />
  );
};

export default NotPaidScreen;
