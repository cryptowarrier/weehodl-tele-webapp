import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { networks } from "../utils/network";
import { getTokenName, getTokenSymbol } from "../utils/ethers.util";
import { timestampToDateString } from "../utils/time.util";
import { useTelegram } from "../hooks/useTelegram";

const UserLocks = () => {
  const [locks, setLocks] = useState([]);
  const [currentLock, setCurrentLock] = useState();
  const [token, setToken] = useState();

  const [searchParams] = useSearchParams();

  const { tg, queryId, user} = useTelegram();

  useEffect(() => {
    const jsonLocks = JSON.parse(searchParams.get('data'));
    setLocks(jsonLocks);
  }, []);

  useEffect(() => {
    if(!!currentLock) {
      tg.MainButton.text = "Invest";
      tg.MainButton.show();
    } else {
      tg.MainButton.hide();
    }
  }, [currentLock]);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', padding: '10px' }}>
      {
        !currentLock && locks.map((lock, i) => (
          <div onClick={() => setCurrentLock(lock)} className="project-card" key={i}>
            <div>{`network: ${lock.chainId === 'Solana' ? 'Solana' : networks[lock.chainId].chainName}`}</div>
            <div>unlock time: {timestampToDateString(lock.unlockTime)}</div>
            <div>token: {lock.token}</div>
            <div>amount: {lock.amount}</div>
          </div>
        ))
      }
      {
        (!!currentLock) && (
          <div style={{ width: '100%' }}>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{`network: ${currentLock.chainId === 'Solana' ? 'Solana' : networks[currentLock.chainId].chainName}`}</div>
            <div>Unlock Time: { timestampToDateString(currentLock.unlockTime)}</div>
            <div>Token: {currentLock.token}</div>
            <div>Amount: {currentLock.amount}</div>
          </div>
        )
      }
      {/* <div>{JSON.stringify(locks)}</div> */}
    </div>
  );
}

export default UserLocks;