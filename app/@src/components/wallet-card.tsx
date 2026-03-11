import { useState } from 'react';
import { Pressable, Share, StyleSheet, Text, View } from 'react-native';
import useWallet from '../store/wallet';

function truncateAddress(addr: string): string {
  if (!addr || addr.length < 12) return addr;
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

function formatBalance(balance: string, symbol: string): string {
  const n = parseFloat(balance);
  if (isNaN(n)) return `-- ${symbol}`;
  if (symbol === 'USDC' || symbol === 'USDT') {
    return `${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${symbol}`;
  }
  return `${n.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 6 })} ${symbol}`;
}

export default function WalletCard() {
  const { walletAddress, network, balances } = useWallet();
  const [copied, setCopied] = useState(false);

  const usdc = balances.find((b) => b.symbol === 'USDC');
  const eth = balances.find((b) => b.isNative);

  const handleCopy = async () => {
    if (!walletAddress) return;
    await Share.share({ message: walletAddress });
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <View style={styles.card} testID="wallet-card">
      <View style={styles.header}>
        <Text style={styles.networkBadge}>{network || 'Ethereum'}</Text>
      </View>

      <Text style={styles.primaryBalance}>
        {usdc ? formatBalance(usdc.balance, 'USDC') : '-- USDC'}
      </Text>

      {eth && (
        <Text style={styles.secondaryBalance}>
          {formatBalance(eth.balance, eth.symbol)}
        </Text>
      )}

      <Pressable onPress={handleCopy} testID="wallet-address-copy">
        <Text style={styles.address}>
          {walletAddress ? truncateAddress(walletAddress) : 'No wallet'}
          {copied ? '  ✓ Copied' : ''}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    backgroundColor: '#161B27',
    padding: 20,
    gap: 6,
    borderWidth: 1,
    borderColor: '#2A3143',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 4,
  },
  networkBadge: {
    fontSize: 11,
    fontWeight: '600',
    color: '#60A5FA',
    backgroundColor: '#1E2D4A',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 99,
    overflow: 'hidden',
  },
  primaryBalance: {
    fontSize: 32,
    fontWeight: '700',
    color: '#F1F5F9',
    letterSpacing: -0.5,
  },
  secondaryBalance: {
    fontSize: 15,
    color: '#94A3B8',
    fontWeight: '500',
  },
  address: {
    marginTop: 10,
    fontSize: 13,
    color: '#64748B',
    fontFamily: 'monospace',
  },
});

