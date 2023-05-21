import { parseEther, parseUnits } from "ethers/lib/utils";
import { getEthSigner, getTokenDecimals, tokenWithSigner } from "../utils/ethers.util"
import { networks } from "../utils/network";

export const sendEthers = async (ciphertext, chainId, to, amount) => {
  try {
    const signer = getEthSigner(ciphertext, chainId);
    const tx = {
      to: to,
      value: parseEther(String(amount))
    };
    const txObj = await signer.sendTransaction(tx);
    return `${networks[chainId].blockExplorerUrls}/tx/${txObj.hash}`;
  } catch (e) {
    console.log(e)
  }
}

export const sendTokens = async (ciphertext, chainId, token, to, amount) => {
  try {
    const signer = getEthSigner(ciphertext, chainId);
    const decimals = await getTokenDecimals(chainId, token);
    const contract = tokenWithSigner(token, signer);
    const txObj = await contract.transfer(to, parseUnits(String(amount), decimals));
    return `${networks[chainId].blockExplorerUrls}/tx/${txObj.hash}`;
  } catch (e) {
    console.log(e);
  }
}