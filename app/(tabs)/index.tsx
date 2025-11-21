import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { getDebts, saveDebts } from '../../lib/storage';
import { useIsFocused } from '@react-navigation/native';
import { Plus, Trash2 } from '@tamagui/lucide-icons';
import { Button, Card, Dialog, H2, Input, Paragraph, Spinner, XStack, YStack } from 'tamagui';

const HomeScreen = () => {
  const [totalOwed, setTotalOwed] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const isFocused = useIsFocused();

  const fetchSummary = async () => {
    setIsLoading(true);
    try {
        const allDebts = await getDebts();
        if (allDebts && allDebts.length > 0) {
          const notPaid = allDebts.filter(debt => !debt.paid);
          const paid = allDebts.filter(debt => debt.paid);

          const owed = notPaid.reduce((acc, debt) => acc + debt.amount, 0);
          const paidAmount = paid.reduce((acc, debt) => acc + debt.amount, 0);

          setTotalOwed(owed);
          setTotalPaid(paidAmount);
        } else {
          setTotalOwed(0);
          setTotalPaid(0);
        }
    } catch (error) {
        console.error("Error fetching summary:", error);
        setTotalOwed(0);
        setTotalPaid(0);
    } finally {
        setIsLoading(false);
    }
  };

  const handleClearDebts = async () => {
    try {
        await saveDebts([]);
        fetchSummary();
        Alert.alert('Berjaya', 'Semua rekod telah dipadam.');
    } catch (error) {
        console.error("Error clearing debts:", error);
        Alert.alert('Ralat', 'Gagal memadam rekod.');
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchSummary();
    }
  }, [isFocused]);

  const handleAddDebt = async () => {
    if (!name || !amount) {
      Alert.alert('Ralat', 'Nama dan jumlah diperlukan.');
      return;
    }

    try {
        const currentDebts = await getDebts();
        const newDebt = {
          id: Date.now(),
          name,
          amount: parseFloat(amount),
          description,
          paid: false,
          createdAt: Date.now(),
        };

        const updatedDebts = [...(currentDebts || []), newDebt];
        await saveDebts(updatedDebts);

        setName('');
        setAmount('');
        setDescription('');
        fetchSummary();
        setDialogOpen(false);

        Alert.alert('Berjaya', 'Hutang berjaya ditambah.');
    } catch (error) {
        console.error("Error adding debt:", error);
        Alert.alert('Ralat', 'Gagal menambah hutang.');
    }
  };

  return (
    <YStack flex={1} backgroundColor="$background" padding="$4" space="$4">
      <Card elevate size="$4">
        <Card.Header>
            <H2>Jumlah Hutang</H2>
            {isLoading ? <Spinner /> : <Paragraph theme="alt2">RM{totalOwed.toFixed(2)}</Paragraph>}
        </Card.Header>
      </Card>
      <Card elevate size="$4">
        <Card.Header>
            <H2>Jumlah Dibayar</H2>
            {isLoading ? <Spinner /> : <Paragraph theme="alt2">RM{totalPaid.toFixed(2)}</Paragraph>}
        </Card.Header>
      </Card>

      <Dialog modal open={dialogOpen} onOpenChange={setDialogOpen}>
          <Dialog.Trigger asChild>
              <Button icon={Plus}>Tambah Hutang Baru</Button>
          </Dialog.Trigger>

          <Dialog.Portal>
              <Dialog.Overlay
                  key="overlay"
                  animation="quick"
                  opacity={0.5}
                  enterStyle={{ opacity: 0 }}
                  exitStyle={{ opacity: 0 }}
              />
              <Dialog.Content
                  bordered
                  elevate
                  key="content"
                  animation={[
                      'quick',
                      {
                          opacity: {
                              overshoot: -0.5,
                          },
                      },
                  ]}
                  enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
                  exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
                  space="$4"
              >
                  <Dialog.Title>Tambah Hutang Baru</Dialog.Title>
                  <Dialog.Description>
                      Masukkan maklumat hutang baru di bawah.
                  </Dialog.Description>
                  <Input placeholder="Nama" value={name} onChangeText={setName} />
                  <Input placeholder="Jumlah (RM)" value={amount} onChangeText={setAmount} keyboardType="numeric" />
                  <Input placeholder="Penerangan" value={description} onChangeText={setDescription} />

                  <XStack alignSelf="flex-end" space="$2">
                      <Dialog.Close asChild>
                          <Button variant="outlined" aria-label="Close">
                              Batal
                          </Button>
                      </Dialog.Close>
                      <Button
                        theme="active"
                        onPress={handleAddDebt}
                      >
                        Tambah
                      </Button>
                  </XStack>
              </Dialog.Content>
          </Dialog.Portal>
      </Dialog>

      <Button icon={Trash2} chromeless onPress={handleClearDebts}>
          Padam Semua Rekod
      </Button>

    </YStack>
  );
};

export default HomeScreen;
 