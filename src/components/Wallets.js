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
  const [currentNetwork, setCurrentNetwork] = useState(ethChainId);
  const [searchParams] = useSearchParams();

  const optimizeAddress = (addr) => {
    return `${addr.substring(0, 5)}..${addr.substring(addr.length - 5)}`
  }

  useEffect(() => {
    async function getUserBalances() {
      if (currentNetwork === ethChainId) {
        const userAddr = searchParams.get('ethwallet');
        setWalletAddress(userAddr);
        const balance = await getEthBalance(userAddr);
        setUserBalance(Number(balance).toFixed(4).toString() + ' ETH');
      } else if (currentNetwork === bscChainId) {
        const userAddr = searchParams.get('ethwallet');
        setWalletAddress(userAddr);
        const balance = await getBscBalance(userAddr);
        setUserBalance(Number(balance).toFixed(4).toString() + ' BNB');
      } else {
        const userAddr = searchParams.get('solwallet');
        setWalletAddress(userAddr);
        const balance = await getSolBalance(userAddr);
        setUserBalance(balance.toFixed(4).toString() + ' SOL');
      }
    }

    getUserBalances();
  }, [currentNetwork]);


  return (
    <div>
      <label for="standard-select">Network</label>
      <div class="select">
        <select value={currentNetwork} onChange={e => setCurrentNetwork(e.target.value)} id="standard-select">
          <option value={ethChainId}>{ networks[ethChainId].chainName }</option>
          <option value={bscChainId}>{ networks[bscChainId].chainName }</option>
          <option value="Solana">Solana</option>
        </select>
        <span class="focus"></span>
      </div>
      <div style={{margin: '0.5em'}}>
        { `Balance: ${userBalance} `}
      </div>
    </div>
  )
}

export default Wallets;