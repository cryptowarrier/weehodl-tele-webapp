import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { networks } from "../utils/network";
import { getTokenName, getTokenSymbol } from "../utils/ethers.util";
import { timestampToDateString } from "../utils/time.util";
import { useTelegram } from "../hooks/useTelegram";
import { claimQuery } from "../services/api.service";

const UserLocks = () => {
  const [locks, setLocks] = useState([]);
  const [currentLock, setCurrentLock] = useState();
  const [token, setToken] = useState();

  const [searchParams] = useSearchParams();

  const { tg, queryId, user} = useTelegram();

  useEffect(() => {
    const jsonLocks = JSON.parse(searchParams.get('data'));
    setLocks(jsonLocks);
    tg.ready();
    tg.onEvent('mainButtonClicked', claim);
    return () => {
      tg.offEvent('mainButtonClicked');
    }
  }, []);

  useEffect(() => {
    if(!!currentLock) {
      tg.MainButton.text = "Claim";
      tg.MainButton.show();
      const now = Math.floor(new Date().getTime() / 1000);
      if (currentLock.unlockTime > now) {
        tg.MainButton.disable();
      } else {
        tg.MainButton.enable();
      }
    } else {
      tg.MainButton.hide();
    }
  }, [currentLock]);

  const claim = async () => {
    await claimQuery({
      queryId: queryId,
      user: user.id,
      chainId: currentLock.chainId,
      address: currentLock.address,
      index: currentLock.index
    })
  }

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
            <div>
              <button onClick={() => setCurrentLock()}>Back</button>
            </div>
            <div>{queryId}</div>
          </div>
        )
      }
      <div>{JSON.stringify(locks)}</div>
    </div>
  );
}

export default UserLocks;