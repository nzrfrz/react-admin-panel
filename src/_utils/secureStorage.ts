import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_SECURE_STORAGE_SECRET_KEY;

const encryptData = (data: string) => {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};

const decryptData = (ciphertext: string) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const saveLS = (key: string, value: string) => {
  const encryptedData = encryptData(value);
  localStorage.setItem(key, encryptedData);
};

export const getLS = (key: string) => {
  const encryptedData = localStorage.getItem(key);
  if (encryptedData) return decryptData(encryptedData);
  return null;
};

export const removeLS = (key: string) => localStorage.removeItem(key);