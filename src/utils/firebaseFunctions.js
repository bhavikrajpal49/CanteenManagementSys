import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { firestore } from "../firebase.config";

// Saving new Item
export const saveItem = async (data) => {
  await setDoc(doc(firestore, "foodItems", `${Date.now()}`), data, {
    merge: true,
  });
};

// Saving new Order
export const orderItem = async (data) => {
  await setDoc(doc(firestore, "orderDetails", `${Date.now()}`), data, {
    merge: true,
  });
};

// Saving new OrderHistory
export const orderHistory = async (data) => {
  await setDoc(doc(firestore, "orderHistory", `${Date.now()}`), data, {
    merge: true,
  });
};

// // deleting specific Order
// export const orderHistory = async (data) => {
//   await setDoc(doc(firestore, "orderHistory", `${Date.now()}`), data, {
//     merge: true,
//   });
// };

// getall food items
export const getAllOrders = async () => {
  const orders = await getDocs(
    query(collection(firestore, "orderDetails"), orderBy("id", "desc"))
  );

  return orders.docs.map((doc) => doc.data());
};

// getall food items
export const getAllFoodItems = async () => {
  const items = await getDocs(
    query(collection(firestore, "foodItems"), orderBy("id", "desc"))
  );

  return items.docs.map((doc) => doc.data());
};


//getting history
// getall food items
export const getHistory = async () => {
  const hist = await getDocs(
    query(collection(firestore, "foodItems"), orderBy("id", "user.id"))
  );

  return hist.docs.map((doc) => doc.data());
};