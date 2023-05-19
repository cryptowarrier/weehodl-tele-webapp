import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getBscBalance, getEthBalance } from "../utils/ethers.util";
import { getSolBalance } from "../utils/solana.util";
import { networks } from "../utils/network";
import { bscChainId, ethChainId } from "../constants";
import { FaRegCopy } from 'react-icons/fa';

const Wallets = () => {
  const [ethAddress, setEthAddress] = useState('');
  const [solAddress, setSolAddress] = useState('');
  const [ethBalance, setEthBalance] = useState('0');
  const [bscBalance, setBscBalance] = useState('0');
  const [solBalance, setSolBalance] = useState(0);

  const [searchParams] = useSearchParams();

  const optimizeAddress = (addr) => {
    return `${addr.substring(0, 5)}..${addr.substring(addr.length - 5)}`
  }

  useEffect(() => {
    const ethWallet = searchParams.get('ethwallet');
    const solWallet = searchParams.get('solwallet');
    setEthAddress(ethWallet);
    setSolAddress(solWallet);
    async function getUserBalances() {
      let balance = await getEthBalance(ethWallet);
      setEthBalance(balance);
      balance = await getBscBalance(ethWallet);
      setBscBalance(balance);
      balance = await getSolBalance(solWallet);
      setSolBalance(balance);
    }

    getUserBalances();
  }, []);
  return (
    <div>
      <div>
        <div>{`${networks[ethChainId].chainName}`}</div>
        <div>{`address: ${optimizeAddress(ethAddress)}`} <FaRegCopy style={{cursor: 'pointer'}} onClick={() => navigator.clipboard.writeText(ethAddress)} /></div>
        <div>{`balance: ${Number(ethBalance).toFixed(4)} ETH`}</div>
      </div>
      <div style={{marginTop: '20px'}}>
        <div>{`${networks[bscChainId].chainName}`}</div>
        <div>{`address: ${optimizeAddress(ethAddress)}`} <FaRegCopy style={{cursor: 'pointer'}} onClick={() => navigator.clipboard.writeText(ethAddress)} /></div>
        <div>{`balance: ${Number(bscBalance).toFixed(4)} BNB`}</div>
      </div>
      <div style={{marginTop: '20px'}}>
        <div>{`Solana`}</div>
        <div>{`address: ${optimizeAddress(solAddress)}`} <FaRegCopy style={{cursor: 'pointer'}} onClick={() => navigator.clipboard.writeText(solAddress)} /></div>
        <div>{`balance: ${solBalance.toFixed(4)} SOL`}</div>
      </div>
    </div>
  )
}

export default Wallets;