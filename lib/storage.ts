import AsyncStorage from '@react-native-async-storage/async-storage';

const DEBTS_KEY = 'debts';

export interface Debt {
  id: number;
  name: string;
  amount: number;
  description: string;
  paid: boolean;
  createdAt: number;
}

export const getDebts = async (): Promise<Debt[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(DEBTS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Error reading debts from storage", e);
    return [];
  }
};

export const saveDebts = async (debts: Debt[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(debts);
    await AsyncStorage.setItem(DEBTS_KEY, jsonValue);
  } catch (e) {
    console.error("Error saving debts to storage", e);
  }
};
