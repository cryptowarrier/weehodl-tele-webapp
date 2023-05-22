import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getBscBalance, getEthBalance, getTokenBalance } from "../utils/ethers.util";
import { getSolBalance } from "../utils/solana.util";
import { networks } from "../utils/network";
import { bscChainId, bscTokens, ethChainId, ethTokens, solTokens } from "../constants";
import { FaRegCopy } from 'react-icons/fa';
import { sendEthers, sendTokens } from "../services/web3.service";
import { sendMessage } from "../services/api.service";
import { useTelegram } from "../hooks/useTelegram";

const Wallets = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [userBalance, setUserBalance] = useState(0);
  const [currentNetwork, setCurrentNetwork] = useState(ethChainId);
  const [currentToken, setCurrentToken] = useState(ethTokens[0].address);
  const [tokenList, setTokenList] = useState(ethTokens);
  const [showAddress, setShowAddress] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('0');
  const [error, setError] = useState('');

  const [searchParams] = useSearchParams();

  const { tg, onClose, onToggleButton, queryId } = useTelegram();

  // const optimizeAddress = (addr) => {
  //   return `${addr.substring(0, 5)}..${addr.substring(addr.length - 5)}`
  // }



  useEffect(() => {
    tg.ready();
    tg.onEvent('mainButtonClicked', withdraw);
    return () => {
      tg.offEvent('mainButtonClicked');
    }
  }, []);

  const withdraw = async () => {
    try {
      await fetch('http://109.105.198.249:8080/web-app/withdraw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { queryId: queryId }
      });
      onClose();
    } catch (e) {
      setError(e)
    }
  }

  // get coin balance
  useEffect(() => {
    async function getUserBalances() {
      if (currentNetwork === ethChainId) {
        const userAddr = searchParams.get('ethwallet');
        setTokenList(ethTokens);
        setCurrentToken(ethTokens[0].address);
        setWalletAddress(userAddr);
      } else if (currentNetwork === bscChainId) {
        const userAddr = searchParams.get('ethwallet');
        setWalletAddress(userAddr);
        setTokenList(bscTokens);
        setCurrentToken(bscTokens[0].address);
      } else {
        const userAddr = searchParams.get('solwallet');
        setTokenList(solTokens);
        setCurrentToken(solTokens[0].address);
        setWalletAddress(userAddr);
      }
    }
    getUserBalances();
  }, [currentNetwork, searchParams]);

  // getTokenbalance
  useEffect(() => {
    async function getTokenBalances() {
      if (currentNetwork === ethChainId) {
        const userAddr = searchParams.get('ethwallet');
        if (!userAddr) return;
        if (currentToken !== '') {
          const balance = await getTokenBalance(ethChainId, currentToken, userAddr);
          setUserBalance(balance);
        } else {
          const balance = await getEthBalance(userAddr);
          setUserBalance(Number(balance).toFixed(4).toString() + ' ETH');
        }
      } else if (currentNetwork === bscChainId) {
        const userAddr = searchParams.get('ethwallet');
        if (currentToken !== '') {
          const balance = await getTokenBalance(bscChainId, currentToken, userAddr);
          setUserBalance(balance);
        } else {
          const balance = await getBscBalance(userAddr);
          setUserBalance(Number(balance).toFixed(4).toString() + ' BNB');
        }
      } else {
        const userAddr = searchParams.get('solwallet');
        const balance = await getSolBalance(userAddr);
        setUserBalance(balance.toFixed(4).toString() + ' SOL');
      }
    }
    getTokenBalances();
  }, [currentToken, currentNetwork, searchParams]);

  const openWithdraw = () => {
    tg.MainButton.text = 'Withdraw';
    tg.MainButton.show();
    setShowWithdraw(true);
    setShowAddress(false);
  }

  const openDeposit = () => {
    setShowAddress(true);
    setShowWithdraw(false);
    tg.MainButton.hide();
  }


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

      <div style={{ marginTop: '2em', marginLeft: '0.5em' }}>
        <div>
          <button onClick={openDeposit}>Deposit</button>
          <button onClick={openWithdraw}>Withdraw</button>
        </div>
      </div>

      {
        showAddress && (
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <div>
              <span>Your Address</span>
              <FaRegCopy onClick={() => navigator.clipboard.writeText(walletAddress)} style={{ marginLeft: '10px', cursor: 'pointer' }} />
            </div>
            <div style={{ fontSize: '14px' }}>
              {walletAddress}
            </div>
          </div>
        )
      }
      {
        showWithdraw && (
          <div>
            <div>
              <input value={recipient} onChange={e => setRecipient(e.target.value)} type="text" placeholder="Input Recipient Address" />
            </div>
            <div>
              <input value={amount} onChange={e => setAmount(e.target.value)} type="text" placeholder="Input Amount" />
            </div>
          </div>
        )
      }
      {error}
    </div>
  )
}

export default Wallets;