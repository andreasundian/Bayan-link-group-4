import { Request, Response } from 'express';
import { db } from '../src/lib/firebase.js';
import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  serverTimestamp 
} from 'firebase/firestore';

const collectionName = 'services';

export const browse = async (req: Request, res: Response) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const read = async (req: Request, res: Response) => {
  try {
    const docRef = doc(db, collectionName, req.params.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      res.json({ success: true, data: { id: docSnap.id, ...docSnap.data() } });
    } else {
      res.status(404).json({ success: false, message: "Service not found" });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const add = async (req: Request, res: Response) => {
  try {
    const newData = {
      ...req.body,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    const docRef = await addDoc(collection(db, collectionName), newData);
    res.json({ success: true, message: "Service created", data: { id: docRef.id, ...newData } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const edit = async (req: Request, res: Response) => {
  try {
    const docRef = doc(db, collectionName, req.params.id);
    const updateData = {
      ...req.body,
      updatedAt: serverTimestamp()
    };
    await updateDoc(docRef, updateData);
    res.json({ success: true, message: "Service updated", data: { id: req.params.id, ...updateData } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const docRef = doc(db, collectionName, req.params.id);
    await deleteDoc(docRef);
    res.json({ success: true, message: "Service deleted" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
