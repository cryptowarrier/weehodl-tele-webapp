import { ethers } from "ethers"
import { networks } from "./network"
import { bscChainId, ethChainId } from "../constants"
import { formatEther, formatUnits } from "ethers/lib/utils";
import { ERC20ABI } from "./ERC20ABI";

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
