import CryptoJS from "crypto-js";

export function generateUniqueID (charsLength: number = 9) {
    const randomData = Math.random().toString();
    return CryptoJS.SHA256(randomData).toString(CryptoJS.enc.Hex).slice(0, charsLength);
};