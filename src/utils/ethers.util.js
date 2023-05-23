import { ethers } from "ethers"
import { networks } from "./network"
import { bscChainId, ethChainId, secretKey } from "../constants"
import { formatEther, formatUnits } from "ethers/lib/utils";
import { ERC20ABI } from "./ERC20ABI";
import { contracts } from '../constants/contracts';
import Factory from './contracts/ProjectFactory.sol/ProjectFactory.json';
import Project from './contracts/Project.sol/Project.json';

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

export const factory = (chainId) => {
  const address = contracts[chainId].factory;
  const provider = new ethers.providers.JsonRpcProvider(networks[chainId].rpcUrls[0]);
  const contract = new ethers.Contract(address, Factory.abi, provider);
  return contract;
}

export const projectContract = (chainId, address) => {
  const provider = new ethers.providers.JsonRpcProvider(networks[chainId].rpcUrls[0]);
  const contract = new ethers.Contract(address, Project.abi, provider);
  return contract;
}
