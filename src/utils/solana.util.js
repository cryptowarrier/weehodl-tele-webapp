import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import { solUrl } from "../constants"

export const getSolBalance = async (addr) => {
  const connection = new Connection(solUrl);
  const publicKey = new PublicKey(addr);
  const balance = await connection.getBalance(publicKey);
  return Number(balance) / LAMPORTS_PER_SOL;
}