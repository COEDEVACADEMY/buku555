import React, { useState, useEffect } from 'react';
import {
  Alert,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import { getDebts, saveDebts } from '../../lib/storage';
import { useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import GoogleBannerAd from '../../components/GoogleBannerAd';

const HomeScreen = () => {
  const [totalOwed, setTotalOwed] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const isFocused = useIsFocused();

  const fetchSummary = async () => {
    setIsLoading(true);
    try {
      const allDebts = await getDebts();
      if (allDebts && allDebts.length > 0) {
        const notPaid = allDebts.filter((debt) => !debt.paid);
        const paid = allDebts.filter((debt) => debt.paid);

        const owed = notPaid.reduce((acc, debt) => acc + debt.amount, 0);
        const paidAmount = paid.reduce((acc, debt) => acc + debt.amount, 0);

        setTotalOwed(owed);
        setTotalPaid(paidAmount);
      } else {
        setTotalOwed(0);
        setTotalPaid(0);
      }
    } catch (error) {
      console.error('Error fetching summary:', error);
      setTotalOwed(0);
      setTotalPaid(0);
    } finally {
      setIsLoading(false);
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
      setModalVisible(false);

      Alert.alert('Berjaya', 'Hutang berjaya ditambah.');
    } catch (error) {
      console.error('Error adding debt:', error);
      Alert.alert('Ralat', 'Gagal menambah hutang.');
    }
  };

  return (
    <View style={styles.container}>
      <GoogleBannerAd />
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Jumlah Hutang</Text>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.cardContent}>RM{totalOwed.toFixed(2)}</Text>
        )}
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Jumlah Dibayar</Text>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.cardContent}>RM{totalPaid.toFixed(2)}</Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={20} color="white" />
        <Text style={styles.buttonText}>Tambah Hutang Baru</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Tambah Hutang Baru</Text>
            <Text style={styles.modalDescription}>
              Masukkan maklumat hutang baru di bawah.
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Nama"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Jumlah (RM)"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Penerangan"
              value={description}
              onChangeText={setDescription}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonAdd]}
                onPress={handleAddDebt}
              >
                <Text style={styles.textStyle}>Tambah</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardContent: {
    fontSize: 18,
    color: '#666',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalDescription: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 200,
    borderRadius: 5,
    borderColor: '#ddd',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonClose: {
    backgroundColor: '#6c757d',
  },
  buttonAdd: {
    backgroundColor: '#007AFF',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
