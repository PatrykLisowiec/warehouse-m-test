import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestore } from "../firebase";

export const GetInventory = async (inventoryNumber: string) => {
  const q = query(
    collection(firestore, "Inventory"),
    where("InventoryNumber", "==", inventoryNumber)
  );
  const querySnapshot = await getDocs(q);

  return querySnapshot?.docs[0]?.data();
};

export const CreateInventory = async (
  inventory: string,
  quantity: string,
  desc: string,
  location: string
) => {
  const inventoryDocument = collection(firestore, "Inventory");
  const newInventory = {
    InventoryNumber: inventory,
    Quantity: quantity,
    Description: desc,
    Location: location,
    Scanned: new Date(),
  };

  return await addDoc(inventoryDocument, newInventory);
};
