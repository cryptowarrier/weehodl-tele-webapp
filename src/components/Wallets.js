import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getBscBalance, getEthBalance } from "../utils/ethers.util";
import { getSolBalance } from "../utils/solana.util";
import { networks } from "../utils/network";
import { bscChainId, ethChainId } from "../constants";
import { FaRegCopy } from 'react-icons/fa';

const Wallets = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [userBalance, setUserBalance] = useState(0);
  const [searchParams] = useSearchParams();

  const optimizeAddress = (addr) => {
    return `${addr.substring(0, 5)}..${addr.substring(addr.length - 5)}`
  }

  
  return (
    <div>
      <div style={{marginTop: '20px'}}>
        <select>
          <option>{networks[ethChainId].chainName}</option>
          <option>{networks[bscChainId].chainName}</option>
          <option>Solana</option>
        </select>
      </div>
    </div>
  )
}

export default Wallets;