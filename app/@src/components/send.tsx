// lib/send/sendTransaction.ts

import { sendUSDC } from "@/@src/lib/ethereum/sendUSDC";
import { pocketBackend } from "@/@src/lib/api/pocketBackend";

export async function executeSend({
  network,
  destination,
  amountUsd,
  walletAddress,
  tokenAddress,
}: {
  network: string;
  destination: string;
  amountUsd: string;
  walletAddress: string;
  tokenAddress: string;
}) {
  const txHash = await sendUSDC(network, destination, amountUsd);

  if (pocketBackend.isConfigured()) {
    await pocketBackend.announceTransaction({
      txHash,
      fromAddress: walletAddress,
      toAddress: destination,
      tokenSymbol: "USDC",
      tokenAddress,
      amount: amountUsd,
      network,
      timestamp: Math.floor(Date.now() / 1000),
    });
  }

  return txHash;
}