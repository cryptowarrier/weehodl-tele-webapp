import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getBscBalance, getEthBalance } from "../utils/ethers.util";
import { getSolBalance } from "../utils/solana.util";
import { networks } from "../utils/network";
import { bscChainId, ethChainId } from "../constants";

const Wallets = () => {
  const [ethAddress, setEthAddress] = useState('');
  const [solAddress, setSolAddress] = useState('');
  const [ethBalance, setEthBalance] = useState('');
  const [bscBalance, setBscBalance] = useState('');
  const [solBalance, setSolBalance] = useState(0);

  const [searchParams] = useSearchParams();

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
        <div>{`address: ${ethAddress}`}</div>
        <div>{`balance: ${ethBalance} ETH`}</div>
      </div>
      <div>
        <div>{`${networks[bscChainId].chainName}`}</div>
        <div>{`address: ${ethAddress}`}</div>
        <div>{`balance: ${bscBalance} BNB`}</div>
      </div>
      <div>
        <div>{`Solana`}</div>
        <div>{`address: ${solAddress}`}</div>
        <div>{`balance: ${solBalance} SOL`}</div>
      </div>
    </div>
  )
}

export default Wallets;