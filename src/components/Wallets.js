import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getBscBalance, getEthBalance, getTokenBalance } from "../utils/ethers.util";
import { getSolBalance } from "../utils/solana.util";
import { networks } from "../utils/network";
import { bscChainId, bscTokens, ethChainId, ethTokens, solTokens } from "../constants";
import { FaRegCopy } from 'react-icons/fa';


const Wallets = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [userBalance, setUserBalance] = useState(0);
  const [currentNetwork, setCurrentNetwork] = useState(ethChainId);
  const [currentToken, setCurrentToken] = useState(ethTokens[0].address);
  const [tokenList, setTokenList] = useState(ethTokens);
  const [showAddress, setShowAddress] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);

  const [searchParams] = useSearchParams();

  const optimizeAddress = (addr) => {
    return `${addr.substring(0, 5)}..${addr.substring(addr.length - 5)}`
  }

  // get coin balance
  useEffect(() => {
    async function getUserBalances() {
      if (currentNetwork === ethChainId) {
        const userAddr = searchParams.get('ethwallet');
        setTokenList(ethTokens);
        setCurrentToken(ethTokens[0].address);
        setWalletAddress(userAddr);
        const balance = await getEthBalance(userAddr);
        setUserBalance(Number(balance).toFixed(4).toString() + ' ETH');
      } else if (currentNetwork === bscChainId) {
        const userAddr = searchParams.get('ethwallet');
        setWalletAddress(userAddr);
        setTokenList(bscTokens);
        setCurrentToken(bscTokens[0].address);
        const balance = await getBscBalance(userAddr);
        setUserBalance(Number(balance).toFixed(4).toString() + ' BNB');
      } else {
        const userAddr = searchParams.get('solwallet');
        setTokenList(solTokens);
        setCurrentToken(solTokens[0].address);
        setWalletAddress(userAddr);
        const balance = await getSolBalance(userAddr);
        setUserBalance(balance.toFixed(4).toString() + ' SOL');
      }
    }
    getUserBalances();
  }, [currentNetwork]);

  // getTokenbalance
  useEffect(() => {
    async function getTokenBalances() {
      console.log(currentToken)
      if (currentNetwork === ethChainId) {
        const userAddr = searchParams.get('ethwallet');
        if (!userAddr) return;
        const balance = await getTokenBalance(ethChainId, currentToken, userAddr);
        setUserBalance(balance)

      } else if (currentNetwork === bscChainId) {
        const userAddr = searchParams.get('ethwallet');
        const balance = await getTokenBalance(bscChainId, currentToken, userAddr);
        setUserBalance(balance)
      } else {
        // const userAddr = searchParams.get('solwallet');
        // const balance = await getSolBalance(userAddr);
        // setUserBalance(balance.toFixed(4).toString() + ' SOL');
      }
    }
    if (currentToken !== '') {
      getTokenBalances();
    }
  }, [currentToken])


  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div>
          <label htmlFor="network-select">Network</label>
          <div id="network-select" className="select">
            <select value={currentNetwork} onChange={e => setCurrentNetwork(e.target.value)} id="standard-select">
              <option value={ethChainId}>{networks[ethChainId].chainName}</option>
              <option value={bscChainId}>{networks[bscChainId].chainName}</option>
              <option value="Solana">Solana</option>
            </select>
            <span className="focus"></span>
          </div>
        </div>
        <div style={{ marginLeft: '0.2em' }}>
          <label htmlFor="token-select">Token</label>
          <div id="token-select" className="select">
            <select value={currentToken} onChange={e => setCurrentToken(e.target.value)} id="standard-select">
              {
                tokenList.map((token, i) => (
                  <option key={i} value={token.address}>{token.name}</option>
                ))
              }
            </select>
            <span className="focus"></span>
          </div>
        </div>
      </div>
      <div style={{ marginTop: '2em', marginLeft: '0.5em' }}>
        {`Balance: ${userBalance} `}
      </div>
      {
        (!showAddress && !showWithdraw) && (
          <div style={{ marginTop: '2em', marginLeft: '0.5em' }}>
            <div>
              <button onClick={() => setShowAddress(true)}>Deposit</button>
              <button onClick={() => setShowWithdraw(true)}>Withdraw</button>
            </div>
          </div>
        )
      }
      {
        showAddress && (
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <div>
              <span>Your Address</span>
              <FaRegCopy onClick={() => navigator.clipboard.writeText(walletAddress)} style={{ marginLeft: '10px', cursor: 'pointer' }} />
            </div>
            <div>
              {walletAddress}
            </div>
            <div style={{marginTop: '20px'}}>
              <button onClick={() => setShowAddress(false)}>Back</button>
            </div>
          </div>
        )
      }

    </div>

  )
}

export default Wallets;