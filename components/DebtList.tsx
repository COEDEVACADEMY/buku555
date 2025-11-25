import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { Debt } from '../lib/storage';

type DebtListProps = {
  debts: Debt[];
  onPressAction: (id: number) => void;
  actionText: string;
  emptyMessage: string;
  isPaid: boolean;
};

const DebtList: React.FC<DebtListProps> = ({ debts, onPressAction, actionText, emptyMessage }) => {
  const renderItem = ({ item }: { item: Debt }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardAmount}>RM{item.amount.toFixed(2)}</Text>
      {item.description && <Text style={styles.cardDescription}>{item.description}</Text>}
      <Text style={styles.cardDate}>{new Date(item.createdAt).toLocaleString()}</Text>
      <TouchableOpacity style={styles.button} onPress={() => onPressAction(item.id)}>
        <Text style={styles.buttonText}>{actionText}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {debts.length === 0 ? (
        <Text style={styles.emptyMessage}>{emptyMessage}</Text>
      ) : (
        <FlatList
          data={debts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
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
  cardAmount: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  cardDate: {
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});

export default DebtList;
