// import { ConnectWallet } from "@thirdweb-dev/react";
import { useState } from 'react';
import { ethers } from 'ethers';  
import "./styles/Home.css";

const StableCoinAddress = '0x980c59c4bEc2AF703a26F4F7657E2C09f4ed7190'; // Replace with the actual contract address


export default function Home() {

  const [amount, setAmount] = useState('');
  const [txHash, setTxHash] = useState('');

  const mintTokens = async () => {
    if (!amount) return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(StableCoinAddress, ['function mint(address to, uint256 amount)'], signer);

    try {
      const tx = await contract.mint(signer.getAddress(), ethers.utils.parseEther(amount));
      await tx.wait();
      setTxHash(tx.hash);
    } catch (error) {
      console.error('Error minting tokens:', error);
    }
  };

  const burnTokens = async () => {
    if (!amount) return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(StableCoinAddress, ['function burn(uint256 amount)'], signer);

    try {
      const tx = await contract.burn(ethers.utils.parseEther(amount));
      await tx.wait();
      setTxHash(tx.hash);
    } catch (error) {
      console.error('Error burning tokens:', error);
    }
  };
  return (
    <>
   <div>
  
      <h1>StableCoin DApp</h1>
      <div>
        <label>Mint Amount:</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <button onClick={mintTokens}>Mint</button>
      </div>
      <div>
        <label>Burn Amount:</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <button onClick={burnTokens}>Burn</button>
      </div>
      {txHash && <p>Transaction Hash: {txHash}</p>}
    </div>
   </>
  );
}
