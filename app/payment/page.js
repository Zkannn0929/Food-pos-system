'use client'; // Enables client-side rendering

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  clusterApiUrl,
} from '@solana/web3.js';

export default function Payment() {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;
      if (solana && solana.isPhantom) {
        console.log('Phantom wallet found!');
        const response = await solana.connect({ onlyIfTrusted: true });
        setWalletAddress(response.publicKey.toString());
      } else {
        alert('Please install Phantom Wallet!');
      }
    } catch (error) {
      console.error('Wallet connection failed:', error);
    }
  };


  const connectWallet = async () => {
    try {
      const { solana } = window;
      if (solana) {
        const response = await solana.connect();
        setWalletAddress(response.publicKey.toString());
      }
    } catch (error) {
      console.error('Connection Error:', error);
    }
  };

  const handlePayment = async () => {
    if (!walletAddress) {
      alert('Please connect your wallet first!');
      return;
    }

    try {
      const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
      const recipient = new PublicKey('YourRecipientWalletAddress'); // Replace with your wallet address
      const lamports = 0.01 * 1e9; // 0.01 SOL

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(walletAddress),
          toPubkey: recipient,
          lamports,
        })
      );

      const { solana } = window;
      const signedTransaction = await solana.signTransaction(transaction);
      const signature = await connection.sendRawTransaction(signedTransaction.serialize());
      await connection.confirmTransaction(signature, 'confirmed');

      setPaymentStatus(`Payment Successful! Signature: ${signature}`);
    } catch (error) {
      setPaymentStatus(`Payment Failed: ${error.message}`);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div>
      <h2>Payment with Phantom Wallet</h2>
      {connected ? (
        <p>Connected Wallet: {walletAddress}</p>
      ) : (
        <button onClick={connectWallet}>Connect Phantom Wallet</button>
      )}

      <button onClick={handlePayment}>Pay 0.01 SOL</button>
      <p>{paymentStatus}</p>

      <Link href="/">Back to Home</Link>
    </div>
  );
}
