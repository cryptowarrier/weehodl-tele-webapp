import { ethers } from "ethers"
import { networks } from "./network"
import { bscChainId, ethChainId } from "../constants"
import { formatEther } from "ethers/lib/utils";

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

