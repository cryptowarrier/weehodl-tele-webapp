import { ethers } from "ethers"
import { networks } from "./network"
import { bscChainId, ethChainId, secretKey } from "../constants"
import { formatEther, formatUnits } from "ethers/lib/utils";
import { ERC20ABI } from "./ERC20ABI";
import CryptoJS from 'crypto-js';

export const getEthBalance = async (addr) => {
  const provider = new ethers.providers.JsonRpcProvider(networks[ethChainId].rpcUrls[0]);
  const balance = await provider.getBalance(addr);
  return formatEther(balance);
}

export const getBscBalance = async (addr) => {
  const provider = new ethers.providers.JsonRpcProvider(networks[bscChainId].rpcUrls[0]);
  const balance = await provider.getBalance(addr);
  return formatEther(balance);
}

export const getTokenBalance = async (chainId, tokenAddress, wallet) => {
  const provider = new ethers.providers.JsonRpcProvider(networks[chainId].rpcUrls[0]);
  const token = new ethers.Contract(tokenAddress, ERC20ABI, provider);
  const balance = await token.balanceOf(wallet);
  const decimals = await token.decimals();
  const symbol = await token.symbol();
  return formatUnits(balance, Number(decimals)) + symbol;
}

export const getTokenDecimals = async (chainId, tokenAddress) => {
  const provider = new ethers.providers.JsonRpcProvider(networks[chainId].rpcUrls[0]);
  const token = new ethers.Contract(tokenAddress, ERC20ABI, provider);
  const decimals = await token.decimals();
  return Number(decimals);
}

export const getEthSigner = (ciphertext, chainId) => {
  const privateKey = decryptText(ciphertext);
  const provider = new ethers.providers.JsonRpcProvider(networks[chainId].rpcUrls[0]);
  const signer = new ethers.Wallet(privateKey, provider);
  return signer;
}

const decryptText = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  const originalText = bytes.toString(CryptoJS.enc.Utf8).toString();
  return JSON.parse(originalText).text.slice(2);
}

// const decryptSolText = (ciphertext) => {
//   const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
//   const originalText = bytes.toString(CryptoJS.enc.Utf8);
//   return JSON.parse(originalText).text;
// }

export const tokenWithSigner = (token, signer) => {
  const contract = new ethers.Contract(token, ERC20ABI, signer);
  return contract;
}