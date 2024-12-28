import { openDB, deleteDB } from 'idb';
import { RecentSaleProducts } from '@/types';
const dbName = 'PaymentsDB';
const storeName = 'payments';

// Initialize the database
const initDB = async () => {
  const db = await openDB(dbName, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
  return db;
};

// Add a payment record
export const addPayment = async (payment: RecentSaleProducts) => {
  const db = await initDB();
  return db.add(storeName, payment);
};

// Fetch all payment records
export const getAllPayments = async () => {
  const db = await initDB();
  return db.getAll(storeName);
};

// Delete a specific payment record by ID
export const deletePayment = async (id: number) => {
  const db = await initDB();
  return db.delete(storeName, id);
};

// Update a specific payment record
export const updatePayment = async (
  id: number,
  updates: Partial<{
    reference: string;
    customer: string;
    warehouse: string;
    amount: string;
    due: string;
    method: string;
    status: string;
  }>
) => {
  const db = await initDB();
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);
  const payment = await store.get(id);
  if (!payment) throw new Error('Payment not found');
  const updatedPayment = { ...payment, ...updates };
  await store.put(updatedPayment);
  await tx.done;
  return updatedPayment;
};


// Delete the entire database
export const deleteDatabase = async () => {
  try {
    await deleteDB(dbName);
    console.log(`Database "${dbName}" deleted successfully.`);
  } catch (error) {
    console.error(`Failed to delete database "${dbName}":`, error);
  }
};

// Reinitialize the database without the store
export const reinitializeDatabaseWithoutStore = async () => {
  await deleteDatabase();
  const db = await openDB(dbName, 1, {
    upgrade(db) {
      // Reinitialize the database without creating the `storeName` store
      console.log(`Database "${dbName}" reinitialized without the "${storeName}" store.`);
    },
  });
  return db;
};